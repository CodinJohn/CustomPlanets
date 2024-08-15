const express = require('express')
const router = express.Router();
const Planet = require('../models/planet.js')

router.get('/new', (req, res) => {
    res.render('planets/new.ejs')
});

router.post('/', async (req, res) => {
    try {
        const { name, planetDescription } = req.body
        const newPlanet = new Planet({
            name,
            planetDescription,
            owner: req.session.user._id
        });
        await newPlanet.save();
        res.redirect(`/users/${req.session.user._id}/planets`)
    } catch (error) {
        console.error(error)
        res.redirect('/')
    }
});

router.get('/', async (req, res) => {
    try {
      const planets = await Planet.find({ owner: req.session.user._id });
      res.render('planets/index.ejs', { planets });
    } catch (error) {
      console.error(error);
      res.redirect('/');
    }
  });

router.get('/:planetId', async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.planetId)
        res.render('planets/show.ejs', {planet})
    } catch (error) {
        console.error(error)
        res.redirect(`/users/${req.session.user._id}/planets`)
    }
});

router.get('/:planetId/edit', async (req, res) => {
    try {
        const planet = await Planet.findById(req.params.planetId)
        if(!planet) {
            return res.redirect(`/users/${req.session.user._id}/planets`)
        }
        res.render('planet/edit.ejs', { planet })
    } catch (error) {
        console.error('Error grabbing planet for edit:', error)
        res.redirect(`/users/${req.session.user._id}/planets`)
    }
});

module.exports = router;