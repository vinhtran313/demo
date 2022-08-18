const Joi = require('joi');

const { errorResponse } = require('../utils')

const createUserValidator = (req, res, next) => {
  const schema = Joi.object({
    familyNameKanji: Joi
      .string()
      .required()
      .label('お名前(姓)'),
    givenNameKanji: Joi
      .string()
      .required()
      .label('お名前(名)'),
    birthYear: Joi.any(),
    area: Joi.number(),
    sex: Joi.number()
  });
  try {
    const result = schema.validate(req.body);
    if (result.error) {
      errorResponse(req, res, result.error);
    } else {
      next();
    }
  } catch (error) {
    errorResponse(req, res, error);
  }
}

const regDeviceValidator = (req, res, next) => {
  const schema = Joi.object({
    pushtoken: Joi
      .string()
      .required()
      .max(255),
    deviceID: Joi
      .string()
      .required()
      .min(11),
    deviceType: Joi
      .string()
      .required(),
  });
  try {
    const result = schema.validate(req.body);
    if (result.error) {
      errorResponse(req, res, result.error);
    } else {
      next();
    }
  } catch (error) {
    errorResponse(req, res, error);
  }
}

module.exports = {
  createUserValidator,
  regDeviceValidator
}