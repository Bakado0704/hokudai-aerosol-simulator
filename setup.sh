source reset.sh

echo ""
echo "どのウイルスで実行しますか？"
echo "1) 新型コロナウイルス"
echo "2) ヒトコロナウイルス"
echo "3) インフルエンザウイルス"
echo "4) アオカビ"
echo "5) カンピロバクター"
echo "6) 大腸菌O157"
echo -n "番号を入力（デフォルトは1）: "
read env_choice

if [ "$env_choice" = "2" ]; then
  VIRUS="ヒトコロナウイルス"
  VIRUS_UV_DOSE="1.3"
elif [ "$env_choice" = "3" ]; then
  VIRUS="インフルエンザウイルス"
  VIRUS_UV_DOSE="6"
elseif
  VIRUS="アオカビ"
  VIRUS_UV_DOSE="50"
elif [ "$env_choice" = "5" ]; then
  VIRUS="カンピロバクター"
  VIRUS_UV_DOSE="4"
elif [ "$env_choice" = "6" ]; then
  VIRUS="大腸菌O157"
  VIRUS_UV_DOSE="9"
else
  VIRUS="新型コロナウイルス"
  VIRUS_UV_DOSE="3"
fi

export VIRUS="$VIRUS"
export VIRUS_UV_DOSE="$VIRUS_UV_DOSE"

echo ""
echo "CSVは何秒間隔で出力されていますか？"
echo -n "秒を入力（デフォルトは1）: "
read csv_interval

export CSV_INTERVAL="$csv_interval"

echo ""
echo "✅ 環境変数が設定されました"
echo "VIRUS=$VIRUS"
echo "VIRUS_UV_DOSE=$VIRUS_UV_DOSE mW/cm²"
echo "CSV_INTERVAL=$CSV_INTERVAL"
echo ""
