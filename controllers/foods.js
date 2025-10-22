// controllers/foods.js

const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    let user = await User.findById(req.session.user._id);
    res.render('foods/index.ejs', {pantry: user.pantry});
});

router.get('/new', async (req, res) => {
    res.render('foods/new.ejs', {id: req.session.user._id})
});

router.get('/edit/:entryId/:name', async (req, res) => {
    let user = await User.findById(req.session.user._id);
    res.render('foods/edit.ejs', {id: user.id, entryId: req.params.entryId, name: req.params.name})
});

router.delete('/delete/:entryId', async (req, res) => {
    let user = await User.findById(req.session.user._id);

    for(let i = 0; i < user.pantry.length; i++) {
        if(user.pantry[i].id === req.params.entryId) {
            user.pantry.splice(i, 1);
        }
    }

    await user.save();

    res.redirect("/users/" + req.session.user._id + "/foods");
});

router.put('/:entryId', async (req, res) => {
    let user = await User.findById(req.session.user._id);

    for(let i = 0; i < user.pantry.length; i++) {
        if(user.pantry[i].id === req.params.entryId) {
            user.pantry[i] = req.body;
            break;
        }
    }

    await user.save();

    res.redirect("/users/" + req.session.user._id + "/foods");
});

router.post('/new', async (req, res) => {
    let id = req.session.user._id;
    let user = await User.findById(id);

    if(user !== null) {
        user.pantry.push(req.body);
    }

    await user.save();

    res.redirect("/users/" + req.session.user._id + "/foods");
});

// router logic will go here - will be built later on in the lab

module.exports = router;
