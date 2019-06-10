

function ItemOrdered(menuItemObj) {
    this.order_id;
    this.item_id = menuItemObj.id;
    this.quantity = menuItemObj.quantity;
    this.description;

  }


  module.exports = ItemOrdered;

  