import express from 'express';
import authentication from './authentication';
import users from './users';

const router = express.Router();

export default (): express.Router => {
    authentication(router); // Add the authentication routes to the router
    users(router) // Add the users routes to the router
    return router;
};