import sys
import os
import gzip
import re
import json
import urllib.request as request
from bs4 import BeautifulSoup as bs



def getHtml(url):
    cookie = r"DedeUserID=55006; DedeUserID__ckMd5=1f8e6670f4580ed5; SESSDATA=913a91eb%2C1456235502%2Ce3e7c6d1; "
    opener = request.build_opener()
    opener.addheaders.append(("Cookie", "%s" % cookie))
    opener.addheaders.append(('Accept-encoding', 'gzip'))
    return gzip.decompress(opener.open(url).read()).decode('utf-8')
if __name__ == '__main__':
    # url = "http://www.bilibili.com/video/av3031338"
    url = "http://www.bilibili.com/video/av3799447/index_8.html"
    if len(sys.argv) > 1:
        url = sys.argv[1].replace("bilibili://", "")
    html = getHtml(url)
    aid, pid = re.findall("av(\d+)/?(?:index_(\d+))?", url)[0]
    # 获取cid
    cid = re.findall('cid=(\d*)', html)[0]
    soup = bs(html, "lxml")
    # 获取标题
    title = soup.find('h1').string
    if "(" + pid + ")" in title:
        title = title.replace("(" + pid + ")", "")
    os.system("@title %s" % title)
    videolist = soup.find_all('option')
    if len(videolist) > 0:
        basepath = r"D:\VDownload"
        baseurl = "http://www.bilibili.com"
        vidowntext = ""
        info = {}
        for item in videolist:
            pid = re.findall("index_(\d+)", item['value'])[0]
            if pid != "1":
                downname = title + "(" + pid + ")" + ".flv"
            else:
                downname = title + ".flv"
            info[downname] = item.string.replace(
                "?", " ").replace("/", " ").replace("\\", " ")
            video_url = baseurl + item["value"]
            vidowntext += video_url + "\n"
        vpath = os.path.join(basepath, title)
        open(vpath + ".txt", 'w').write(vidowntext)
        if not os.path.exists(vpath):
            os.makedirs(vpath)
        info_json = os.path.join(vpath, title + ".json")
        open(info_json, "w").write(json.dumps(info))
        print(info)
        print(vidowntext)
