require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const { v1Router, generalRouter } = require("./routes");

const { PORT, API_PORT } = process.env;
const port = PORT || API_PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(helmet());

app.use("/api/v1", v1Router);
app.use("/", generalRouter);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
