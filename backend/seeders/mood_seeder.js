const { User, Mood, MoodDaily } = require("../models");
const { DEFAULT_USER_ID } = require("../constants");
const { randomValueInArray, randomValueInObject } = require("../utils/helper");
const { moment } = require("../utils");

async function createMoodsForTestUser() {
  for (let index = 0; index < 30; index++) {
    const mood = randomValueInObject(Mood.MOOD);
    await Mood.create({
      userID: DEFAULT_USER_ID,
      mood,
    });

    await MoodDaily.upsert({
      userID: DEFAULT_USER_ID,
      mood,
      date: moment().subtract(index, 'days').format('YYYY-MM-DD')
    });
  }
}

async function createMoods() {
  const users = await User.findAll({raw: true});
  for (let index = 0; index < 50; index++) {
    await Mood.create({
      userID: randomValueInArray(users).userID,
      mood: randomValueInObject(Mood.MOOD),
    });
  }
}

module.exports = {
  createMoods,
  createMoodsForTestUser,
};
