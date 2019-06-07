


$(".item2").on("click", function (event) {
    event.preventDefault();
    console.log("test");
    const id = $(this).data("id");
    console.log(id);


    $.ajax("/menu/" + id, {
        type: "GET",
    }).then(
        function (res) {
            console.log("test");
            console.log(res);
            //   const selection = itemObj.item.replace("_", " ");
            //   console.log(selection);
            //   $(".user-selected").text(selection);


            // Reload the page to get the updated list
            //   location.reload();
        }
    );

});





// Make sure we wait to attach our handlers until the DOM is fully loaded.
// $(function() {



//     $(".item2").on("click", function(event) {
//       const id = $(this).data("id");
//       console.log(id);
//       ordersUtil.searchByItem(id, function(data){
//           console.log(data);
//       })
//     });





//   });



