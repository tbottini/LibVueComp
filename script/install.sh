#!/bin/sh

libFolderName="lib.tmp"
libPath="./"$libFolderName"/LibVueComp/quater-lib"

mkdir $libFolderName
git clone --single-branch --branch develop https://github.com/tbottini/LibVueComp.git ./$libFolderName/LibVueComp

cd $libPath
yarn lib

cd ../../../
yarn add $libPath

