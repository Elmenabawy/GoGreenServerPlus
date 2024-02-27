const mongoose = require('mongoose');

const consumptionSchema = new mongoose.Schema({
    day: [
        { hour: { type: String }, consumption: { type: Number } },
        // ... rest of the day array
    ],
    week: [
        { day: { type: String }, consumption: { type: Number } },
        // ... rest of the week array
    ],
    month: [
        { month: { type: String }, consumption: { type: Number } },
        // ... rest of the month array
    ],
    year: [
        { year: { type: Number }, consumption: { type: Number } },
        // ... rest of the year array
    ]
});

const Consumption = mongoose.model('Consumption', consumptionSchema);

module.exports = Consumption;
