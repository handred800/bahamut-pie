#!/usr/bin/env sh
# 當發生錯誤時終止腳本運行
set -e
# 打包
npm run build
# 移動至到打包後的dist目錄 
cd dist
git init
git add -A
git commit -m '部屬'
git push -f https://github.com/handred800/bahamut-pie.git master:gh-pages
# 將dist資料夾中的內容推送至遠端gh-pages分支中，並強制將舊有的內容取代成目前的內容
cd -