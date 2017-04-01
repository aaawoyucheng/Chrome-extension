import os
import sys
from hm.threadpool import ThreadPool, WorkRequest, makeRequests
import random
import time
import re
from os.path import *
import shutil



def show(*args):
    try:
        print(*args)
    except:
        pass


def rename(src, dst):
    if exists(dst):
        if getsize(src) == getsize(dst):
            remove(src)
        else:
            i = 1
            basename, ext = os.path.splitext(dst)
            dst = basename + '_%d' % i + ext
            while exists(dst):
                dst = basename + '_%d' % (i + 1) + ext
                i += 1
            rename(src, dst)
    else:
        os.rename(src, dst)


def getBasename(src):
    return os.path.splitext(os.path.basename(src))[0]


def remove(src):
    try:
        os.remove(src)
    except:
        pass


def getHmPath():
    return os.path.dirname(__file__)


def getExt(file):
    return os.path.splitext(os.path.basename(file))[1][1:]


def getFiles(path=None,filter=None):
    result = []
    if path == None:
        path = os.getcwd()
    for item in os.listdir(path):
        file = join(path, item)
        if filter!=None:
            if getExt(file) not in filter:
                continue
        if isfile(file):
            result.append(file)
    return result


def sizerate(file1, file2):
    return os.path.getsize(file1) / os.path.getsize(file2)


def batch(callable, arg_list):
    pool = ThreadPool(8)
    requests = makeRequests(callable, arg_list)
    [pool.putRequest(request) for request in requests]
    start = time.clock()
    total = pool.showWaiting()
    while pool.showWaiting() > 0:
        use = time.clock() - start
        waiting = pool.showWaiting() - 1
        os.system('title %d / %d 用时 : %ds 预计还需 : %ds' %
                  (waiting, total, use, waiting / (total - waiting) * use))
    os.system('title 总用时 : %ds 总计 : %d ' % (use, total))
    pool.wait()


def convertAll(method):
    for root, paths, files in os.walk(os.getcwd()):
        method(root)
