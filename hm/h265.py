from hm import *
for file in getFiles():
    if 'mp4' != getExt(file):
        continue
    dst = file.replace('mp4', 'mkv')
    cmd = "ffmpeg -y -i \"%s\" -vcodec hevc  -acodec copy \"%s\"" % (file, dst)
    os.system(cmd)
