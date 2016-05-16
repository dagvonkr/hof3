#!/bin/bash
cd hof3
rm -fr ./bundle
tar -xzf source.tar.gz
#cd bundle/server
#npm install fibers
cd bundle/programs/server
#npm install fibers@1.0.9
npm install