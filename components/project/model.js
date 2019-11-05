const mongoose = require("mongoose");
var schema = mongoose.Schema;

const projectschema = new schema({
    name: {
        type: String,
        // required: [true]
    },
    description: {
        type: String
    },
    user: {
        type: String,
        ref: "user"
    },
    developer: {
        type: String,
        ref: "developer"
    }
}, {
    timestamps: true

});

const project = mongoose.model("project", projectschema);
module.exports = project;