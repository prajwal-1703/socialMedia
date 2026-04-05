import mongoose,{ Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new Schema({

    userName: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    avatar:{
        type: String,
        default: "https://res.cloudinary.com/dzj8q4l9c/image/upload/v1702058967/default-avatar_ajh5nq.png",
        required: true,
    },
    coverImage:{
        type: String,
        default: "https://res.cloudinary.com/dzj8q4l9c/image/upload/v1702058967/default-cover-image_gy5vqf.png",
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],

    password:{
        type: String,
        required: [ true, "Password is required" ],
        minlength: [ 6, "Password must be at least 6 characters long" ]
    },
    refreshToken: {
        type: String,
    }

}, {timestamps: true});


userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
}); 

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
    //returns a boolean value indicating whether the provided password matches the hashed password stored in the database.
}


//Here we are generating access token and refresh token for the user. Access token is used to authenticate the user and refresh token is used to generate a new access token when the old one expires. We are using jsonwebtoken library to generate the tokens. The tokens are signed with a secret key and have an expiration time. The payload of the token contains the userId, email, userName and fullName of the user.

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        userId: this._id,
        email: this.email,
        userName: this.userName,
        fullName: this.fullName,
    }, 
    process.env.ACCESS_TOKEN_SECRET, 
    { 
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN 
    });
}


userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        userId: this._id
    }, 
    process.env.REFRESH_TOKEN_SECRET, 
    { 
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN 
    });
}

const User = mongoose.model("User", userSchema);
export default User;