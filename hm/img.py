from hm import *
from PIL import Image
cwebp = os.path.join(os.path.dirname(__file__), 'cwebp')


def webp(src=None):
    if src == None:
        webp(os.getcwd())
    elif os.path.isdir(src):
        batch(webp, getFiles(src))
    elif isfile(src):
        try:
            with Image.open(src) as img:
                format = img.format
            base, ext = os.path.splitext(src)
            if ext in ['.webp', '.tmp']:
                return
            dst = base + '.webp'
            tmp = base + '.tmp'
            if format in ['WEBP', 'GIF']:
                dst = base + '.' + format.lower()
                if format.lower() != ext[1:]:
                    show(src, dst)
                    rename(src, dst)
                return
            options = '-quiet'
            cmd = cwebp + r' %s "%s" -o "%s"' % (options, src, tmp)
            show(src)
            if os.system(cmd) == 0:
                if sizerate(tmp, src) < 0.8:
                    rename(tmp, dst)
                    remove(src)
                else:
                    remove(tmp)
        except Exception:
            pass


def webpAll():
    for root, paths, files in os.walk(os.getcwd()):
        try:
            webp(root)
        except:
            pass


def getPHash(src):
    size = (8, 8)
    try:
        with Image.open(src) as img:
            img = img.convert('L').resize(size)
            a_list = []
            for i in range(size[1]):
                for j in range(size[1]):
                    a_list.append(img.getpixel((i, j)))
            avg = sum(a_list) / len(a_list)
            for i in range(len(a_list)):
                a_list[i] = '1' if a_list[i] > avg else '0'
            hash = ''.join(['%x' % (int(''.join(a_list[x:x + 4]), 2)) for x in range(0, len(a_list), 4)])
            return hash
    except:
        pass


def OtsuThreshold(img):
    show(img)
