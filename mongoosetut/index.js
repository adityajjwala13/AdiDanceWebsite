// getting-started.js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/harrycart', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// db.once('open', function () {
//     // we're connected!
//     console.log("I m connected");
// });

const kittySchema = new mongoose.Schema({
    name: String
});

kittySchema.methods.speak = function () {
    const greeting = "My name is " + this.name
    console.log(greeting);
}

const Kitten = mongoose.model('harrykitty', kittySchema);

const harrykitty = new Kitten({ name: 'harrykitty name hee' });
const harrykitty2 = new Kitten({ name: 'harrykitty na' });
// console.log(harrykitty.name);
// harrykitty.speak();

harrykitty.save(function (err, adi) {
    if (err) return console.error(err);
    // adi.speak();
});
harrykitty2.save(function (err, k) {
    if (err) return console.error(err);
    // k.speak();
});

Kitten.find( {name: "harrykitty na"},function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
})  