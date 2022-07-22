const connection = require("../app/database");

class fileService {
  async saveAvatarInfo(mimetype, filename, size, userId) {
    const statement = `INSERT INTO avatar (mimetype,filename,size,user_id) VALUES (?,?,?,?)`;
    const [result] = await connection.execute(statement, [
      mimetype,
      filename,
      size,
      userId,
    ]);

    return result;
  }
  async savePictureInfo(mimetype, filename, size, momentId, userId) {
    const statement = `INSERT INTO file (mimetype,filename,size,moment_id,user_id) VALUES (?,?,?,?,?) `;
    const [result] = await connection.execute(statement, [
      mimetype,
      filename,
      size,
      momentId,
      userId,
    ]);
    return result;
  }
  async getFileByName(filename) {
    try {
      const statement = `SELECT * FROM file WHERE filename=?`;
      const [result] = await connection.execute(statement, [filename]);
      return result[0];
    } catch (error) {
      console.log(error, "getFileByName");
    }
  }
}

module.exports = new fileService();
