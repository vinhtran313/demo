let nodeGeocoder = require("node-geocoder");
let options = {
  provider: "openstreetmap",
};

let geoCoder = nodeGeocoder(options);

reverse = async ({ lat, lon }) => {
  try {
    let [location] = await geoCoder.reverse({ lat, lon });
    return {
      address: location.formattedAddress,
      country: location.country,
      city: location.city,
      state: location.state,
      lat,
      lon,
    };
  } catch (error) {
    return {};
  }
};

module.exports = {
  reverse
};
