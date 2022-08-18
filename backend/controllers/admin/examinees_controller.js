const {
  Sequelize, Examinee
} = require('../../models')

const { successResponse, errorResponse } = require('../../utils')

/**
 * API
 * @param {*} req
 * @param {*} res
 * @returns
 */
 const index = async (req, res) => {
  try {
    return successResponse(req, res, {})
  } catch (error) {
    errorResponse(req, res, error);
  }
}


/**
 * API
 * @param {*} req
 * @param {*} res
 * @returns
 */
const create = async (req, res) => {
  try {
    const { username, password } = req.body;

    return successResponse(req, res, {})
  } catch (error) {
    errorResponse(req, res, error);
  }
}

/**
 * API
 * @param {*} req
 * @param {*} res
 * @returns
 */
 const update = async (req, res) => {
  try {
    const { username, password } = req.body;

    return successResponse(req, res, {})
  } catch (error) {
    errorResponse(req, res, error);
  }
}

module.exports = {
  index,
  create,
  update
}