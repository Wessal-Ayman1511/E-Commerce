import User from "../../db/models/user.model.js";
import asyncHandler from "../../src/middlewares/asyncHandler.js";
import bcryptjs from 'bcryptjs'
import { generateToken } from "../../src/utilities/createToken.js";
import sendEmail from "../../src/Email/SendMail.js";
import jwt from "jsonwebtoken";

const signup = asyncHandler(async (req, res, next) => 
{
   
        let foundedUser = await User.findOne({ email: req.body.email });
        if (!foundedUser) {
            const new_user = { ...req.body };
            new_user.password = await bcryptjs.hash(req.body.password, 8);
            
            await User.create(new_user);
            const token = generateToken(res, new_user._id, new_user.email)
            sendEmail(token)

            const { password, ...userWithoutPassword } = new_user  //exclude password completely
            res.status(201).json({ message: "User added successfully", userWithoutPassword, token });
        } else {
            res.status(409)
            throw new Error("User already exists!");
        }
})


export const VerifyAccount = async(req, res)=>
{
    jwt.verify(req.params.token, "key", async(error, decoded)=>{
        if(error) return (res.json({message: "failed to verify Account"}))
        await User.findOneAndUpdate({email: decoded.email}, {isConfirmed:true}, {new: true})
        console.log("decoded data is ",decoded)
        res.json({message: "Confirmed Successfuly"})
    })
}


const logIn = asyncHandler(async(req, res) =>{
    const {email, password} = req.body
    const existingUser = await User.findOne({email})


    if(existingUser){
        const isPasswordValid = await bcryptjs.compare(password, existingUser.password)
        if(isPasswordValid)
        {
            const token = generateToken(res, existingUser._id, existingUser.email);

            res.status(200)
            .json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
    
            });

            return;
        }
        else{
            res.status(403).json({message: "Not valid password"})
        }
    }
    else{
        res.status(404).json({message: "User Not Found"})
    }
    
})

const logOut = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Log out successfully!" });
});

const getAllUsers = asyncHandler(async (req, res)=>{
    let users = await User.find()
    res.json(users)
})


const getCurrentUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email
        })
    } else{
        res.status(404)
        throw new Error("User not found")
    }
})

const updateCurrentUserProfile = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.user._id)

    if(user){
        user.username = req.body.username || user.username
        user.email = req.body.email || user.email

        if(req.body.password)
        {
            const salt = await bcryptjs.genSalt(10)
            const hashedPassword = await bcryptjs.hash(req.body.password, salt)
            user.password = hashedPassword
        }
        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }else{
        res.status(404)
        throw new Error ("User not found")
    }
})


const deleteUserById = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id)
    
    if(user){
        if(user.isAdmin){
            res.status(400)
            throw new Error("Can not delete admin")
        }

        await User.deleteOne({_id: user._id})
        res.json({message: "User removed Successfully"})
    
    }
    else{
        res.status(404)
        throw new Error("User not Found")
    }


})


const getUserById = asyncHandler(async (req, res)=>{
    const user = await User.findById(req.params.id).select('-password')
    
    if(user){
        res.json(user)
    }
    else{
        res.status(404)
        throw new Error("User Not Found")
    }

})

const updateUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
});
 

export {
    signup,
    logIn,
    logOut,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
  
}
