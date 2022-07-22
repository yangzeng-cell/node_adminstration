const { off } = require("../app/database");
const connection = require("../app/database");

class labelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?)`;
    try {
      const [result] = await connection.execute(statement, [name]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async getLabels(limit, offset) {
    const statement = `SELECT * FROM label LIMIT ?,?`;
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }
  // 获取label
  async getLabelName(name) {
    const statement = `SELECT * FROM label WHERE name=?`;
    const [result] = await connection.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new labelService();
