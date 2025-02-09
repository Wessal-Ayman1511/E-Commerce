import jwt from "jsonwebtoken"

export const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, "key", {
        expiresIn: "30d"
    })

    return token
}
