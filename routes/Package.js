// predictionController.js
const express = require('express');
const router = express.Router();
const axios = require('axios'); // Assuming you have Axios installed
const Package = require('../models/PackageModel'); // Update the path

router.post('/', async (req, res) => {
    try {
        // Assuming the AI prediction API endpoint
        const predictionApiEndpoint = 'https://api-model-2.onrender.com/predict';

        // Consumption data from the client
        const consumptionData = req.body;

        // Make a POST request to the prediction API
        const predictionResponse = await axios.post(predictionApiEndpoint, consumptionData);

        // Assuming prediction data is in predictionResponse.data
        const predictionResult = predictionResponse.data;

        const newPackage = new Package({
            userId: req.user._id, // Assuming you have user authentication middleware
            packageName: predictionResult.package,
            timestamp: {
                january: user.january,
                february: user.february,
                march: user.march,
                april: user.april,
                may: user.may,
                june: user.june,
                july: user.july,
                august: user.august,
                september: user.september,
                october: user.october,
                november: user.november,
                december: user.december,
                kind: user.kind
            },
        });

        await newPackage.save();

        res.status(201).json({ message: 'Package prediction saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
