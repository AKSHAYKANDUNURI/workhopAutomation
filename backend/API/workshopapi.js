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
        const { workshopVenue, workshoptime, workshopDate,workshopCapacity } = workshopData;

        const tempCapacity = parseInt(workshopCapacity, 10);
        const workshopCollection = req.app.get('workshopCollection');

        const existingWorkshop = await workshopCollection.findOne({
            workshopVenue: workshopVenue,
            workshopDate: workshopDate,
            workshoptime: workshoptime
        });

        if (existingWorkshop) {
            return res.status(400).send(); 
        }

        const workshopData2 = { 
            ...workshopData, 
            workshopCapacity: tempCapacity, 
            availableSlots: tempCapacity 
        };

        const result = await workshopCollection.insertOne(workshopData2);

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

workshopApp.delete('/', async (req, res) => {
    try {
        const workshopCollection = req.app.get("workshopCollection");
        const workshopData = req.query;

        const result = await workshopCollection.deleteOne({
            workshoptime: workshopData.workshoptime,
            workshopDate: workshopData.workshopDate
        });

        if (result.deletedCount === 1) {
            res.status(200).send({ message: "Workshop deleted successfully!" });
        } else {
            res.status(404).send({ message: "Workshop not found!" });
        }
    } catch (error) {
        console.error("Error deleting workshop:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

workshopApp.put('/register', async(req, res) => {
    try {
        const registeredStudents = req.app.get('registeredStudents');
        const workshopCollection = req.app.get("workshopCollection");

        const workshopData = req.body;

        const check = await registeredStudents.findOne({
            hallTicket: workshopData.hallTicket,
            workshopId: workshopData._id
        });

        if (check) {
            return res.status(409).send({ message: "Student is already registered for this workshop" });
        }

        await registeredStudents.insertOne({
            hallTicket: workshopData.hallTicket,
            workshopId: workshopData._id
        });

        const tempData = await workshopCollection.findOne({
            workshopDate: workshopData.workshopDate,
            workshopVenue: workshopData.workshopVenue,
            workshoptime: workshopData.workshoptime
        }, {
            projection: { _id: 1, availableSlots: 1 }
        });

        if (!tempData) {
            return res.status(404).send({ message: "Workshop not found" });
        }

        if (tempData.availableSlots > 0) {
            const newavailableSlots = tempData.availableSlots - 1;
            await workshopCollection.updateOne(
                { _id: tempData._id },
                { $set: { availableSlots: newavailableSlots } }
            );

            return res.status(200).send({ message: "Workshop registered successfully" });
        } else {
            return res.status(400).send({ message: "Workshop is fully booked" });
        }

    } catch (error) {
        console.error("Error in /register route:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

module.exports = workshopApp;