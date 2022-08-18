const axios = require("axios");
const Time = require("../utils/Time");
const { convertDateToUnixTime } = require("../utils/Time");
const geoCoder = require("./geocoder_service");

const WEATHER_SERVICE_URL = "https://api.openweathermap.org/data/2.5";
const DEFAULT_PARAMS = {
  // Using celsius
  units: "metric",
  lang: "ja",
  appid: process.env.OPEN_WEATHER_MAP_API_KEY,
};
const DEFAULT_LATITUDE = "10.8331008";
const DEFAULT_LONTITUDE = "106.6696704";

const getCurrentWeather = async (
  lat = DEFAULT_LATITUDE,
  lon = DEFAULT_LONTITUDE
) => {
  const params = {
    ...DEFAULT_PARAMS,
    lat,
    lon,
  };
  try {
    const [{ data }, location] = await Promise.all([
      axios.get(`${WEATHER_SERVICE_URL}/onecall`, { params }),
        geoCoder.reverse({ lat, lon })
      ]);
    Time.mutateObjectProperty("dt", Time.convertUnixTimeToDate, data);
    let currentDateData = data.daily[0];
    console.log(data, location);
    const { temp, humidity } = currentDateData;
    const weather = currentDateData.weather?.[0] || {};
    return {
      temperatureDay: temp.day,
      temperatureMax: temp.max,
      temperatureMin: temp.min,
      temperatureAverage: temp.eve,
      humidity,
      weather,
      location,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};

const getDailyWeather = async (
  lat = DEFAULT_LATITUDE,
  lon = DEFAULT_LONTITUDE
) => {
  const params = {
    ...DEFAULT_PARAMS,
    lat,
    lon,
  };

  try {
    const [{ data }, location] = await Promise.all([
      axios.get(`${WEATHER_SERVICE_URL}/onecall`, { params }),
        geoCoder.reverse({ lat, lon })
      ]);
    Time.mutateObjectProperty("dt", Time.convertUnixTimeToDate, data);
    let dailyWeather = data.daily.map((weather) => {
      return {
        temperatureDay: weather.temp.day,
        temperatureMax: weather.temp.max,
        temperatureMin: weather.temp.min,
        temperatureAverage: weather.temp.eve,
        humidity: weather.humidity,
        weather: weather.weather,
        time: weather.dt,
      };
    });
    console.log(data);
    return {
      daily: dailyWeather,
      location,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};

const getWeatherHistory = async (
  lat = DEFAULT_LATITUDE,
  lon = DEFAULT_LONTITUDE,
  time
) => {
  time = time
    ? convertDateToUnixTime(time)
    : convertDateToUnixTime(new Date().setDate(new Date().getDate() - 4));
  const params = {
    ...DEFAULT_PARAMS,
    lat,
    lon,
    dt: time,
  };
  try {
    const { data } = await axios.get(
      `${WEATHER_SERVICE_URL}/onecall/timemachine`,
      {
        params,
      }
    );
    Time.mutateObjectProperty("dt", Time.convertUnixTimeToDate, data);
    console.log("history data", data, params);
    let dailyWeather = data.daily.map((weather) => {
      return {
        temperatureDay: weather.temp.day,
        temperatureMax: weather.temp.max,
        temperatureMin: weather.temp.min,
        temperatureAverage: weather.temp.eve,
        humidity: weather.humidity,
        weather: weather.weather,
        time: weather.dt,
      };
    });
    return {
      daily: dailyWeather,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};
module.exports = {
  getCurrentWeather,
  getDailyWeather,
  getWeatherHistory,
};
