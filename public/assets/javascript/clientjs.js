
currentOrder = null;

currentItem = null;

itemCart = [];

console.log(currentOrder);

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
            const currentItemCustomization = new ItemCustomization();
            const radioSelections = $('.lettuce').data("lettuce")
            console.log(radioSelections);

            $(".user-selected").text(response.menuItem.item.replace("_", " "));
        }
    );

});

$(".item2").on("click", function (event) {
    event.preventDefault();


});



function makeButtonActive(element) {
    elemet1.addClass("focus active");
    element2.removeClass("focus active");
    element3.removeClass("focus active");
    element.removeClass("focus active");
};


function switchSelection(selection) {
    elemement.data(selection)

};

$(".lettuce").data("lettuce")
$(".tomatoes").data("lettuce"
$(".onion").data("lettuce"
$(".cheese").data("lettuce"
$(".sauce").data("lettuce"
$(".shell").data("lettuce"
$(".shell_type").data("lettuce"








