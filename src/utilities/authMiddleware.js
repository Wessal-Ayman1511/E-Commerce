import jwt from 'jsonwebtoken'
import User from '../../db/models/user.model.js'
import asyncHandler from '../middlewares/asyncHandler.js'



const authenticated = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token, 'key')
            req.user = await User.findById(decoded.userId).select("-password")
            next();
            
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed.")
            
        }
    }
    else{
        res.status(401);
        throw new Error("Not authorized, No token.")
    }
})

const authorizedAdmin = asyncHandler(async (req, res, next)=>{
    if(req.user && req.user.isAdmin)
        next()
    else{
        res.status(403).end("Not authorized as admin")
    }

})
export {
    authenticated, authorizedAdmin
}