import express from "express";
import { deleteUserById, getUsers } from "database/users";

export const getAllUsers = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const users = await getUsers();

        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
};

export const deleteUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {

        // request takes an id param
        const { id } = req.params;

        const deletedUser = await deleteUserById(id)

        res.json(deleteUser).send()
    }
    catch (error) {
        console.log(error);
        res.status(500).send()
    }
};
