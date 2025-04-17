const memoryStore = require('../memoryStore');

const addItemToCart = (req, res) => {
  const { userId, item } = req.body;
  if (!userId || !item) {
    return res.status(400).json({ message: 'userId and item are required' });
  }

  if (!memoryStore.carts[userId]) {
    memoryStore.carts[userId] = [];
  }
  memoryStore.carts[userId].push(item);

  res.json({ message: 'Item added to cart successfully.' });
};

const checkoutCart = (req, res) => {
  const { userId, discountCode } = req.body;
  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  const cartItems = memoryStore.carts[userId];
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  // Calculate total
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  let discountApplied = 0;
  let discountCodeUsed = null;

  if (discountCode) {
    const codeObj = memoryStore.discountCodes.find(
      (c) => c.code === discountCode && !c.isUsed
    );
    if (!codeObj) {
      return res
        .status(400)
        .json({ message: 'Invalid or expired discount code' });
    }
    discountApplied = total * 0.1;
    total = total - discountApplied;
    codeObj.isUsed = true;
    discountCodeUsed = discountCode;
  }

  const order = {
    orderId: `ORDER-${Date.now()}`,
    userId,
    items: cartItems,
    totalAmount: total,
    discountApplied,
    discountCode: discountCodeUsed,
  };

  memoryStore.orders.push(order);

  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  memoryStore.totalItemsPurchased += itemCount;
  memoryStore.totalPurchaseAmount += total;
  memoryStore.totalDiscountGiven += discountApplied;

  memoryStore.carts[userId] = []; // Empty cart

  let discountCodeGenerated = null;
  if (memoryStore.orders.length % memoryStore.ORDER_N === 0) {
    const timestamp = Date.now();
    const newCode = `DISCOUNT10-${timestamp}`;
    memoryStore.discountCodes.push({ code: newCode, isUsed: false });
    discountCodeGenerated = newCode;
  }

  res.json({
    message: 'Checkout successful!',
    order,
    ...(discountCodeGenerated ? { discountCodeGenerated } : {}),
  });
};

module.exports = {
  addItemToCart,
  checkoutCart,
};
