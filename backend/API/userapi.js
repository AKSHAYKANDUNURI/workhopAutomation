const express = require("express");
const userApp = express.Router(); 
userApp.post("/", async (req, res) => {  


    try {
        const userCollection = req.app.get("userCollection");

        const user = await userCollection.findOne({username:req.body.username});
         if (user) {
            if(user.password === req.body.password )
            res.status(200).send({role:user.role});
            else
            res.status(201).send();

        } else {
            res.status(202).send();  
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send();  
    }
});


module.exports = userApp;
