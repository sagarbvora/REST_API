const usersRouter = require("./users/router");
const authRouter = require("./auth/router");

module.exports = (app) => {
    app.use("/users", usersRouter);
    app.use("/auth", authRouter);
};