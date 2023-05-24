export const padNumber = (num: Number) => {
  return num >= 10 ? String(num) : `0${num}`;
};
