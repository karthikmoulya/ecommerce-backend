# 🛒 Ecommerce Store API

A simple **Ecommerce Store backend** where:

- Clients can **add items to cart**.
- **Checkout** to place an order.
- **Every N-th order (e.g., 3rd order)** generates a **10% discount code**.
- **Discount code** can be **applied to an order** once.
- **Admin** can view **store summary** like total sales, discount given, etc.

---

## 📦 Tech Stack

- Node.js
- Express.js
- In-memory storage (no database)

---

## 🚀 Getting Started

### 1. Clone the repository

-- git clone https://github.com/your-username/ecommerce-store.git
-- cd ecommerce-store

### 2. Install dependencies

-- npm install

### 3. Run the server

-- node app.js

-- By default, server runs at:  
-- http://localhost:3000

---

## 📬 API Endpoints

### 1. Add Item to Cart

**POST** `/cart/add`

| Field  | Type   | Required | Description                          |
| ------ | ------ | -------- | ------------------------------------ |
| userId | string | Yes      | Unique ID of the user                |
| item   | object | Yes      | Product info (name, price, quantity) |

**Example Request:**

```json
{
  "userId": "user1",
  "item": {
    "name": "Laptop",
    "price": 1000,
    "quantity": 1
  }
}

**Success Response:**
{
  "message": "Item added to cart"
}

### 2. Checkout Cart

**POST** `/cart/checkout`

-- Example Request (without discount code
{
  "userId": "user1"
}


-- Example Request (with discount code)

{
  "userId": "user1",
  "discountCode": "DISCOUNT10-1713669000000"
}


**Success Response:**
{
  "message": "Checkout successful",
  "order": {
    "orderId": "ORDER-1713671234567",
    "userId": "user1",
    "items": [
      {
        "name": "Laptop",
        "price": 1000,
        "quantity": 1
      }
    ],
    "totalAmount": 900,
    "discountApplied": 100,
    "discountCode": "DISCOUNT10-1713669000000"
  }
}


### 3. Admin: View Store Summary

**GET** `/admin/summary`


**Success Response:**
{
  "totalOrders": 5,
  "totalItemsPurchased": 15,
  "totalPurchaseAmount": 4500,
  "totalDiscountGiven": 450,
  "discountCodes": [
    {
      "code": "DISCOUNT10-1713669000000",
      "isUsed": true
    },
    {
      "code": "DISCOUNT10-1713670000000",
      "isUsed": false
    }
  ]
}
```

## 🧠 Discount Rules

### 🎁 Discount Generation

- After every **N-th order** (`ORDER_N = 3`), the system **automatically generates** a **10% discount code**.

### ✅ Discount Validity

- Discount codes can be **used only once**.
- The discount **applies to the entire cart total** (not a single item).

### 🏷️ Discount Code Format

- Format of the discount code is:
- DISCOUNT10-1713672000000
