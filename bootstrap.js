const User = require("./models/User");
const md5 = require("md5");

module.exports = {

  defaults: async () => {
    try {
      /***** Register Adimn(s) Starts ******/
      let default_admins = [
        {
          first_name: "Admin",
          last_name: "User",
          email: "hapiadmin@yopmail.com",
          password: md5("admin@123"),
          role: "admin",
        }
      ];
      let admins = await User.find({ role: 'admin' });
      if (admins && admins.length == default_admins.length) {
        console.log("Admin user exists ------------------------->", "\n\r");
        return true;
      }
      await User.deleteMany({ role: 'admin' });
      await User.insertMany(default_admins);
      console.log("Admin users created -------------------------> ", "\n\r");
      /***** Register Adimn(s) Ends ******/
    } catch (e) {
      console.log(`Error in Bootstrapping default data -----------------> ${e.message}`);
    }

  },
};