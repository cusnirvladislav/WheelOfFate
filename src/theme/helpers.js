export const _getPreviousDate = date => {
  let yesterday = new Date(date);
  yesterday.setDate(yesterday.getDate() - 1);

  const dd = String(yesterday.getDate()).padStart(2, '0');
  const mm = String(yesterday.getMonth() + 1).padStart(2, '0');
  const yyyy = yesterday.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};
