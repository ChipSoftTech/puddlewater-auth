/**
 * User Service.
 */

const User = require('../models/user');
const { hashSync } = require('bcrypt');

module.exports.list = async () => {
  if (process.env.NODE_ENV == 'prod') {
    return await User.find().select({ "_id": 0, "password": 0 });

  } else {
    return await User.find();
  }
};

module.exports.setup = async () => {
  let user = new User({ username: 'admin', role: 'admin', password: hashSync('password', 2) });
  return await user.save();
};
