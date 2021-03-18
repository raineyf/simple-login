const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.get("/", function (req, res) {
    res.redirect("/login.html");
});

app.use(express.static(path.join(__dirname, "src")));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
