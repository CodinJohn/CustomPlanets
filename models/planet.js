const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true},
    planetDescription: { type: String, required: true},
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Planet = mongoose.model('Planet', planetSchema);

module.exports = Planet;