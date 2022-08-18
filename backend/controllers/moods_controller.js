const { successResponse, errorResponse, moment } = require('../utils');
const { Sequelize, sequelize, Mood, MoodDaily } = require('../models');

/**
 * API 621
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const { mood } = req.body
    await Mood.create({
      userID: req.user.userID,
      mood
    }, { transaction });
    await MoodDaily.upsert({
      userID: req.user.userID,
      mood,
      date: moment().format('YYYY-MM-DD')
    }, { transaction });
    await transaction.commit();
    successResponse(req, res, { });
  } catch (error) {
    await transaction.rollback();
    return errorResponse(req, res, error)
  }
}

/**
 * API 622
 * @param {*} req
 * @param {*} res
 */
 const index = async (req, res) => {
  try {
    let offset = parseInt(req.query.offset, 10);
    offset = isNaN(offset) ? 0 : offset;
    const total = await req.user.countMoods();

    let moods = await req.user.getMoods({
      offset,
      limit: 10,
      order: [["insertTime", "DESC"]],
      attributes: ['mood', 'insertTime']
    })
    moods = moods.map(mood => ({
      mood: mood.mood,
      insertTime: moment(mood.insertTime).format('YYYY-MM-DD HH:mm:ss')
    })).reverse();
    successResponse(req, res, { moods, total });
  } catch (error) {
    return errorResponse(req, res, error)
  }
}

/**
 * API 623
 * @param {*} req
 * @param {*} res
 */
const statistics = async (req, res) => {
  try {
    const { from, to } = req.query;
    const moods = await MoodDaily.findAll({
      where: {
        userID: req.user.userID,
        date: {
          [Sequelize.Op.gte]: moment(from).format("YYYY-MM-DD"),
          [Sequelize.Op.lte]: moment(to).format("YYYY-MM-DD"),
        },
      },
      group: ['mood'],
      order: [["mood"]],
      attributes: ['mood', [sequelize.fn("COUNT", sequelize.col("date")), "count"]]
    });
    successResponse(req, res, { moods });
  } catch (error) {
    return errorResponse(req, res, error);
  }
}

module.exports = {
  create,
  index,
  statistics,
}