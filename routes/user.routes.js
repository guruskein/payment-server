
module.exports = function (app) {
    var userctrl = require('../controllers/user.controller.js');
    // const middleware = require('../utils/middleware');

    /**To add the roles */
    app.route('/userroles')
        .post(userctrl.createroles)
        .get(userctrl.viewuserroles);;

    app.route('/users')
        .post(userctrl.createusers)


    app.route('/allusers')
        .get(userctrl.viewalluserdetails);

    app.route('/login')
        .post(userctrl.checklogin);

    app.route('/updateUserDetails')
        .post(userctrl.updateUserDetails);

    app.route('/updateUserPassword')
        .post(userctrl.updateUserPassword);

};
