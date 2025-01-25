const getFormattedDate = (date: string) => {
  return new Date(date).toLocaleString();
};

export { getFormattedDate };
