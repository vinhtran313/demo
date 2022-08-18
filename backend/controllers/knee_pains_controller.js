const { successResponse, errorResponse, moment } = require("../utils");
const { Sequelize, sequelize, KneePain, KneePainDaily } = require("../models");

/**
 * API 631
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const { kneePain } = req.body;
    await KneePain.create({
      userID: req.user.userID,
      kneePain,
    }, { transaction });
    await KneePainDaily.upsert({
      userID: req.user.userID,
      kneePain,
      date: moment().format('YYYY-MM-DD')
    }, { transaction });
    await transaction.commit();
    successResponse(req, res, {});
  } catch (error) {
    await transaction.rollback();
    return errorResponse(req, res, error);
  }
};

/**
 * API 632
 * @param {*} req
 * @param {*} res
 */
const index = async (req, res) => {
  try {
    let offset = parseInt(req.query.offset, 10);
    offset = isNaN(offset) ? 0 : offset;

    const total = await req.user.countKneePains();
    let kneePains = await req.user.getKneePains({
      offset,
      limit: 10,
      order: [["insertTime", "DESC"]],
      attributes: ["kneePain", "insertTime"],
    });
    kneePains = kneePains.map((kneePain) => ({
      kneePain: kneePain.kneePain,
      insertTime: moment(kneePain.insertTime).format("YYYY-MM-DD HH:mm:ss"),
    })).reverse();
    successResponse(req, res, { kneePains, total });
  } catch (error) {
    return errorResponse(req, res, error);
  }
};

/**
 * API 633
 * @param {*} req
 * @param {*} res
 */
const statistics = async (req, res) => {
  try {
    const { from, to } = req.query;
    const kneePains = await KneePainDaily.findAll({
      where: {
        userID: req.user.userID,
        date: {
          [Sequelize.Op.gte]: moment(from).format("YYYY-MM-DD"),
          [Sequelize.Op.lte]: moment(to).format("YYYY-MM-DD"),
        },
      },
      group: ['kneePain'],
      order: [["kneePain"]],
      attributes: ['kneePain', [sequelize.fn("COUNT", sequelize.col("date")), "count"]]
    });
    successResponse(req, res, { kneePains });
  } catch (error) {
    return errorResponse(req, res, error);
  }
}

module.exports = {
  create,
  index,
  statistics
};
