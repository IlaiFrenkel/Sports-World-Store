const Register = require("./Backend-Components/Register");
const Login = require("./Backend-Components/Login");
const Cart = require('./Backend-Components/Cart')
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const fs = require('fs');
const Checkout = require("./Backend-Components/Checkout");
const AllPurchases = require("./Backend-Components/AllPurchases");
const ContactUs = require("./Backend-Components/ContactUs");
const AdminScreen = require("./Backend-Components/AdminScreen");
const  PORT = process.env.PORT || 5000;
const app = express();
let db;

app.use(cors({
    credentials: true
}));

var jsonParser = bodyParser.json();
async function readUsers(){
    await fs.readFile("db.json" , ((err, data) => {
        if (err) {
            console.error(err)
            return
        }
        db = JSON.parse(data.toString());
    }));

    app.post("/register",jsonParser,(req,res) => {
        Register.Register(req,res,db);
    });

    app.post("/login",jsonParser, (req,res) => {
        Login.Login(req,res,db);
    });

    app.post("/autoLogin",jsonParser, (req,res) => {
        Login.autoLogin(req,res,db);
    });

    app.post("/AddToCart",jsonParser, (req,res) => {
        Cart.AddToCart(req,res,db);
    });

    app.post("/GetCart",jsonParser, (req,res) => {
        Cart.GetCart(req,res,db);
    });

    app.post("/checkout",jsonParser, (req,res) => {
        Checkout.Checkout(req,res,db);
    });

    app.post("/GetAllPurchases",jsonParser, (req,res) => {
        AllPurchases.AllPurchases(req,res,db);
    });

    app.post("/SaveContact",jsonParser, (req,res) => {
        ContactUs.ContactUs(req,res,db);
    });

    app.post("/deleteUser",jsonParser, (req,res) => {
        Register.DeleteUser(req,res,db);
    });

    app.post("/AdminScreen",jsonParser, (req,res) => {
        AdminScreen.AdminScreen(req,res,db);
    });

    app.post("/logout",jsonParser, (req,res) => {
        Login.Logout(req,res,db);
    });
}

readUsers();

app.listen(PORT, () =>{
    console.log(`Server started on port ${PORT}`);
});