var express = require('express');
var routes = require('./routes');
var mongo = require('mongodb');
var http = require('http');
var path = require('path');
var mongoskin = require('mongoskin');
var bodyParser = require('body-parser');

var dbUrl = process.env.MONGOHQ_URL || "mongodb://@localhost:27017/simplequery"
var db = mongoskin.db(dbUrl, {safe: true});
var collections = {
    querytypes: db.collection('querytypes'),
    persons: db.collection('persons'),
    vehicles: db.collection('vehicles'),
    queryrequests: db.collection('queryrequests'),
    users:db.collection('users')
}

var app = express();
app.use(function(req, res, next){
    if(!collections.persons||!collections.querytypes) return next(Error('No collections'));
    req.collections = collections;
    return next();
})

app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.all("*", function(req, res){
    res.send('404');
})


var server = http.createServer(app);

var boot = function () {
    server.listen(
        app.get('port'), function () {
            console.log('Simplequery server is started......');
        }
    );
}

var shutdown = function () {
    server.close();
}

if(require.main === module){
    boot();
}
else{
    console.info('Running app as a module');
    exports.boot = boot;
    exports.shutdown = shutdown;
    exports.port = app.get('port');
}