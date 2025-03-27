import {
    generateSalt,
    generateSessionToken,
    hashPassword,
    validatePassword,
} from "authentication";
import { createUser, getUserByEmail, getUserByUsername } from "database/users";
import express from "express";

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        // Validate request contains required fields
        if (!email || !password || !username) {
            res.status(400).send("Missing required fields");
            return;
        }

        // Check if user already exists with email
        const existingUser = await getUserByEmail(email);
        if (existingUser) {
            res.status(409).send("Email already in use");
            return;
        }

        // Check if user already exists with username
        const existingUsername = await getUserByUsername(username);
        if (existingUsername) {
            res.status(409).send("Username already in use");
            return;
        }

        // Hash password
        const salt = generateSalt();
        const hashedPassword = hashPassword(salt, password);

        // Create user in database using our createUser function
        const user = await createUser({
            email,
            username,
            authentication: {
                password: hashedPassword,
                salt,
            },
        });
        res.status(200).json(user).send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
};

export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        // Validate request contains required fields
        if (!email || !password) {
            res.status(400).send("Missing required fields");
            return;
        }

        // Get user from database, with password and salt
        const user = await getUserByEmail(email).select(
            "+authentication.salt +authentication.password"
        );

        // Check if user exists
        if (!user) {
            res.status(400).send("Email does not exist");
            return;
        }

        // Validate password
        if (
            !validatePassword(
                password,
                user.authentication.salt,
                user.authentication.password
            )
        ) {
            res.status(401).send("Invalid password");
            return;
        }

        // Create / update session token for user
        user.authentication.sessionToken = generateSessionToken();

        await user.save();

        res.cookie("sessionToken", user.authentication.sessionToken, {
            httpOnly: true,
        })
            .status(200)
            .json(user)
            .send();
            
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
};
