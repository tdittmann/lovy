const longDate = (date: Date): string => {
  if (!date) {
    return "";
  }
  return date.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: '2-digit'});
};

export const DateUtils = {
  longDate,
};