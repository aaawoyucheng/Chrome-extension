reg add "HKEY_CLASSES_ROOT\you-get" /ve /t REG_SZ /d "youget" /f
reg add "HKEY_CLASSES_ROOT\you-get" /v "URL Protocol" /t REG_SZ /d "\"%~dp0youget.bat\"" /f
reg add "HKEY_CLASSES_ROOT\you-get\shell\open\command" /ve /t REG_SZ /d "\"%~dp0youget.bat\" ""%%1""" /f
