import User from "../../db/models/user.model.js";
import asyncHandler from "../../src/middlewares/asyncHandler.js";
import bcryptjs from 'bcryptjs'
import { generateToken } from "../../src/utilities/createToken.js";

const createUser = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body

    if (!username || !email || !password)
    {
        throw new Error("Please fill all the inputs.")
    }
    const userExists = await User.findOne({email});
    if (userExists) res.status(400).end("User already exists")

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)


    
    const newUser = User({username, email, password: hashedPassword})
    try {
        await newUser.save()
        generateToken(res, newUser._id)
        
        res.status(201)
        .json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
   
        });
        
    } catch (error) {
        res.status(400)
        throw new Error("Invalid user data")
        
    }
})


const logIn = asyncHandler(async(req, res) =>{
    const {email, password} = req.body
    const existingUser = await User.findOne({email})


    if(existingUser){
        const isPasswordValid = await bcryptjs.compare(password, existingUser.password)
        if(isPasswordValid)
        {
            const token = generateToken(res, existingUser._id);

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
    createUser,
    logIn,
    logOut,
    getAllUsers,
    getCurrentUserProfile,
    updateCurrentUserProfile,
    deleteUserById,
    getUserById,
    updateUserById
  
}