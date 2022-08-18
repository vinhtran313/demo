const { v4: uuidv4 } = require('uuid');
const { User, UserSession, UserPrivacy } = require('../models')
const { faker } = require('@faker-js/faker');
const { DEFAULT_SESSION_ID, DEFAULT_USER_ID } = require("../constants");
const { getNewUserId } = require('../utils')

async function createUsers() {
  for (let index = 0; index < 50; index++) {
    const user = await User.create({
      userID: getNewUserId(),
      area: User.AREAS.ITABASHI,
      deviceType: User.DEVICE_TYPE.IOS,
      givenNameKanji: faker.name.findName()
    });
    await UserPrivacy.create({
      userID: user.userID,
      givenNameKanji: user.givenNameKanji,
      familyNameKanji: faker.name.findName(),
    });
    await UserSession.create({
      userID: user.userID,
      sessionKey: uuidv4()
    });
  }
}

async function createTestUser() {
  const user = await User.create({
    userID: DEFAULT_USER_ID,
    area: User.AREAS.ITABASHI,
    deviceType: User.DEVICE_TYPE.IOS,
    givenNameKanji: "user_test"
  });
  await UserPrivacy.create({
    userID: DEFAULT_USER_ID,
    givenNameKanji: user.givenNameKanji,
    familyNameKanji: "user_test",
  });
  await UserSession.create({
    userID: DEFAULT_USER_ID,
    sessionKey: DEFAULT_SESSION_ID,
  });
}

module.exports = {
  createUsers,
  createTestUser,
}