var mongoose = require("mongoose");
var schema = mongoose.Schema;

var developerschema = new schema({
    name: {
        type: String,
        required: [true, "Name is requiered."] 
    },
    age: {
        type: Number,
        min: 18,
        required: [true, "Age is required."]
    },
    email_Address: {
        type: String,
        required: [true, "Email is required."], 
        unique: true
    },
    phone_no: {
        type: String,
        required: [true, "Phone No. is requiered."]
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    }
}, {
    timestamps: true
});

const developer = mongoose.model("developer", developerschema);
module.exports = developer;