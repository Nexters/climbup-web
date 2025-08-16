export const getDiffFromNow = (date: string) => {
  const diff = new Date(date).getTime() - Date.now();
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return diffDays;
};
