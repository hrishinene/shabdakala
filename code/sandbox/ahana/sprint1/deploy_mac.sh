#!/bin/sh

PWD=`pwd`
D=/tmp/deploy$$;
echo "Temp Dir: $D"
mkdir $D
cd $D
echo "Setting projectid to shabdak3"
gcloud config set project shabdak3

echo "Cloning repository to directory: $D"
git clone git@github.com:hrishinene/vardaL.git
cd vardaL
git fetch
git checkout shabdak_3
git pull

echo "Running npm build"
npm i
npm run build
# rm -rf -v !("build"|"app.yaml")
rm -rf `ls |grep -v "build\|app.yaml"`

echo "Deploying to Google Cloud"
gcloud app deploy --quiet
# gcloud app deploy

echo "Deployment Done! Cleaning up!"
cd /tmp
rm -rf $D
cd $PWD

