exports.list = function(req, res, next){
    req.collections.querytypes.find({}).toArray(function(error, items){
        if(error) return next(error);

        res.send({querytypes: items});
    });
};