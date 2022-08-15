export const handleRows = (rows) => {
  const data = rows.map((row, i) => {
    return {
      id: i,
      name: row.title,
    };
  });
  return data;
};
