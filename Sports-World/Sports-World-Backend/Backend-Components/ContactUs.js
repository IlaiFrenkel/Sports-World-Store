const fs = require('fs');

const ContactUs = async (req,res,db)=>{
    db.contactUs.push(req.body)

    await fs.writeFile('./db.json', JSON.stringify(db, null, 4),(err) => {
        if(err){
            console.log("Couldn't write to file" + err);
            res.send({"success" : false});
        }
    });

    res.json({"success" : true});
}

module.exports = {
    ContactUs : ContactUs
}