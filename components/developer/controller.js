const model = require("./model");
const bcrypt = require("bcryptjs");
const pmodel = require("../project/model")

let controller = {};

controller.register = async (req, res) => {
  try {
    let pass = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    let ob = {
      name: req.body.name,
      age: req.body.age,
      email_Address: req.body.emailaddress,
      phone_no: req.body.phoneno,
      password: pass
    };
    let db = new model(ob);

    let chk = await model.findOne({
      email_Address: req.body.emailaddress
    });
    if (chk) {
      console.log("email address already in use. Try different email address.");
      return res.status(200).send({
        data: {
          Message: "user Already exists"
        }
      });
    } else {
      let data = await db.save();
      console.log("data", data);

      return res.status(200).send({
        data: data
      });
    }
  } catch (error) {
    res.status(400).send({
      error: error.message
    });
  }
};


controller.update = async (req, res) => {
  try {
    let users = await model.findOneAndUpdate({
      email_Address: req.body.emailaddress
    }, {
      $set: {
        name: req.body.name,
        age: req.body.age,
        phone_no: req.body.phoneno,
      }
    });
    res.send({
      data: users
    });
  } catch (error) {
    res.status(400).send({
      error: error.message
    });
  }
};

controller.delete = async (req, res) => {
  let userr = await model.remove({
    email_Address: req.body.emailaddress
  });
  console.log("data", userr);

  res.send({
    data: userr
  });
};

controller.getuser = async (req, res) => {
  try {
    let b = await model.find({});
    console.log("data", b);
    res.status(200).send({
      data: b
    })

  } catch (error) {
    res.status(400).send({
      error: error.message
    })
  }
}

controller.devproject = async (req, res) => {
  console.log(req.query.developerId);
  
  try {
    let a = await pmodel.find({
      developer: req.query.developerId
    },{name:1,description:1}).populate("user","name email_Address").populate("developer","name email_Address")
    console.log("data", a)
    res.status(200).send({
      data: a
    })
  } catch (error) {
    res.status(400).send({
      error: error.message
    })
  }
}

module.exports = controller;