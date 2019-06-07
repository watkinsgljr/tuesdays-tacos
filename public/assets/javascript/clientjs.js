
const ordersUtil = require("../models/utilities.js");

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








$(".item2").on("click", function (event) {
    event.preventDefault();
    console.log("test");
    const id = $(this).data("id");
    console.log(id);
    ordersUtil.searchByItem(id, function (data) {
        console.log(data);
    })
});

