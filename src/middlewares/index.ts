import express from "express";
import { get, identity, merge } from "lodash";
import { getUserBySessionToken } from "database/users";
import { error } from "console";

// middleware to check if the user is authenticated
export const isAuthenticated = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction // next function in middleware pipeline
) => {
    try {
        // try to get the session token from the request cookies
        const sessionToken = req.cookies["sessionToken"];

        // if there is no session token, the user is not authenticated
        if (!sessionToken) {
            res.status(401).send();
            return;
        }

        // attempt to get the user by authentication token
        const user = await getUserBySessionToken(sessionToken);

        // if user not found, then the user is not authenticated
        if (!user) {
            res.status(401).send();
        }

        // identity property into request property, so we can access this in other middleware
        merge(req, { identity: user });

        next();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
};

export const isOwner = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction // next function in middleware pipeline
) => {
    try {
        const { id } = req.params;
        // from authentication middleware get current user id
        // _id because mongoose auto generates id with the _ prefix
        const currentUserId = get(req, "identity._id") as string;

        if (!currentUserId) {
            res.status(403).send();
        }

        if (currentUserId.toString() !== id) {
            res.status(403).send();
        }

        next();
    } catch {
        console.log(error);
        res.status(500).send();
    }
};
