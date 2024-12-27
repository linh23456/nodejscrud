const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const authController = {
    registerUser: async (req, res) => {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(req.body.password, salt);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashed,
        });
        const newUser = await user.save();
        res.status(200).json(newUser);
    },

    generateAccessToken : (user) => {
        return jwt.sign(
            {
                id : user._id,
                isAdmin : user.isAdmin
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn: "30s"}
            );
    },

    generateRefreshToken : (user) => {
        return jwt.sign(
            {
                id : user._id,
                isAdmin : user.isAdmin
            },
            process.env.JWT_REFRESH_KEY,
            {expiresIn: "365d"}
            );
    },
    
    loginUser: async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json("User not found");
        } 
        const validPassword = await bcrypt.compare(req.body.password , user.password );
        if(!validPassword) {
            res.status(404).json("Invalid password");
        }
        if(user && validPassword){
            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            res.cookie("refreshToken" , refreshToken , {
                httpOnly : true,
                secure: true,
                path: "/",
                sameSite: "strict"
            });
            const {password , ...others} = user._doc;
            res.status(200).json({...others , accessToken , refreshToken});
        }
    },

    requestRefreshToken: async(req , res) => {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) {
            return res.status(401).json("No auth");
        }
        if(!refreshTokens.includes(refreshToken)) {
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY , (err , user) => {
            if(err){
                res.status(500).json(err);
            }
            refreshTokens = refreshTokens.filter(token => token !== refreshToken);
            const newaccessToken = authController.generateAccessToken(user);
            const newrefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newrefreshToken);
            res.cookie("refreshToken" , newrefreshToken , {
                httpOnly : true,
                secure: true,
                path: "/",
                sameSite: "strict"
            });
            res.status(200).json({accessToken : newaccessToken, refreshToken : newrefreshToken});
        });
    },

    logoutUser : async(req ,res) => {
        res.clearCookie("refreshToken");
        refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
        res.status(200).json("Logout success");
    }
};

module.exports = authController;