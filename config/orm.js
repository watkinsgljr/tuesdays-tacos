// Import MySQL connection.
const connection = require("../config/connection.js");


function printQuestionMarks(num) {
    const arr = [];

    for (i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    const arr = [];

    // loop through the keys and push the key/value as a string int arr
    for (const key in ob) {
        const value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {

            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = '"' + value + '"';
            }

            arr.push(key + " = " + value);
        }
    }

    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// Object for all our SQL statement functions.
const orm = {
    all: function (tableOne, tableTwo, tableThree, tableOneI1, tableOneI2, tableOneI3, tableOneI4, tableTwoI1, tableTwoI2, tableTwoI3, tableThreeI1, callback) {
        const queryString = 'SELECT ??.??, ??.id as order_id, ??.??, ??.??, ??.??, ??.??, ??.??, ??.?? FROM ??  LEFT JOIN ?? ON ??.?? = ??.id LEFT JOIN ?? ON ??.id = ??.item_id;';

        console.log(queryString);


        connection.query(queryString, [tableOne, tableOneI1, tableOne, tableOne, tableOneI2, tableTwo,
            tableTwoI1, tableTwo, tableTwoI2, tableThree, tableThreeI1, tableOne, tableOneI3, tableOne, tableOneI4, tableOne, tableTwo, tableTwo,
            tableTwoI3, tableOne, tableThree, tableThree, tableTwo],
            function (err, result) {
                console.log(queryString);
                if (err) {
                    throw err;
                }
                callback(result);
            });
    },

    pending: function (tableOne, tableTwo, tableThree, tableOneI1, tableOneI2, tableOneI3, tableOneI4, tableTwoI1, tableTwoI2, tableTwoI3, tableThreeI1, callback) {
        const queryString = "SELECT ??.??, ??.id as 'order_id',\
     ??.??, ??.??, ??.??, ??.??, ??.??\
      FROM ??\
      INNER JOIN ?? ON ??.?? = ??.id and ??.?? = 'pending'\
      LEFT JOIN ?? ON ??.id = ??.item_id;";


        connection.query(queryString, [tableOne, tableOneI1, tableOne, tableOne, tableOneI2, tableTwo,
            tableTwoI1, tableTwo, tableTwoI2, tableThree, tableThreeI1, tableOne, tableOneI4, tableOne, tableTwo, tableTwo,
            tableTwoI3, tableOne, tableOne, tableOneI3, tableThree, tableThree, tableTwo],
            function (err, result) {
                if (err) {
                    throw err;
                }
                callback(result);
            });
    },
    searchByItem: function (tableThree, condition, callback) {
        let queryString = "SELECT * from ?? WHERE ";
        queryString += condition;


        connection.query(queryString, [tableThree],
            function (err, result) {
                if (err) {
                    throw err;
                }
                callback(result);
            });
    },

    orderDetails: function (orderId, tableOne, tableTwo, tableThree, tableOneI1, tableOneI2, tableOneI3, tableOneI4, tableOneI5,
        tableOneI6, tableTwoI1, tableTwoI2, tableTwoI3, tableThreeI1, callback) {
        const queryString = "SELECT ??.??, ??.id as 'order_id',\
      ??.??, ??.??, ??.??, ??.??, ??.??,\
      ??.??, ??.??, ??.?? ??.??\
      FROM ??\
      INNER JOIN ?? ON ??.?? = ??.id and ??.id = " + orderId +
            "LEFT JOIN ?? ON ??.id = ??.item_id;";


        connection.query(queryString, [tableOne, tableOneI1, tableOne, tableOne, tableOneI2, tableOne, tableOneI3, tableOne,
            tableOneI4, tableOne, tableOneI5, tableOne, tableOneI6, tableTwo, tableTwoI1, tableTwo, tableTwoI2, tableTwo,
            tableTwoI3, tableThree, tableThreeI1, tableOne, tableTwo, tableTwo, tableTwoI3, tableOne, tableOne,
            tableThree, tableThree, tableTwo],
            function (err, result) {
                if (err) {
                    throw err;
                }
                callback(result);
            });
    },
    createOrder: function (tableOne, OrderObj, callback) {

        console.log("===========this is before the parse and object.values happen", OrderObj);
        OrderObj.price = parseFloat(OrderObj.price);
        OrderObj.sales_tax = parseFloat(OrderObj.sales_tax);
        OrderObj.total_price = parseFloat(OrderObj.total_price);

        let tableOneCols = Object.keys(OrderObj);
        let tableOneVals = Object.values(OrderObj);
        console.log("-------------ORDER OBJECT---------");
        console.log(OrderObj);


        let tableOneQueryString = "INSERT INTO " + tableOne;

        tableOneQueryString += " (";
        tableOneQueryString += tableOneCols.toString();
        tableOneQueryString += ") ";
        tableOneQueryString += "VALUES (";
        tableOneQueryString += printQuestionMarks(tableOneVals.length);
        tableOneQueryString += ") ";

        console.log(tableOneQueryString);
        console.log("=====================================  table one vals=======================");
        console.log(tableOneVals);

        connection.query(tableOneQueryString, tableOneVals, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);

        });

    },

    createItemsOrdered: function (tableTwo, itemsOrderedArray, orderId, callback) {

        console.log("=============items ordered method starts here================")

        console.log(orderId);

        const rows = [];
        let tableTwoCols = ["order_id"]
        tableTwoCols.push(Object.keys(itemsOrderedArray[0]));
        
        

        for (i = 0; i < itemsOrderedArray.length; i++) {

            itemsOrderedArray[i].order_id = orderId;
            let tableTwoVals = Object.values(itemsOrderedArray[i]);
            tableTwoCols = Object.keys(itemsOrderedArray[0]);
            rows.push(tableTwoVals);

        }

        console.log("ARRAY OF ARRAYS FOR BULK INSERT======================");
        console.log(rows);


            

            let tableTwoQueryString = "INSERT INTO " + tableTwo;

            tableTwoQueryString += " (";
            tableTwoQueryString += tableTwoCols.toString();
            tableTwoQueryString += ") ";
            tableTwoQueryString += "VALUES ?";

            console.log(tableTwoQueryString);

            connection.query(tableTwoQueryString, [rows], function (err, result) {
                if (err) {
                    throw err;
                }
                callback(result);
            });
        

    },

// An example of objColVals would be {name: panther, sleepy: true}
update: function (table, update, condition, callback) {
    let queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += update;
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function (err, result) {
        if (err) {
            throw err;
        }

        callback(result);
    });
},
deleteItemsOrdered: function (table, condition, callback) {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);

    connection.query(queryString, function (err, result) {
        if (err) {
            throw err;
        }

        callback(result);
    });

},
deleteOrder: function (table, condition, callback) {
    let queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;
    console.log(queryString);

    connection.query(queryString, function (err, result) {
        if (err) {
            throw err;
        }

        callback(result);
    });
},
getUniqueIds: function (array) {
    const uniqueIds = [];
    for (i = 0; i < array.length; i++) {
        if (uniqueIds.indexOf(array[i].order_id) === -1) {
            uniqueIds.push(array[i].order_id);
        }
    } return uniqueIds;
},
getMax: function (table, input, callback) {
    const queryString = "SELECT MAX(??) as 'order_id' from ??"
    connection.query(queryString, [input, table],
        function (err, result) {
            if (err) {
                throw err;
            }
            callback(result);
        });
}
};


module.exports = orm;
