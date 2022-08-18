const { successResponse, errorResponse } = require("../utils");
const WeathersService = require("../services/meteo_weathers_service");

const current = async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const weather = await WeathersService.getCurrentWeather(lat, lon);
    return successResponse(req, res, { weather });
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const daily = async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const weather = await WeathersService.getDailyWeather(lat, lon);
    return successResponse(req, res, { weather });
  } catch (error) {
    errorResponse(req, res, error);
  }
};

const history = async (req, res) => {
  try {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const time = req.query.time;
    const weather = await WeathersService.getWeatherHistory(lat, lon, time);
    return successResponse(req, res, { weather });
  } catch (error) {
    errorResponse(req, res, error);
  }
};

module.exports = {
  current,
  daily,
  history,
};
