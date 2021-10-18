const fs = require("fs-extra");
const path = require("path");

class UserDAO {
  constructor() {
    this.pathUsers = path.resolve(__dirname, "users.json");
  }

  insert(user) {
    const users = this.getAll();

    const newUsersList = [...users, user];

    fs.outputJsonSync(this.pathUsers, newUsersList);

    return user;
  }

  getAll() {
    const users = fs.pathExistsSync(this.pathUsers)
      ? fs.readJsonSync(this.pathUsers)
      : [];
    return users;
  }

  getByEmail(email) {
    const user = this.getAll().find((u) => u.email === email);

    return user;
  }
}

module.exports = UserDAO;