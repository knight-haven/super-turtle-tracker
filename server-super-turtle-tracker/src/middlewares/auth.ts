import * as dotenv from "dotenv";
import express from "express";
import status = require("http-status");

dotenv.config();

const SECRET = process.env.BACKEND_SECRET;

const verifyAuth = (
  request: express.Request,
  response: express.Response,
  next: express.NextFunction,
): void => {
  let token = " ";
  if (request.headers.authorization !== undefined) {
    try {
      const [, tok] = request.headers.authorization.split(" ");
      token = tok;
    } catch (error) {
      response.status(status.UNAUTHORIZED).json("No Bearer Token given");
    }
  }
  if (token === SECRET) {
    next();
  } else {
    response.status(status.UNAUTHORIZED).json("Unauthorized Request");
  }
};

export default verifyAuth;
