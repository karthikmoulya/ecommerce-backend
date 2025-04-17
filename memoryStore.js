const memoryStore = {
  carts: {}, // { userId: [ { item details } ] }
  orders: [], // list of all orders
  discountCodes: [], // { code, isUsed }
  totalItemsPurchased: 0,
  totalPurchaseAmount: 0,
  totalDiscountGiven: 0,
  ORDER_N: 3, // Every 3rd order gets a discount
};

module.exports = memoryStore;
