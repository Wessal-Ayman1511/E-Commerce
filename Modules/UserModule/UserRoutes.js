import { Router } from "express"
import { createUser,  deleteUserById,  getAllUsers,  getCurrentUserProfile,  getUserById,  logIn, logOut, updateCurrentUserProfile, updateUserById } from "../UserModule/UserController.js"
import { authenticated, authorizedAdmin } from "../../src/utilities/authMiddleware.js";




export const user_routes = Router()

// users creation
user_routes.route("/users").post(createUser)



// login and logout
user_routes.post('/auth', logIn);
user_routes.post('/logout', logOut)

// user profile
user_routes.route('/profile')
.get(authenticated, getCurrentUserProfile)
.put(authenticated, updateCurrentUserProfile)


// admin routes
user_routes.route('/users/:id')
.delete(authenticated, authorizedAdmin, deleteUserById)
.get(authenticated, authorizedAdmin, getUserById)
.put(authenticated, authorizedAdmin, updateUserById)


user_routes.get('/users',authenticated, authorizedAdmin,getAllUsers)

