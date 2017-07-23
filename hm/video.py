from hm import *
import subprocess
BASE_PATH = os.path.dirname(__file__)
mkvtoolnix_path = os.path.join(BASE_PATH, 'mkvtoolnix')
ffmpeg_path = os.path.join(BASE_PATH, 'ffmpeg-latest-win64-static')
mkvextract = os.path.join(mkvtoolnix_path, 'mkvextract')
mkvinfo = os.path.join(mkvtoolnix_path, 'mkvinfo')
mkvmerge = os.path.join(mkvtoolnix_path, 'mkvmerge')
mkvpropedit = os.path.join(mkvtoolnix_path, 'mkvpropedit')
ffmpeg = os.path.join(ffmpeg_path, 'bin', 'ffmpeg')

MediaInfo_CLI_Path = os.path.join(BASE_PATH, 'MediaInfo_CLI_0.7.91_Windows_i386')
HandBrakeCLI = os.path.join(
    BASE_PATH, 'HandBrakeCLI-20161219204126-72e77ef-master-win-x86_64', 'HandBrakeCLI.exe ')

video_ext = ['flv', 'mp4', 'rm', 'avi', 'rmvb', 'mpg', 'mpeg', 'mts', 'vdat', 'ts', '3gp', 'webm']
video_ext_mkv = video_ext + ['mkv']


def handbrake(src=None, width=1280):
    video_ext.append('mkv')
    if src == None:
        src = os.getcwd()
    if isdir(src):
        for file in getFiles(src):
            handbrake(file)
    elif isfile(src):
        ext = getExt(src)
        # print(ext)
        tmp = src.replace(ext, 'tmp')
        converted = src.replace(ext, 'converted')
        dst = src.replace(ext, 'h.%d.mkv' % width)
        if '.h.' in src or exists(dst) or ext.lower() not in video_ext:
            return
        options = ['-i "%s"' % src, '-o "%s"' % tmp, '-f av_mkv',
                   # 视频相关
                   '-e x265',
                   '-X %d' % width,
                   # 音频相关
                   '--all-audio',
                   '-E copy:aac',
                   '-Q 10',
                   '-6 stereo',
                   # '--auto-anamorphic',
                   # 字幕相关
                   '--all-subtitles',
                   '',
                   '',
                   '',
                   ]
        title = src.split('\\')
        title.reverse()
        os.system('@title %s' % ' - '.join(title))
        cmd = HandBrakeCLI + ' '.join(options)
        if os.system(cmd) == 0:
            rename(tmp, dst)
            rename(src, converted)


def mkv2mp4(src=None):
    if src == None:
        src = os.getcwd()
    if isdir(src):
        for item in getFiles(src):
            if isfile(item):
                mkv2mp4(item)
    elif isfile(src):
        ext = getExt(src)
        dst = src.replace(ext, 'mp4')
        if ext.lower() == 'mkv':
            tmp = src.replace(ext, 'tmp')
            # tmp = src.replace(ext, 'mp4')
            cmd = ffmpeg + r' -i "%s" -vcodec copy -acodec copy -f mp4 "%s"' % (src, tmp)
            if os.system(cmd) == 0:
                rename(tmp, dst)
                if exists(dst):
                    remove(src)


def v2m(src=None):
    if src == None:
        src = os.getcwd()
    if isdir(src):
        for item in getFiles(src):
            if isfile(item):
                v2m(item)
    elif isfile(src):
        ext = getExt(src)
        dst = src.replace(ext, 'mkv')
        if ext.lower() in video_ext:
            tmp = src.replace(ext, 'tmp')
            cmd = mkvmerge + r' -o "%s" "%s"' % (tmp, src)
            if os.system(cmd) == 0:
                rename(tmp, dst)
                if exists(dst):
                    remove(src)


def submerge(src=None):
    if src == None:
        src = os.getcwd()
    if isdir(src):
        for item in getFiles(src):
            if isfile(item):
                submerge(item)
    elif isfile(src):
        ext = getExt(src)
        dst = src.replace(ext, 'sub.mkv')
        if ext.lower() in video_ext_mkv:
            subs = []
            tmp = src.replace(ext, 'tmp')
            cmd = mkvmerge + r' -o "%s" "%s"' % (tmp, src)
            for i in ['ssa', 'ass', 'smi', 'srt', 'sub', 'lrc', 'sst', 'txt', 'xss', 'psb', 'ssb']:
                sub = src.replace(ext, i)
                if exists(sub):
                    subs.append(sub)
            if len(subs) > 0:
                for sub in subs:
                    cmd += ' "%s"' % sub
                if os.system(cmd) == 0:
                    rename(tmp, dst)
                    if exists(dst):
                        remove(src)
                        for sub in subs:
                            remove(sub)
if __name__ == '__main__':
    pass
