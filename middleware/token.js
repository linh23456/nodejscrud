const jwt = require("jsonwebtoken");

const token = {
    verifyToken: (req, res , next) => {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET , (err , user) => {
                if(err){
                    res.status(403).json("Token is invalid");
                }
                req.user = user;
                next();
            });
        }
        else{
            res.status(401).json("You must be logged in");
        }
    }
}

module.exports = token;