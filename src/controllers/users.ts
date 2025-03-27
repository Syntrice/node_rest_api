import express from "express";
import { deleteUserById, getUserById, getUsers } from "database/users";

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

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {

        const { id } = req.params
        const { username } = req.body

        if (!username) {
            res.status(400).send()
        }

        const user = await getUserById(id);

        user.username = username;
        await user.save();

        res.status(200).json(user).send()

    } catch(error) {
        console.log(error)
        res.status(500).send()
    }
}