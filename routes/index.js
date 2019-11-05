const user = require("../components/user/routes");
const project = require("../components/project/routes");
const developer=require("../components/developer/routes")

module.exports = function (app) {
    app.use("/user", user);
    app.use("/project", project);
    app.use("/developer", developer);
};