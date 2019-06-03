

function TacoOrder(orderObj) {
    this.menu_item = orderObj.menu_item;
    this.customer = orderObj.cusotmer;
    this.order_id = orderObj.order_id;
    this.taco = orderObj.taco;
    this.customization = orderObj.customization;
    this.sauce = orderObj.sauce;
    this.filled = false;
  }