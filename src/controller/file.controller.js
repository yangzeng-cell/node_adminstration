const fileService = require("../service/file.service");
const { APP_HOST, APP_PORT } = require("../app/config");
const userService = require("../service/user.service");
class fileController {
  async saveAvatarInfo(ctx, next) {
    // 1.获取图像相关的信息
    // console.log(ctx.req.file);
    const { mimetype, filename, size } = ctx.req.file;
    const { id } = ctx.user;
    // 2.将图像信息数据保存到数据库中
    const result = await fileService.saveAvatarInfo(
      mimetype,
      filename,
      size,
      id
    );
    // 3.将图片地址保存到user表中
    const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`;
    const result2 = await userService.updateAvatarUrlById(id, avatarUrl);
    console.log(result2);
    // 4.返回结果
    ctx.body = "上传头像成功";
  }
  async savePictureInfo(ctx, next) {
    try {
      // 1.获取图像信息
      const files = ctx.req.files;
      const { id } = ctx.user;
      const { momentId } = ctx.query;
      // 2.将所有的文件信息保存到数据库中
      for (const file of files) {
        const { mimetype, filename, size } = file;
        await fileService.savePictureInfo(
          mimetype,
          filename,
          size,
          momentId,
          id
        );
      }

      ctx.body = "上传成功";
    } catch (error) {
      console.log(error, "savePictureInfo fileController");
    }
  }
}

module.exports = new fileController();
