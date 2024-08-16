useful dev commands:

npm run dev -- --host 0.0.0.0 --port 5173

rails server -b 0.0.0.0 -p 3000

netsh interface portproxy show all

netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=<wsl-ip>


netsh interface portproxy delete v4tov4 listenport=3000 listenaddress=0.0.0.0

netsh interface portproxy delete v4tov4 listenaddress=192.168.1.172

netsh interface portproxy reset
