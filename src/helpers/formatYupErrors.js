export const formatYupErrors = (errors, path) => {
  return errors.find((error) => error.path === path);
};
