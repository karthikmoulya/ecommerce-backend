const memoryStore = require('../memoryStore');

const getStoreSummary = (req, res) => {
  res.json({
    totalOrders: memoryStore.orders.length,
    totalItemsPurchased: memoryStore.totalItemsPurchased,
    totalPurchaseAmount: memoryStore.totalPurchaseAmount,
    totalDiscountGiven: memoryStore.totalDiscountGiven,
    discountCodes: memoryStore.discountCodes,
  });
};

module.exports = {
  getStoreSummary,
};
