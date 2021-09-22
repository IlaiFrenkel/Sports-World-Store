const jwt = require('jsonwebtoken');

const  AdminScreen = async(req,res,db)=>{
    const {token} = req.body;

    try{
        const decoded = jwt.verify(token, '1234');
        if (decoded.user === 'admin'){
            res.status(200).json({success : true, db : db})
        }else {
            res.json({success : false})
        }
    }catch (e){
        res.json({success : false})
    }
}


module.exports = {
    AdminScreen : AdminScreen
}