const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema ({
  username: String,
  name: String,
  avatar: String,
  email: String,
  university: String,
  job: String,
  company: String,
  skills: [String],
  phone: String,
  address: {
    street_num: String,
    street_name: String,
    city: String,
    state_or_province: String,
    postal_code: String,
    country: String
  }
});

module.exports = mongoose.model('user', userSchema);
