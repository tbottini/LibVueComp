#!/bin/sh

libFolderName="lib.tmp"
libPath="./"$libFolderName"/LibVueComp/quater-lib"

echo "clone quake-lib"
mkdir $libFolderName
git clone --single-branch --branch develop https://github.com/tbottini/LibVueComp.git ./$libFolderName/LibVueComp

echo "check if yarn is install..."
command -v yarn || npm install -g yarn

echo "build quake-lib dist..."
cd $libPath
yarn lib

echo "add lib to dependency"
cd ../../../
yarn add $libPath
