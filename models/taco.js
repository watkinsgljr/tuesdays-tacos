

function TacoOrdered(orderObj) {
    this.order_id;
    this.taco_id = orderObj.taco_id;
    this.quantity = orderObj.quantity;
    this.description = orderObj.description.toString();
  }