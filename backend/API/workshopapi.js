const express = require("express");
const multer = require('multer');
const fs = require('fs');
const { Binary } = require('mongodb');
const workshopApp = express.Router(); // Create an Express Router instance

workshopApp.post("/create", async (req, res) => {
    try {
        const workshopData = req.body;
        const { workshopVenue, workshoptime, workshopDate } = workshopData;

        const workshopCollection = req.app.get('workshopCollection');

        const existingWorkshop = await workshopCollection.findOne({
            workshopVenue: workshopVenue,
            workshopDate: workshopDate,
            workshoptime: workshoptime
        });

        if (existingWorkshop) {
            return res.status(400).send(); // No error message sent, only the status code
        }

        const result = await workshopCollection.insertOne(workshopData);

        res.status(201).json({ message: 'Workshop created successfully', insertedId: result.insertedId });
    } catch (err) {
        console.error("Error creating workshop:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = workshopApp;
