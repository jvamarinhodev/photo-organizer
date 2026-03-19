export const normalizeDate = (date) => {
  if (!date) return null;

  let parsedDate;

  if (typeof date === 'number') {
    parsedDate = new Date(date * 1000);
  } else if (date instanceof Date) {
    parsedDate = date;
  } else {
    parsedDate = new Date(date);
  }

  if (isNaN(parsedDate.getDate())) {
    return null;
  }

  return parsedDate.toISOString();
};
