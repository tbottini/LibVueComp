

#ask name project

echo -ne "project name : "
read name



echo "git clone project template"
git clone https://github.com/tbottini/libvuecomp --branch nuxt-lib 
mv libvuecomp/ressources/* .
rm -rf libvuecomp

cd www
sed -i -e 's/<name>/'$name'/g' package.json nuxt.config.json index.js init.js
sed -i -e 's/<admin-name>/'$name'/g' init.js

#choose option for database  sqlite