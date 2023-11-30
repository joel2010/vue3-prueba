const currencyFormat = (value: number | undefined) => {
  if (value === undefined) return '';
  return Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export default currencyFormat;
