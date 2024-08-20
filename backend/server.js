const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require("cors");

app.use(cors());
app.use(express.json());

// MongoDB connection
MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true })
    .then(client => {
        console.log("Database Connected...!");

        const db = client.db('workshopAutomation');
        const workshopCollection = db.collection('workshopCollection');
        app.set('workshopCollection', workshopCollection);
    })
    .catch(err => {
        console.error("DB CONNECTION ERROR: ", err);
    });

// Import routes
const workshopApp = require('./API/workshopapi');
const userApp = require('./API/userapi');

// Use routes
app.use('/userapi', userApp);
app.use('/workshopapi', workshopApp);

app.listen(5000, () => {
    console.log("Server running on Port 5000");
});
