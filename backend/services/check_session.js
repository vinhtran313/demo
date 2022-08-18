
const { User, UserSession, Admin, Sequelize } = require('../models');
const { errorResponse, moment } = require('../utils')

async function checkSession(req, res, next) {
  try {
    console.log('req.headers', req.headers);
    const userID = req.headers.userID || req.headers.userid;
    const sessionKey = req.headers.sessionKey || req.headers.sessionkey;
    if (!userID || !sessionKey) {
      throw new Error('userIDまたはsessionKeyがありません。')
    }
    const userSession = await UserSession.findOne({
      where: { userID, sessionKey },
      logging: false
    });
    if (userSession) {
      const user = await User.findByPk(userID);
      req.user = user;
      next();
    } else {
      const error = '認証エラー'
      errorResponse(req, res, error, 401);
    }
  } catch (error) {
    errorResponse(req, res, error);
  }
}

async function checkAdminSession(req, res, next) {
  try {
    console.log('req.headers', req.headers);
    const userID = req.headers.userID || req.headers.userid;
    const sessionKey = req.headers.sessionKey || req.headers.sessionkey;
    if (!userID || !sessionKey) {
      throw new Error('userIDまたはsessionKeyがありません。')
    }
    const userSession = await UserSession.findOne({
      where: {
        userID,
        sessionKey,
        expiresAt: {
          [Sequelize.Op.gte]: moment().format('YYYY-MM-DD HH:mm:ss'),
        }
      },
      logging: false
    });
    if (userSession) {
      const user = await Admin.findByPk(userID);
      req.user = user;
      next();
    } else {
      const error = '認証エラー'
      errorResponse(req, res, error, 401);
    }
  } catch (error) {
    errorResponse(req, res, error);
  }
}


module.exports =  {
  checkSession,
  checkAdminSession
}