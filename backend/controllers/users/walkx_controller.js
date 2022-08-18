const { successResponse, errorResponse, moment } = require('../../utils');
const { Silmee } = require('../../models');
const axios = require('axios');

/**
 * API 661
 * @param {*} req
 * @param {*} res
 */
const minute = async (req, res) => {
  try {
    console.log('API 661', req.body)
    successResponse(req, res, {});
  } catch (error) {
    errorResponse(req, res, error);
  }
}

/**
 * API 662
 * @param {*} req
 * @param {*} res
 */
 const daily = async (req, res) => {
  try {
    console.log('API 662', req.body)
    successResponse(req, res, {});
  } catch (error) {
    errorResponse(req, res, error);
  }
}


module.exports =  {
  minute,
  daily
}
