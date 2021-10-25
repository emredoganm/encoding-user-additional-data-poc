const { name, internet, datatype } = require("faker");

const generateUser = (override = {}) => {
  const firstName = name.firstName();
  const lastName = name.lastName();
  return {
    name: `${firstName} ${lastName}`,
    email: internet.email(firstName, lastName).toLocaleLowerCase(),
    ...override,
  };
};

const generateCustomData = (override = {}) => {
  return {
    isVerified: datatype.boolean(),
    isVIP: datatype.boolean(),
    ...override,
  };
};

module.exports = { generateCustomData, generateUser };
