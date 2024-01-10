const jwt = require("jsonwebtoken");

const verifyToken = (req , res , next)=>{
    const authHeader = req.headers.token;
    const token = authHeader.split(" ")[1];

    if(authHeader){
        jwt.verify(token , process.env.JWT_SEC , (err , user)=>{
            if(err) res.status(403).json("Token is invalid!");

            // console.log("LINE AT 11" , user);
            req.user = user;
            // console.log("LINE AT 13" , req);
            next();
        });
    }
    else{
        res.status(401).json("You are not authenticated!");
    }
};

const verifyTokenAndAuthorization = (req , res , next)=>{

    verifyToken(req , res  , ()=>{
        // console.log("LINE AT 25" ,req);
        if(req.user.id === req.params.id || req.user.isAdmin === true){
            next();
        }
        else{
            res.status(403).json("You are not allowed!");
        };
    });
};

const verifyTokenAndAdmin = (req , res , next)=>{
    verifyToken(req , res  , ()=>{
        // console.log("LINE AT 37" ,req.user);
        if(req.user.isAdmin){
            next();
        }else{
            res.status(403).json("You are not allowed!")
        }
    })
}

module.exports = {verifyToken , verifyTokenAndAuthorization , verifyTokenAndAdmin}