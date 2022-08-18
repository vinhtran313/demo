const { v4: uuidv4 } = require('uuid');
const { successResponse, errorResponse, getNewUserId, getUniqueStr } = require('../utils');
const { sequelize, User, UserPrivacy, UserSession } = require('../models');

/**
 * API 601
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const {
      area,
      givenNameKanji,
      familyNameKanji,
      sex,
      birthYear
    } = req.body;
    const userID = getNewUserId();
    const user = await User.create({
      userID,
      area,
      givenNameKanji,
      sex,
      birthYear
    }, { transaction });

    await UserPrivacy.create({
      userID: user.userID,
      givenNameKanji,
      familyNameKanji,
      birthYear,
      sex
    }, { transaction });

    const sessionKey = getUniqueStr(64);

    const userSession = await UserSession.create({
      userID: user.userID,
      sessionKey
    }, { transaction });

    await transaction.commit();
    return successResponse(req, res, { userID: user.userID, sessionKey: userSession.sessionKey });
  } catch (error) {
    await transaction.rollback();
    return errorResponse(req, res, error)
  }
}

/**
 * API 602
 * @param {*} req
 * @param {*} res
 */
const update = async (req, res) => {
  const userID = req.params.userID;
  const transaction = await sequelize.transaction()
  try {
    const {
      area,
      givenNameKanji,
      familyNameKanji,
      sex,
      birthYear
    } = req.body;
    const user = await User.findByPk(userID);
    await user.update({
      area,
      givenNameKanji,
      sex,
      birthYear
    }, { transaction });
    const userPrivacy = await UserPrivacy.findByPk(userID);
    await userPrivacy.update({
      givenNameKanji,
      familyNameKanji,
      birthYear,
      sex
    }, { transaction });
    await transaction.commit();
    return successResponse(req, res, {});
  } catch (error) {
    await transaction.rollback();
    return errorResponse(req, res, error)
  }
}

/**
 * API 603
 * @param {*} req
 * @param {*} res
 */
 const show = async (req, res) => {
  try {
    const userID = req.params.userID;
    const userPrivacy = await UserPrivacy.findByPk(userID, { attributes: ["familyNameKanji"] });
    const user = {
      userID: req.user.userID,
      givenNameKanji: req.user.givenNameKanji,
      birthYear: req.user.birthYear,
      sex: req.user.sex,
      area: req.user.area,
      familyNameKanji: userPrivacy.familyNameKanji
    }
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error)
  }
}


/**
 * API 212
 * @param {*} req
 * @param {*} res
 * @returns
 */
const regDevice = async (req, res) => {
  try {
    const {
      deviceType,
      deviceID,
      pushtoken,
    } = req.body;

    await req.user.update({
      deviceType,
      deviceId: deviceID,
      pushtoken,
    });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error)
  }
}

module.exports = {
  create,
  update,
  show,
  regDevice
}