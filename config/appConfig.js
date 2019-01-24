/**
 * This file holds all the configuration of app and database for all the servers, based on their environment
 */


module.exports = {
  /**
   * Common configuration for all the environments 
   */
  commonConfig: {
    "uploads": {
      "dir": "./assets",
      "maxBytes": 3e+7
    },
    "jwtKey": "56%^&**JIOJJ((",
    "jwtAlgo": "HS512",
    "emails": {
      "sendgridApiKey": "Yrwwa3RhTSi8j0k_sr6JHg",
      "mailFrom": "",
      "templates": {
        "verifyEmail": "d-94d273d747754273bf82a0048ea6b917",
        "resetPassword": "d-d067fc018afe42c9adfcdd688c2e582e"
      }
    },
    "notifications": {
      "fcmServerKey": "asfasdcsadcsda"
    }
  },
  /**
   * 
   * Configuration for local server
   */
  local: {
    "host": "localhost",
    "port": 3005,
    "siteUrl": "http://localhost:3000",
    "db": {
      "port": 27017,
      "options": {
        "useNewUrlParser": true
      },
      "name": "hapi_gen_local",
      "url": "mongodb://localhost:27017/hapi_gen_local",
      "host": "localhost",
      "auth": false,
      "username": "",
      "password": ""
    },
    "stripeKey": "",
  },
  /**
   * Configuration for staging server
   * 
   */
  staging: {
    "host": "",
    "port": 3005,
    "siteUrl": "http://expmaple.com:3005",
    "db": {
      "port": 27017,
      "options": {
        "useNewUrlParser": true
      },
      "name": "hapi_gen_staging",
      "url": "mongodb://localhost:27017/hapi_gen_staging",
      "host": "localhost",
      "auth": false,
      "username": "",
      "password": ""
    },
    "stripeKey": "",
  },
  /**
   * Configuration for production server
   * 
   */
  production: {
    "host": "127.0.0.1",
    "port": 3005,
    "siteUrl": "https://expmaple.com",
    "db": {
      "port": 27017,
      "options": {
        "useNewUrlParser": true
      },
      "name": "hapi_gen_production",
      "url": "mongodb://localhost:27017/hapi_gen_production",
      "host": "localhost",
      "auth": false,
      "username": "",
      "password": ""
    },
    "stripeKey": "",
  }
}

