const utils = {
  getRandomRGB: () => {
    return `rgb(${[1, 2, 3].map(() => Math.round(Math.random() * 256 || 0))})`;
  },
  sliceArrayIntoGroups: (arr, size) => {
    if (arr.length === 0) {
      return arr;
    }

    return [
      arr.slice(0, size),
      ...utils.sliceArrayIntoGroups(arr.slice(size), size),
    ];
  },
};

export default utils;
