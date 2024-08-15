const express = require('express')
const router = express.Router();
const Planet = require('../models/planet.js')

router.get('/new', (req, res) => {
    res.render('planets/new.ejs')
});

router.post('/', async (req, res) => {
    try {
        const {name, planetDecription} = req.body
        if ( name && planetDescription) {
            const planet = new Planet(req.body)
            await planet.save()
            res.redirect(`/users/${req.session.user._id}/planets`)
        } else {
            res.send('Planet name and description are needed!')
        }
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

router.get('/', async (req, res) => {
    try {
        const planets = await Planet.find({ owner: req.session.user._id})
        res.render('planets/index.ejs', {planets})
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

router.get('/:planetId', async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.planetId)
        if (!planet) {
            return res.redirect('/users')
        }
        res.render('planets/show.ejs', {planet})
    } catch (error) {
        console.error(error)
        res.redirect(`/users/${req.session.user._id}/planets`)
    }
});

module.exports = router;