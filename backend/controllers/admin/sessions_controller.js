const {
  Sequelize, Admin, UserSession
} = require('../../models')
const bcrypt = require('bcryptjs')

const { successResponse, errorResponse, getUniqueStr, moment } = require('../../utils')

/**
 * API 680
 * @param {*} req
 * @param {*} res
 * @returns
 */
const create = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      throw "メールアドレスまたはパスワードが違います"
    }

    const sessionKey = getUniqueStr(64);
    const userSession = await UserSession.create({
      userID: admin.id,
      sessionKey,
      expiresAt: moment().add(48, 'hours')
    }, {
      logging: false
    });

    return successResponse(req, res, {
      email,
      sessionKey: userSession.sessionKey
    });
  } catch (error) {
    errorResponse(req, res, error);
  }
}

/**
 * API 681
 * @param {*} req
 * @param {*} res
 * @returns
 */
 const destroy = async (req, res) => {
  try {
    const sessionKey = req.headers.sessionKey || req.headers.sessionkey;
    const userSession = await UserSession.findOne({
      where: {
        userID: req.user.id,
        sessionKey,
      },
      logging: false
    });
    await userSession.update({
      expiresAt: moment().format('YYYY-MM-DD HH:mm:ss')
    });
    return successResponse(req, res, {});
  } catch (error) {
    errorResponse(req, res, error);
  }
}


module.exports = {
  create,
  destroy
}