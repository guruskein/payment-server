
let jwt = require('jsonwebtoken');
const commonRes = require("./../utils/response");
const commonErr = require("./../utils/errorFn");
const config = require('./config.js');
let auth = require('../controllers/otp.controller');

let checkToken = (req, res, next) => {
   if(req.headers['authorization'] != undefined){
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json(commonErr._isAuthInvalid(err));
      } else {
        req.decoded = decoded;
        auth.verify_token(decoded.phone_num,token,(err,result)=>{
          console.log('JWT Error: ', err);
          console.log('JWT Result: ', result);
            if(result){
              next();
            }else{
              return res.json(commonErr._isAuthInvalid(err));
            }
      });
      }
    });
  } else {
    return res.json(commonErr._isAuthError());
  }
   }else{
      return res.json(commonErr._isAuthError()); 
   }
};


module.exports = {
  checkToken: checkToken
}
