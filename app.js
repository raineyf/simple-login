const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const port = 3000;

app.get("/", function (req, res) {
    res.redirect("/login.html");
});

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "src")));

const users = [
    {
        username: "level",
        password: "Access123",
    },
];

app.post("/login", (req, res) => {
    const user = req.body;
    let response = {
        loginStatus: "fail",
        message: "user does not exist",
    };
    users.forEach((u) => {
        if (u.username == user.username) {
            if (u.password == user.password) {
                response = {
                    loginStatus: "success",
                    redirect: "/success.html",
                };
                return;
            } else {
                response = {
                    loginStatus: "fail",
                    message: "username and password do not match",
                };
                return;
            }
        }
    });
    res.send(JSON.stringify(response));
});

app.post("/signup", (req, res) => {
    const user = req.body;
    let userExists = false;
    let response = {
        signupStatus: "success",
    };
    users.forEach((u) => {
        if (u.username == user.username) {
            response = {
                signupStatus: "fail",
                message: "Username unavailable",
            };
            userExists = true;
            return;
        }
    });
    if (userExists == false) {
        users.push(user);
    }
    res.send(JSON.stringify(response));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
