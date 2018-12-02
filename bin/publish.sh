#!/usr/bin/env bash

set -e
set -o pipefail

# goto root directory
cd "$(dirname "$0")/.."

rm -rf ./out

# build page
yarn build

cp -r ./public/* ./out/

cd ./out

git init

git remote add origin https://github.com/iamcco/iamcco.github.io.git

git add .

git commit -m 'post update'

git push -f origin master
