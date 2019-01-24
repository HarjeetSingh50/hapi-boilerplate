const md5 = require("md5");
const User = require("../models/User");
const msgs = require("../utilities/messages");
const { generateRandom, generateToken } = require("../utilities/universal");
const _ = require("underscore");
const { DateTime } = require("luxon");

module.exports = {
  loginS: async (req) => {
    let { email, password, role } = req.payload;

    let user = await User.findOne({
      email,
      password: md5(password),
      role,
      status: { $in: [1, 2] }
    })
      .lean();

    /* ----------
    Check if user should be allowed to login.
    ------------- */
    if (null == user) throw new Error(msgs.uInvalidCred); /* User Not found. */
    if (2 == user.status) throw new Error(msgs.uBlocked); /* User Profile blocked. */
    if (user.verify_tokens.email) throw new Error(msgs.uEmailNotVerifed);
    /* -----------
    Create jwt tokendata
    --------------*/
    user.login_token = generateToken({ _id: user._id });
    /**
     * Add Unread Notifications Count after Login
     */
    // let findQ = { seen: false };
    // user.role == 'admin'
    //   ? findQ.is_receiver_admin = true
    //   : findQ.receiver_user_id = user._id;
    // user.unreadNotiCount = await Notification.count(findQ);

    /* Save Token, device_info in Database */
    let fieldsToPush = {
      login_token: user.login_token,
    };
    if (req.payload.device_info) {
      fieldsToPush.device_token = req.payload.device_token;
      fieldsToPush.device_type = req.payload.device_type;
    }
    await User.findOneAndUpdate({ _id: user._id }, { $push: { sessions: fieldsToPush }, updated_at: Date.now() });

    return user;
  },

  changePasswordS: async (req) => {
    let user = await User.findOne({
      _id: req.auth.credentials.user._id,
      status: { $in: [1, 2] }
    });

    if (null == user) throw new Error(msgs.uNotExist); /* User Not found. */
    if (md5(req.payload.oldPassword) != user.password) throw new Error(msgs.uPassNotMatch);
    if (req.payload.oldPassword == req.payload.newPassword) throw new Error(msgs.uPassCantSame);

    user.password = md5(req.payload.newPassword);
    user.updated_at = Date.now();
    user.sessions = [];

    return await user.save();
  },

  registerS: async req => {

    let existingUser = await User.findOne({
      email: req.payload.email
    }, { email: 1 });
    if (existingUser) throw new Error(msgs.uEmailExist);

    req.payload.password = md5(req.payload.password);

    /////// Create User
    let newUser = new User({
      ...req.payload,
      verify_tokens: {
        email: generateRandom()
      }
    });

    let regUser = await newUser.save();
    return regUser;
  },

  singleS: async req => {
    let userdata = await User.findById(req.params._id, { email: 1, first_name: 1, last_name: 1 }).lean()
    if (null == userdata) throw new Error(msgs.uNotExist);

    return userdata;
  },

  verifyEmailS: async req => {
    return await User
      .findOneAndUpdate(
        {
          "verify_tokens.email": req.payload.token
        }, {
          "verify_tokens.email": "",
          updated_at: Date.now()
        }, {
          new: true
        });
  },

  forgotPasswordS: async req => {
    let findQ = { email: req.payload.email, status: { $in: [1, 2] } };
    if (req.payload.role) findQ.role = req.payload.role;

    let user = await User
      .findOneAndUpdate(
        findQ, {
          "verify_tokens.reset_pass": generateRandom(),
          updated_at: Date.now()
        }, {
          new: true
        });

    return user;
  },

  verifyResetPasswordS: async req => {
    return await User
      .findOne(
        {
          "verify_tokens.reset_pass": req.payload.token
        },
        { first_name: 1, last_name: 1, email: 1 });
  },

  resetPasswordS: async req => {
    return await User
      .findOneAndUpdate(
        {
          "verify_tokens.reset_pass": req.payload.token
        }, {
          password: md5(req.payload.password),
          "verify_tokens.reset_pass": "",
          updated_at: Date.now()
        }, {
          new: true
        });
  },

  logoutS: async req => {
    return await User
      .findOneAndUpdate(
        {
          "sessions.login_token": req.payload.token
        }, {
          $pull: { sessions: { login_token: req.payload.token } },
          updated_at: Date.now()
        }, {
          new: true
        });
  },

  editProfileS: async req => {

    if (req.payload.address) {
      req.payload.address = {
        address: req.payload.address.address,
        location: {
          type: "Point",
          coordinates: [req.payload.address.longitude, req.payload.address.latitude]
        }
      }
    }
    return await User
      .findOneAndUpdate(
        {
          _id: req.auth.credentials.user._id
        }, {
          ...req.payload,
          updateAt: Date.now()
        }, {
          new: true
        });
  }
};

