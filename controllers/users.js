const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/',  async(req, res) => {
    let users = await User.find({});
    res.render("./users/index.ejs", {users: users});
});


router.get('/show/:userId', async (req, res) => {
   let user = await User.findById(req.params.id);
   res.render('./users/show.ejs', {user: user});
});

module.exports = router;