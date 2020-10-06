
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

};



/*
function saveUrl() {
  dbQuery = "insert into url_history set url =?,datetime = ?;";
  connection.query(dbQuery, [req.url, new Date().getTime()], function (err, db_results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, db_results);
    }
  });
}

function getUrl() {
  dbQuery = "SELECT url, datetime FROM url_history GROUP BY url ORDER BY MAX(datetime) DESC limit 10; "
  connection.query(dbQuery, function (err, db_results) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, db_results);
    }
  });
}
*/