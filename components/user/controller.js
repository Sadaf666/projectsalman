const model = require("./model");
const bcrypt = require("bcryptjs");
const pmodel = require("../project/model")
const jwt = require("jsonwebtoken")

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

      let token = await jwt.sign({
        email_Address: data.email_Address,
        id: data._id
      }, "your secret");
     
      return res.status(200).send({
        data: data,
        token
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
    let obj = {
      name: req.body.name,
      age: req.body.age,
      email_Address: req.body.emailaddress,
      phone_no: req.body.phoneno,

    };
    // Check if password is avail
    if (req.body.password) {
      let pass = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
      obj.password = pass;
    }

    let users = await model.findOneAndUpdate({
      email_Address: req.body.emailaddress
    }, {
      $set: JSON.parse(JSON.stringify(obj)) // removes undefined or null values
    }, {
      new: true
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

controller.userproject = async (req, res) => {
  try {
    
    let a = await pmodel.find({
      user: req.body.decodedToken.id
    }, {
      name: 1,
      description: 1
    })
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