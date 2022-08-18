const Joi = require('joi');

const schema = Joi.object({
  oldPassword: Joi
    .string()
    .required()
    .label('現在のパスワード'),
    newPassword: Joi
    .string()
    .required()
    .label('新しいパスワード'),
});

const { errorResponse } = require('../../utils')

const changePasswordValidator = (req, res, next) => {
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
  changePasswordValidator
}
