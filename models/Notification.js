/* -----------------------------------------------------------------------
   * @ description : This file defines the Notifications schema for mongodb.
----------------------------------------------------------------------- */
const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const NotificationSchema = new Schema({
  receiver_user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  sender_user_id: { type: Schema.Types.ObjectId, ref: 'User' }, /* If notification is from admin, this field might not exist */
  is_receiver_admin: { type: Boolean, default: false },
  action: { type: Number },
  /* ---------
  1 -> `Demo Notification`
  ----------- */
  meta_data: {
    action_taken: { type: Boolean, default: false },
  },
  title: { type: String },
  message: { type: String }, /* Full Html in case of type was email, simple message string otherwise */
  seen: { type: Boolean, default: false },
  created_at: { type: Number, default: Date.now }
});

const Notification = Mongoose.model('Notification', NotificationSchema);

module.exports = Notification;

