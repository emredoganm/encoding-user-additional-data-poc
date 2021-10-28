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

router.get("/allocations/:id", (request, response) => {
  response.json({ data: null, id: request.params.id });
});

router.get("/users/accountSettings", (_request, response) => {
  response.json(require("../responses/accountSettings.json"));
});

router.all("/ping", (_request, response) => {
  response.send(true);
});

router.all("/legal-entities", (_request, response) => {
  response.json({ data: [] });
});

module.exports = router;
