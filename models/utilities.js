
// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");
const Order = require("./order");
const ItemOrdered = require("./itemOrdered");
var moment = require("moment");

const ordersUtil = {
  all: function (callback) {
    orm.all("orders", "items_ordered", "menu", "customer", "total_price", "description", "quantity", "order_id", "item", function (res) {
      callback(res);
    });
  },
  pending: function (callback) {
    orm.pending("orders", "items_ordered", "menu", "customer", "total_price", "order_status", "time_ordered", "description", "quantity",
      "order_id", "item", function (res) {
        callback(res);
      });
  },
  orderDetails: function (callback) {
    orm.all(order.id, "orders", "items_ordered", "menu", "customer", "order_status", "price", "sales_tax",
      "total_price", "time_ordered", "description", "quantity", "order_id", "item", function (res) {
        callback(res);
      });
  },
  // The variables cols and vals are arrays.
  create: function (OrderObj, ItemOrderedObj, callback) {
    orm.create("orders", "items_ordered", OrderObj, ItemOrderedObj, function (res) {
      callback(res);
    });
  },
  update: function (conditionOne, conditionTwo, callback) {
    orm.update("orders", conditionOne, conditionTwo, function (res) {
      callback(res);
    });
  },
  delete: function (conditionOneKVP, conditionTwoKVP, callback) {
    orm.delete("orders", "items_ordered", conditionOneKVP, conditionTwoKVP, function (res) {
      callback(res);
    });
  },
  getUniqueIds: function (array) {
    const uniqueIds = [];
    for (i = 0; i < array.length; i++) {
      if (uniqueIds.indexOf(array[i].order_id) === -1) {
        uniqueIds.push(array[i].order_id);

      }
    } return uniqueIds;
  },
  groupOrders: function (uniqueIdsArray, dataArray) {
    const orderArray = [];
    for (idIndex = 0; idIndex < uniqueIdsArray.length; idIndex++) {
      const order = new Order(uniqueIdsArray[idIndex]);
      console.log(order);
      for (dataIndex = 0; dataIndex < dataArray.length; dataIndex++) {
        if (dataArray[dataIndex].order_id === order.id) {
          order.price += parseFloat(dataArray[dataIndex].price);
          order.sales_tax += parseFloat(dataArray[dataIndex].sales_tax);
          order.sales_tax += parseFloat([dataIndex].sales_tax);
          const quantity = dataArray[dataIndex].quantity;
          const item = dataArray[dataIndex].item;
          itemDesc = {desc: dataArray[dataIndex].quantity + " " + dataArray[dataIndex].item};
          order.description.push(itemDesc);
          console.log(order.description);
          if (order.customer === null) {
            order.customer = dataArray[dataIndex].customer;
          }
          if (order.time_ordered === null) {
            order.time_ordered = ordersUtil.convertTime(dataArray[dataIndex].time_ordered);
          }

        }
      } orderArray.push(order);
    } 
    console.log(orderArray);
    return (orderArray);
  },
  convertTime: function(mySQLTime) {
    time = moment("'" + mySQLTime + "'").calendar();
    return time;
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = ordersUtil;