class UserModel {
  constructor(...user) {
    Object.assign(this, user);
  }
}

module.exports = UserModel;
