const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const bodyparser = require("body-parser")
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 2000;

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    address: String,
    email: String,
    phone: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))  // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')  // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))  // Set the views directory


app.get("/", (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
});
app.get("/contact", (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});
app.post("/contact", (req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not found to the database")
    });
});

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});