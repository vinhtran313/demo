const { successResponse, errorResponse, moment } = require('../utils');
const { Food, Sequelize } = require('../models');

/**
 * API 641
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  try {
    const { foods } = req.body;
    const foodData = {
      userID: req.user.userID,
      date: moment().subtract(1, 'days').format('YYYY-MM-DD'),
      foodTotal: 0
    };
    let foodTotal = 0;
    for (let index = 1; index <= 10; index++) {
      const food = parseInt(foods[`food${index}`]) || 0
      foodData[`food${index}`] = food;
      if (food) {
        foodTotal++;
      }
    }
    foodData.foodTotal = foodTotal;
    await Food.upsert(foodData)
    successResponse(req, res, {});
  } catch (error) {
    errorResponse(req, res, error);
  }
}

/**
 * API 642
 * @param {*} req
 * @param {*} res
 */
const index = async (req, res) => {
  try {
    const { from, to } = req.query;
    const foods = await Food.findAll({
      where: {
        userID: req.user.userID,
        date: {
          [Sequelize.Op.gte]: moment(from).format('YYYY-MM-DD'),
          [Sequelize.Op.lte]: moment(to).format('YYYY-MM-DD'),
        }
      },
      order: [['date']],
      attributes: ['date', 'food1', 'food2', 'food3', 'food4', 'food5', 'food6', 'food7', 'food8', 'food9', 'food10']
    })
    successResponse(req, res, { foods });
  } catch (error) {
    errorResponse(req, res, error);
  }
}

module.exports =  {
  create,
  index
}
