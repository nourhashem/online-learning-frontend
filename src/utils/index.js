const calculateAvatar = (name) => {
  if (name && typeof name === 'string' && name.length > 0) {
    return name
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('');
  } else {
    return 'N/A';
  }
};

const stringToColor = (string) => {
  if (!string) return 'blue';
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

const exports = {
  calculateAvatar,
  stringToColor,
};

export default exports;
