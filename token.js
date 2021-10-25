const jwt = require("jsonwebtoken");
const { AUTHORIZATION_TOKEN_KEY, CUSTOM_TOKEN_KEY } = process.env;

const checkAuthentication = (token) => {
  return checkToken(token, AUTHORIZATION_TOKEN_KEY);
};

const checkAuthorization = (token) => {
  return checkToken(token, CUSTOM_TOKEN_KEY);
};

const checkToken = (token, key) => {
  try {
    const payload = jwt.verify(token, key);
    return { success: true, payload };
  } catch (error) {
    return { success: false, error };
  }
};

module.exports = { checkAuthentication, checkAuthorization, checkToken };
