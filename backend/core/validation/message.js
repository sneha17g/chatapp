const msg = {};

msg.sucessCODE = 200;
msg.errorCODE = 500;
msg.verified_emailErrorCode = 400;
msg.sucessMSG = "Success";
msg.errorMSG = "Error";
msg.catchMsg = "Something went wrong please try again later.";

msg.loginTokenMsg = "Your session has expired, please login again.";
msg.objectIDLimit = '000000000000000000000000';
msg.defaultPath = "./upload/"
;
msg.loginErrorCODE = 301;

msg.withOutLoginArr = [
   "/user/signup",
  "/user/login"
   
];

export default msg;
