var Connection = require("tedious").Connection;
var Request = require("tedious").Request;
var TYPES = require('tedious').TYPES;
require('dotenv').config();


const config = {
    userName: process.env.SQL_USERNAME, 
    server: process.env.SQL_SERVER, 
    password: process.env.SQL_PASSWORD,
    port: 1433,
    authentication: {
        options: {
        userName: process.env.SQL_USERNAME, 
        server: process.env.SQL_SERVER, 
        password: process.env.SQL_PASSWORD ,
        port:1433
        },
        type: "default"
        
    },
    
    options: {
        database: process.env.SQL_DBNAME, 
        encrypt: true,
        validateBulkLoadParameters: true
    }
    };

    exports.getView = function(query) {
    return new Promise(function(resolve, reject) {
        var connection = new Connection(config);

        connection.on("connect", function(err) {

            if (err) {
                console.log(err);
                reject(err);
            }
            var result = [];
            var request = new Request(query, function(err, row) {
                if (err) {
                    console.log("Error in if" + err);
                    reject(err);
                }
                resolve(result);
                connection.close();
            });

            request.on("row", function(columns) {
                    //console.log(columns);
                    var rowObject = {};
                    columns.forEach(function(column) {
                    var colName = column.metadata.colName;
                    //console.log(column.value);
                    if (column.value === null) rowObject[colName] = "";
                    else rowObject[colName] = column.value;
                });
                result.push(rowObject);
                rowObject = {};
            });
            connection.execSql(request);
        });
    });
};
