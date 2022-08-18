const {
  Sequelize, User
} = require('../../models')

const { successResponse, errorResponse } = require('../../utils')

const index = async (req, res) => {
  try {
    const PER_PAGE = 20
    const { keyword, userID } = req.query
    const page = parseInt(req.query.page, 10) || 1

    const offset = (page - 1 || 0) * PER_PAGE
    const conditions = {}

    if (keyword) {
      conditions.givenNameKanji = {
        [Sequelize.Op.like]: `%${keyword}%`,
      }
    }

    if (userID) {
      conditions.userID = {
        [Sequelize.Op.like]: `%${userID}%`,
      }
    }

    // TODO seach by familyNameKnaji

    const count = await User.count({
      where: conditions,
    })

    const paginate = {
      total: count,
      page,
      totalPage: Math.ceil(count / PER_PAGE),
      perPage: PER_PAGE,
    }

    const users = await User.findAll({
      where: conditions,
      offset,
      limit: PER_PAGE,
      attributes: ['userID', 'givenNameKanji' , 'birthYear', 'area'],
    })

    return successResponse(req, res, { users, paginate })
  } catch (error) {
    errorResponse(req, res, error);
  }
}

module.exports = {
  index
}