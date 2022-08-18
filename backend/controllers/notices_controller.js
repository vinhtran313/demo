const { Notice, NoticeUser } = require("../models");

const { successResponse, errorResponse } = require("../utils");

/**
 * API 612
 * @param {*} req
 * @param {*} res
 */
const index = async (req, res) => {
  try {
    const PER_PAGE = 20;
    const page = parseInt(req.query.page, 10) || 1;

    const offset = (page - 1 || 0) * PER_PAGE;
    const conditions = {};

    const count = await req.user.countNotices();

    const paginate = {
      total: count,
      page,
      totalPage: Math.ceil(count / PER_PAGE),
      perPage: PER_PAGE,
    };

    const notices = await req.user.getNotices({
      where: conditions,
      offset,
      limit: PER_PAGE,
      attributes: [
        "id",
        "title",
        "description",
        "area",
        ["insertTime", "createdAt"],
        ["updateTime", "updatedAt"],
      ],
      order: [["insertTime", "DESC"]],
    });

    return successResponse(req, res, { notices, paginate });
  } catch (error) {
    errorResponse(req, res, error);
  }
};

/**
 * API 613
 * @param {*} req
 * @param {*} res
 */
const show = async (req, res) => {
  try {
    const notice_id = req.params.notice_id;

    const notice = await Notice.findByPk(notice_id,{
      attributes: [
        "id",
        "title",
        "description",
        "area",
        ["insertTime", "createdAt"],
        ["updateTime", "updatedAt"],
      ],
    });

    return successResponse(req, res, { notice });
  } catch (error) {
    errorResponse(req, res, error);
  }
};

/**
 * API 614
 * @param {*} req
 * @param {*} res
 */
const read = async (req, res) => {
  try {
    const notice = await NoticeUser.findOne({
      where: {
        userID: req.user.userID,
        noticeId: req.params.notice_id
      }
    });
    await notice.update({
      read: true
    });
    return successResponse(req, res, {});
  } catch (error) {
    errorResponse(req, res, error);
  }
};


/**
 * API 615
 * @param {*} req
 * @param {*} res
 */
const unread = async (req, res) => {
  try {
    const unreadCount = await NoticeUser.count({
      where: {
        userID: req.user.userID,
        read: false
      }
    });
    return successResponse(req, res, { unreadCount });
  } catch (error) {
    errorResponse(req, res, error);
  }
}

module.exports = {
  index,
  show,
  read,
  unread
};
