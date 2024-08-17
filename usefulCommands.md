useful dev commands:

npm run dev -- --host 0.0.0.0 --port 5173

rails server -b 0.0.0.0 -p 3000

netsh interface portproxy show all

netsh interface portproxy add v4tov4 listenport=3000 listenaddress=0.0.0.0 connectport=3000 connectaddress=<wsl-ip>


netsh interface portproxy delete v4tov4 listenport=3000 listenaddress=0.0.0.0

netsh interface portproxy delete v4tov4 listenaddress=192.168.1.172

netsh interface portproxy reset


# Get the current WSL IP address (assumes WSL 2 and Ubuntu distribution)
$wslIp = wsl -d Ubuntu -e bash -c "hostname -I | awk '{print $1}'"

# Get the current Windows IP address (for "Ethernet 2" interface)
$windowsIp = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Ethernet 2").IPAddress

# Validate that IPs were retrieved
if (-not $wslIp) {
    Write-Host "Could not retrieve WSL IP address."
    exit 1
}

if (-not $windowsIp) {
    Write-Host "Could not retrieve Windows IP address."
    exit 1
}

# Convert WSL IP to a string (to ensure it works correctly in the netsh command)
$wslIp = $wslIp.Trim()
$windowsIp = $windowsIp.Trim()

# Remove old portproxy rules for both ports
netsh interface portproxy delete v4tov4 listenport=3000 listenaddress=$windowsIp
netsh interface portproxy delete v4tov4 listenport=5173 listenaddress=$windowsIp

# Add new portproxy rules for both ports
netsh interface portproxy add v4tov4 listenport=3000 listenaddress=$windowsIp connectport=3000 connectaddress=$wslIp
netsh interface portproxy add v4tov4 listenport=5173 listenaddress=$windowsIp connectport=5173 connectaddress=$wslIp

Write-Host "Port proxy rules have been updated. You can now access Rails (port 3000) and Vite (port 5173) on your phone."
