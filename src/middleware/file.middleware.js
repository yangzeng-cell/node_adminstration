const Multer = require("koa-multer");
const path = require("path");
const Jimp = require("jimp");
const { AVATAR_PATH, PICTURE_PATH } = require("../constants/file-path");
const avatarUpload = Multer({
  dest: AVATAR_PATH,
});
// avatar字段名要和url的参数名对应
const avatarHandler = avatarUpload.single("avatar");

const pictureUpload = Multer({
  dest: PICTURE_PATH,
});
// 多文件上传用array
const pictureHandler = pictureUpload.array("picture", 9);

const pictureResize = async (ctx, next) => {
  try {
    // 1.获取所有的图像信息
    const files = ctx.req.files;
    // 2.对图像进行处理(sharp/jimp)  sharp会比较大
    for (const file of files) {
      const destPath = path.join(file.destination, file.filename);
      console.log(destPath);
      Jimp.read(file.path).then((image) => {
        image.resize(1280, Jimp.AUTO).write(`${destPath}-large`);
        image.resize(640, Jimp.AUTO).write(`${destPath}-middle`);
        image.resize(320, Jimp.AUTO).write(`${destPath}-small`);
      });
    }
    await next();
  } catch (error) {
    console.log(error, "pictureResize");
  }
};
module.exports = {
  avatarHandler,
  pictureHandler,
  pictureResize,
};
