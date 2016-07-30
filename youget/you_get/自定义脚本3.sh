#!/bin/sh
#copyright by hiboy
[ -f /tmp/script3.lock ] && exit 0
touch /tmp/script3.lock
ln -sf "/etc/storage/PhMain.ini" "/etc/PhMain.ini"
ln -sf "/etc/storage/init.status" "/etc/init.status"
rm -f "/opt/etc/init.d/S96sh3.sh"
cat > "/tmp/sh_dnsmasqs.sh" <<-\END
#!/bin/sh
gfwlists=$1
sed -Ei '/no-resolv|server=127.0.0.1|dns-forward-max=1000|min-cache-ttl=1800|shadowsocks\/dnsmasq/d' /etc/storage/dnsmasq/dnsmasq.conf
if [ "$gfwlists" = "1" ] ; then
logger -t "SS" "自动写入方案一dnsmasqs配置"
cat >> "/etc/storage/dnsmasq/dnsmasq.conf" <<-EOF
no-resolv
server=127.0.0.1#5353
dns-forward-max=1000
min-cache-ttl=1800
EOF
fi
if [ "$gfwlists" = "2" ] ; then
logger -t "SS" "自动写入方案二dnsmasqs配置"
cat >> "/etc/storage/dnsmasq/dnsmasq.conf" <<-EOF
conf-dir=/tmp/AiDisk_00/shadowsocks/dnsmasq.d
dns-forward-max=1000
min-cache-ttl=1800
EOF
fi
END
chmod 777 "/tmp/sh_dnsmasqs.sh"

cat > "/tmp/sh_ssmon.sh" <<-\EOF
#!/bin/sh
gfwlists=$1
logger -t "SS" "shadowsocks 进程守护启动"
rebss=1
rm -f /tmp/cron_ss.lock
while [ "1" ];
do
sleep 67
/etc/storage/ez_buttons_script.sh 3 &
if [ ! -f /tmp/cron_ss.lock ] && [ -f "/var/log/shadowsocks.lock" ]; then
if [ "$rebss" -gt 5 ] && [ ! -f /tmp/reb_0.lock ] ; then
LOGTIME=$(date "+%Y-%m-%d %H:%M:%S")
logger -t "SS" "['$LOGTIME'] 网络连接shadowsocks中断['$rebss']，reboot."
sleep 5
reboot
fi
pstmp='ps'
PROCESS=$($pstmp | grep "ss-redir" | grep -v "grep")
if [ -z "$PROCESS" ] && [ -f "/var/log/shadowsocks.lock" ]; then
/opt/etc/init.d/S22shadowsocks restart
logger -t "SS" "找不到shadowsocks进程$rebss，重启shadowsocks"
rebss=`expr $rebss + 1`
fi
PROCESS=$($pstmp | grep "chinadns" | grep -v "grep")
if [ -z "$PROCESS" ] && [ -f "/var/log/chinadns.lock" ]; then
/opt/etc/init.d/S24chinadns restart
logger -t "SS" "找不到chinadns进程$rebss，重启chinadns"
rebss=`expr $rebss + 1`
fi
PROCESS=$($pstmp | grep "pdnsd" | grep -v "grep")
if [ -z "$PROCESS" ] && [ -f "/var/log/pdnsd.lock" ]; then
chmod 755 /etc/pdnsd.conf
/opt/etc/init.d/S26pdnsd restart
logger -t "SS" "找不到pdnsd进程$rebss，重启pdnsd"
fi
PROCESS=$($pstmp | grep "ss-tunnel" | grep -v "grep")
if [ -z "$PROCESS" ] && [ -f "/var/log/ss-tunnel.lock" ]; then
/opt/etc/init.d/S23ss-tunnel restart
logger -t "SS" "找不到ss-tunnel进程$rebss，重启ss-tunnel"
fi
PROCESS=$($pstmp | grep "Pcap_DNSProxy" | grep -v "grep")
if [ -z "$PROCESS" ] && [ -f "/var/log/pcap_dnsproxy.lock" ]; then
/opt/etc/init.d/S26pdnsd stop
/opt/etc/init.d/S24chinadns stop
/opt/etc/init.d/S27pcap-dnsproxy restart
logger -t "SS" "找不到Pcap_DNSProxy进程$rebss，重启Pcap_DNSProxy"
fi
#wget --spider --quiet --timeout=10 www.google.co.jp
#if [ "$?" == "0" ]; then
google='http://www.google.com/images/icons/product/videos-32.png'
/tmp/sh_download.sh /tmp/videos-32.png $google
if [ ! -s /tmp/videos-32.png ]; then
restart_dhcpd
sleep 30
/tmp/sh_download.sh /tmp/videos-32.png $google
fi
if [ -s /tmp/videos-32.png ]; then
rm -f /tmp/videos-32.png
rebss=1
#logger -t "SS" "网络连接shadowsocks正常"
sleep 68
else
logger -t "SS" "网络连接shadowsocks中断$rebss，重启shadowsocks$gfwlists"
rebss=`expr $rebss + 1`
/tmp/AiDisk_00/shadowsocks/shadowsocks set_up
fi
fi

continue
done
EOF
chmod 777 "/tmp/sh_ssmon.sh"
cat > "/tmp/sh_syncyquota.sh" <<-\EOF
#!/bin/sh
logger -t "syncy" "等待SyncY同步软件启动,SyncY同步软件技术博客：http://www.syncy.cn/"
while [ ! -s "/tmp/syncy.quota" ] 
do
sleep 11
if [ -s "/tmp/syncy.user_code" ] ;then
user_code_log=`cat /tmp/syncy.user_code`
logger -t "syncy" "$user_code_log"
logger -t "syncy" "打开百度授权页面https://openapi.baidu.com/device"
logger -t "syncy" "输入用户码【$user_code_log】（请在100秒内输入用户码）"
while [ ! -s "/tmp/syncy.user_token" ] 
do
sleep 12
if [ -s "/tmp/syncy.user_token" ] ;then
user_code_log=`cat /tmp/syncy.user_token`
logger -t "syncy" "$user_code_log"
logger -t "syncy" "显示【Get device token success.】表示授权完成。"
/tmp/sh_syncyd.sh &
fi
done
fi
done
user_code_log=`cat /tmp/syncy.quota`
logger -t "syncy" "$user_code_log"
logger -t "syncy" "SyncY同步启动成功"
logger -t "syncy" "SyncY同步软件技术博客：http://www.syncy.cn/"
EOF
chmod 777 "/tmp/sh_syncyquota.sh"
cat > "/tmp/sh_syncyd.sh" <<-\EOF
#!/bin/sh
logger -t "syncy" "SyncY守护进程启动"
pid_file="/var/run/syncy.pid"
start_cmd="/opt/etc/syncy.py &"

while true; do
running=$(ps | grep "/opt/etc/syncy.py" | grep -v "grep" | wc -l)
if [ $running -le 0 ]; then
eval $start_cmd
echo "start syncy"
logger -t "syncy" "SyncY重新启动"
else
echo "syncy is running"
fi
sleep 65
done

EOF
chmod 777 "/tmp/sh_syncyd.sh"
cat > "/tmp/sh_orayd.sh" <<-\EOF
#!/bin/sh
logger -t "花生壳内网版" "守护进程启动"
online=""
onlinetest()
{
orayslstatus=`head -n 3 /tmp/oraysl.status  | tail -n 1 | cut -d= -f2-`
online=$(echo $orayslstatus | grep "ONLINE" | wc -l)
}
onlinetest
while [ $online -le 0 ]; do
sleep 68
onlinetest
logger -t "花生壳内网版" "$online"
done
logger -t "花生壳内网版" "ONLINE"
while true; do
sleep 68
onlinetest
running=$(ps | grep "/opt/usr/oray-app/bin/oraynewph" | grep -v "grep" | wc -l)
running2=$(ps | grep "/opt/usr/oray-app/bin/oraysl" | grep -v "grep" | wc -l)
if [ $running -le 0 ] || [ $running2 -le 0 ] || [ $online -le 0 ]; then
/opt/phddns2/oraynewph.sh reset &
logger -t "花生壳内网版" "重新启动"
else
echo "oray is running"
fi
done

EOF
chmod 777 "/tmp/sh_orayd.sh"
cat > "/tmp/sh_Thunder.sh" <<-\EOF
#!/bin/sh
upanPath=`ls -l /media/ | awk '/^d/ {print $NF}' | sed -n '1p'`
logger -t "迅雷下载" "守护进程启动$upanPath"
while true; do
running=$(ps | grep "/xunlei/lib/" | grep -v "grep" | wc -l)
if [ $running -le 2 ] ; then
/media/$upanPath/xunlei/portal &
logger -t "迅雷下载" "重新启动"
else
echo "xunlei is running"
fi
sleep 71
done

EOF
chmod 777 "/tmp/sh_Thunder.sh"
cat > "/tmp/sh_FastDick.sh" <<-\EOF
#!/bin/sh
#copyright by hiboy
export PATH=/opt/sbin:/opt/bin:/opt/usr/sbin:/opt/usr/bin:/usr/sbin:/usr/bin:/sbin:/bin
export LD_LIBRARY_PATH=/opt/lib:/lib
FastDicks=$1
uid=$2
pwd=$3
if [ "$FastDicks" != "0" ] ; then
logger -t "迅雷快鸟" "迅雷快鸟(diǎo)路由器版：https://github.com/fffonion/Xunlei-FastDick"
if [ "$FastDicks" = "2" ] ; then
logger -t "迅雷快鸟" "稍等几分钟，ssh到路由，控制台输入【ps】命令查看[/opt/FastDick/swjsq_wget.sh]进程是否存在，是否正常启动，提速是否成功。"
logger -t "迅雷快鸟" "免U盘启动"
chmod 777 "/etc/storage/FastDick_script.sh"
/etc/storage/FastDick_script.sh &
else
rm -f "/opt/FastDick/" -R
mkdir -p "/opt/FastDick"
swjsqfile="https://raw.githubusercontent.com/fffonion/Xunlei-FastDick/master/swjsq.py"
/tmp/sh_download.sh "/opt/FastDick/swjsq.py" $swjsqfile
chmod 777 "/opt/FastDick/swjsq.py"
logger -t "迅雷快鸟" "程序下载完成，正在启动 python /opt/FastDick/swjsq.py"
echo "$uid,$pwd" >/opt/FastDick/swjsq.account.txt
chmod 777 /opt/FastDick -R
cd /opt/FastDick
python /opt/FastDick/swjsq.py 2>&1 > /opt/FastDick/swjsq.log &
chmod 777 "/opt/FastDick" -R
sleep 30
chmod 777 "/opt/FastDick" -R
if [ -f /opt/FastDick/swjsq_wget.sh ]; then
logger -t "迅雷快鸟" "自动备份swjsq文件到路由，【提交内部存储】后下次重启可以免U盘启动了"
cat > "/etc/storage/FastDick_script.sh" <<-\EEF
#!/bin/sh
# 迅雷快鸟【2免U盘启动】功能需到【自定义脚本0】配置【FastDicks=2】，并在此输入swjsq_wget.sh文件内容
#【2免U盘启动】需要填写在下方的【迅雷快鸟脚本】，生成脚本两种方法：
# ①插入U盘，配置自定义脚本【1插U盘启动】启动快鸟一次即可自动生成
# ②打开https://github.com/fffonion/Xunlei-FastDick，按照网页的说明在PC上运行脚本，登陆成功后会生成swjsq_wget.sh，把swjsq_wget.sh的内容粘贴此处即可
# 生成后需要到【系统管理】 - 【恢复/导出/上传设置】 - 【路由器内部存储 (/etc/storage)】【提交】保存脚本
EEF
cat /opt/FastDick/swjsq_wget.sh >> /etc/storage/FastDick_script.sh
chmod 777 "/etc/storage/FastDick_script.sh"
fi
logger -t "迅雷快鸟" "启动完成`cat /opt/FastDick/swjsq.log`"
fi
else
rm -f "/opt/FastDick/" -R
fi
EOF
chmod 777 "/tmp/sh_FastDick.sh"
logger -t "自定义脚本3" "脚本完成"
rm -f /tmp/script3.lock

