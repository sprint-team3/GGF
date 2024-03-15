const ONE_DECIMAL = 1;

export const toFixedOneDecimal = (rating: number) => {
  return rating.toFixed(ONE_DECIMAL);
};

export const bytesToKilobytes = (bytes: number) => {
  const kilobytes = bytes / 1024;
  return kilobytes.toFixed(2);
};
