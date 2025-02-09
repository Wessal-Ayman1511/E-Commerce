import User from "../../db/models/user.model.js";
import asyncHandler from "../../src/middlewares/asyncHandler.js";
import bcryptjs from 'bcryptjs'
import { generateToken } from "../../src/utililities/createToken.js";

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
        const token = generateToken(res, newUser._id)
        
        res.status(201)
        .json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: token
   
        });
        
    } catch (error) {
        res.status(400)
        throw new Error("Invalid user data")
        
    }
})










export {
    createUser
}