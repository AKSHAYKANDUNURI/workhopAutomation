const express = require("express");
const multer = require('multer');
const fs = require('fs');
const { Binary } = require('mongodb');

const workshopApp = express.Router(); 

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

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


workshopApp.post("/update",upload.single('attendenceDocument'), async(req,res)=>{
    const workshopCollection = req.app.get('workshopCollection');
    try {
        if (!req.file) {
            console.error('No file uploaded');
            return res.status(400).send({ message: 'No file uploaded' });
        }

        console.log('File received:', req.file); // Debugging line

        const fileData = req.file.buffer;

        const workshopUpdate = {
            workshopAttendance: req.body.workshopAttendance,
            document: new Binary(fileData)
        };

        await workshopCollection.insertOne(workshopUpdate);
        res.status(200).send({ message: "Uploaded successfully" });
    } catch (error) {
    console.error('Error reading or processing the file:', error);
        res.status(500).send({ message: 'Error processing file' });
  
}
});

workshopApp.get("/",async(req,res)=>{
    try {

        const workshopCollection = req.app.get("workshopCollection")
        
        const workshopData = await workshopCollection.find({}, { projection: { document: 0 } }).toArray();
        res.status(200).send({payload : workshopData})
        
    } catch (error) {
        res.status(500).send({ message: 'Error fetching data' });
  
        
    }
});

module.exports = workshopApp;
