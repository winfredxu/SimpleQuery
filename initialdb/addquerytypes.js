var mongodb = require('mongodb');
var fs = require('fs');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/simplequery';

fs.readFile('./db/querytypes.json', function(error, data){
    if(error) throw error;

    MongoClient.connect(url, function(err, db){
        if(err) throw err;

        db.collection('querytypes').insertMany(JSON.parse(data), function(er, result){
            if(er) throw er;

            console.info(result);

            db.close();
        })
    })
})

/*
MongoClient.connect(url, function(err, db){
    if(err) throw err;

    findAllQueryTypes(db, function(){
        db.close();
    });
});

var findAllQueryTypes = function(db, callback){
    db.collection('querytypes').find({}).toArray(function(err, results){
        callback(results);
        console.info(results);
        return results;
    })
};*/