const { v4: uuidv4 } = require('uuid');
const { successResponse, errorResponse, moment } = require('../utils');
const { Food, MoodDaily, KneePainDaily } = require('../models');


/**
 * API 6xx
 * @param {*} req
 * @param {*} res
 */
 const index = async (req, res) => {
  try {
    const today = moment(req.query.date).format('YYYY-MM-DD')
    const yesterday = moment(req.query.date).subtract(1, 'd').format('YYYY-MM-DD')

    // TODO https://sequelize.org/docs/v6/core-concepts/assocs/#foohasmanybar

    const food = await Food.findOne({
      where: {
        userID: req.user.userID,
        date: yesterday
      }
    });

    const moodDaily = await MoodDaily.findOne({
      where: {
        userID: req.user.userID,
        date: today
      }
    });

    const kneePainDaily = await KneePainDaily.findOne({
      where: {
        userID: req.user.userID,
        date: today
      }
    });

    const foodCount = food ? food.foodTotal : 0;
    const mood = moodDaily ? moodDaily.mood : 0;
    const kneePain = kneePainDaily ? kneePainDaily.kneePain : 0;

    return successResponse(req, res, {
      mood,
      kneePain,
      foodCount,
    });
  } catch (error) {
    return errorResponse(req, res, error)
  }
}

module.exports = {
  index,
}