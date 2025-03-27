import express from 'express'
import { getAllUsers } from 'controllers/users'
import { isAuthenticated } from 'middlewares'

export default (router: express.Router) => {
    // call getAllUsers after the isAuthenticated middleware
    router.get("/users", isAuthenticated, getAllUsers)
}

