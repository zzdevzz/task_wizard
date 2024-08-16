# Define a method to get the Windows IP address from ipconfig
def windows_ip
    # Run ipconfig.exe from WSL (use .exe to ensure it's the Windows command)
    ipconfig_output = `ipconfig.exe`
  
    # Extract the IPv4 Address from the ipconfig output
    if match = ipconfig_output.match(/IPv4 Address.*: (\d+\.\d+\.\d+\.\d+)/)
      match[1]
    else
      nil
    end
  rescue => e
    Rails.logger.error("Failed to retrieve Windows IP address: #{e.message}")
    nil
  end
  
# Set the IP address as an environment variable
$windows_ip = windows_ip

# Actually needs the WSL ip
  
require 'socket'

# Retrieve the IP address of the machine
def local_ip
  Socket.ip_address_list.detect(&:ipv4_private?).ip_address
end

# Set the IP address as an environment variable
$local_ip = local_ip

