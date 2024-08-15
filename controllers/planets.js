const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    planetDescription: { type: String, required: true}
});

const User = mongoose.model('Planet', planetSchema);

module.exports = Planet;