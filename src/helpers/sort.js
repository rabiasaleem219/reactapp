export const sortByCreateDate = (lessons, quizzes) => {
  return [...lessons, ...quizzes].sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });
};
