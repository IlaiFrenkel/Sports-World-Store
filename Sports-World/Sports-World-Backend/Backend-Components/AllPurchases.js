const fs = require('fs');

const AllPurchases = async (req,res,db)=>{
    const {user} = req.body;

    let result = db.purchases.filter(obj => {
        return obj.cart.user === user;
    })

    if (result.length !== 0) {
        res.send({"success" : true, "purchases" : result})
    }
}

module.exports = {
    AllPurchases : AllPurchases
}