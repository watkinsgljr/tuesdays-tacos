
let currentOrder;

let currentItem;

const itemCart = [];

let currentItemCustomization;



function ItemCustomization(currentItemObj) {
    this.lettuce = currentItemObj.lettuce;
    this.tomatoes = currentItemObj.tomatoes;
    this.onion = currentItemObj.onion;
    this.cheese = currentItemObj.cheese;
    this.sauce = currentItemObj.sauce;
    this.shell = currentItemObj.shell;
    this.shell_type = currentItemObj.shell_type;
}

function Order() {
    this.customer;
    this.order_status = "pending";
    this.price = 0;
    this.sales_tax;
    this.total_price;
}






//-------------------------------------------------CLICK EVENTS---------------------------------------------------------


$(".item2").on("click", function (event) {
    event.preventDefault();
    const id = $(this).data("id");


    $.ajax("/menu/" + id, {
        type: "GET"
    }).then(
        function (response) {

            console.log(response);

            currentItem = response.menuItem;
            console.log("------CURRENT ITEM------");
            console.log(currentItem);
            currentItemCustomization = new ItemCustomization(currentItem);
            console.log(currentItemCustomization);
            toppings = Object.keys(currentItemCustomization);
            for (i = 0; i < toppings.length; i++) {
                const topping = toppings[i];
                const amount = currentItemCustomization[toppings[i]];
                $("." + toppings[i]).data(topping, amount);
                $("." + topping + " .selection-btn ." + amount).trigger("click");
            };

            $(".user-selected").text(response.menuItem.item.replace("_", " "));
        }
    );

});

$(".selection-btn").on("click", function (event) {
    event.preventDefault();

    if (currentItemCustomization != undefined) {
        const amount = $(this)[0].outerText.toLowerCase();
        const topping = $(this)[0].childNodes[1].name;
        currentItemCustomization[topping] = amount;
        currentItem[topping] = amount;
        console.log(currentItem);
    }
    



});

$(".add-item-to-order").on("click", function () {

    itemCart.push(currentItem);
    
    if (currentOrder === undefined) {
        currentOrder = new Order();
        currentOrder.customer = $(".customer-name-field");
        currentOrder.price = parseFloat(currentItem.price.toFixed(2));
        currentOrder.sales_tax = parseFloat((currentOrder.price * .07).toFixed(2));
        currentOrder.total_price = currentOrder.price + currentOrder.sales_tax;
        $(".customer-name-field").attr('disabled', 'disabled');
        console.log(currentOrder);

    } else {
        currentOrder.price += parseFloat(currentItem.price).toFixed(2);
        currentOrder.sales_tax = parseFloat((currentItem.price * .07).toFixed(2));
        currentOrder.total_price = parseFloat((currentOrder.price + currentOrder.sales_tax).toFixed(2));
        console.log(currentOrder);
    }
    

    currentItem = null;
    $(".selection-btn").removeClass("active");
    console.log("Order Added");

});








