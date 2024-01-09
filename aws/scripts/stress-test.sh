#!/bin/bash
############################################################################################
##                                    stress-test.sh                                      ##
##                              Author: Siddharth Rawat                                   ##
##                             Copyright 2022 VoskhodXIV                                  ##
##                       This script performs REST API load testing                       ##
##                    [Siege FOSS is required to perform load testing]                    ##
############################################################################################

touch stress-links.txt
echo "https://prod.sydrawat.me/" >>stress-links.txt
echo "https://prod.sydrawat.me/healthz" >>stress-links.txt
siege -c5 -d0.1 -r3000 -f stress-links.txt
rm -rf stress-links.txt
