const { User, Notice, NoticeUser } = require('../models')
const { faker } = require('@faker-js/faker');
const { DEFAULT_USER_ID } = require("../constants");

async function createNotices() {
  const user = await User.findOne({
    order: [ [ 'insertTime', 'ASC' ]]
  });
  for (let index = 0; index < 50; index++) {
    const notice = await Notice.create({
      title: faker.random.words(25),
      description: faker.random.words(100),
      area: Notice.AREAS.SPECIFIC
    });
    await NoticeUser.create({
      noticeId: notice.id,
      userID: user.userID,
      read: false
    });
  }
}

async function createNoticesForTestUser() {
  for (let index = 0; index < 30; index++) {
    const notice = await Notice.create({
      title: faker.random.words(25),
      description: faker.random.words(100),
      area: Notice.AREAS.SPECIFIC
    });
    await NoticeUser.create({
      noticeId: notice.id,
      userID: DEFAULT_USER_ID,
      read: false
    });
  }
}

module.exports = {
  createNotices,
  createNoticesForTestUser,
}