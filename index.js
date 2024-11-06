import express from "express";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "express-session";
import dotenv from "dotenv";
import ejs from "ejs";
const port = process.env.PORT || 3000;
dotenv.config();
const app = express ();
app.use(bodyParser.urlencoded({extended: true}));
app.use(session ({
    secret: "process.env.SECRET",
    saveUninitialized: true,
    resave: true,
}));
app.use(flash());


app.get ("/", (req, res) => {
    const msg = req.flash("msg");
    res.render("index.ejs", {msg});
});

app.post("/", (req, res) =>{
    req.flash("msg", `Thanks for subscribing, we will get you updated`)
    res.redirect("/");
});

app.listen(port, ()=> {
    console.log(`Server is running on port${port}`);
});