const { resetPassword, verifyEmail } = require("../utilities/notifications");

const {
  loginS,
  registerS,
  singleS,
  verifyEmailS,
  forgotPasswordS,
  verifyResetPasswordS,
  resetPasswordS,
  logoutS,
  editProfileS,
  changePasswordS
} = require("../services/users");

const msgs = require("../utilities/messages");

module.exports = {
  register: async (req, h) => {
    try {
      const user = await registerS(req);
      verifyEmail({ receiverUser: user }, req);
      return req.server.methods.successAction(h, user);
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  },

  verifyEmail: async (req, h) => {
    try {
      const user = await verifyEmailS(req);
      if (null == user) throw new Error(msgs.linkExpired);
      return req.server.methods.successAction(h, null, msgs.uEmailVerifed);
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  },

  changePassword: async (req, h) => {
    try {
      const user = await changePasswordS(req);
      return req.server.methods.successAction(h, user, msgs.uPassChanged);
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  },

  login: async (req, h) => {
    try {
      const user = await loginS(req);
      return req.server.methods.successAction(h, user);
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  },

  single: async (req, h) => {
    try {
      const user = await singleS(req);
      return req.server.methods.successAction(h, user);
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  },

  forgotPassword: async (req, h) => {
    try {
      const user = await forgotPasswordS(req);
      if (null == user) throw new Error(msgs.uNotExist);
      resetPassword({ receiverUser: user }, req);
      return req.server.methods.successAction(h, null, msgs.uResetLinkSent);
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  },

  verifyResetPassword: async (req, h) => {
    try {
      const user = await verifyResetPasswordS(req);
      if (null == user) throw new Error(msgs.linkExpired);
      return req.server.methods.successAction(h, null, msgs.linkValid);
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  },

  resetPassword: async (req, h) => {
    try {
      const user = await resetPasswordS(req);
      if (null == user) throw new Error(msgs.linkExpired);
      return req.server.methods.successAction(h, null, msgs.uResetPassSucc);
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  },

  logout: async (req, h) => {
    try {
      await logoutS(req);
      return req.server.methods.successAction(h, null, msgs.uLogoutSuccess);
    } catch (err) {
      return req.server.methods.failAction(h, err);
    }
  },

  editProfile: async (req, h) => {
    try {
      let sp = await editProfileS(req);
      return req.server.methods.successAction(h, sp, msgs.spProfileUpdated);
    } catch (err) {
      if (err.codeName == 'DuplicateKey') {
        return req.server.methods.failAction(h, { 'message': msgs.duplicatePhoneNumber });
      }
      else {
        return req.server.methods.failAction(h, err);
      }
    }
  },
};