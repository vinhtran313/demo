const { Admin } = require("../models");
const { generateHashPass, getNewUserId } = require("../utils");

async function createAdmin() {
  await Admin.create({
    id: getNewUserId(),
    email: 'admin@infodeliver.com',
    password: await generateHashPass('passw0rd')
  }).catch((err) => { console.error(err) });
}

createAdmin();

module.exports = {
  createAdmin,
};
