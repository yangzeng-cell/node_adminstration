const connection = require("./../app/database");

class userService {
  async create(user) {
    const { name, password } = user;
    const statement = `INSERT INTO user (name,password) VALUES (?,?)`;
    const result = await connection.execute(statement, [name, password]);
    return result[0];
  }

  async getUserName(name) {
    const statement = `SELECT * FROM user WHERE name = ?`;
    const result = await connection.execute(statement, [name]);
    return result[0];
  }
  async updateAvatarUrlById(userId, avatarUrl) {
    const statement = `UPDATE user SET avatar_url =? WHERE id=?`;
    try {
      const result = await connection.execute(statement, [avatarUrl, userId]);
      return result[0];
    } catch (error) {
      console.log(error, "updateAvatarUrlById");
    }
  }
}

module.exports = new userService();
