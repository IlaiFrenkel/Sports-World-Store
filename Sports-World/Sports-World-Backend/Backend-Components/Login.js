const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken');
const fs = require("fs");

const Login = async (req,res,db)=>{
    const {user, pass, remember} = req.body;

    let result = db.users.filter(obj => {
        return obj.user === user && bcrypt.compareSync(pass, obj.pass);
    })

    db.LoginActivity.push({"user": user,
        "remember": remember,
        "succeeded": result.length !== 0,
        "date": new Date(),
        "type": 'login'
    });

    await fs.writeFile('./db.json', JSON.stringify(db, null, 4),(err) => {
        if(err){
            console.log("Couldn't write to file" + err);
        }
    });

    if (result.length === 0){
        res.json({success : false, desc :"User isn't registered"});
    }else {
        let token;

        if (remember){
            token = jwt.sign({user}, '1234')
        }else{
            token = jwt.sign({user}, '1234', {expiresIn: '30min'})
        }

        res.status(200).json({success : true, id : user, token : token});
    }
}

const Logout = async (req,res,db)=>{
    const {user} = req.body;
    db.LoginActivity.push({
        "user" : user,
        "type" : "logout",
        "date" : new Date()
    });

    await fs.writeFile('./db.json', JSON.stringify(db, null, 4),(err) => {
        if(err)  console.log("Couldn't write to file" + err);
    });
}

const autoLogin = (req,res,db)=>{
    try{
        const {token} = req.body;

        const decoded = jwt.verify(token, '1234');
        res.json({success : true, user : decoded.user})
    }catch (e){
        res.json({success : false})
    }
}


module.exports = {
    Login : Login,
    autoLogin : autoLogin,
    Logout: Logout
}