const { User, KneePain, KneePainDaily } = require("../models");
const { DEFAULT_USER_ID } = require("../constants");
const { randomValueInArray, randomValueInObject } = require("../utils/helper");
const { moment } = require("../utils");

async function createKneepainsForTestUser() {
  for (let index = 0; index < 30; index++) {
    const kneePain = randomValueInObject(KneePain.KNEE_PAIN);
    await KneePain.create({
      userID: DEFAULT_USER_ID,
      kneePain,
    });

    await KneePainDaily.upsert({
      userID: DEFAULT_USER_ID,
      kneePain,
      date: moment().subtract(index, 'days').format('YYYY-MM-DD')
    });
  }
}

async function createKneepains() {
  const users = await User.findAll({raw: true});
  for (let index = 0; index < 50; index++) {
    await KneePain.create({
      userID: randomValueInArray(users).userID,
      kneePain: randomValueInObject(KneePain.KNEE_PAIN),
    });
  }
}

module.exports = {
  createKneepains,
  createKneepainsForTestUser,
};
