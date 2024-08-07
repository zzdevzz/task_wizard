#!/bin/sh
cd client-react
npm install
npm run build
cp -r public/* ../public/
cd ..
