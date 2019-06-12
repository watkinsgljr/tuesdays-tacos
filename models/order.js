

function Order(menuItemObjOrId) {

  if (typeof menuItemObjOrId === "object") {

    this.id;
    this.customer = menuItemObjOrId.customer;
    this.orderStatus = "pending";
    this.price = menuItemObjOrId.price;
    this.sales_tax = menuItemObjOrId.sales_tax;
    this.total_price = menuItemObjOrId.total_price;
    this.time_ordered;
    this.description = menuItemObjOrId.description;


  } else {


    this.id = menuItemObjOrId;
    this.item = null;
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