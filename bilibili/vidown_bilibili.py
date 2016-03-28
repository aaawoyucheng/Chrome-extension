import os
import sys
import json
import gzip
from bs4 import BeautifulSoup as bs
import urllib.request as request
import time
import re
import hm
try:
    pause = 1
    # url = "http://www.bilibili.com/video/av379272/index_3.html#h1type=s"
    # url="http://www.bilibili.com/video/av3031338/#h1&type=s"
    if len(sys.argv) > 1:
        url = sys.argv[1].replace("bilibili://", "")
    print(url)
    vid, pid, downtype = re.findall(
        'av(\d+).(?:index_(\d*))?.*?(?:type=(\w))?$', url)[0]
    print(vid, len(pid), downtype)
    if len(pid) == 0:
        pid = 1
    opener = request.build_opener()
    cookie = "DedeUserID=55006; DedeUserID__ckMd5=1f8e6670f4580ed5; SESSDATA=913a91eb%2C1450534239%2C3725191c; "
    opener.addheaders.append(("Cookie", "%s" % cookie))
    html = opener.open(url).read()
    if b'\x1f\x8b' == html[:2]:
        html = gzip.decompress(html).decode(
            'utf-8', 'ignore').encode('gbk', 'ignore').decode('gbk', 'ignore')
    doms = bs(html, "html.parser")
    title = doms.find("h1").string.replace(
        "/", " ").replace(':', ' ').replace('?', ' ')
    videolist = doms.find_all('option')
    print(videolist)
    if downtype == "m":
        if len(videolist) > 0:
            if "(%s)" % pid in title:
                title = title.replace("(%s)" % pid, "")
            os.system("@title \"%s\"" % title)
            infos = {}
            files = ""
            j = 1
            for item in videolist:
                try:
                    truename = item.string.replace("/", "／").replace("\"", "")
                    if j != 1:
                        infos[title + "(" + str(j) + ")"] = truename
                    else:
                        infos[title] = truename
                    files += "http://www.bilibili.com/" + item['value'] + "\n"
                    j += 1
                except:
                    pass
            basepath = r"D:\VDownload"
            vpath = os.path.join(basepath, title)
            for item in sorted(infos):
                print(item, infos[item])
            print(files)
            open(vpath + ".txt", 'w').write(files)
            if not os.path.exists(vpath):
                os.makedirs(vpath)
            info = os.path.join(vpath, title + ".json")
            open(info, "w").write(json.dumps(infos))
    elif downtype == "s":
        def getlinks(cid):
            url = "http://interface.bilibili.com/playurl?otype=json&appkey=85eb6835b0a1034e&cid=" + \
                cid + "&quality=4&type=mp4"
            info = json.loads(request.urlopen(url).read().decode())
            durl = info.get('durl', [])
            links = []
            for item in durl:
                links.append(item.get('url'))
            if 'v_play_ipad.php' in str(links):
                links = []
                url = "http://interface.bilibili.com/playurl?otype=json&appkey=85eb6835b0a1034e&cid=" + \
                    cid + "&quality=4&type=flv"
                info = json.loads(request.urlopen(url).read().decode())
                durl = info.get('durl', [])
                if isinstance(durl, dict):
                    links.append(durl.get('url'))
                elif isinstance(durl, list):
                    for item in durl:
                        print(item)
                        links.append(item.get('url'))
            print(url)
            return links

        def down(url, num=None):
            print(url)
            local = title + ".tmp"
            if num != None:
                local = title + "_" + str(i) + ".tmp"
            local = os.path.join(downpath, local)
            starttime = time.time()

            def show(a, b, c):
                try:
                    os.system('@title \"' + local + "\"    %0.2fM  " %
                              (c / 1024 / 1024))
                except:
                    pass
                rate = round(a * b / c * 100, 2)
                speed = round(a * b / 1024 / (time.time() - starttime), 2)
                info =  str(rate) + \
                    " " + str(speed) + "Kbs  " + "\r"
                sys.stdout.write(info)
                sys.stdout.flush()
            request.urlretrieve(url, local, show)
            if not hm.isVideo(local):
                os.remove(local)
                sys.exit(1)
            ext = ''
            with open(local, 'rb')as f:
                info = f.read(32)
                # print(info)
                if b"FLV" in info:
                    ext = 'flv'
                elif b"mp4" in info:
                    ext = 'mp4'
            dst = local.replace("tmp", ext)
            if os.path.exists(dst):
                os.remove(dst)
            os.rename(local, dst)
            os.system("@title \"%s\" " % dst)
            return dst
        downpath = "D:\\videos\\"
        if videolist:
            title = (title + videolist[int(pid) - 1].string)
        title = title.replace(':', ' ')
        html = str(html)
        cid = re.findall('cid=(\d*)', html)[0]
        links = getlinks(cid)
        if not len(links) < 1:
            down(links[0])
        else:
            def merge(videos):
                print(videos)
                hm.merge2mkv(out, videos)
                for item in videos:
                    os.remove(item)
            print(len(links))
            out = os.path.join(downpath, title + ".mkv")
            videos = []
            for i in range(1, len(links) + 1):
                videos.append(down(links[i - 1], i))
                print(out)
            if os.path.exists(out):
                if not hm.isVideo(out):
                    os.remove(out)
                    merge(videos)
                    sys.exit()
            merge(videos)
        pause = 0
except Exception as e:
    pause = 0
    print(e)
    os.system("pause")
if pause == 1:
    os.system('pause')
