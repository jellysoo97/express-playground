const conn = require("../config/db");

const userModel = {
  create: (user) => {
    return conn
      .promise()
      .execute("INSERT INTO users (email, password, salt) VALUES (?, ?, ?)", [
        user.email,
        user.password,
        user.salt,
      ]);
  },
  getUserByEmail: async (email) => {
    const [rows] = await conn
      .promise()
      .execute("SELECT * FROM users WHERE email = ?", [email]);

    return rows[0];
  },
  resetPassword: (user) => {
    return conn
      .promise()
      .execute("UPDATE users SET password=?, salt=? WHERE email=?", [
        user.password,
        user.salt,
        user.email,
      ]);
  },
};

module.exports = userModel;
