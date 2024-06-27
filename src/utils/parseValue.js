function parseValue(value) {
  // Check if the value is a string that represents a number
  if (
    typeof value === "string" &&
    !isNaN(parseFloat(value)) &&
    isFinite(value)
  ) {
    // Attempt to convert the string to a number
    return Number(value);
  } else {
    // Keep the value as a string if it's not a numeric string
    return value;
  }
}

module.exports = { parseValue };
