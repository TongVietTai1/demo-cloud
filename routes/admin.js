var express = require('express');
var authen = require('../models/authenticator');
var display_product = require('../models/table_display');
var director_box = require('../models/select_box');
var crud = require('../models/crud');
var session;
const router = express.Router();


/* GET users listing. */
router.get('/', async function(req, res, next) {
  session = req.session;
  let username = session.user_id;
  let shop_id = session.shop_id;
  if(session.user_id){
    let box = await director_box();
    let table = await display_product(shop_id);
    res.render('admin', { title: 'ADMIN', 
                          user: username, 
                          select_box: box,
                          table_string: table});
  } 
});
router.post('/select_box', async function(req, res, next) {
    let shop_id=req.body.shops;
    username = req.session.user_id;
    let table = await display_product(shop_id);
    let box = await director_box();
    res.render('admin', {title: 'ADMIN', 
                        user: username,
                        select_box: box,
                        table_string:table})
});
module.exports = router;