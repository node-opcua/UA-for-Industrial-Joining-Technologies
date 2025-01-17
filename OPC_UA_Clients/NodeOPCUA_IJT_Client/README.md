# NodeOPCUA_IJTClient

## Author

Joakim Gustafsson
Email: joakim.h.gustafsson@atlascopco.com

## Coordinator/Maintanence

Mohit Agarwal
Email: mohit.agarwal@atlascopco.com

## NodeOPCUA related

Etienne Rossignon
Email: etienne.rossignon@sterfive.com

## Overview

This application uses the open source NodeOPCUA Stack. The purpose of this application is to consume the data from any OPC UA server based on the OPC 40451-1 UA CS for Tightening Systems 1.00.

This client will be updated based on the newer versions of the companion standards developed by VDMA Industrial Joining Technologies Working Group.

## Pre-requisites

1. Fork or clone the repo
2. go to OPCUA_Clients\NodeOPCUA_IJT_Client folder
3. run  `npm install`
4. run `node index.js`
5. visit `http://localhost:3000` in your browser

## How to run?

1. Run the following command: node ./index.js
2. The above command will start the socket.io server at <http://localhost:3000/>
3. Open the above socket.io server link in any browser and start using the client.

## OPC UA Server

1. Use the following OPC UA Server to utilize the OPC UA Client: <https://github.com/umati/UA-for-Industrial-Joining-Technologies>
2. Select Servers -> Local in the OPC UA Client to connect to the local OPC UA Server.

## tips

* To update existing node-opcua modules, run the following commands:

```bash
npx npm-check-updates -u -f "node-opcua*"
npm install
```
