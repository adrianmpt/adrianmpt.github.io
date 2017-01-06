# adrianmpt.github.io
Warm Up Rx `beta`

## Installation

From the terminal execute the following commands:
```Terminal
> npm install
> bower install
> npm start
```

You will need to serve any files in the `app` folder 
statically using a server with a reverse proxy to 
the NodeJS server running on port 3000. 

The NodeJS server will start by running `npm start` from the project root.

##Testing
Mocha is installed for testing the web application. 
There is currently no testing infrastructure in place 
for the API server running in NodeJS.

To run the test watcher use `npm test` this will start a watcher
on any files within the app folder that match the glob pattern `**/*.test.js`