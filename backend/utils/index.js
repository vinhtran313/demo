const moment = require('moment-timezone');
const crc32 = require('crc/crc32');
const bcrypt = require('bcryptjs')

moment.tz.setDefault('Asia/Tokyo')

const successResponse = (req, res, data, code = '000000') => res.send({
  code,
  data,
})

const errorResponse = (
  req,
  res,
  error,
  code = 422,
) => {
  console.log('エラー:', error)
  let err
  try {
    if (typeof error === 'string') {
      err = JSON.parse(error)
    } else {
      err = error
    }
  } catch (e) {
    err = error
  }
  return res.status(code).json({
    errorMessage: err && err.message,
    error: err.errors || err,
  })
}

function getUniqueStr(digits) {
  let randomStr = '';
  for (let i = 0; i < digits; i++) {
    randomStr += parseInt((Math.random() * 100) % 32).toString(32);
  }
  return randomStr;
}

function getNewUserId() {
  const pre = getUniqueStr(7);
  let hash = crc32(String(Date.now())).toString(16);
  while (hash.length < 8) hash += '0';
  return `${pre + hash}d`;
}

const getNewUserIdSuf = (suffix) => {
  const pre = getUniqueStr(7);
  let hash = crc32(String(Date.now())).toString(16);
  while (hash.length < 8) hash += '0';
  return `${pre + hash + suffix}`;
}

const generateHashPass = async (password) => {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  const hashed = await bcrypt.hash(password, salt)
  return hashed
}

function chunkArray(arr, chunkSize) {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      res.push(chunk);
  }
  return res;
}

module.exports = {
  getNewUserIdSuf,
  getNewUserId,
  getUniqueStr,
  errorResponse,
  successResponse,
  generateHashPass,
  chunkArray,
  moment
}
