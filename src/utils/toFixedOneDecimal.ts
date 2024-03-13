const ONE_DECIMAL = 1;

export const toFixedOneDecimal = (rating: number) => {
  return rating.toFixed(ONE_DECIMAL);
};
