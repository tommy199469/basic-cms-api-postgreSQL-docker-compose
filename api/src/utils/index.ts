const bcrypt = require("bcrypt");
import moment from "moment";
import jwt from "jsonwebtoken";

// import config
import {
  saltRounds,
  dateTimeFormat,
  jwtSecret,
  expirationTime,
} from "../config";

const handleErrorResponse = (
  response: any,
  code: number,
  errorCode: string
) => {
  return response
    .status(code || 500)
    .json({ status: false, error_code: errorCode || "system_error" });
};

const handleResponse = (response: any, data?: any, code?: number) => {
  return response.status(code || 200).json({ status: true, data });
};

// salted password hash function
const passwordHashWithSalt = (password: string) =>
  bcrypt.hashSync(password, saltRounds);

// password verification with salted hash
const verifyPassword = (password: string, passwordDB: string) =>
  bcrypt.compare(password, passwordDB);

// sign JWT token
const signJwt = (data: any) => {
  return jwt.sign(data, jwtSecret, { expiresIn: expirationTime });
};

const decodeJWT = (token: any) => {
  return jwt.verify(token, jwtSecret);
};

const formatDate = (date: any) => {
  return moment(date).format(dateTimeFormat);
};

export {
  formatDate,
  handleErrorResponse,
  handleResponse,
  passwordHashWithSalt,
  verifyPassword,
  signJwt,
  decodeJWT,
};
