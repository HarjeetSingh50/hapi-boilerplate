const schedule = require('node-schedule');
const env = require("./env");

module.exports = function (server) {

    if (env.instance != 'local') {
        /**
         * Run the scheduler every midnight.
         */
        schedule.scheduleJob({ hour: 00, minute: 00 }, async function () { return true; });
    }
}


