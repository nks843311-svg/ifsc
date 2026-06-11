const express = require("express");
const axios = require("axios");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/search", async (req, res) => {

    const ifsc = req.body.ifsc;

    try {

        const response = await axios.get(
            `https://ifsc.razorpay.com/${ifsc}`
        );

        res.render("result", {
            bank: response.data
        });

    } catch (error) {

        res.render("result", {
            bank: null
        });

    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running");
});