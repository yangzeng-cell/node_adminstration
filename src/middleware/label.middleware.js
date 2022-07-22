const labelService = require("../service/label.service");

class labelMiddleware {
  async verifyLabelExists(ctx, next) {
    try {
      // 1.取出要添加的所有的标签
      const { labels } = ctx.request.body;
      // 2.判断每一个标签在label表中是否存在
      const labelsList = [];
      for (const name of labels) {
        const labelResult = await labelService.getLabelName(name);
        const label = { name };
        if (!labelResult) {
          // 创建新的label
          const result = await labelService.create(name);
          label.id = result.insertId;
        } else {
          label.id = labelResult.id;
        }
        labelsList.push(label);
      }
      ctx.labels = labelsList;
      await next();
    } catch (error) {
      console.log(error, "verifyLabelExists");
    }
  }
}

module.exports = new labelMiddleware();
