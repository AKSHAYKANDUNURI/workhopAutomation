const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const cors = require("cors");

app.use(cors());
app.use(express.json());

async function startServer() {
    try {
        const client = await MongoClient.connect('mongodb://127.0.0.1:27017', { useUnifiedTopology: true });
        console.log("Database Connected...!");

        const db = client.db('workshopAutomation');
        const workshopCollection = db.collection('workshopCollection');
        const registeredStudents = db.collection('registeredStudents');
        const userCollection = db.collection('userCollection');

        app.set('workshopCollection', workshopCollection);
        app.set('registeredStudents', registeredStudents);
        app.set('userCollection', userCollection);

        
        const workshopApp = require('./API/workshopapi');
        const userApp = require('./API/userapi');

        
        app.use('/userapi', userApp);
        app.use('/workshopapi', workshopApp);

        app.listen(5000, () => {
            console.log("Server running on Port 5000");
        });
    } catch (err) {
        console.error("DB CONNECTION ERROR: ", err);
    }
}

startServer();
