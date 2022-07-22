const errorTypes = require("../constants/error-type");
const userService = require("../service/user.service");
const authService = require("../service/auth.service");
const { passwordmd5 } = require("../utils/password-md5");
const { PUBLIC_KEY } = require("../app/config");
const jwt = require("jsonwebtoken");
const verifyLogin = async (ctx, next) => {
  console.log("验证登录的middleware");
  // 获得用户名和密码
  const { name, password } = ctx.request.body;
  console.log(name, password);
  // 判断用户名和密码是否为空
  if (!name || !password) {
    const error = new Error(errorTypes.PASSWORD_OR_NAME_IS_UNDEFINED);
    return ctx.app.emit("error", error, ctx);
  }
  // 判断用户是否存在
  const result = await userService.getUserName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }
  // 判断密码是否和数据库的密码一致
  const passMd5 = passwordmd5(password);
  if (passMd5 !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }
  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  // 获取token
  const authorization = ctx.headers.authorization;
  const token = authorization.replace("Bearer ", "");
  // 2.验证token(id/name/iat/exp)
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
};
/**
 * 1.很多的内容都需要验证权限: 修改/删除动态, 修改/删除评论
 * 2.接口: 业务接口系统/后端管理系统
 *  一对一: user -> role
 *  多对多: role -> menu(删除动态/修改动态)
 */
const verifyPermission = async (ctx, next) => {
  // console.log("验证用户的权限,只允许动态发布者才可修改权限");
  // 1.获取参数 { commentId: '1' } tableName+id  为了通用性，可以在多个地方使用，需要将表明和params对应起来
  const [resourceKey] = Object.keys(ctx.params);
  const tableName = resourceKey.replace("Id", "");
  const resourceId = ctx.params[resourceKey];
  const { id } = ctx.user;
  // 2.查询是否具备权限
  try {
    const result = await authService.checkResource(tableName, resourceId, id);
    if (!result) throw new Error();
    await next();
  } catch (err) {
    console.log(err);
    const error = new Error(errorTypes.UNPERMISSION);
    return ctx.app.emit(error, ctx);
  }
};
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
