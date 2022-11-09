const { render } = require('ejs');
const Console = require("console");
var express = require('express');
var authen = require('../models/authenticator');
var display_product = require('../models/table_display');
var director_box = require('../models/select_box');
var crud = require('../models/crud');
var session;
var router = express.Router();



router.get('/', function(req, res, next) {
  res.render('index', { title: 'ATN SHOP' });
});
router.post('/', function(req, res, next) {
  res.render('login', { title: 'ATN SHOP', message:'' });
});

router.post('/login', async function(req, res, next) {
  let username = req.body.user_acc;
  let password= req.body.user_pwd;
  session = req.session;
console.log(username +":"+ password)
  let [authenticated, shop_id, role] = await authen(username, password);
  console.log(authenticated);
  if (authenticated==true && role =='shop'){
    session.user_id = username;
    session.shop_id = shop_id;
    session.role = role;

    res.redirect('/users')
  } else if (authenticated==true && role =='director'){
    session.user_id = username;
    session.shop_id = shop_id;
    session.role = role;

    res.redirect('/admin')
  }
  else {
    res.render('login', {title: 'ATN SHOP',
                         message: 'Wrong Username or Password'})
  }
});

//process for logout


router.get('/logout', function(req, res, next) {
  req.session.destroy();
  res.render('index', { title: 'ATN SHOP' });
});

module.exports = router;