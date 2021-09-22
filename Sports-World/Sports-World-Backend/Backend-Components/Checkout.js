const fs = require('fs');

const Checkout = async (req,res,db)=>{
    db.purchases.push(req.body)

    await fs.writeFile('./db.json', JSON.stringify(db, null, 4),(err) => {
        if(err){
            console.log("Couldn't write to file" + err);
            res.send({"success" : false});
        }
    });

    res.json({"success" : true});
}

module.exports = {
    Checkout : Checkout
}