
const express = require("express");

const router = express.Router();

// Import the model (cat.js) to use its database functions.
const itemOrdered = require("../models/itemOrdered.js");
const order = require("../models/order.js");
const ordersUtil = require("../models/utilities.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  ordersUtil.all(function(data) {
    const allOrdersObject = {
      orders: data
    };
    console.log(allOrdersObject);
    res.render("index", allOrdersObject);
  });
});

router.get("/pending", function(req, res) {
    ordersUtil.pending(function(data) {
      const pendingOrdersObject = {
        pendingOrders: data
      };
      console.log(pendingOrdersObject);
      res.render("index", pendingOrdersObject);
    });
  });

router.post("/api/cats", function(req, res) {
  cat.create([
    "name", "sleepy"
  ], [
    req.body.name, req.body.sleepy
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/cats/:id", function(req, res) {
  const condition = "id = " + req.params.id;

  console.log("condition", condition);

  cat.update({
    sleepy: req.body.sleepy
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/cats/:id", function(req, res) {
  const condition = "id = " + req.params.id;

  cat.delete(condition, function(result) {
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