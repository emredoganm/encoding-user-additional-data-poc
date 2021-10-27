const AuthorizationCookieName = "__Awesome_Authorization_Cookie";
const AuthenticationCookieName = "__Authentication_COOKIE";
const AuthenticationTokenExpireTime = "5m";
const AuthorizationTokenExpireTime = "1d";
const CookieOptions = { httpOnly: true, domain: "localhost" };

module.exports = {
  AuthenticationCookieName,
  AuthorizationCookieName,
  AuthorizationTokenExpireTime,
  AuthenticationTokenExpireTime,
  CookieOptions,
};
