export const generateItemId = (): string => {
  const prefix = 'ITEM';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `${prefix}-${timestamp}${random}`;
};

export const generatePriceId = () => {
  const prefix = 'PRICE';
  const randomNum = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, '0');
  return `${prefix}-${randomNum}`;
};
