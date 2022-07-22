const connection = require("./../app/database");
class MomentService {
  // 发布动态
  async create(userId, content) {
    const statement = `INSERT INTO moment (content,user_id) VALUES (?,?);`;
    const [result] = await connection.execute(statement, [content, userId]);
    return result;
  }
  // 更新动态
  async update(momentId, content) {
    const statement = `UPDATE moment SET content=? WHERE id=?;`;
    const [result] = await connection.execute(statement, [content, momentId]);
    return result;
  }
  // 删除动态
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id=?`;
    const [result] = await connection.execute(statement, [momentId]);
    console.log(result);
    return result;
  }
  // 获取某一条动态
  async detail(momentId) {
    const statement = `SELECT * FROM moment WHERE id=?`;
    const [result] = await connection.execute(statement, [momentId]);
    return result;
  }
  // 获得动态列表 把动态和对应的评论都获取到
  async getMomentList(offset, limit) {
    const statement = `SELECT m.id id,m.content content,m.createAt createTime,m.updateAt updateTime,JSON_OBJECT('id',u.id,'name',u.name) author,(SELECT COUNT(*) FROM comment c WHERE c.moment_id=m.id) commentCount,(SELECT COUNT(*) FROM moment_label ml FROM ml.moment_id=m.id ) labelCount ,(SELECT JSON_ARRAYAGG(CONCAT('http://localhost:9901/moment/images/',file.filename))) FROM moment m LEFT JOIN user u ON m.user_id=u.id LIMIT ?,?`;
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }
  // 判断是否由动态对应的label
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id=? AND label_id=?`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result[0] ? true : false;
  }
  // 给动态太添加标签
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id,label_id) VALUES (?,?)`;
    const [result] = await connection.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
