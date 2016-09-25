import os

path=os.getcwd()
for item in os.listdir(path):
    path1=os.path.join(path,item)
    if os.path.isdir(path1):
        os.rename(path1,path1.replace(' ','_'))
for root,paths,files in os.walk(path):
    for item in paths:
        path1=os.path.join(root,item)
        if os.path.isdir(path1) and '_metadata' in path1:
            os.rename(path1,path1.replace('_metadata','metadata'))