import os
import shutil
import re
path = r'f:/you_get'
already = []
fordel = ''
for i in os.listdir(path):
    basename, ext = os.path.splitext(i)
    # print(basename)
    if ext in ['.flv', '.mp4']:
        if fordel == '':
            fordel = re.findall(r'\(\d+\)', basename)[0]
            fordel = basename[:basename.find(fordel)]
            # print(fordel)
        a = basename.replace(fordel, '')
        already.append(a[1:a.find(')')])
# print(already)
with open('info.txt', 'r') as f:
    with open('info2.txt', 'w') as w:
        for url in f.readlines():
            info = re.findall(r'index_(\d+).html', url)[0]
            if info not in already:
                w.write(url)
shutil.move('info2.txt', 'info.txt')
