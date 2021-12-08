const app = require("./src/app.js");
const express = require('express');
const http = require("http");
const https = require("https");
require('dotenv').config({ path: "./.env"}); 

const port = process.env.PORT;

const option =
	process.env.NODE_ENV === 'production'
		? {
				key: fs.readFileSync(process.env.PRIVKEY, "utf8"),
				cert: fs.readFileSync(process.env.CERT, "utf8"),
				ca: fs.readFileSync(process.env.CA, "utf8"),
		  }
		: undefined;

option
	? https.createServer(option, app).listen(port, () => {
			console.log(`Server is running at port ${port}`);
	  })
	: http.createServer(app).listen(port, () => {
			console.log(`Server is running at port ${port}`);
	  });