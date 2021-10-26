require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const { generateUser, generateCustomData } = require("./utils");
const { needsToBeAuthenticated, needsToBeVerified, needsToBeVIP } = require("./middlewares");
const {
  AuthorizationCookieName,
  AuthenticationCookieName,
  AuthenticationTokenExpireTime,
  AuthorizationTokenExpireTime,
} = require("./constants");

const { PORT, API_PORT, CUSTOM_TOKEN_KEY, AUTHORIZATION_TOKEN_KEY } = process.env;
const port = PORT || API_PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(helmet());

app.get("/", (_request, response) => {
  response.json({ message: "Hello World!" });
});

app.post("/login", (_request, response) => {
  const data = generateUser();
  const token = jwt.sign(data, AUTHORIZATION_TOKEN_KEY, {
    expiresIn: AuthenticationTokenExpireTime,
  });

  response
    .cookie(AuthenticationCookieName, token, { httpOnly: true, domain: "localhost" })
    .json({ token, data });
});

app.all("/whoami", [needsToBeAuthenticated], (request, response) => {
  response.json({ user: request.user });
});

app.post("/authorize", (request, response) => {
  const payload = generateCustomData({ ...request.body });
  const token = jwt.sign(payload, CUSTOM_TOKEN_KEY, { expiresIn: AuthorizationTokenExpireTime });

  response
    .cookie(AuthorizationCookieName, token, { httpOnly: true, domain: "localhost" })
    .json({ token });
});

app.all("/authorized", [needsToBeAuthenticated, needsToBeVerified], (request, response) => {
  response.json({ user: request.user });
});

app.all("/vip", [needsToBeAuthenticated, needsToBeVIP], (request, response) => {
  response.json({ user: request.user });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
