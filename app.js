const express = require('express');
const path = require('path');
const ejs = require('ejs');
const app = express();

// TEMPLATE ENGINE
/* views klasörüne bakar */
app.set('view engine', 'ejs');

// express.static bir middleware fonksiyonudur.
//middleware => ara yazılımdır.
//next gelecek middleware geçiş yapmasını sağlar.

/* request,response döngüsü içerisindeki her şeye middleware denir
 Çünkü tüm olan her şey req,res döngüsü arasında yapılır. */

//middleware calistirmak için "use" fonksiyonu kullanılır

//MIDDLEWARES

const myLogger = (req, res, next) => {
  console.log('Middleware log 1');

  next();
};

// express'de statik dosyaları kullanmak için kullanılan built-in function.
app.use(express.static('public'));

// ROUTES
app.get('/', (req, res) => {
  res.render('index');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server ${port} calisiyor.`);
});
