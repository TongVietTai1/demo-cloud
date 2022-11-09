var express = require('express');
var display_product = require('../models/table_display');
var crud = require('../models/crud');
var router = express.Router();
var session;

router.get('/', async function(req, res, next) {
  session = req.session;
  if(session.user_id){
    let username = session.user_id;
    let shop_id = session.shop_id;
    // let role = session.role;
    let table = await display_product(shop_id);
    res.render('users', { title: 'Welcome back', 
                          user: username, 
                          table_string: table});
  } else {
    res.render('login', { title: 'ATN SHOP', message:'Please login first' });
  }
});

router.post('/crud', async function(req, res, next) {
  session = req.session;
  let username = session.user_id;
  let results = await crud(req.body);
  //refresh page
  let table = await display_product(req.body.shop_id);
  res.render('users', { title: 'Welcome to ATN shop',
                        user: username,
                        table_string: table});

});

module.exports = router;      