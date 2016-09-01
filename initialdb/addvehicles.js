var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var fs = require('fs');
var dburl = process.env.MONGOHQ_URL || "mongodb://localhost:27017/simplequery";

fs.readFile(__dirname + '/db/'+ 'vehicles.json', function(error, data){
    if(error) throw error;

    MongoClient.connect(dburl, function(err, db){
        if(err) throw err;

        db.collection('vehicles').insertMany(JSON.parse(data), function(error, result){
            if(error) throw error;
            console.info(result);

            db.close();
        })
    });
});