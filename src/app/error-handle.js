const error_types = require("./../constants/error-type");

const errorHandle = (error, ctx) => {
  let status, message;

  switch (error.message) {
    case error_types.PASSWORD_OR_NAME_IS_UNDEFINED:
      status = 400;
      message = "用户名或者密码为空";
      break;
    case error_types.USERNAME_IS_EXIST:
      status = 409;
      message = "用户名已经存在";
    default:
      break;
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandle;
