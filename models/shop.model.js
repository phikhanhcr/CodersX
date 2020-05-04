var mongoose = require('mongoose');
const shopSchma = new mongoose.Schema({
  _id: { type: String, trim: true },
  name: { type: String, trim: true },
  describe: { type: String, trim: true },
  avatar: { type: String, trim: true, default: "http://res.cloudinary.com/pklevi/image/upload/v1588299846/w9rdhnyjvrppfepvolv2.png" },
  book: [{
    title: { type: String, trim: true },
    desc: { type: String, trim: true },
    price: { type: Number, trim: true },
    avatar: { type: String, trim: true }
  }]
})

var Shop = mongoose.model('Shop', shopSchma, 'shop');
module.exports = Shop;