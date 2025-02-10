import jwt from "jsonwebtoken"

export const generateToken = (res, userId, email) => {
    const token = jwt.sign({userId, email}, "key", {
        expiresIn: "30d"
    })


    res.cookie('jwt', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60 * 1000
    }
    )
    return token
}
