import express from "express";
import { deleteUser, getAllUsers } from "controllers/users";
import { isAuthenticated, isOwner } from "middlewares";

export default (router: express.Router) => {
    // call getAllUsers after the isAuthenticated middleware
    router.get("/users", isAuthenticated, getAllUsers);
    router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
};
