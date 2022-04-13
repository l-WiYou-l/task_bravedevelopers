const lastIndexPosition = (string, aIndex, bIndex) => {
  if (string.length || typeof string !== "number") {
    for (let i = string.length; i > 0; i--) {
      if (string[i] === aIndex || string[i] === bIndex) return i;
    }
  }
  return -1;
};
