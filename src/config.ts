import dotenv from "dotenv";

dotenv.config();

const ACCESS_TOKEN_SECRET = process.env.SERVER_TOKEN_SECRET || "danielsecret";

const token = {
  secret: ACCESS_TOKEN_SECRET,
};

export const config = {
  token,
};
