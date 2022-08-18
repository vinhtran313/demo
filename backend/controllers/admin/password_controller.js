const {
  sequelize, UserSession
} = require('../../models')
const bcrypt = require('bcryptjs')

const { successResponse, errorResponse, generateHashPass, moment, getUniqueStr } = require('../../utils')

const update = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const { oldPassword, newPassword } = req.body
    if (!bcrypt.compareSync(oldPassword, req.user.password)) {
      throw new '現在のパスワードは正しくありません'
    }

    await req.user.update({
      password: await generateHashPass(newPassword),
    }, { transaction });

    await UserSession.update({
      expiresAt: moment(),
    }, {
      where: {
        userID: req.user.id,
      },
      transaction
    });

    const sessionKey = getUniqueStr(64);
    const userSession = await UserSession.create({
      userID: req.user.id,
      sessionKey,
      expiresAt: moment().add(48, 'hours')
    }, {
      logging: false,
      transaction
    });

    await transaction.commit();
    return successResponse(req, res, {
      sessionKey: userSession.sessionKey
    });
  } catch (error) {
    await transaction.rollback();
    return errorResponse(req, res, error)
  }
}

module.exports = {
  update
}