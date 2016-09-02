var person = require('./initialdb/addpersons');
var querytype = require('./initialdb/addquerytypes');
var user = require('./initialdb/addusers');
var vehicle = require('./initialdb/addvehicles');

querytype.insertquerytypes();
user.insertusers();
vehicle.insertVehicles();
person.insertpersons();