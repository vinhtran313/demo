const { Food } = require("../models");
const { getRandomInt } = require("../utils/helper");
const { moment } = require("../utils");
const { DEFAULT_USER_ID } = require("../constants");

async function createFoods() {
  const users = await User.findAll({ raw: true });
  for (let i = 0; i <= 30; i++) {
    let data = {
      food1: getRandomInt(0, 1),
      food2: getRandomInt(0, 1),
      food3: getRandomInt(0, 1),
      food4: getRandomInt(0, 1),
      food5: getRandomInt(0, 1),
      food6: getRandomInt(0, 1),
      food7: getRandomInt(0, 1),
      food8: getRandomInt(0, 1),
      food9: getRandomInt(0, 1),
      food10: getRandomInt(0, 1),
    };
    let foodTotal = 0;
    for (let index = 1; index <= 10; index++) {
      const food = data[`food${index}`];
      if (food) {
        foodTotal++;
      }
    }
    await Food.create({
      userID: randomValueInArray(users).userID,
      date: moment().subtract(i, "days"),
      foodTotal,
      ...data,
    });
  }
}

async function createFoodsForTestUser() {
  for (let i = 0; i <= 90; i++) {
    let data = {
      food1: getRandomInt(0, 1),
      food2: getRandomInt(0, 1),
      food3: getRandomInt(0, 1),
      food4: getRandomInt(0, 1),
      food5: getRandomInt(0, 1),
      food6: getRandomInt(0, 1),
      food7: getRandomInt(0, 1),
      food8: getRandomInt(0, 1),
      food9: getRandomInt(0, 1),
      food10: getRandomInt(0, 1),
    };
    let foodTotal = 0;
    for (let index = 1; index <= 10; index++) {
      const food = data[`food${index}`];
      if (food) {
        foodTotal++;
      }
    }
    await Food.create({
      userID: DEFAULT_USER_ID,
      date: moment().subtract(i, "days"),
      foodTotal,
      ...data,
    });
  }
}

module.exports = {
  createFoods,
  createFoodsForTestUser,
};
