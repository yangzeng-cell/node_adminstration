const Router = require("@koa/router");
const authRouter = new Router({ prefix: "/login" });
const { verifyLogin, verifyAuth } = require("./../middleware/auth.middleware");
const { login, success } = require("./../controller/auth.controller");
authRouter.post("/", verifyLogin, login);
authRouter.get("/vertify", verifyAuth, success);

module.exports = authRouter;
