const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');

const app = express();

//connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({});
  res.render('index', {
    photos,
  });
});

app.get('/photos/:id', async (req, res) => {
  //res.render('about');
  //console.log(req.params.id)
  const photo = await Photo.findById(req.params.id)
  res.render('photo',{
    photo
  })
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});

// form'dan post methoduyla gelen verileri alıp verileri json döndürüyoruz
app.post('/photos', async (req, res) => {
  await Photo.create(req.body);
  res.redirect('/');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server ${port} calisiyor.`);
});
