@echo off
echo Getting the tree for src folder...
cd src
tree /F | findstr /v /i "node_modules"> ../tree.txt
cd ..