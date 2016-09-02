var mongodb = require('mongodb');
var fs = require('fs');
var MongoClient = mongodb.MongoClient;
var dburl = process.env.MONGOHQ_URL || "mongodb://localhost:27017/simplequery";

exports.insertusers = function () {
    fs.readFile('./db/' + 'users.json', function (error, data) {
        if (error) throw error;

        MongoClient.connect(dburl, function (er, db) {
            if (er) throw er;
            db.collection('users').insertMany(JSON.parse(data), function (er, result) {
                if (er) throw er;

                console.info(result);

                db.close();
            })
        })
    });
}