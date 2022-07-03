const errorTypes = require("../constants/error-type");
const userService = require("../service/user.service");
const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body;
  console.log(name, password);
  if (!name || !password) {
    const error = new Error(errorTypes.PASSWORD_OR_NAME_IS_UNDEFINED);
    return ctx.app.emit("error", error, ctx);
  }
  // 3.判断这次注册的用户名是没有被注册过
  const result = await userService.getUserName(name);
  if (result.length) {
    const error = new Error(errorTypes.USERNAME_IS_EXIST);
    return ctx.app.emit("error", error, ctx);
  }
  await next();
};

module.exports = {
  verifyUser,
};
