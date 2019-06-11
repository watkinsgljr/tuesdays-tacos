
const express = require("express");

const router = express.Router();


const itemOrdered = require("../models/itemOrdered.js");
const order = require("../models/order.js");
const ordersUtil = require("../models/utilities.js");


// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  ordersUtil.all(function(data) {
    const uniqueIds = ordersUtil.getUniqueIds(data);
    data = ordersUtil.groupOrders(uniqueIds, data);

    const ordersObject = {
      orders: data,
      pending: false,
    };

    


    res.render("index", ordersObject);
  });
});

router.get("/pending", function(req, res) {
    ordersUtil.pending(function(data) {
      const uniqueIds = ordersUtil.getUniqueIds(data);
      data = ordersUtil.groupOrders(uniqueIds, data);

      const ordersObject = {
        orders: data,
        pending: true,
      };



      res.render("index", ordersObject);
    });
  });
  router.get("/menu/:id", function(req, res) {
    const condition = "id = " + req.params.id;
  
  
    ordersUtil.searchByItem(condition, function(data) {

      const orderDataObj = ordersUtil.initOrder(data[0]); 

      res.send(orderDataObj);
    });
  });

router.post("/new-order", function(req, res) {

  ordersUtil.createOrder(req.body.order, function(result) {
    console.log("Order Added successfully 1!");

    
    // Send back the ID of the new quote
      console.log(result);
      console.log("Order Added successfully!");
      res.json({ id: result.insertId });

  });
});

router.post("/new-item-ordered", function(req, res) {
  console.log("-----123---------THIS IS THE REQ BODY!!---------------");
  console.log(req.body);
  ordersUtil.createItemsOrdered(req.body.itemCart, req.body.order.id, function(result) {

    
    // Send back the ID of the new quote
      console.log("Items Added successfully!");
      res.send({ id: result.insertId });

  });
});

router.put("/change-status/:id", function(req, res) {
  const condition = "id = " + req.params.id;

  console.log("condition", condition);

  ordersUtil.update({
    order_status: "completed"
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/delete-item-ordered/:id", function(req, res) {
  const condition = "order_id = " + req.params.id;

  ordersUtil.deleteItemsOrdered(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/delete-order/:id", function(req, res) {
  const condition = "id = " + req.params.id;

  ordersUtil.deleteOrder(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;