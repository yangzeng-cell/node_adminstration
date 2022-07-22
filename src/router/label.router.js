const Router = require("@koa/router");
const { verifyAuth } = require("../middleware/auth.middleware");
const { create, list } = require("../controller/label.controller");
const labelRouter = new Router({ prefix: "/label" });

// 创建标签
labelRouter.post("/", verifyAuth, create);
// 获取label列表
labelRouter.get("/", verifyAuth, list);
module.exports = labelRouter;
