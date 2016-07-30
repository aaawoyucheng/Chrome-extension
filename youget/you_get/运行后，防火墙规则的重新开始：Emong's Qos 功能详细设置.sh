#!/bin/sh
#copyright by Emong's Qos update hiboy
/etc/storage/crontabs_script.sh &
export PATH=/opt/sbin:/opt/bin:/opt/usr/sbin:/opt/usr/bin:/usr/sbin:/usr/bin:/sbin:/bin
export LD_LIBRARY_PATH=/opt/lib:/lib
# qos 功能 0关闭；1启动
qoss=0
# 当在线终端≤2台时取消限速.(路由端1+电脑端1=2台)
qosb=2
# 默认为20M
DOWN=2560
UP=256
logger -t "QOS" "最大下载$DOWN KB/S,最大上传$UP KB/S"
# IP限速设置
# 未设置的IP带宽减半,如启用adbyby,因7620的CPU瓶颈,宽带峰值50M
# 注意参数之间有空格
# 可选项：删除前面的#可生效
# [KB/S]IP地址 最大下载 下载保证 最大上传 上传保证
cat > "/tmp/qos_ip_limit_DOMAIN.txt" <<-EOF
#192.168.1.115 2560 100 200 20
192.168.1.2-192.168.1.244 2560 100 100 15



EOF
# 连接数限制
#如果开启该功能后,打开下载软件可能会导致QQ等聊天软件掉线.(因为连接数量会被占光)
# IP地址 TCP连接数 UDP连接数
cat > "/tmp/qos_connlmt_DOMAIN.txt" <<-EOF
#192.168.1.10 100 100
192.168.1.20-192.168.1.25 100 100


EOF
# 端口优先
# 请勿添加下载应用的端口80、8080等等.由于没有被流量控制和处理优先级,下载应用会占用大量资源导致网络卡
# 协议 端口
cat > "/tmp/qos_port_first_DOMAIN.txt" <<-EOF
UDP 53
TCP 22
TCP 23
#TCP 443
TCP 1723
#TCP 3389
TCP 3724,1119,1120
TCP 28012,10008,13006,2349,7101:7103
UDP 2349,12000:12175



EOF

load_var() {
WAN_IF="imq1"
LAN_IF="imq0"
WAN_IFT=$(nvram get wan0_ifname_t)
IPM="iptables -t mangle"
lan_ip="`nvram get lan_ipaddr`/24"

}

load_modules(){
[ ! -f /tmp/qos-emong-modules ] && {
modprobe act_connmark   #缺,补621-sched_act_connmark.patch@597
for module in imq ipt_IMQ ipt_web xt_length xt_hashlimit cls_fw sch_htb sch_sfq sch_red xt_length xt_IMQ ipt_ipp2p xt_dscp xt_DSCP cls_u32 sch_hfsc sch_prio ipt_multiport ipt_CONNMARK ipt_length ipt_hashlimit xt_connlimit xt_connbytes ipt_connlimit em_u32 sch_ingress act_mirred
do
modprobe $module
done
modprobe imq numdevs=1
echo >/tmp/qos-emong-modules
}
}

qos_stop() {
tc qdisc del dev $WAN_IF root
tc qdisc del dev $LAN_IF root

$IPM -F
$IPM -X UP
$IPM -X DOWN
$IPM -X IP_DOWN
$IPM -X IP_UP
}

qos_start(){

ip link set imq0 up
ip link set imq1 up
tc qdisc add dev $WAN_IF root handle 1: htb
tc qdisc add dev $LAN_IF root handle 1: htb
tc class add dev $WAN_IF parent 1: classid 1:2 htb rate $((UP))kbps
tc class add dev $LAN_IF parent 1: classid 1:2 htb rate $((DOWN))kbps

tc class add dev $WAN_IF parent 1: classid 1:1 htb rate $((UP*95/100))kbps
tc class add dev $WAN_IF parent 1:1 classid 1:11 htb rate $((UP*5/10))kbps prio 1
tc class add dev $WAN_IF parent 1:1 classid 1:12 htb rate $((UP*5/10))kbps ceil $((UP*9/10))kbps prio 2
tc class add dev $WAN_IF parent 1:12 classid 1:121 htb rate $((UP*4/10))kbps ceil $((UP*8/10))kbps prio 1
tc class add dev $WAN_IF parent 1:12 classid 1:122 htb rate $((UP*1/10))kbps ceil $((UP*4/10))kbps prio 2
tc class add dev $WAN_IF parent 1:12 classid 1:123 htb rate $((UP*4/10))kbps ceil $((UP*6/10))kbps prio 3
tc qdisc add dev $WAN_IF parent 1:11 handle 11: sfq perturb 10
tc qdisc add dev $WAN_IF parent 1:121 handle 121: sfq perturb 10
tc qdisc add dev $WAN_IF parent 1:122 handle 122: sfq perturb 10
tc qdisc add dev $WAN_IF parent 1:123 handle 123: sfq perturb 10
tc filter add dev $WAN_IF parent 1: handle 0x10/0xfff0 fw classid 1:11
tc filter add dev $WAN_IF parent 1: handle 0x20/0xfff0 fw classid 1:121
tc filter add dev $WAN_IF parent 1: handle 0x30/0xfff0 fw classid 1:122
tc filter add dev $WAN_IF parent 1: handle 0x40/0xfff0 fw classid 1:123

tc class add dev $LAN_IF parent 1: classid 1:1 htb rate $((DOWN*95/100))kbps
tc class add dev $LAN_IF parent 1:1 classid 1:11 htb rate $((DOWN*5/10))kbps prio 1
tc class add dev $LAN_IF parent 1:1 classid 1:12 htb rate $((DOWN*5/10))kbps ceil $((DOWN*9/10))kbps prio 2
tc class add dev $LAN_IF parent 1:12 classid 1:121 htb rate $((DOWN*4/10))kbps ceil $((DOWN*8/10))kbps prio 1
tc class add dev $LAN_IF parent 1:12 classid 1:122 htb rate $((DOWN*1/10))kbps ceil $((DOWN*4/10))kbps prio 10
tc class add dev $LAN_IF parent 1:12 classid 1:123 htb rate $((DOWN*4/10))kbps ceil $((DOWN*6/10))kbps prio 3
tc qdisc add dev $LAN_IF parent 1:11 handle 11: sfq perturb 10
tc qdisc add dev $LAN_IF parent 1:121 handle 121: sfq perturb 10
tc qdisc add dev $LAN_IF parent 1:122 handle 122: sfq perturb 10
tc qdisc add dev $LAN_IF parent 1:123 handle 123: sfq perturb 10
tc filter add dev $LAN_IF parent 1: handle 0x10/0xfff0 fw classid 1:11
tc filter add dev $LAN_IF parent 1: handle 0x20/0xfff0 fw classid 1:121
tc filter add dev $LAN_IF parent 1: handle 0x30/0xfff0 fw classid 1:122
tc filter add dev $LAN_IF parent 1: handle 0x40/0xfff0 fw classid 1:123

$IPM -N UP
$IPM -N DOWN
$IPM -N IP_UP
$IPM -N IP_DOWN
$IPM -I POSTROUTING -o br0 -j DOWN
$IPM -I PREROUTING -i br0 -j UP
$IPM -A DOWN -j IMQ --todev 0
$IPM -A UP -j IMQ --todev 1
#$IPM -I DOWN -s $lan_ip -j RETURN
$IPM -I DOWN -p tcp -m multiport --dports 22,53,445,139 -j RETURN
$IPM -I DOWN -p icmp -j RETURN
#$IPM -A DOWN -m length --length :100 -j RETURN
$IPM -A DOWN -j MARK --set-mark=0x41
$IPM -A DOWN -m length --length 1024:1500 -j MARK --set-mark=0x31
$IPM -A DOWN -p tcp -m multiport --dports 21,80,443,3389,8118 -j MARK --set-mark=0x21
$IPM -A DOWN -m length --length :768 -j MARK --set-mark=0x11

$IPM -A DOWN -j IP_DOWN

#$IPM -I UP -d $lan_ip -j RETURN
$IPM -I UP -p tcp -m multiport --sports 22,53,445,139 -j RETURN
$IPM -I UP -p icmp -j RETURN
#$IPM -A UP -m length --length :80 -j RETURN
$IPM -A UP -j MARK --set-mark=0x41
$IPM -A UP -m length --length 1024:1500 -j MARK --set-mark=0x31
$IPM -A UP -p tcp -m multiport --sports 21,80,443,3389,8118 -j MARK --set-mark=0x21
$IPM -A UP -m length --length :512 -j MARK --set-mark=0x11

$IPM -A UP -j IP_UP

}

connlmt() {
$IPM -A FORWARD -p tcp -d $1 -m connlimit --connlimit-above $2 -j DROP
$IPM -A FORWARD -p udp -d $1 -m connlimit --connlimit-above $3 -j DROP

}

ip_limit() {
conns=$6
[ $((conns)) -lt "6" ] && logger -t "QOS" "限速设置[KB/S]IP：$1 最大下载$2 下载保证$3 最大上传$4 上传保证$5"
[ $((conns)) -ge "6" ] && logger -t "QOS" "连接数限制IP：$1 TCP：$2 UDP：$3"
n=$(echo $1|cut -d '-' -f1|cut -d '.' -f4)
m=$(echo $1|cut -d '-' -f2|cut -d '.' -f4)
NET=$(echo $1|cut -d '.' -f1-3)
while [ $n -le $m ]
do
ip=$n
if [ $((conns)) -lt "6" ];then
[ ${#ip} -lt 3 ] && ip=0$ip
[ ${#ip} -lt 3 ] && ip=0$ip
var=1

tc class add dev $WAN_IF parent 1:2 classid 1:$var$ip htb rate $5kbps ceil $4kbps
tc qdisc add dev $WAN_IF parent 1:$var$ip handle $var$ip sfq perturb 10
tc filter add dev $WAN_IF parent 1: handle 0x$var$ip fw flowid 1:$var$ip

tc class add dev $LAN_IF parent 1:2 classid 1:$var$ip htb rate $3kbps ceil $2kbps
tc qdisc add dev $LAN_IF parent 1:$var$ip handle $var$ip sfq perturb 10
tc filter add dev $LAN_IF parent 1: handle 0x$var$ip fw flowid 1:$var$ip

$IPM -A IP_DOWN -d $NET.$n -j MARK --set-mark 0x$var$ip
$IPM -A IP_UP -s $NET.$n -j MARK --set-mark 0x$var$ip
else
connlmt $NET.$n $2 $3
fi
n=$((n+1))
done

}

port_first() {
logger -t "QOS" "端口优先：$1 $2"
$IPM -I DOWN -p $1 -m multiport --dports $2 -j RETURN
$IPM -I UP -p $1 -m multiport --sports $2 -j RETURN

}

if [ "$qoss" != "0" ] && [ -f "/lib/modules/$(uname -r)/kernel/net/netfilter/xt_IMQ.ko" ]; then
if [ $(cat /tmp/qos_state) -eq 1 ]; then
logger -t "QOS" "正在运行"
exit
else
echo 1 >/tmp/qos_state
fi
logger -t "QOS" "启动QOS成功"
echo 1 >/tmp/qoss_state
load_var
load_modules
qos_stop
qos_start
while read line
do
c_line=`echo $line |grep -v "#"`
if [ ! -z "$c_line" ] ; then
ip_limit $line
fi
done < /tmp/qos_ip_limit_DOMAIN.txt

while read line
do
c_line=`echo $line |grep -v "#"`
if [ ! -z "$c_line" ] ; then
line="$line 4 5 6"
ip_limit $line
fi
done < /tmp/qos_connlmt_DOMAIN.txt

while read line
do
c_line=`echo $line |grep -v "#"`
if [ ! -z "$c_line" ] ; then
port_first $line
fi
done < /tmp/qos_port_first_DOMAIN.txt
if [ ! -f /tmp/qos_scheduler.lock ] ; then
/tmp/qos_scheduler.sh $qosb &
fi
echo 0 >/tmp/qos_state
else
logger -t "QOS" "QOS没有开启或闪存不足缺模块"
echo 0 >/tmp/qoss_state
ip link set imq0 down
ip link set imq1 down
fi
logger -t "防火墙规则" "脚本完成"

