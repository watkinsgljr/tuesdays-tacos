
// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");

const ordersUtil = {
  all: function(callback) {
    orm.all("orders", "items_ordered", "menu", "customer", "total_price", "description", "quantity", "order_id", "item", function(res) {
      callback(res);
    });
  },
  pending: function(callback) {
    orm.pending("orders","items_ordered", "menu", "customer", "total_price", "order_status", "description", "quantity", 
    "order_id", "item", function(res) {
      callback(res);
    });
  },
  orderDetails: function(callback) {
    orm.all(order.id, "orders","items_ordered", "menu", "customer", "order_status", "price", "sales_tax", 
    "total_price", "time_ordered", "description", "quantity", "order_id", "item", function(res) {
      callback(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(OrderObj, ItemOrderedObj, callback) {
    orm.create("orders", "items_ordered", OrderObj, ItemOrderedObj, function(res) {
      callback(res);
    });
  },
  update: function(conditionOne, conditionTwo, callback) {
    orm.update("orders", conditionOne, conditionTwo, function(res) {
      callback(res);
    });
  },
  delete: function(conditionOneKVP, conditionTwoKVP, callback) {
    orm.delete("orders", "items_ordered", conditionOneKVP, conditionTwoKVP, function(res) {
      callback(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = ordersUtil;