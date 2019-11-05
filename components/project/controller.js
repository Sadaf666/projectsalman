const model = require("./model");
const userModel = require("../user/model");
const developerModel = require("../developer/model")

let controller = {};

controller.create = async (req, res) => {
    try {

        let ob = {
            name: req.body.name,
            description: req.body.description,
            user: req.body.user,
        };

        let db = new model(ob);

        let data = await db.save()

        console.log("data", data)

        res.status(200).send({
            data: data
        })


    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
};

controller.addDeveloper = async (req, res) => {
    try {
        let d = await model.findByIdAndUpdate({
            _id: req.body.projectId
        }, {
            $set: {
                developer: req.body.developer
            }
        }, {
            new: true
        })
        console.log("project", d)
        res.send({
            data: d
        })
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
}

controller.getproject = async (req, res) => {
    try {
        let project = await model.findOne({
            _id: req.query.projectId
        }, {
            name: 1,
            description: 1
        }).populate("user", "name email_Address").populate("developer", "name email_Address");
        res.status(200).send({
            data: project
        })

    } catch (error) {
        res.status(400).send({
            error: error.message
        })
    }
}


module.exports = controller;