import { generateSalt, hashPassword } from "authentication";
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
        return 

    } catch (error) {
        console.log(error);
        res.status(500);
    }
}

export const login = async (req: express.Request, res: express.Response) => {
  try {
      
  }
  catch (error) {
      console.log(error);
      res.status(500);
  }
}
