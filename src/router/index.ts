import express from 'express';
import authentication from './authentication';

const router = express.Router();

export default (): express.Router => {
    authentication(router); // Add the authentication routes to the router
    return router;
};