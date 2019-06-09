
let currentOrder;

let currentItem;

const itemCart = [];

let currentItemCustomization;

console.log(currentOrder);

// $(".tomatoes .selection-btn .xtra").trigger("click");

$('input[name=shell][id="soft"]').attr('checked', true);

console.log("should say reg above");

console.log($(".tomatoes"));

console.log("should say reg above");

function ItemCustomization(currentItemObj) {
    this.lettuce = currentItemObj.lettuce;
    this.tomatoes = currentItemObj.tomatoes;
    this.onion = currentItemObj.onion;
    this.cheese = currentItemObj.cheese;
    this.sauce = currentItemObj.sauce;
    this.shell = currentItemObj.shell;
    this.shell_type = currentItemObj.shell_type;
}






//-------------------------------------------------CLICK EVENTS---------------------------------------------------------


$(".item2").on("click", function (event) {
    event.preventDefault();
    console.log("test");
    const id = $(this).data("id");
    console.log(id);


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
                console.log($("." + toppings[i]).data(toppings[i]));
            };

            $(".user-selected").text(response.menuItem.item.replace("_", " "));
        }
    );

});

$(".selection-btn").on("click", function (event) {
    event.preventDefault();

    console.log($(this));

    if (currentItemCustomization != undefined) {
        const amount = $(this)[0].outerText.toLowerCase();
        const topping = $(this)[0].childNodes[1].name;
        currentItemCustomization[topping] = amount;

        console.log(currentItemCustomization);
    }
    



});



// function makeButtonActive(element) {
//     elemet1.addClass("focus active");
//     element2.removeClass("focus active");
//     element3.removeClass("focus active");
//     element.removeClass("focus active");
// };


// function switchSelection(selection) {
//     elemement.data(selection)

// };

// $(".lettuce").data("lettuce")
// $(".tomatoes").data("lettuce"
// $(".onion").data("lettuce"
// $(".cheese").data("lettuce"
// $(".sauce").data("lettuce"
// $(".shell").data("lettuce"
// $(".shell_type").data("lettuce"








