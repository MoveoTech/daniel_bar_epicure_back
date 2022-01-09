import { config } from "../config";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers);

  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  
  if (token) {
    jwt.verify(token, config.token.secret, (err, decoded) => {
      if (err) {
        return res.status(404).json({
          message: err,
          err,
        });
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      message: "unauthorized",
    });
  }
};
