#!/bin/bash

# Set network proxy to "Automatic"
gsettings set org.gnome.system.proxy mode 'auto'

# Connect to VPN using openvpn
openvpn --config /etc/openvpn/client/E1-arasa.imunixx.de.ovpn