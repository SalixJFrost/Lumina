@echo off
echo.
echo ========================================
echo   Lumina Reader - 本地启动
echo ========================================
echo.
echo 正在启动本地服务器...
echo.
echo 访问地址: http://localhost:8000
echo.
echo 按 Ctrl+C 停止服务器
echo.
echo ========================================
echo.

python -m http.server 8000
