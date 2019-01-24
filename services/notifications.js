const Notification = require("../models/Notification");
const mongoose = require("mongoose");

const listS = async (req) => {

  let findQ = {};

  if ("admin" == req.auth.credentials.user.role) {
    /*--------------
    If user role is admin, give admin option to see the notification on behalf of a user
    ----------------- */
    if (req.query.receiver_user_id) {
      findQ.receiver_user_id = mongoose.Types.ObjectId(req.query.receiver_user_id)
    } else {
      /* --------
      Fetch Notifications for admin itself
      ----------- */
      findQ.is_receiver_admin = true;
    }
  }
  else {
    findQ.receiver_user_id = mongoose.Types.ObjectId(req.auth.credentials.user._id);
  }

  let aggregatePipe = [
    { $match: findQ },
    { "$sort": { [req.query.sort_key]: req.query.sort_order } },
    { "$skip": req.query.skip },
    { "$limit": req.query.limit }
  ];
  let notifications = await Notification.aggregate(aggregatePipe);

  /* -------------
  Change seen flag to true 
  ---------------- */
  let notificationIds = notifications.map((notification) => notification._id);

  await Notification.updateMany({ _id: { $in: notificationIds }, seen: false }, { $set: { seen: true } });
  notifications = await Notification.populate(notifications, [
    { path: "receiver_user_id", select: "first_name last_name profile_image" },
    { path: "sender_user_id", select: "first_name last_name profile_image" },
  ]);
  let notiCount = await Notification.find(findQ).count();
  return { notiCount, result: notifications };
}

module.exports = {
  listS
};

