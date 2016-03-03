
exports.query = function(pool, queryString, dataObject, callback) {
    pool.getConnection(function(err, db) {
        if (err){
            console.log('Error while getting Pool Connection ', err.stack);
        	return callback(err, null);
        }
        console.log("queryString :: ",queryString)
        db.query(queryString, dataObject, function(error, rows, fields) {

            db.release();
            
            if (error){
                console.log(" Query Execution Error ::"+JSON.stringify(error))
            	callback(error,null);
            }else{
                callback(null, rows);
            }
        });
    });
}
