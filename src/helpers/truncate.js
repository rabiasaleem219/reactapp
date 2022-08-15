export const truncate = (str, n) => {
  str = str.replace(/<(?:.|\n)*?>/gm, '');
  return str.length > n ? `${str.substr(0, n - 1)}...` : str;
};
