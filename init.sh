

#ask name project

echo -n "project name : "
read name



echo "git clone project template"
git clone https://github.com/tbottini/libvuecomp --branch nuxt-lib 
mv libvuecomp/ressources/* .
rm -rf libvuecomp

sed -i -e 's/<name>/'$name'/g' www/package.json www/nuxt.config.js www/api/index.js www/api/init.js
sed -i -e 's/<admin-mail>/'$name'@factice.com/g' www/api/init.js

cd www && yarn 

#choose option for database  sqlite