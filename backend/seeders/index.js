const { createUsers, createTestUser } = require('./user_seeder')
const { createNotices, createNoticesForTestUser } = require('./notice_seeder')
const { createKneepains, createKneepainsForTestUser } = require('./kneepain_seeder')
const { createMoods, createMoodsForTestUser } = require('./mood_seeder')
const { createFoods, createFoodsForTestUser } = require('./food_seeder')

async function run() {
  // await createUsers()
  await createTestUser()

  // await createNotices()
  await createNoticesForTestUser()

  // await createKneepains()
  await createKneepainsForTestUser()

  // await createMoods()
  await createMoodsForTestUser()

  // await createFoods()
  await createFoodsForTestUser()
}

run()