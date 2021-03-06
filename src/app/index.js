const koa = require("koa");
// const bodyparser = require("koa-bodyparser");
const Router = require("@koa/router")();
const koaBody = require("koa-body");
const userRouter = require("../router/user.router");
const errorHandle = require("./error-handle");
const getRouters = require("../router");
const app = new koa();
app.use(koaBody());
app.getRouters = getRouters;
app.getRouters();
app.on("error", errorHandle);
module.exports = app;
