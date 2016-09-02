var mongodb = require('mongodb');
var dburl = 'mongodb://127.0.0.1:27017/simplequery';
var MongoClient = mongodb.MongoClient;
var fs = require('fs');

fs.readFile('./db/'+'persons.json', function(error, data){
    MongoClient.connect(dburl, function(err, db){
        db.collection('persons').insertMany(JSON.parse(data), function(err, result){
            if(err) throw err;

            console.log(result);

            db.close();
        })
    })
});

