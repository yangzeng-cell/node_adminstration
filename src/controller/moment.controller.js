const fileService = require("../service/file.service");
const momentService = require("./../service/moment.service");
const fs = require("fs");
const { PICTURE_PATH } = require("../constants/file-path");
class MomentController {
  // 添加动态
  async create(ctx, next) {
    const userId = ctx.user.id;
    const moment = ctx.request.body.moment;
    const result = await momentService.create(userId, moment);
    ctx.body = result;
  }
  // 更新动态
  async update(ctx, next) {
    const { momentId } = ctx.params;
    const { moment } = ctx.request.body;
    const result = await momentService.update(momentId, moment);
    ctx.body = result;
  }
  // 删除动态
  async remove(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.remove(momentId);
    ctx.body = result;
  }
  async detail(ctx, next) {
    const { momentId } = ctx.params;
    const result = await momentService.detail(momentId);
    ctx.body = result;
  }
  async list(ctx, next) {
    // 1.获取数据(offset/size)
    const { offset, limit } = ctx.query;
    // // 2.查询列表
    const result = await momentService.getMomentList(offset, limit);

    ctx.body = result;
  }
  async addLabels(ctx, next) {
    // 1.获取标签和动态id
    const { momentId } = ctx.params;
    const { labels } = ctx;
    // 2.添加所有的标签
    for (const label of labels) {
      // 2.1.判断标签是否已经和动态有关系
      const isExist = await momentService.hasLabel(momentId, label.id);
      if (!isExist) {
        await momentService.addLabel(momentId, label.id);
      }
    }
    ctx.body = "给动态添加标签成功";
  }
  async fileInfo(ctx, next) {
    try {
      let { filename } = ctx.params;
      const fileInfo = await fileService.getFileByName(filename);
      const { type } = ctx.query;
      const types = ["small", "middle", "large"];
      if (types.some((item) => type === item)) {
        filename = filename + "-" + type;
      }
      ctx.response.set("content-type", fileInfo.mimetype);
      ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
    } catch (error) {
      console.log(error, "fileInfo");
    }
  }
}

module.exports = new MomentController();
