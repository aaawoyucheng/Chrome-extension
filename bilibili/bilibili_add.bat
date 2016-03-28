reg add "HKEY_CLASSES_ROOT\bilibili" /ve /t REG_SZ /d "bilibili" /f
reg add "HKEY_CLASSES_ROOT\bilibili" /v "URL Protocol" /t REG_SZ /d "bilibili" /f
reg add "HKEY_CLASSES_ROOT\bilibili\shell\open\command" /ve  /t REG_SZ  /d "\"%~dp0bilibili.bat\" ""%%1""" /f
