const fs = require('fs');

const GetCart = async (req,res,db)=>{
    const {user} = req.body;

    let result = db.carts.filter(obj => {
        return obj.user === user;
    })

    if (result.length !== 0) {
        res.send({"success" : true, "cart" : result})
    }
}


const AddToCart = async (req,res,db)=>{
    const {user} = req.body;

    let result = db.carts.filter(obj => {
        return obj.user === user;
    })

    if (result.length !== 0) {
        db.carts = db.carts.filter(obj => {
            return obj.user !== user;
        })
    }

    db.LoginActivity.push({"user": user,
        "date": new Date(),
        "type": 'add to cart'
    });

    db.carts.push(req.body)

    await fs.writeFile('./db.json', JSON.stringify(db, null, 4),(err) => {
        if(err){
            console.log("Couldn't write to file" + err);
            res.send({"success" : false});
        }
    });

    res.json({"success" : true});
}

module.exports = {
    AddToCart : AddToCart,
    GetCart : GetCart
}