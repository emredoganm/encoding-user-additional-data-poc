const express = require("express");
const jwt = require("jsonwebtoken");

const { needsToBeAuthenticated, needsToBeVerified, needsToBeVIP } = require("../middlewares");
const { generateUser, generateCustomData } = require("../utils");
const { AUTHORIZATION_TOKEN_KEY, CUSTOM_TOKEN_KEY } = process.env;

const {
  AuthenticationTokenExpireTime,
  AuthorizationTokenExpireTime,
  AuthenticationCookieName,
  AuthorizationCookieName,
  CookieOptions,
} = require("../constants");

const router = express.Router();

router.all("/", (_request, response) => {
  response.send("Welcome to the awesome API!");
});

router.post("/login", (_request, response) => {
  const data = generateUser();
  const token = jwt.sign(data, AUTHORIZATION_TOKEN_KEY, {
    expiresIn: AuthenticationTokenExpireTime,
  });

  response.cookie(AuthenticationCookieName, token, CookieOptions).json({ token });
});

router.all("/whoami", [needsToBeAuthenticated], (request, response) => {
  response.json({ user: request.user });
});

router.post("/authorize", (request, response) => {
  const payload = generateCustomData({ ...request.body });
  const token = jwt.sign(payload, CUSTOM_TOKEN_KEY, { expiresIn: AuthorizationTokenExpireTime });

  response.cookie(AuthorizationCookieName, token, CookieOptions).json({ token });
});

router.all("/authorized", [needsToBeAuthenticated, needsToBeVerified], (request, response) => {
  response.json({ user: request.user });
});

router.all("/vip", [needsToBeAuthenticated, needsToBeVIP], (request, response) => {
  response.json({ user: request.user });
});

module.exports = router;
