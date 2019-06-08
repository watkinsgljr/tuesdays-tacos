
currentOrder = null;

currentItem = null;

itemCart = [];

console.log(currentOrder);






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

            $(".user-selected").text(response.menuItem.item.replace("_", " "));
        }
    );

});

$(".item2").on("click", function (event) {
    event.preventDefault();


});








