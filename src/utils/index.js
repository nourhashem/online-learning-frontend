const calculateAvatar = (user) => {
  if (user.name && typeof user.name === 'string' && user.name.length > 0) {
    return user.name
      .split(' ')
      .map((word) => word[0].toUpperCase())
      .join('');
  } else {
    return 'N/A';
  }
};

const exports = {
  calculateAvatar,
};

export default exports;
