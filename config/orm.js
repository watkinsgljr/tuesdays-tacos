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
    all: function (tableOne, tableTwo, tableThree, tableOneI1, tableOneI2, tableTwoI1, tableTwoI2, tableThreeI1, callback) {
        const queryString = "SELECT ??.??, ??.id, as 'order id',\
     ??.??, ??.??, ??.??, ??.??, \
      FROM ??\
      LEFT JOIN ?? ON ??.ordered_id = ??.id\
      LEFT JOIN ?? ON ??.id = ??.item_id;";


        connection.query(queryString, [tableOne, tableOneI1, tableOne, tableOne, tableOneI2, tableTwo,
            tableTwoI1, tableTwo, tableTwoI2, tableThree, tableThreeI1, tableOne, tableTwo, tableTwo,
            tableOne, tableThree, tableThree, tableTwo],
            function (err, result) {
                if (err) {
                    throw err;
                }
                callback(result);
            });
    },
    create: function (table, cols, vals, callback) {
        let queryString = "INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
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
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    },
    delete: function (table, condition, callback) {
        let queryString = "DELETE FROM " + table;
        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }

            callback(result);
        });
    }
};

// Export the orm object for the model (cat.js).
module.exports = orm;