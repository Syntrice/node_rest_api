import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose, { mongo } from "mongoose";
import router from "router";

// Setup the application. Works very much like asp.net

const app = express();

// Setup CORS
app.use(
  cors({
    credentials: true,
  })
);

// Configure dependencies
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

// Listen for requests on port 8080
server.listen(8080, () => {
  console.log("Server running on port http://localhost:8080/");
});

const DB_CONNECTION_STRING = process.env.DB_CONNECTION_STRING;

// Construct a promise for mongoose to connect to the database
mongoose.Promise = global.Promise;
mongoose.connect(DB_CONNECTION_STRING);
mongoose.connection.on("error", (err: Error) => console.error(err));

// use the router middleware on the root path
app.use('/', router())