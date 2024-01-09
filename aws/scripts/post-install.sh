#!/bin/bash
############################################################################################
##                                   post-install.sh                                      ##
##                              Author: Siddharth Rawat                                   ##
##                             Copyright 2022 VoskhodXIV                                  ##
##                     This script starts the API service on the AMI                      ##
############################################################################################

echo "+-----------------------------------------------------------------------------------------------------------------------------------------+"
echo "|                                                                                                                                         |"
echo "|                                                      Installing the REST API service                                                    |"
echo "|                                                                                                                                         |"
echo "+-----------------------------------------------------------------------------------------------------------------------------------------+"
sudo cp /home/ubuntu/nodeserver.service /lib/systemd/system/nodeserver.service
echo "Enabling the REST API Service"
sudo systemctl enable nodeserver
sudo systemctl start nodeserver
sudo systemctl restart nodeserver
sudo systemctl status nodeserver
APISRVC=$?
if [ $APISRVC -eq 0 ]; then
  echo "API service is installed successfully!"
else
  echo "Unable to install the API service"
fi
