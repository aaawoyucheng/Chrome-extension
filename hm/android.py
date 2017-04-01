from hm import *
hm_path=getHmPath()

aapt=os.path.join(hm_path,'aapt')

def trueName(src):
    result={}
    cmd=aapt+' dump badging '+ src
    try:
        for line in os.popen(cmd).readlines():
            if 'application-label' in line:
                show(line.encode('gbk').decode('gbk'))
                result[line.split(':')[0]]=re.sub('\'|\n','',line.split(':')[1])
        if result.get('application-label-zh-CN','')!='':
            result=result.get('application-label-zh-CN','')
        elif result.get('application-label-zh','')!='':
            result=result.get('application-label-zh','')
        elif result.get('application-label','')!='':
            result=result.get('application-label','')
    except:
        pass
    if result=={}:
        result=''
    return result

def pkgName(src):
    cmd=aapt+' dump badging '+ src
    info=os.popen(cmd).read()
    result=re.findall('package: name=\'(.+?)\' ',info)[0]
    return result

def all2TrueName(path=None):
    if path==None:
        path=os.getcwd()
    for file in getFiles():
        if getExt(file)=='apk':
            # if trueName(file)!='':
            #     dst=file.replace(getBasename(file),trueName(file))
            trueName(file)

