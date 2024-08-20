const express = require("express");

const userApp = express.Router(); // Create an Express Router instance

// Define user routes here
userApp.post("/create", async (req, res) => {
    // User creation logic here
});

module.exports = userApp;
