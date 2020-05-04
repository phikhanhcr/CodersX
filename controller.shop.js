var md5 = require('md5');
const sgMail = require('@sendgrid/mail');
var User = require('./models/user.model');
var cloudinary = require('./cloudinary');
var Shop = require('./models/shop.model');
// middleware check :  Has user had the shop ?
// if not
// 1. create a new shop , commom.pug
// 2. Add userId vào database , 
// {
//   _id : id , 
//      name : nameshop
//   books : [
//     {
//       title : abc , 
//       price : hi , 
//       desc : abc
//     }
//   ]
// }
// 3 . render về trang sản phẩm của người dùng , ban đầu chưa có gì , sau đó add vào 
// add vào books

// second đã có shop , check trong database Shop models,
// => có rồi : create a new shop (display : none)
// => my shop (block) display the name of the shop , use res.locals.___ , create a middleware check 
// xem Has user got a shop yet ?  check database , find() :
// not yet : name = "" , display : none
// already exsits : name = nameShop


// middleware 
// check shop 
// res.locals.nameShop = user[0].name
// checkShop1 = none ;
// checkShop1 = display ;
// nếu có shop thì đổi ngược lại 
// res.locals.display : 

module.exports.myShop = async (req, res) => {
  var idShop = req.params.id;
  var shop = await Shop.find({ _id: idShop });
  res.render('shop/myShop', {
    "nameShop": shop[0].name,
    "avatarShop": shop[0].avatar,
    "books": shop[0].book,
    "idShop": idShop
  });
}
module.exports.createShop = (req, res) => {
  res.render('shop/newShop');
}
module.exports.postCreateShop = async (req, res) => {
  var id = req.params.id;
  var name = req.body.name;
  var desc = req.body.des;
  var value = {
    _id: id,
    name: name,
    describe: desc
  }
  await Shop.insertMany(value);
  res.redirect('/books');
}


module.exports.createBook = (req, res) => {
  res.render('shop/createBook');
}
module.exports.postCreateBook = async (req, res) => {
  var id = req.params.id;
  var shop = await Shop.findById(id);
  var allProducts = shop.book;
  var productLength = allProducts.length;

  var title = req.body.name;
  var des = req.body.des;
  var price = req.body.price;
  const result = await cloudinary.uploader.upload(req.file.path);
  if (productLength == 0) {
    shop.book[0] = {
      title: title,
      price: price,
      desc: des,
      avatar : result.url
    }
  } else {
    shop.book[productLength] = {
      title: title,
      price: price,
      desc: des,
      avatar : result.url
    }
  }
  shop.save();
  res.redirect(`/shop/${id}`);
}


module.exports.viewOne = async (req, res , next ) => {
  var id = req.params.id;
  var bookId = req.params.idBook;
  var shop = await Shop.findById(id);
  var allProducts = shop.book;
  console.log("Allproduct " + allProducts);
  var viewProduct = allProducts.filter(ele => {
    return ele.id === bookId;
  }) 
  console.log("product " + viewProduct);
  res.render('shop/viewOne' , {
    "book" : viewProduct[0]
  })
}