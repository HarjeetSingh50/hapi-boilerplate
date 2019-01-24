const Boom = require("boom");
const jwt = require("jsonwebtoken");
const config = require("../config/appConfig");
const fs = require("fs");
const msgs = require("../utilities/messages");
const User = require("../models/User");

const basicAuth = async (req, h) => {
  try {
    var token = req.headers['x-authorization'];
    var decoded = jwt.verify(token, config.commonConfig.jwtKey);
    console.log("decoded", decoded)
    if (decoded) {
      let user = await User.findOne({ _id: decoded._id, "sessions.login_token": token }).lean();
      if (null != user) {
        return h.authenticated({ credentials: { user, token } });
      }
    }
    // return req.server.methods.failAction(h, { statusCode: 401, message: msgs.tokenExpired });
    return Boom.unauthorized(msgs.tokenExpired);
  } catch (err) {
    // return req.server.methods.failAction(h, { statusCode: 401, message: msgs.unauth });
    throw Boom.unauthorized(msgs.unauth);
  }
};

module.exports = {
  basicAuth,

  handleError: (req, h, error) => {
    let errorMessage = '';
    if (error.output.payload.message.indexOf('[') > -1) {
      errorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf('['));
    } else {
      errorMessage = error.output.payload.message;
    }
    errorMessage = errorMessage.replace(/"/g, '');
    errorMessage = errorMessage.replace('[', '');
    errorMessage = errorMessage.replace(']', '');
    error.output.payload.message = errorMessage;
    delete error.output.payload.validation;
    // return req.server.methods.failAction(h, { statusCode: 400, message: errorMessage });
    throw Boom.badRequest(errorMessage);
  },

  generateToken: data =>
    jwt.sign(data, config.commonConfig.jwtKey, { algorithm: config.commonConfig.jwtAlgo, expiresIn: '24h' }),

  generateRandom: (length = 32, alphanumeric = true) => {
    let data = '',
      keys = '';

    if (alphanumeric) {
      keys = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    } else {
      keys = '0123456789';
    }

    for (let i = 0; i < length; i++) {
      data += keys.charAt(Math.floor(Math.random() * keys.length));
    }

    return data;
  },

  checkAndCreateFolder: path => {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
  },

  adminAuth: async (req, h) => {

    let resp = await basicAuth(req, h);

    if (resp.data.credentials.user.role != 'admin') {

      // return req.server.methods.failAction(h, { statusCode: 401, message: msgs.unauth });
      throw Boom.unauthorized(msgs.unauth);
    }
    return resp;
  },

  optionalAuth: async (req, h) => {
    if (req.headers['x-authorization']) {
      return basicAuth(req, h);
    } else {
      return h.authenticated({ credentials: { user: null } });
    }
  },

  validateTime: async (req, h) => {

    let currentTime = new Date().getTime()

    if (req.payload.date < currentTime) {
      // return req.server.methods.failAction(h, { statusCode: 400, message: msgs.timeValidate });
      throw Boom.badRequest(msgs.timeValidate);
    }
    else {
      return true
    }
  }
};

