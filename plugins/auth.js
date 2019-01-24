/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the auth plugin.
------------------------------------------------------------------------------------------------- */
const Universal = require("../utilities/universal");

module.exports = {
  name: 'Auth',
  version: '1.0.0',
  register: (server, options) => {
    /* ----------------
    Basic Token Authorization
    ------------------- */
    const basicScheme = () => ({
      authenticate: Universal.basicAuth
    });
    server.auth.scheme('basicAuth', basicScheme);
    server.auth.strategy('basic', 'basicAuth');
    /* ----------------
    Admin Role: Token Authorization
    ------------------- */
    const adminScheme = () => ({
      authenticate: Universal.adminAuth
    });
    server.auth.scheme('adminAuth', adminScheme);
    server.auth.strategy('admin', 'adminAuth');
    /* ----------------
    Optional Auth
    ------------------- */
    const optionalScheme = () => ({
      authenticate: Universal.optionalAuth
    });
    server.auth.scheme('optionalScheme', optionalScheme);
    server.auth.strategy('optional', 'optionalScheme');
  }
};
