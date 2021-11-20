const getPosition = (string, subString, index) =>
  string.split(subString, index).join(subString).length;

module.exports = { getPosition };
