require("dotenv").config();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
const FROM_EMAIL = process.env.FROM_EMAIL;
const SENDBIRD_API = process.env.SENDBIRD_API;


module.exports = {
  PORT,
  JWT_SECRET,
  MONGO_URI,
  FROM_EMAIL,
  SENDBIRD_API
};