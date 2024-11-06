import express from "express";
import bodyParser from "body-parser";
import flash from "connect-flash";
import session from "express-session";
import pg from "pg"
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

const db =  new pg. Client ({
    user: 'postgres',
    host: 'localhost',
    database: 'users',
    password: 'alfreda.a',
    port: 5432,
});
db.connect();
app.get ("/", (req, res) => {
    const msg = req.flash("msg");
    res.render("index.ejs", {msg});
});
let result;
db.query("SELECT * FROM credentials", (err, res) => {
    if(err){
        console.log("Error loading data", err.stack);
    } else {
        result = res.rows;
        console.log(result);
        
    }
});



app.post("/", async (req, res) =>{
    const email = req.body.email;
    const wallet = req.body.wallet;
    await db.query("INSERT INTO credentials (email, wallet_address) VALUES ($1, $2)", [email, wallet]);
    console.log(email, wallet);
    req.flash("msg", `Thanks for subscribing, we will get you updated`)
    res.render("result.ejs", {result});
});






app.listen(port, ()=> {
    console.log(`Server is running on port${port}`);
});