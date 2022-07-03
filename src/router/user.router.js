const Router = require("@koa/router");

const { create, handlePassword } = require("../controller/user.controller");
const { verifyUser } = require("../middleware/user.middleware");

const userRouter = new Router({ prefix: "/users" });
userRouter.post("/", verifyUser, handlePassword, create);

module.exports = userRouter;
