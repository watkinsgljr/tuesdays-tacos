

function Order(orderObjOrId) {

  if (typeof orderObjOrId === "object") {

    this.id;
    this.customer = orderObjOrId.customer;
    this.orderStatus = "pending";
    this.price = orderObjOrId.price;
    this.sales_tax = orderObjOrId.sales_tax;
    this.total_price = orderObjOrId.total_price;
    this.time_ordered;
    this.description = orderObjOrId.description;


  } else {


    this.id = orderObjOrId;
    this.customer = null;
    this.orderStatus = "pending";
    this.price = 0;
    this.sales_tax = 0;
    this.total_price = 0;
    this.time_ordered = null;
    this.description = [];
  };

}


module.exports = Order;