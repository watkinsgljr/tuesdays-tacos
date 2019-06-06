

function Order(id) {
    this.id = id;
    this.customer = null;
    this.orderStatus = "pending";
    this.price = 0;
    this.sales_tax = 0;
    this.total_price = 0;
    this.time_ordered = null;
    this.description = [];
  };


  module.exports = Order;