const { checkAuthentication, checkAuthorization } = require("./token");
const { AuthenticationCookieName, AuthorizationCookieName } = require("./constants");
const { AUTHORIZATION_TOKEN_HEADER, CUSTOM_TOKEN_HEADER } = process.env;

const needsToBeAuthenticated = (request, response, next) => {
  const token =
    request.headers[AUTHORIZATION_TOKEN_HEADER] || request.cookies[AuthenticationCookieName];
  const { success, payload } = checkAuthentication(token);

  if (success) {
    const { iat, exp, ...rest } = payload;
    request.user = rest;
    return next();
  }

  response.status(401).json({ success: false, message: "Unauthorized!" });
};

const needsToBeAuthorized =
  (statusKey = null, message = "Unauthorized!") =>
  (request, response, next) => {
    const token = request.headers[CUSTOM_TOKEN_HEADER] || request.cookies[AuthorizationCookieName];
    const { success, payload } = checkAuthorization(token);

    if (payload[statusKey] && success) {
      const { iat, exp, ...rest } = payload;
      request.user = { ...request.user, ...rest };
      return next();
    }

    response.status(401).json({ success: false, message });
  };

const needsToBeVerified = needsToBeAuthorized("isVerified", "You should be a verified user!");
const needsToBeVIP = needsToBeAuthorized("isVIP", "This action is only for our VIP customers!");

module.exports = { needsToBeAuthenticated, needsToBeAuthorized, needsToBeVerified, needsToBeVIP };
