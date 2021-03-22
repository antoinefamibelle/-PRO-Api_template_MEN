const mongoose = require('mongoose');

/**
 * @template UserSchema
 * @param {string} name - The name of the user
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @param {boolean} isDk - If the user is a dk member
 * @param {boolean} isValidate - If the user is authorized to use the site
 * @param {Data} Date - Date of creation of the user
 */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  pseudo: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
  },
  admin: {
    type: Boolean
  },
  isDk: {
    type: Boolean
  },
  isValidate: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);