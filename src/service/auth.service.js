const connection = require("../app/database");
class AuthService {
  async checkResource(tableName, id, userId) {
    // 为了可以更好的查看错误，可以使用trycatch捕获错误
    try {
      const statement = `SELECT * FROM ${tableName} WHERE id=? AND user_id=?;`;
      const [result] = await connection.execute(statement, [id, userId]);
      return result.length > 0 ? true : false;
    } catch (error) {
      console.log("checkResource", error);
    }
  }
}

module.exports = new AuthService();
