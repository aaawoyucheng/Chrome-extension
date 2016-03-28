@echo off
set a=%1
set a=%a:you-get://=%
echo %a%
c:/python34/python "%~dp0you-get.py" -o D:/ %a% 
pause