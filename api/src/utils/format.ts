export const formatNumber = (value: number, decimals = 0) => {
  if (isNaN(value)) return 0;
  return `${Number(value)
    .toFixed(decimals)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};