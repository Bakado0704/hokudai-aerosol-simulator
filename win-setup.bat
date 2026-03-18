@echo off
call win-reset.bat

REM 文字化けする場合は有効化（Windows Terminal推奨）
chcp 65001 >nul 2>&1

echo.
echo どのウイルスで実行しますか？
echo 1^) 新型コロナウイルス
echo 2^) ヒトコロナウイルス
echo 3^) インフルエンザウイルス
echo 4^) アオカビ
echo 5^) カンピロバクター
echo 6^) 大腸菌O157
set /p ENV_CHOICE=番号を入力（デフォルトは1）: 
if "%ENV_CHOICE%"=="" set "ENV_CHOICE=1"

set "VIRUS=新型コロナウイルス"
set "VIRUS_UV_DOSE=3"
if "%ENV_CHOICE%"=="2" (
  set "VIRUS=ヒトコロナウイルス"
  set "VIRUS_UV_DOSE=1.3"
) else if "%ENV_CHOICE%"=="3" (
  set "VIRUS=インフルエンザウイルス"
  set "VIRUS_UV_DOSE=6"
) else if "%ENV_CHOICE%"=="4" (
  set "VIRUS=アオカビ"
  set "VIRUS_UV_DOSE=50"
) else if "%ENV_CHOICE%"=="5" (
  set "VIRUS=カンピロバクター"
  set "VIRUS_UV_DOSE=4"
) else if "%ENV_CHOICE%"=="6" (
  set "VIRUS=大腸菌O157"
  set "VIRUS_UV_DOSE=9"
)

echo.
set /p CSV_INTERVAL=CSVは何秒間隔で出力されていますか？（デフォルトは1）: 
if "%CSV_INTERVAL%"=="" set "CSV_INTERVAL=1"

echo.
set /p IS_DEAD_THRESHOLD=排気口に出た粒子を死んだと判定しますか？ Yesは1、Noは0（デフォルトは0）: 
if "%IS_DEAD_THRESHOLD%"=="" set "IS_DEAD_THRESHOLD=0"

echo.
echo ✅ 環境変数が設定されました
echo VIRUS=%VIRUS%
echo VIRUS_UV_DOSE=%VIRUS_UV_DOSE%
echo CSV_INTERVAL=%CSV_INTERVAL%
echo IS_DEAD_THRESHOLD=%IS_DEAD_THRESHOLD%
echo.