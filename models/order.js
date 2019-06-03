

function Order(orderObj) {
    this.customer = orderObj.customer;
    this.filled = false;
    this.price;
    this.sales_tax;
    this.total_price;
  }