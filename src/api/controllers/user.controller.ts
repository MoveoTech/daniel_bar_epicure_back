import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../../config";
import { User, UserModel } from "../../db/user.model";

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!(username && password)) {
    res.status(400).send("All input is required");
  }

  try {
    const user = await UserModel.findOne({ username });
    // should use bycrypt
    // and maybe another middleware for password
    // move this to a handler
    if (user?.password === password) {
      jwt.sign(
        username,
        config.token.secret,
        { algorithm: "HS256" },
        (err, token) => {
          if (err) {
            console.log(err);
            throw err;
          } else if (token) {
            const _id = user?._id;
            const username = user?.username;
            res.status(200).json({
              token,
              user: {
                _id,
                username,
              },
              message: "auth successful",
            });
          }
        }
      );
    } else {
      res.status(400).send("wrong password");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
