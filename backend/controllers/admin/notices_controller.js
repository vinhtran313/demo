const {
  Sequelize, sequelize, Notice, NoticeUser, User
} = require('../../models')

const { successResponse, errorResponse } = require('../../utils')

const create = async (req, res) => {
  const transaction = await sequelize.transaction()
  try {
    const {
      title, description, area, userIds
    } = req.body;
    const notice = await Notice.create({ title, description, area }, { transaction });
    // TODO move to job
    let targetUserIDs = []
    if ([Notice.AREAS.ITABASHI, Notice.AREAS.CHIYODA, Notice.AREAS.OTHER].includes(area)) {
      const users = await User.findAll({
        where: {
          area,
        },
        attributes: ['userID']
      });
      targetUserIDs = users.map(user => user.userID);
    } else if (userIds && userIds.length > 0 && Notice.AREAS.SPECIFIC === area) {
      targetUserIDs = userIds;
    } else if (Notice.AREAS.ALL === area) {
      const users = await User.findAll({ attributes: ['userID'] });
      targetUserIDs = users.map(user => user.userID);
    }
    const noticeUsers = targetUserIDs.map(userID => ({
      userID,
      noticeId: notice.id,
      read: false,
    }));
    await NoticeUser.bulkCreate(noticeUsers, { transaction });
    // TODO push notification to users
    await transaction.commit();
    return successResponse(req, res, { notice });
  } catch (error) {
    await transaction.rollback();
    return errorResponse(req, res, error)
  }
}

module.exports = {
  create
}