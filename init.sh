

#ask name project

read name?"project name : "

echo "git clone project template"
git clone https://github.com/tbottini/libvuecomp/ressources --branch nuxt "$name"

cd "$name"
cd ressources/www/
sed -i -e 's/<name>/'$name'/g' package.json nuxt.config.json index.js init.js
sed -i -e 's/<admin-name>/'$name'/g' init.js

#choose option for database  sqlite