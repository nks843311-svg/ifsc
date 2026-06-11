const express = require("express");
const db = require("./db");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/search", (req, res) => {

    const ifsc = req.body.ifsc;

    db.query(
        "SELECT * FROM bank_details WHERE ifsc=?",
        [ifsc],
        (err, result) => {

            if (err) {
                return res.send("Database Error");
            }

            res.render("result", {
                bank: result[0]
            });
        }
    );
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running");
});