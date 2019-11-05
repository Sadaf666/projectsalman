var mongoose = require("mongoose"); // importing mongoose
var Schema = mongoose.Schema; // connecting mongoose to schema

var userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is requiered."] //validation
    },
    age: {
        type: Number,
        min: 18,
        required: [true, "Age is required."]
    },
    email_Address: {
        type: String,
        required: [true, "Email is required."], // Validation
        unique: true
    },
    phone_no: {
        type: Number,
        required: [true, "Phone no. is required."]
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    }
}, {
    timestamps: true
});

const user = mongoose.model("user", userSchema); // definig a model.
module.exports = user; // exporting user model.