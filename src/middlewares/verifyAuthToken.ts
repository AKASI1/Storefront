import { NextFunction, Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  const token = authorizationHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. Token missing.");
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET as string);
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
    return;
  }
};

export default verifyAuthToken;