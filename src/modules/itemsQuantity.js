const itemsQuantity = (basket) => {
  return basket.reduce((accum, item) => {
    return accum + item.count;
  }, 0);
};

export default itemsQuantity;
