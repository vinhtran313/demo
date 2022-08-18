const Joi = require('joi');

const schema = Joi.object({
  title: Joi
    .string()
    .required()
    .label('タイトル'),
  description: Joi
    .string()
    .required()
    .label('お知らせ内容'),
  area: Joi
    .number()
    .required(),
  userIds: Joi
    .array()
});

const { errorResponse } = require('../utils')

module.exports = (req, res, next) => {
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