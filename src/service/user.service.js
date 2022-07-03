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
    console.log(result);
    return result[0];
  }
}

module.exports = new userService();
