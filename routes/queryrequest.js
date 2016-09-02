exports.sendRequest = function(req, res, next){
    if(!req.body.queryrequest) return next(new Error('No request'));
    var queryRequestJSON = JSON.parse(req.body.queryrequest);

    //Saves request to db first
    req.collections.queryrequests.insert(queryRequestJSON, function(error, sendResponse){
        if(error) return next(error);
            //Finds the query type of the request.
           var queryCriteria = {};
           for(requestField in queryRequestJSON.RequestData){
               if(queryRequestJSON.RequestData[requestField] != ''){
                   if(requestField != 'Cellphone'){
                       queryCriteria[requestField] = queryRequestJSON.RequestData[requestField];
                   }
                   else{
                       queryCriteria["ContactInfo.Cellphone"] = queryRequestJSON.RequestData[requestField];;
                   }
               }
           }

           var queryName = queryRequestJSON.QueryName;

           if(queryName == 'PersonQuery'){
               req.collections.persons.find(queryCriteria).toArray(function(er, responses){
                   if(er) return next(er);
                   res.send({responses: responses});
               })
           }
           else if(queryName == 'VehicleQuery'){
               req.collections.vehicles.find(queryCriteria).toArray(function(er, responses){
                   if(er) return next(er);
                   res.send({responses: responses});
               })
           }

    });
};