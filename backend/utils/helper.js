module.exports = {
  /**
   * @param {Array} arr
   * @returns {*}
   */
  randomValueInArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },

  /**
   * @param {Object} obj
   * @returns {*}
   */
  randomValueInObject(obj) {
    let keys = Object.keys(obj);
    return obj[keys[Math.floor(keys.length * Math.random())]];
  },

  /**
   * @param {Number} min
   * @param {Number} max
   * @returns {Number}
   */
  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // maximum is inclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
};
