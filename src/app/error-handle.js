const error_types = require("./../constants/error-type");

const errorHandle = (error, ctx) => {
  let status, message;
  console.log(error, "-----------------------------");
  switch (error.message) {
    case error_types.PASSWORD_OR_NAME_IS_UNDEFINED:
      status = 400;
      message = "用户名或者密码为空";
      break;
    case error_types.USERNAME_IS_EXIST:
      status = 409;
      message = "用户名已经存在";
      break;
    case error_types.USER_DOES_NOT_EXISTS:
      status = 400;
      message = "用户名不存在";
      break;
    case error_types.PASSWORD_IS_INCORRENT:
      status = 400;
      message = "密码不正确";
      break;
    case error_types.UNAUTHORIZATION:
      status = 401;
      message = "用户没有登录";
      break;
    case error_types.UNPERMISSION:
      status = 500;
      message = "当前用户没有操作权限";
    default:
      break;
  }
  ctx.status = status;
  ctx.body = message;
};

module.exports = errorHandle;
