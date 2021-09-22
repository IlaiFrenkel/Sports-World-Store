const bcrypt = require('bcrypt-nodejs')
const fs = require('fs');
const jwt = require('jsonwebtoken');

const  Register = async(req,res,users)=>{
    const {user, pass} = req.body;

    let result = users.users.filter(obj => {
        return obj.user === user;
    })

    if (result.length === 0){
        users.users.push({"user" : user, "pass" : bcrypt.hashSync(pass)})
        db.LoginActivity.push({"user": user,
            "date": new Date(),
            "type": 'register'
        });

        await fs.writeFile('./db.json', JSON.stringify(users, null, 4),(err) => {
            if(err)  console.log("Couldn't write to file" + err);
        });
        const token = jwt.sign({user}, '1234', {expiresIn: '30min'})
        res.status(200).json({success : true, id : user, token : token});
    }else {
        res.json({result : false});
    }
}

const  DeleteUser = async(req,res,db)=>{
    const {user, pass} = req.body;
    let result = db.users.filter(obj => {
        return obj.user === user && bcrypt.compareSync(pass, obj.pass);
    })

    if (result.length === 0){
        res.json({success : false});
    }else {
        db.users = db.users.filter(obj => {
            return obj.user !== user;
        });
        db.carts = db.carts.filter(obj => {
            return obj.user !== user;
        })
        db.purchases = db.purchases.filter(obj => {
            return obj.user !== user;
        })
        db.LoginActivity = db.LoginActivity.filter(obj => {
            return obj.user !== user;
        })

        await fs.writeFile('./db.json', JSON.stringify(db, null, 4),(err) => {
            if(err)  console.log("Couldn't write to file" + err);
        });

        res.status(200).json({success : true});
    }
}

module.exports = {
    Register : Register,
    DeleteUser: DeleteUser
}