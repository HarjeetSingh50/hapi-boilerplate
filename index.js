'use strict';

const configureServer = require("./server");
const configureDB = require("./db");
const bootstrap = require("./bootstrap");

configureServer();
configureDB();
bootstrap.defaults();
