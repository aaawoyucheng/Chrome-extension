#!/bin/sh
#copyright by hiboy
[ -f /tmp/script2.lock ] && exit 0
touch /tmp/script2.lock
cat > "/tmp/sh_download.sh" <<-\EOF
#!/bin/sh
output=$1
url1=$2
url2=$3
[ -z "$url2" ] && url2=$url1
rm -f $output
wget -O $output $url1 --continue
if [ ! -s "$output" ] ;then
logger -t "sh_download" "下载失败:【$output】 URL:【$url1】"
logger -t "sh_download" "重新下载:【$output】 URL:【$url2】"
rm -f $output
sleep 16
wget -O $output $url2 --continue
fi
if [ ! -s "$output" ] ;then
logger -t "sh_download" "下载失败:【$output】 URL:【$url2】"
exit 1
else
chmod 777 $output
fi
EOF
chmod 777 "/tmp/sh_download.sh"
cat > "/tmp/sh_untar.sh" <<-\EOF
#!/bin/sh
flie=$1
output=$2
outputflie=$3
tar -xzvf $flie -C $output
if [ ! -s "$outputflie" ] ;then
logger -t "sh_untar" "解压不正常:$1"
exit 1
fi
EOF
chmod 777 "/tmp/sh_untar.sh"
cat > "/tmp/sh_ddns.sh" <<-\EOF
#!/bin/sh
flie=$1
url=$2
logger -t "ddns" "更新IP地址-$flie"
while [ "1" ];
do
wget -O $flie $url --continue
sleep 666
continue
done
EOF
chmod 777 "/tmp/sh_ddns.sh"
cat > "/tmp/sh_adb8118.sh" <<-\EOF
#!/bin/sh
adb=$1
if [ "$adb" = "D" ] ; then
iptables -t nat -D PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8118
logger -t "iptables" "删除8118转发规则"
echo '127.0.0.1 update.adbyby.com' >> /etc/storage/dnsmasq/hosts
else
iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 8118
logger -t "iptables" "添加8118转发规则"
sed -e '/.*update.adbyby.com/d' -i /etc/storage/dnsmasq/hosts
fi
/etc/storage/ez_buttons_script.sh 3 &
restart_dhcpd
EOF
chmod 777 "/tmp/sh_adb8118.sh"
cat > "/tmp/sh_mon.sh" <<-\EOF
#!/bin/sh
logger -t "adbyby" "adbyby 进程守护启动"
rm -f /tmp/cron_adb.lock
reb=1
while [ "1" ];
do
if [ -s "/tmp/adbyby" ] ;then
if [ ! -f /tmp/cron_adb.lock ]; then
if [ "$reb" -gt 5 ] && [ ! -f /tmp/reb_0.lock ] ; then
LOGTIME=$(date "+%Y-%m-%d %H:%M:%S")
echo '['$LOGTIME'] 网络连接中断['$reb']，reboot.' >> /opt/log.txt 2>&1
sleep 5
reboot
fi
#wget --spider --quiet --timeout=6 www.baidu.com
#if [ "$?" == "0" ]; then
baidu='http://passport.baidu.com/passApi/img/small_blank.gif'
/tmp/sh_download.sh /tmp/small_blank.gif $baidu
if [ ! -s /tmp/small_blank.gif ]; then
restart_dhcpd
sleep 30
/tmp/sh_download.sh /tmp/small_blank.gif $baidu
fi
if [ -s /tmp/small_blank.gif ]; then
reb=1
PIDS=$(ps | grep "/tmp/adbyby" | grep -v "grep" | wc -l)
if [ "$PIDS" = 0 ]; then 
logger -t "adbyby" "网络连接正常"
logger -t "adbyby" "找不到进程，重启adbyby"
/tmp/sh_adb8118.sh D
killall -15 adbyby
killall -9 adbyby
sleep 3
/tmp/adbyby >/dev/null 2>&1 &
sleep 20
reb=`expr $reb + 1`
continue
fi
if [ "$PIDS" -gt 2 ]; then 
logger -t "adbyby" "进程重复，重启adbyby"
/tmp/sh_adb8118.sh D
killall -15 adbyby
killall -9 adbyby
sleep 3
/tmp/adbyby >/dev/null 2>&1 &
sleep 20
continue
fi
port=$(iptables -t nat -L | grep 'ports 8118' | wc -l)
if [ "$port" = 0 ]; then
logger -t "adbyby" "找不到8118转发规则，重新添加"
/tmp/sh_adb8118.sh A
fi
port=$(iptables -t nat -L | grep 'ports 8118' | wc -l)
if [ "$port" -gt 1 ]; then
logger -t "adbyby" "有多个8118转发规则，删除多余"
while [[ "$port" != 1 ]] 
do
/tmp/sh_adb8118.sh D
port=$(iptables -t nat -L | grep 'ports 8118' | wc -l)
done
fi
sleep 66
else
logger -t "adbyby" "网络连接中断$reb，关闭adbyby"
port=$(iptables -t nat -L | grep 'ports 8118' | wc -l)
while [[ "$port" != 0 ]] 
do
/tmp/sh_adb8118.sh D
port=$(iptables -t nat -L | grep 'ports 8118' | wc -l)
done
PIDS=$(ps | grep "adbyby" | grep -v "grep" | wc -l)
if [ "$PIDS" != 0 ]; then 
killall -15 adbyby
killall -9 adbyby
fi
reb=`expr $reb + 1`
fi
fi
fi
/etc/storage/ez_buttons_script.sh 3 &
sleep 65
continue
done
EOF
chmod 777 "/tmp/sh_mon.sh"
cat > "/tmp/sh_CPUAverage.sh" <<-\EOF
#!/bin/sh
logger -t "adbyby" "路由器负载监控启动"
while [ "1" ];
do
if [ ! -f /tmp/cron_adb.lock ]; then
CPULoad=`uptime |sed -e 's/\ *//g' -e 's/.*://g' -e 's/,.*//g' -e 's/\..*//g'`
if [ $((CPULoad)) -ge "2" ];then
logger -t "adbyby" "CPU负载拥堵,关闭adbyby"
/tmp/sh_adb8118.sh D
killall -15 adbyby
killall -9 adbyby
touch /tmp/cron_adb.lock
while [[ "$CPULoad" -ge "2" ]] 
do
sleep 64
CPULoad=`uptime |sed -e 's/\ *//g' -e 's/.*://g' -e 's/,.*//g' -e 's/\..*//g'`
done
logger -t "adbyby" "CPU负载正常"
rm -f /tmp/cron_adb.lock
fi
fi
sleep 63
done
EOF
chmod 777 "/tmp/sh_CPUAverage.sh"
cat > "/tmp/sh_installs.sh" <<-\EOF
#!/bin/sh
ssfile=$1
[ ! -f "/tmp/AiDisk_00/shadowsocks/shadowsocks" ] && cp -fR /opt/shadowsocks /tmp/AiDisk_00 && chmod 777 /tmp/AiDisk_00/shadowsocks -R
if [ ! -f "/tmp/AiDisk_00/shadowsocks/shadowsocks" ] || [ ! -f "/opt/optv.txt" ] ;then
logger -t "SS" "自动安装（覆盖opt文件夹）"
#rm -f /opt/* -R
logger -t "SS" "opt第一次下载"
wget -O /opt/opt.tgz $ssfile --continue
tar -xzvf /opt/opt.tgz -C /opt
if [ ! -f "/opt/shadowsocks/shadowsocks" ] ;then
logger -t "SS" "/opt/opt.tgz下载SS失败"
rm -f /opt/opt.tgz
logger -t "SS" "opt第二次下载"
wget -O /opt/opt.tgz $ssfile --continue
tar -xzvf /opt/opt.tgz -C /opt
fi
if [ -s "/opt/shadowsocks/shadowsocks" ] ;then
logger -t "SS" "opt解压完成"
chmod 777 /opt -R
cp -fR /opt/shadowsocks /tmp/AiDisk_00
chmod 777 /tmp/AiDisk_00/shadowsocks -R
fi
fi

EOF
chmod 777 "/tmp/sh_installs.sh"
cat > "/tmp/sh_xun_lei.sh" <<-\EOF
#!/bin/sh
export PATH=/opt/sbin:/opt/bin:/opt/usr/sbin:/opt/usr/bin:/usr/sbin:/usr/bin:/sbin:/bin
export LD_LIBRARY_PATH=/opt/lib:/lib
xunleis=$1
xunleiPath=$2
xunleifile=$3
if [ "$xunleis" != "0" ] ; then
if [ ! -x $xunleiPath ]; then 
mkdir -p $xunleiPath
fi
if [ ! -s $xunleiPath"/portal" ] ;then
logger -t "迅雷下载" "Xware1.0.31_mipsel_32_uclibc"
Xware1="http://code.taobao.org/svn/padavanrt-n56uopt/Xware1.0.31_mipsel_32_uclibc.tgz"
/tmp/sh_download.sh "$xunleiPath/Xware1.tgz" $Xware1
/tmp/sh_untar.sh $xunleiPath"/Xware1.tgz" $xunleiPath "$xunleiPath/portal"
fi
if [ ! -s "$xunleiPath/portal" ] ;then
logger -t "迅雷下载" "xunlei缺少portal文件"
else
chmod 777 "$xunleiPath/portal"
"$xunleiPath/portal"&
sleep 44
/tmp/sh_download.sh "/tmp/xunlei.info" "http://`nvram get lan_ipaddr`:9000/getsysinfo" "http://`nvram get lan_ipaddr`:9001/getsysinfo"
logger -t "迅雷下载" "启动xunlei,绑定设备页面【http://yuancheng.xunlei.com】"
logger -t "迅雷下载" "在浏览器中输入【http://`nvram get lan_ipaddr`:9000/getsysinfo】"
logger -t "迅雷下载" "显示错误则输入【http://`nvram get lan_ipaddr`:9001/getsysinfo】"
logger -t "迅雷下载" "会看到类似如下信息："
logger -t "迅雷下载" "`cat /tmp/xunlei.info`"
logger -t "迅雷下载" "其中有用的几项为："
logger -t "迅雷下载" "①：0表示返回结果成功"
logger -t "迅雷下载" "②：1表示检测网络正常，0表示检测网络异常"
logger -t "迅雷下载" "④：1表示已绑定成功，0表示未绑定"
logger -t "迅雷下载" "⑤：未绑定的情况下，为绑定的需要的激活码"
logger -t "迅雷下载" "⑥：1表示磁盘挂载检测成功，0表示磁盘挂载检测失败"
/tmp/sh_Thunder.sh &
fi
fi

EOF
chmod 777 "/tmp/sh_xun_lei.sh"
cat >/tmp/qos_scheduler.sh <<-\EOF
#!/bin/sh
qosc=$1
echo 0 >/tmp/qos_scheduler.lock
logger -t "QOS" "终端在线检查启动"
while [ "1" ];
do
if [ "$(cat /tmp/qoss_state)" == "0" ] ; then
logger -t "QOS" "终端在线检查暂停"
rm -f /tmp/qos_scheduler.lock
exit
fi
qos_t=`cat /proc/net/arp|fgrep -c 0x2`
if [ $((qos_t)) -le $qosc ]; then
if [ $(ifconfig |grep -c imq0) -gt 0 ]; then
logger -t "QOS" "取消限速,当在线$qos_t台,小于或等于$qosc台"
ip link set imq0 down
ip link set imq1 down
fi
else
if [ $(ifconfig |grep -c imq0) -eq 0 ] ; then
logger -t "QOS" "开始限速,当在线$qos_t台,大于$qosc台"
ip link set imq0 up
ip link set imq1 up
sleep 6
port=$(iptables -t mangle -L | grep 'IMQ: todev 0' | wc -l)
if [ "$port" = 0 ]; then
logger -t "QOS" "找不到QOS规则，重新添加"
/etc/storage/post_iptables_script.sh&
fi

fi
fi
sleep 69
continue
done
EOF
chmod 777 "/tmp/qos_scheduler.sh"
logger -t "自定义脚本2" "脚本完成"
rm -f /tmp/script2.lock

