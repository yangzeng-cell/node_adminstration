const dotenv = require("dotenv");
// 通过dotenv来获取.env的配置信息,把。env文件内容放到process.env
dotenv.config();

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env;
