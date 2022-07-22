const Router = require("@koa/router");
const {
  create,
  update,
  remove,
  detail,
  list,
  addLabels,
  fileInfo,
} = require("../controller/moment.controller");
const {
  verifyAuth,
  verifyPermission,
} = require("./../middleware/auth.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware");
const momentRouter = new Router({ prefix: "/moment" });
// 发布动态
momentRouter.post("/", verifyAuth, create);
// 修改动态
// // 1.用户必须登录 2.用户具备权限
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);
//删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);
// 获取某一条动态
momentRouter.get("/:momentId", detail);
// 获取动态分页列表
momentRouter.get("/", verifyAuth, list);
// 给动态添加标签
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);
// 获取到图片
momentRouter.get("/images/:filename", fileInfo);
module.exports = momentRouter;
