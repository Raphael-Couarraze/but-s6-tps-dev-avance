const mongoose = require('mongoose');

const livreSchema = new mongoose.Schema({
    titre: {type:String, required:true},
    auteur:String,
    description:String,
    format:{type:String,
            enum:["poche","manga","audio"],
            default:"poche"}
});

const Livre = mongoose.model('Livre', livreSchema);