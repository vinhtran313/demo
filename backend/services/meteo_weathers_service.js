const axios = require("axios");
const geoCoder = require("./geocoder_service");

const WEATHER_SERVICE_URL = "https://api.open-meteo.com/v1/forecast";
const DEFAULT_PARAMS = {
  // Using celsius
  daily: "weathercode,temperature_2m_max,temperature_2m_min,weathercode",
  current_weather: true,
  timezone: "Japan",
};
const WEATHER_CODES = new Map();
WEATHER_CODES.set(0, "Clear sky");
WEATHER_CODES.set(1, "Mainly clear, partly cloudy, and overcast");
WEATHER_CODES.set(2, "Mainly clear, partly cloudy, and overcast");
WEATHER_CODES.set(3, "Mainly clear, partly cloudy, and overcast");
WEATHER_CODES.set(45, "Fog and depositing rime fog");
WEATHER_CODES.set(48, "Fog and depositing rime fog");
WEATHER_CODES.set(51, "Drizzle: Light, moderate, and dense intensity");
WEATHER_CODES.set(53, "Drizzle: Light, moderate, and dense intensity");
WEATHER_CODES.set(55, "Drizzle: Light, moderate, and dense intensity");
WEATHER_CODES.set(56, "Freezing Drizzle: Light and dense intensity");
WEATHER_CODES.set(57, "Freezing Drizzle: Light and dense intensity");
WEATHER_CODES.set(61, "Rain: Slight, moderate and heavy intensity");
WEATHER_CODES.set(63, "Rain: Slight, moderate and heavy intensity");
WEATHER_CODES.set(65, "Rain: Slight, moderate and heavy intensity");
WEATHER_CODES.set(66, "Freezing Rain: Light and heavy intensity");
WEATHER_CODES.set(67, "Freezing Rain: Light and heavy intensity");
WEATHER_CODES.set(71, "Snow fall: Slight, moderate, and heavy intensity");
WEATHER_CODES.set(73, "Snow fall: Slight, moderate, and heavy intensity");
WEATHER_CODES.set(75, "Snow fall: Slight, moderate, and heavy intensity");
WEATHER_CODES.set(77, "Snow grains");
WEATHER_CODES.set(80, "Rain showers: Slight, moderate, and violent");
WEATHER_CODES.set(81, "Rain showers: Slight, moderate, and violent");
WEATHER_CODES.set(82, "Rain showers: Slight, moderate, and violent");
WEATHER_CODES.set(85, "Snow showers slight and heavy");
WEATHER_CODES.set(86, "Snow showers slight and heavy");
WEATHER_CODES.set(95, "Thunderstorm: Slight or moderate");
WEATHER_CODES.set(96, "Thunderstorm with slight and heavy hail");
WEATHER_CODES.set(99, "Thunderstorm with slight and heavy hail");

const DEFAULT_LATITUDE = "10.8331008";
const DEFAULT_LONTITUDE = "106.6696704";
const DEFAULT_PAST_DAYS = 7;

const getCurrentWeather = async (
  latitude = DEFAULT_LATITUDE,
  longitude = DEFAULT_LONTITUDE
) => {
  const params = {
    ...DEFAULT_PARAMS,
    latitude,
    longitude,
    hourly: "relativehumidity_2m",
  };
  try {
    const [{ data }, location] = await Promise.all([
      axios.get(`${WEATHER_SERVICE_URL}`, { params }),
        geoCoder.reverse({ lat: latitude, lon: longitude })
      ]);
    console.log("current", data);
    const currentWeather = data.current_weather || {};
    const dailyWeather = data.daily || {};
    return {
      temperatureMax: dailyWeather.temperature_2m_max[0],
      temperatureMin: dailyWeather.temperature_2m_min[0],
      temperature: currentWeather.temperature,
      time: currentWeather.time,
      description: WEATHER_CODES.get(currentWeather.weathercode),
      location,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};

const getDailyWeather = async (
  latitude = DEFAULT_LATITUDE,
  longitude = DEFAULT_LONTITUDE
) => {
  const params = {
    ...DEFAULT_PARAMS,
    latitude,
    longitude,
  };

  try {
    const [{ data }, location] = await Promise.all([
      axios.get(`${WEATHER_SERVICE_URL}`, { params }),
        geoCoder.reverse({ lat: latitude, lon: longitude })
      ]);
    const dailyWeather = data.daily || {};
    return {
      daily: {
        time: dailyWeather.time,
        temperatureMins: dailyWeather.temperature_2m_min,
        temperatureMaxs: dailyWeather.temperature_2m_max,
        weatherDescription: dailyWeather.weathercode.map((code) =>
          WEATHER_CODES.get(code)
        ),
      },
      location,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
};

const getWeatherHistory = async (
  latitude = DEFAULT_LATITUDE,
  longitude = DEFAULT_LONTITUDE,
  pastDays = DEFAULT_PAST_DAYS,
) => {
  const params = {
    ...DEFAULT_PARAMS,
    latitude,
    longitude,
    past_days: pastDays,
  };
  try {
    const [{ data }, location] = await Promise.all([
      axios.get(`${WEATHER_SERVICE_URL}`, { params }),
        geoCoder.reverse({ lat: latitude, lon: longitude })
      ]);
    console.log("history data", data);
    const dailyWeather = data.daily || {};
    return {
      daily: {
        time: dailyWeather.time,
        temperatureMins: dailyWeather.temperature_2m_min,
        temperatureMaxs: dailyWeather.temperature_2m_max,
        weatherDescription: dailyWeather.weathercode.map((code) =>
          WEATHER_CODES.get(code)
        ),
      },
      location,
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
