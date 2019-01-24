/* -----------------------------------------------------------------------
   * @ description : This file defines the user schema for mongodb.
----------------------------------------------------------------------- */
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String },
  last_name: { type: String },
  bio: { type: String },
  email: { type: String },
  phone: {
    country_code: { type: String },
    number: { type: String }
  },
  profile_image: { type: Schema.Types.ObjectId, ref: 'File' },
  password: { type: String },
  social_login_id: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  status: { type: Number, default: 1 }, // 1 -> Active, 2 -> Blocked, 3 -> Removed/Deleted
  verify_tokens: {
    email: { type: String, default: '' }, ///  Email Verification
    reset_pass: { type: String, default: '' }, ///  Reset Password
  },
  sessions: [{
    _id: false,
    socket_id: { type: String, default: '' }, ///  Socket Id
    login_token: { type: String, default: '' }, ///  Login Token
    timezone: { type: String, default: '' },
    device_token: { type: String, default: '' },
    device_type: { type: String, default: '' }
  }],
  // address: {
  //   address: { type: String },
  //   location: {
  //     'type': { type: String, enum: "Point", default: "Point" },
  //     coordinates: { type: [Number], default: [0, 0] }
  //   },
  //   postal_code: { type: String }
  // },
  created_at: { type: Number, default: Date.now },
  updated_at: { type: Number, default: Date.now }
});

// UserSchema.index({ "address.location": '2dsphere' });

const User = Mongoose.model('User', UserSchema);

module.exports = User;