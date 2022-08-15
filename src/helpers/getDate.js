export const getActualDate = (date) => {
  const actualDate = new Date(date);
  const month = actualDate.getMonth() + 1;
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  const actualMonth = months[month - 1];
  const actualDay = actualDate.getDate();
  const actualYear = actualDate.getFullYear();

  return `${actualDay} de ${actualMonth} de ${actualYear}`;
};
