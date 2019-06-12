
// Import the ORM to create functions that will interact with the database.
const orm = require("../config/orm.js");
const Order = require("./order");
const ItemOrdered = require("./itemOrdered");
var moment = require("moment");

const ordersUtil = {
  all: function (callback) {
    orm.all("orders", "items_ordered", "menu", "customer", "total_price", "order_status", "time_ordered", "description", "quantity", "order_id", "item", function (res) {
      callback(res);
    });
  },
  pending: function (callback) {
    orm.pending("orders", "items_ordered", "menu", "customer", "total_price", "order_status", "time_ordered", "description", "quantity",
      "order_id", "item", function (res) {
        callback(res);
      });
  },
  searchByItem: function (condition, callback) {
    orm.searchByItem("menu", condition, function (res) {
        callback(res);
      });
  },
  orderDetails: function (callback) {
    orm.all(order.id, "orders", "items_ordered", "menu", "customer", "order_status", "price", "sales_tax",
      "total_price", "time_ordered", "description", "quantity", "order_id", "item", function (res) {
        callback(res);
      });
  },
  getLastOrder: function(callback) {
    orm.getMax("orders", "id", function(res) {
      callback(res);
    })
  },
  // The variables cols and vals are arrays.
  createOrder: function (OrderObj, callback) {
    orm.createOrder("orders", OrderObj, function (res) {
      callback(res);
    });
  },
  createItemsOrdered: function (itemsOrderedArray, orderId, callback) {
    orm.createItemsOrdered("items_ordered", itemsOrderedArray, orderId, function (res) {
      callback(res);
    });
  },
  
  update: function (update, condition, callback) {
    orm.update("orders", update, condition, function (res) {
      callback(res);
    });
  },
  deleteItemsOrdered: function (condition, callback) {
    orm.deleteItemsOrdered("items_ordered", condition, function (res) {
      callback(res);
    });
  },
  deleteOrder: function (condition, callback) {
    orm.deleteOrder("orders", condition, function (res) {
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
      console.log("inside loop 1", order.price);
      for (dataIndex = 0; dataIndex < dataArray.length; dataIndex++) {
        console.log("inside loop 2", order.price);
        if (dataArray[dataIndex].order_id === order.id) {
          console.log("inside if condition", order.price);
          order.price += dataArray[dataIndex].price;
          order.item = dataArray[dataIndex].item.replace("_", " ");
          order.sales_tax = parseInt(dataArray[dataIndex].sales_tax) + parseInt(order.sales_tax);
          order.total_price = dataArray[dataIndex].sales_tax + dataArray[dataIndex].price;
          const quantity = dataArray[dataIndex].quantity;
          const item = dataArray[dataIndex].item;
          itemDesc = {desc: dataArray[dataIndex].quantity + " " + dataArray[dataIndex].description};
          order.description.push(itemDesc);
          if (order.customer === null) {
            order.customer = dataArray[dataIndex].customer;
          }
          if (order.time_ordered === null) {
            order.time_ordered = ordersUtil.convertTime(dataArray[dataIndex].time_ordered);
          }

        }
      } 
      console.log(order);
      orderArray.push(order);
    } 
    console.log(orderArray);
    return orderArray;
  },
  convertTime: function(mySQLTime) {
    time = moment("'" + mySQLTime + "'").calendar();
    return time;
  },
  initOrder: function(menuItemObj) {
    const order = new Order(menuItemObj);
    const itemOrdered = new ItemOrdered(menuItemObj);
    return {order: order, itemOrdered: itemOrdered, menuItem: menuItemObj};

  }
};

// Export the database functions for the controller (catsController.js).
module.exports = ordersUtil;