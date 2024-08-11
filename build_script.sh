
# allows me to build app
cd client-react
nvm install 22  # Install Node.js version 22 if not already installed
nvm use 22  # Switch to Node.js version 22
npm install
npm run build
cp -r dist/* ../public/
cp ../static.json ../public/

cd ..

echo "Build completed and files copied to public directory."
