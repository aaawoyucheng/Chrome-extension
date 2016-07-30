import os
from threadpool import ThreadPool, makeRequests


def youget_down(src):
    os.system('youget2 %s' % src)

pool = ThreadPool(10)
data = []
with open('info.txt', 'r') as f:
    for i in f.readlines():
        data.append(i)
requests = makeRequests(youget_down, data)
[pool.putRequest(req) for req in requests]
pool.wait()
