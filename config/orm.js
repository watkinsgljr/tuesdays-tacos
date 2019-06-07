// Import MySQL connection.
const connection = require("../config/connection.js");


function printQuestionMarks(num) {
    const arr = [];

    for (const i = 0; i < num; i++) {
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
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
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
      LEFT JOIN ?? ON ??.?? = ??.id and ??.?? = 'pending'\
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
    create: function (tableOne, tableTwo, OrderObj, ItemOrderedObj, callback) {

        tableOneCols = Object.keys(OrderObj);
        tableTwoCols = Object.keys(ItemOrderedObj);
        tableOneVals = Object.values(OrderObj);
        tableTwoVals = Object.values(ItemOrderedObj);

        let tableOneQueryString = "INSERT INTO " + tableOne;

        tableOneQueryString += " (";
        tableOneQueryString += orderCols.toString();
        tableOneQueryString += ") ";
        tableOneQueryString += "VALUES (";
        tableOneQueryString += printQuestionMarks(orderVals.length);
        tableOneQueryString += ") ";

        console.log(tableOneQueryString);

        let tableTwoQueryString = "INSERT INTO " + tableTwo;

        tableTwoQueryString += " (";
        tableTwoQueryString += orderCols.toString();
        tableTwoQueryString += ") ";
        tableTwoQueryString += "VALUES (";
        tableTwoQueryString += printQuestionMarks(orderVals.length);
        tableTwoQueryString += ") ";

        console.log(tableTwoQueryString);

        connection.query(tableOneQueryString, tableOneVals, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });

        connection.query(tableTwoQueryString, tableTwoVals, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    update: function (table, objColVals, condition, callback) {
        let queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += objToSql(condition);

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    },
    delete: function (tableOne, tableTwo, conditionOne, conditionTwo, callback) {
        let tableOneQueryString = "DELETE FROM " + tableOne;
        tableOneQueryString += " WHERE ";
        tableOneQueryString += conditionOne;

        connection.query(tableOneQueryString, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });

        let tableTwoQueryString = "DELETE FROM " + tableTwo;
        tableTwoQueryString += " WHERE ";
        tableTwoQueryString += conditionTwo;

        connection.query(tableTwoQueryString, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    },
    getUniqueIds: function(array) {
        const uniqueIds = [];
        for (i = 0; i < array.length; i++) {
            if (uniqueIds.indexOf(array[i].order_id) === -1) {
                uniqueIds.push(array[i].order_id);
            }
        } return uniqueIds;
    }
};


module.exports = orm;
