const connection = require("../app/database");
class CommnetService {
  // 创建一条评论
  async create(momentId, content, userId) {
    const statement = `INSERT INTO comment (moment_id,content,user_id) VALUES (?,?,?)`;
    try {
      const [result] = await connection.execute(statement, [
        momentId,
        content,
        userId,
      ]);
      return result;
    } catch (error) {
      console.log(error, "CommnetService-create");
    }
  }
  async reply(momentId, content, userId, commentId) {
    const statement = `INSERT INTO comment (moment_id,content,user_id,comment_id) VALUES (?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      momentId,
      content,
      userId,
      commentId,
    ]);
    return result;
  }
  async update(content, commentId) {
    const statement = `UPDATE comment SET content=? WHERE id=?`;
    try {
      const [result] = await connection.execute(statement, [
        content,
        commentId,
      ]);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id=?`;
    const [result] = await connection.execute(statement, [commentId]);
    return result;
  }
  /**
   *
   * @param {*} momentId
   * @returns
   * 通过动态id获取评论列表
   */
  async getCommentsByMomentId(momentId) {
    const statement = `SELECT m.id, m.content content, m.moment_id momentId,m.comment_id commentId,m.createAt createTime,m.updateAt updateTime ,JSON_OBJECT('id',u.id,'name',u.name) user FROM comment m LEFT JOIN user u ON u.id=m.user_id WHERE moment_id=?`;
    try {
      const [result] = await connection.execute(statement, [momentId]);
      return result;
    } catch (error) {}
  }
}

module.exports = new CommnetService();
