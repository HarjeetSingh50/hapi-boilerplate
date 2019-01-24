const Inert = require("inert");
const Vision = require("vision");
const Swagger = require("hapi-swaggered");
const SwaggerUI = require("hapi-swaggered-ui");
const Good = require("good");
const Router = require("./router");
const ServerMethods = require("./server-methods");
const Auth = require("./auth");
const CreateFolder = require("./createFolder");
const Socket = require("./socket");
const Pack = require("../package.json");

module.exports = [
  /* -----------------------
        Register inert
      ------------------------ */
  {
    plugin: Inert,
    options: {}
  },
  /* -----------------------
       Register vision
     ------------------------ */
  {
    plugin: Vision,
    options: {}
  },
  /* -----------------------
        Register Swagger
      ------------------------ */
  {
    plugin: Swagger,
    options: {
      info: {
        title: Pack.name,
        description: Pack.description,
        version: Pack.version,
        contact: {
          name: Pack.author,
          url: Pack.url,
          email: `${Pack.author} <${Pack.email}>`
        },
        license: {
          name: Pack.license,
          url: Pack.homepage
        }
      },
      tagging: {
        mode: 'tags',
        stripRequiredTags: true
      },
      tags: {
        // api: Pack.description,
        user: 'User endpoints',
        util: 'Util endpoints',
        files: 'Documents/files endpoints',
      }
    }
  },
  /* -----------------------
        Register SwaggerUI
      ------------------------ */
  {
    plugin: SwaggerUI,
    options: {
      title: 'KupuHealth API',
      path: '/api/docs',
      authorization: {
        field: 'apiKey',
        scope: 'query', // header works as well
        // valuePrefix: 'bearer '// prefix incase
        defaultValue: 'demoKey',
        placeholder: 'Enter your apiKey here'
      },
      swaggerOptions: {
        validatorUrl: null
      }
    }
  },
  /* ------------------
      Register good
    ------------------ */
  {
    plugin: Good,
    options: {
      ops: {
        interval: 1000
      },
      reporters: {
        myConsoleReporter: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
          },
          {
            module: 'good-console'
          },
          'stdout'
        ]
      }
    }
  },
  /* ---------------------------
  JWT authentication.
    ---------------------------- */
  {
    plugin: Auth,
    options: {}
  },
  /* ---------------------------
   Plugin Name: Router
   Description: A plugins which exports all the routes 
   of this app.
  ------------------------------ */
  {
    plugin: Router,
    options: {}
  },
  /* ---------------------------
  Plugin Name: Server Methods
  Description: A plugins which exports all the server methods 
  of this app.
 ------------------------------ */
  {
    plugin: ServerMethods,
    options: {}
  },
  /* ---------------------------
  create Folder.
  ---------------------------- */
  {
    plugin: CreateFolder,
    options: {}
  },
  /* ---------------------------
      Setting up the web-socket connection.
    ---------------------------- */
  {
    plugin: Socket,
    options: {}
  },
]