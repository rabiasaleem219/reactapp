export const titleToUrl = (title) => {
  return title && title.toLowerCase().split(" ").join("-");
};
