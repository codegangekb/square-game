# /bin/sh

git checkout gh-pages
git merge master
yarn build
mv dist/* .
git add index.html bundle.js
git commit -m 'Update gh-pages'
git push
git checkout master
echo 'Done'
