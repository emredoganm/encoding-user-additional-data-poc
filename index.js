require("dotenv").config();

const fs = require("fs");
const https = require("https");
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

const { v1Router, generalRouter } = require("./routes");
const { API_HTTP_PORT, API_HTTPS_PORT, SSL_CERT_PATH, SSL_KEY_PATH } = process.env;

const app = express();
const server = https.createServer(
  { key: fs.readFileSync(SSL_KEY_PATH), cert: fs.readFileSync(SSL_CERT_PATH) },
  app
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(helmet());
app.use(cors());

app.use("//api/v1", v1Router);
app.use("/", generalRouter);

app.listen(API_HTTP_PORT, () => {
  console.log(`Server is running on ${API_HTTP_PORT}`);
});

server.listen(API_HTTPS_PORT, () => {
  console.log(`Secured server also started on ${API_HTTPS_PORT}`);
});
