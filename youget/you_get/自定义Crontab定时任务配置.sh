#!/bin/sh
#copyright by hiboy
[ -f /tmp/crontabs.lock ] && exit 0
touch /tmp/crontabs.lock
http_username=`nvram get http_username`
upanPath=`ls -l /media/ | awk '/^d/ {print $NF}' | sed -n '1p'`
cat > "/etc/storage/cron/crontabs/$http_username" <<-EOF
# 基本格式 : 
# *　　*　　*　　*　　*　　command 
# 分　时　日　月　周　命令 
# 在以上各个字段中，还可以使用以下特殊字符：
# 星号（*）：代表所有可能的值，例如month字段如果是星号，则表示在满足其它字段的制约条件后每月都执行该命令操作。
# 逗号（,）：可以用逗号隔开的值指定一个列表范围，例如，“1,2,5,7,8,9”
# 中杠（-）：可以用整数之间的中杠表示一个整数范围，例如“2-6”表示“2,3,4,5,6”
# 正斜线（/）：可以用正斜线指定时间的间隔频率，例如“0-23/2”表示每两小时执行一次。同时正斜线可以和星号一起使用，例如*/10，如果用在minute字段，表示每十分钟执行一次。
# 
# 定时运行脚本规则 (删除前面的#即可启动命令)
# 每5小时重启adbyby
0 */5 * * * /tmp/sh_func_load_adbyby.sh &

# 每天的一点25分更新中国路由表 
25 1 * * * /tmp/AiDisk_00/shadowsocks/shadowsocks update_chnroutes &

# 每天的一点20分更新gfw表 
20 1 * * * /tmp/AiDisk_00/shadowsocks/shadowsocks update_gfwlist &

# 每天的三点半重启
#30 3 * * * reboot &
# 每星期一的三点半重启
#30 3 * * 1 reboot &

# 凌晨2点定时关网：
#0 2 * * * stop_wan

# 早上8点定时开网（重启wan口）：
#0 8 * * * restart_wan

# 每天的一点【切换WAN模式】和【重启wan口】
#0 1 * * * /tmp/sh_wan_wips.sh wan &
# 每天的十点切换wifi中继模式
#0 10 * * * /tmp/sh_wan_wips.sh wips &

# 每6小时重启迅雷快鸟
15 */6 * * * /tmp/sh_reFastDick.sh &

# 每3小时重启迅雷下载
5 */3 * * * killall EmbedThunderManager &

# 每1小时重启花生壳内网版
10 */1 * * * killall oraynewph && killall oraysl &




EOF
chmod 777 "/etc/storage/cron/crontabs/$http_username"
cat > "/tmp/sh_wan_wips.sh" <<-\EOF
#!/bin/sh
logger -t "WAN、WIFI中继开关" "切换模式：$1"
restartwan()
{
logger -t "WAN、WIFI中继开关" "重新链接wan口"
restart_wan
sleep 10
logger -t "WAN、WIFI中继开关" "重新启动2.4GWIFI"
radio2_restart
}
case "$1" in
wan)
#无线AP工作模式："0"=【AP（桥接被禁用）】"1"=【WDS桥接（AP被禁用）】"2"=【WDS中继（网桥 + AP）】"3"=【AP-Client（AP被禁用）】"4"=【AP-Client + AP】
nvram set rt_mode_x=0
nvram commit
restartwan

  ;;
wips)
#无线AP工作模式："0"=【AP（桥接被禁用）】"1"=【WDS桥接（AP被禁用）】"2"=【WDS中继（网桥 + AP）】"3"=【AP-Client（AP被禁用）】"4"=【AP-Client + AP】
nvram set rt_mode_x=4
nvram commit
restartwan

  ;;
esac

EOF
chmod 777 "/tmp/sh_wan_wips.sh"

cat > "/tmp/sh_reFastDick.sh" <<-\EOF
#!/bin/sh
if [ -f "/tmp/FastDicks.lock" ]; then
logger -t "迅雷快鸟" "重新启动中……"
killall FastDick_script.sh
killall swjsq.py
killall python /opt/FastDick/swjsq.py
killall /opt/FastDick/swjsq.py
logger -t "迅雷快鸟" "已经关闭，十五分钟后启动"
sleep 900
logger -t "迅雷快鸟" "启动/etc/storage/FastDick_script.sh"
/etc/storage/FastDick_script.sh &
fi
EOF
chmod 777 "/tmp/sh_reFastDick.sh"
killall crond
crond

rm -f /tmp/crontabs.lock

