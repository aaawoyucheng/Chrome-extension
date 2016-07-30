#!/bin/sh
#copyright by hiboy
[ -f /tmp/script1.lock ] && exit 0
touch /tmp/script1.lock
. /etc/storage/script0_script.sh

http_username=`nvram get http_username`
export PATH=/opt/sbin:/opt/bin:/opt/usr/sbin:/opt/usr/bin:/usr/sbin:/usr/bin:/sbin:/bin
export LD_LIBRARY_PATH=/opt/lib:/lib
/tmp/sh_dnsmasqs.sh 0
sed -Ei '/taobao.org/d' /etc/storage/dnsmasq/dnsmasq.servers
echo 'server=/taobao.org/223.5.5.5' >> /etc/storage/dnsmasq/dnsmasq.servers
restart_dhcpd
/etc/storage/inet_state_script.sh 20
baidu='http://passport.baidu.com/passApi/img/small_blank.gif'
/tmp/sh_download.sh /tmp/small_blank.gif $baidu
rb=1
while [ ! -s /tmp/small_blank.gif ];
do
logger -t "自定义脚本1" "等待联网后开始脚本"
sleep 20
/tmp/sh_download.sh /tmp/small_blank.gif $baidu
rb=`expr $rb + 1`
if [ "$rb" -gt 3 ] ; then
logger -t "自定义脚本1" "等待联网超时"
exit
fi
done
rm -f /tmp/small_blank.gif

cat > "/tmp/sh_downloads_adblock.sh" <<-EOF
#!/bin/sh
adblocks=$adblocks
lazy="http://update.adbyby.com/rule3/lazy.txt"
video="http://update.adbyby.com/rule3/video.txt"
rm -f /tmp/data/lazy.txt
rm -f /tmp/data/video.txt
rm -f /tmp/data/lazy.bin
rm -f /tmp/data/video.bin
rm -f /tmp/data/user.bin
rm -f /tmp/data/user.txt
sed -e '/.*update.adbyby.com/d' -i /etc/storage/dnsmasq/hosts
restart_dhcpd
sleep 5
/tmp/sh_download.sh /tmp/data/lazy.txt \$lazy
/tmp/sh_download.sh /tmp/data/video.txt \$video
echo '127.0.0.1 update.adbyby.com' >> /etc/storage/dnsmasq/hosts
restart_dhcpd
if [ "\$adblocks" != "0" ] ; then
mkdir -p /tmp/data
logger -t "adbyby" "下载adblock规则"
while read line
do
c_line=\`echo \$line |grep -v "#"\`
if [ ! -z "\$c_line" ] ; then
rm -f /tmp/data/user2.txt
logger -t "adbyby" "下载规则:\$line"
/tmp/sh_download.sh /tmp/data/user2.txt \$line
grep -v '^!' /tmp/data/user2.txt | grep -E '^(@@\\||\\||[[:alnum:]])' | sort -u  >> /tmp/data/user.txt
rm -f /tmp/data/user2.txt
fi
done < /tmp/rule_DOMAIN.txt
fi
grep -v '^!' /etc/storage/adbyby_rules_script.sh >> /tmp/data/user.txt
EOF
chmod 777 "/tmp/sh_downloads_adblock.sh"

cat > "/tmp/sh_white_list.sh" <<-EOF
#!/bin/sh
whitelist=$whitelist
if [ "\$whitelist" != "0" ] ; then
logger -t "adbyby" "添加过滤白名单地址"
while read line
do
c_line=\`echo \$line |grep -v "#"\`
if [ ! -z "\$c_line" ] ; then
logger -t "adbyby" "加白地址：\$line"
sed -Ei "/\$line/d" /tmp/data/lazy.txt /tmp/data/video.txt /tmp/data/user.txt
fi
done < /tmp/white_list_DOMAIN.txt
fi

EOF
chmod 777 "/tmp/sh_white_list.sh"

cat > "/tmp/sh_func_load_adbyby.sh" <<-EOF
#!/bin/sh
adbybys=$adbybys
adbybyfile=$adbybyfile
adbybyfile2=$adbybyfile2
adblocks=$adblocks
if [ "\$adbybys" != "0" ] && [ ! -f /tmp/cron_adb.lock ]; then
/tmp/sh_adb8118.sh D
killall -15 adbyby
killall -9 adbyby
if [ ! -s "/tmp/adbyby" ] ;then
rm -f /tmp/adbyby
logger -t "adbyby" "开始下载7620n.tar.gz"
/tmp/sh_download.sh /tmp/7620n.tar.gz \$adbybyfile \$adbybyfile2
/tmp/sh_untar.sh /tmp/7620n.tar.gz /tmp /tmp/adbyby
fi
if [ -s "/tmp/adbyby" ] ;then
touch /tmp/cron_adb.lock
chmod 777 /tmp/adbyby
/tmp/sh_downloads_adblock.sh
/tmp/sh_white_list.sh
/tmp/adbyby > /tmp/adbyby.log&
sleep 3
/tmp/adbyby > /tmp/adbyby.log&
#/tmp/adbyby --no-daemon &
sleep 3
killall -15 adbyby
killall -9 adbyby
sleep 3
/tmp/adbyby >/dev/null 2>&1 &
if [ "\$adblocks" != "0" ] ; then
logger -t "adbyby" "加载adblock规则，等候60秒"
sleep 60
else
sleep 20
fi
fi
if [ -s "/tmp/adbyby.log" ] ;then
logger -t "adbyby" "启动完成"
rm -f /tmp/adbyby.log
rm -f /tmp/7620n.tar.gz
rm -f /tmp/cron_adb.lock
logger -t "adbyby" "lazy更新：\`sed -n '1p' /tmp/data/lazy.txt\`"
logger -t "adbyby" "video更新：\`sed -n '1p' /tmp/data/video.txt\`"
fi
fi
EOF
chmod 777 "/tmp/sh_func_load_adbyby.sh"
sleep 5
rm -f /tmp/cron_adb.lock
/tmp/sh_func_load_adbyby.sh
if [ ! -s "/tmp/adbyby" ] ;then
rm -f /tmp/7620n.tar.gz
logger -t "adbyby" "功能关闭"
else
/tmp/sh_mon.sh&
if [ "$CPUAverages" != "0" ] ; then
/tmp/sh_CPUAverage.sh&
fi
fi
upanPath=`ls -l /media/ | awk '/^d/ {print $NF}' | sed -n '1p'`
optw_enable=`nvram get optw_enable`
if [ "$syncys" != "0" ] || [ "$FastDicks" = "1" ] || [ "$ssproxys" != "0" ] || [ "$phddns" != "0" ] && [ "$installs" = "1" ] ; then
logger -t "opt" "optU盘安装，模式：$installs"
if [ "$optw_enable" = "2" ] ; then
SSPath="/media/$upanPath/opt"
if [ ! -x "$SSPath" ]; then 
mkdir -p /media/$upanPath/opt
mount -o bind /media/$upanPath/opt /opt
fi
ln -sf /media/$upanPath /tmp/AiDisk_00
upopt
/tmp/sh_installs.sh $ssfile
else
logger -t "opt" "U盘安装失败，需要开启Entware运行环境，请插入U盘，按要求设置"
syncys=0
xunleis=0
logger -t "opt" "U盘安装失败，自动转换内存安装"
[ "$installs" = "1" ] && installs=2
[ "$FastDicks" = "1" ] && FastDicks=2
fi
fi
if [ "$ssproxys" != "0" ] || [ "$phddns" != "0" ] && [ "$installs" = "2" ] ; then
logger -t "opt" "opt内存安装，模式：$installs，没有百度云、迅雷"
if [ "$optw_enable" = "0" ] ; then
mkdir -p /tmp/AiDisk_00/opt
mount -o bind /tmp/AiDisk_00/opt /opt
upopt
/tmp/sh_installs.sh $ssfile2
rm -f /opt/opt.tgz
rm -fR /opt/shadowsocks
syncys=0
xunleis=0
URLDNSP="http://code.taobao.org/svn/padavanrt-n56uopt/Pcap_DNSProxy-0.4.4.5-statically_mipsel/opt/bin/Pcap_DNSProxy"
[ "$DNSProxy" != "0" ] && /tmp/sh_download.sh "/opt/bin/Pcap_DNSProxy" $URLDNSP
else
logger -t "SS" "内存安装失败，需要关闭Entware运行环境，请按要求设置"
syncys=0
xunleis=0
phddns=0
ssproxys=0
installs=0
fi
fi

shadowsockssh="/tmp/AiDisk_00/shadowsocks/shadowsocks"
err="请更新opt文件夹、检查U盘文件和Entware设置"
if [ ! -s "/tmp/AiDisk_00/shadowsocks/shadowsocks" ] ;then
ssproxys=0
logger -t "SS" "opt缺少shadowsocks文件,$err"
fi
if [ "$ssproxys" != "0" ] ; then
logger -t "SS" "生成服务器配置文件"
cat > "/opt/etc/shadowsocks.json" <<-EOF
{
"server":"$server_ip",
"server_port":$server_port,
"local_address":"0.0.0.0",
"local_port":$local_port,
"password":"$server_password",
"timeout":60,
"method":"$server_method"
}

EOF
echo $udprelay > /tmp/udprelay.lock
echo $DNSProxy > /tmp/DNSProxy.lock
if [ "$ssproxys" = "1" ] ; then
if [ "$gfwlists" = "1" ] ; then
logger -t "SS" "$ssproxys【1；方案一】"
echo "1" > /tmp/SSProxy.lock
$shadowsockssh set_up
else
logger -t "SS" "$ssproxys【2；方案二】"
echo "2" > /tmp/SSProxy.lock
$shadowsockssh set_up
fi
fi
if [ "$ssproxys" = "2" ] ; then
logger -t "SS" "$ssproxys【全部走代理】"
echo "3" > /tmp/SSProxy.lock
$shadowsockssh set_up
fi
/tmp/sh_ssmon.sh $gfwlists&

fi
if [ "$ssproxys" = "0" ] ; then
logger -t "SS" "关闭，自动删除dnsmasqs配置"
echo "0" > /tmp/SSProxy.lock
/tmp/sh_dnsmasqs.sh 0 && restart_dhcpd && rm -f /var/log/shadowsocks.lock
$shadowsockssh stop && sleep 2
fi
if [ "$syncys" != "0" ] ; then
if [ ! -s "/opt/etc/syncy.py" ] ;then
logger -t "syncy" "opt缺少syncy.py文件,$err"
else
logger -t "syncy" "启动syncy服务"
sed -i 's/\r//g' /opt/etc/syncy
python /opt/etc/syncy.py &
sleep 25
/tmp/sh_syncyquota.sh&
fi
fi

if [ "$xunleis" != "0" ] ; then
echo "1" > /tmp/xunleis.lock
/tmp/sh_xun_lei.sh $xunleis /media/$upanPath/xunlei &
fi
if [ "$FastDicks" != "0" ] ; then
echo "1" > /tmp/FastDicks.lock
/tmp/sh_FastDick.sh $FastDicks $uid $pwd &
fi
if [ "$phddns" != "0" ] ; then
if [ ! -s "/opt/phddns2/oraynewph.sh" ] ;then
logger -t "花生壳内网版" "opt缺少oraynewph.sh文件,$err"
else
if [ "$installs" = "2" ] ; then
ln -sf "/etc/storage/PhMain.ini" "/etc/PhMain.ini"
ln -sf "/etc/storage/init.status" "/etc/init.status"
wphddns2="http://code.taobao.org/svn/padavanrt-n56uopt/phddns2/bin"
/tmp/sh_download.sh "/opt/phddns2/bin/oraynewph" "$wphddns2/oraynewph"
/tmp/sh_download.sh "/opt/phddns2/bin/oraysl" "$wphddns2/oraysl"
logger -t "花生壳内网版" "现在是免U盘运行，请绑定账号后【提交】内部存储保存配置"
else
ln -sf "/etc/storage/PhMain.ini" "/etc/PhMain.ini"
ln -sf "/etc/storage/init.status" "/etc/init.status"
fi
/opt/phddns2/oraynewph.sh start &
sleep 28
/opt/phddns2/oraynewph.sh status &
/tmp/sh_orayd.sh &
sleep 5
fi
fi
logger -t "自定义脚本1" "脚本完成"
/etc/storage/crontabs_script.sh &
upopt
rm -f /tmp/script1.lock

