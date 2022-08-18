const { successResponse, errorResponse, moment } = require('../../utils');
const { Silmee } = require('../../models');
const axios = require('axios');

/**
 * API 670
 * @param {*} req
 * @param {*} res
 */
const create = async (req, res) => {
  try {
    const { deviceId } = req.body;
    const { data } = await axios.post(process.env.PROXY_SERVER, {
      method: 'POST',
      path: `${process.env.SILMEE_API_ENDPOINT}/service/login/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: process.env.SILMEE_USERNAME,
        password: process.env.SILMEE_PASSWORD
      }
    });
    const key = data.key;

    const result = await axios.post(process.env.PROXY_SERVER, {
      method: 'GET',
      path: `${process.env.SILMEE_API_ENDPOINT}/res/wristband/id/${deviceId}/`,
      headers: {
        Authorization: `Token ${key}`,
        'Content-Type': 'application/json',
      }
    });

    const silmee = await Silmee.create({
      userID: req.user.userID,
      deviceUser: result.data.device_user,
      deviceId: result.data.device_id,
      regDate: moment(Number(result.data.reg_date) * 1000).format('YYYY-MM-DD HH:mm:ss')
    });

    successResponse(req, res, { silmee });
  } catch (error) {
    errorResponse(req, res, error);
  }
}

/**
 * API 671
 * @param {*} req
 * @param {*} res
 */
 const show = async (req, res) => {
  try {
    const silmee = await Silmee.findOne({
      where: {
        userID: req.user.userID,
      },
      attributes: ['deviceId', 'deviceUser']
    })
    successResponse(req, res, { silmee });
  } catch (error) {
    errorResponse(req, res, error);
  }
}

/**
 * API 672
 * @param {*} req
 * @param {*} res
 */
 const state = async (req, res) => {
  try {
    const silmee = await Silmee.findOne({
      where: {
        userID: req.user.userID,
      },
      attributes: ['deviceId', 'deviceUser']
    })

    const { data: { key } } = await axios.post(process.env.PROXY_SERVER, {
      method: 'POST',
      path: `${process.env.SILMEE_API_ENDPOINT}/service/login/`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        username: process.env.SILMEE_USERNAME,
        password: process.env.SILMEE_PASSWORD
      }
    });

    const { data } = await axios.post(process.env.PROXY_SERVER, {
      method: 'GET',
      path: `${process.env.SILMEE_API_ENDPOINT}/res/wristband/id/${silmee.deviceId}/`,
      headers: {
        Authorization: `Token ${key}`,
        'Content-Type': 'application/json',
      }
    });
    const result = {
      deviceId: silmee.deviceId,
      deviceUser: silmee.deviceUser,
      model: data.model,
      version: data.version,
      label: data.label,
      battery: `${data.battery}%`,
      gateway: data.gateway,
      state: data.valid ? '有効' : '無効',
      error: '0 (SUCCESS)' // TODO
    }
    successResponse(req, res, { silmee: result });
  } catch (error) {
    errorResponse(req, res, error);
  }
}


module.exports =  {
  create,
  show,
  state,
}
