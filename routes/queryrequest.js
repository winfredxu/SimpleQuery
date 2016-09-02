exports.sendRequest = function(req, res, next){
    if(!req.body.queryrequest) return next(new Error('No request'));

    var queryrequest = req.body.queryrequest;

    var queryRequestJSON = JSON.parse(queryrequest);

    req.collections.queryrequests.insert(queryRequestJSON, function(error, sendResponse){
        if(error) return next(error);
        res.send(sendResponse);
    });
};