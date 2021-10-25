require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken");
const { generateUser, generateCustomData } = require("./utils");
const { checkAuthentication, checkAuthorization } = require("./token");

const {
  PORT,
  API_PORT,
  CUSTOM_TOKEN_KEY,
  CUSTOM_TOKEN_HEADER,
  AUTHORIZATION_TOKEN_KEY,
  AUTHORIZATION_TOKEN_HEADER,
} = process.env;

const port = PORT || API_PORT;
const app = express();

app.use(express.json());
app.use(morgan("combined"));

app.get("/", (_request, response) => {
  response.json({ message: "Hello World!", data: generateUser() });
});

app.post("/login", (request, response) => {
  const token = jwt.sign(request.body, AUTHORIZATION_TOKEN_KEY, { expiresIn: "1m" });
  response.json({ token });
});

app.all("/whoami", (request, response) => {
  const { success, ...rest } = checkAuthentication(request.headers[AUTHORIZATION_TOKEN_HEADER]);
  response.status(success ? 200 : 401).json({ success, ...rest });
});

app.post("/authorize", (request, response) => {
  const payload = generateCustomData({ ...request.body });
  const token = jwt.sign(payload, CUSTOM_TOKEN_KEY, { expiresIn: "1d" });
  response.json({ token });
});

app.all("/authorized", (request, response) => {
  const { success, ...rest } = checkAuthorization(request.headers[CUSTOM_TOKEN_HEADER]);
  response.status(success ? 200 : 401).json({ success, ...rest });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
