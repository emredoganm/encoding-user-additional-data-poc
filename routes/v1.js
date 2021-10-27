const express = require("express");
const router = express.Router();

router.get("/", (_request, response) => {
  response.json({ message: "Hello World!" });
});

router.get("/subdomains/:siteName", (request, response) => {
  response.json({ siteName: request.params.siteName, ...require("../responses/subdomains.json") });
});

router.get("/countries", (_request, response) => {
  response.json(require("../responses/countries.json"));
});

router.get("/context/secondary-market/windows", (_request, response) => {
  response.json(require("../responses/secondaryMarketWindows.json"));
});

router.get("/users/profile-status", (_request, response) => {
  response.json(require("../responses/profileStatus.json"));
});

router.get("/investments/:id", (request, response) => {
  response.json({ id: request.params.id, ...require("../responses/investment-details.json") });
});

router.get("/investments", (_request, response) => {
  response.json(require("../responses/investments.json"));
});

module.exports = router;
