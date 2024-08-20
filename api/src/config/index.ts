import "dotenv/config";

const saltRounds = process.env.SALT || 10;

const dateTimeFormat = "YYYY-MM-DD HH:MM:SS";

const jwtSecret = process.env.JWT_SECRET;

const awsRegion = process.env.AWS_REGION || "ap-east-1";

const authEndpoint = process.env.AUTH_ENDPOINT || "http://localhost:6005/auth";
const expirationTime = process.env.EXPIRE || 24 * 60 * 60;


export {
  saltRounds,
  dateTimeFormat,
  jwtSecret,
  awsRegion,
  authEndpoint,
  expirationTime,
};
