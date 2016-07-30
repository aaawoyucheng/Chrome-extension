@echo off
c:/python34/python "%~dp0you-get.py" --no-caption -o F:/you_get %1
choice /D y /T 3 >nul
