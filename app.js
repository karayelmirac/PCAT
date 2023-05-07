const express = require('express');
const path = require('path');
const app = express();

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
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'temp/index.html'));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server ${port} calisiyor.`);
});
