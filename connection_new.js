var mysql = require('mysql');

/* var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'tawk'
});

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'dvlp@T89',
    database : 'tawk',
	charset: 'latin1_swedish_ci'
}); */

var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'dvlp',
    password : 'dvlp@T89',
    database : 'tawk',
	charset: 'latin1_swedish_ci'
});

module.exports = {
    query: function(){
        var sql_args = [];
        var args = [];
        for(var i=0; i<arguments.length; i++){
            args.push(arguments[i]);
        }
        var callback = args[args.length-1]; //last arg is callback
        pool.getConnection(function(err, connection) {
        if(err) {
                console.log(err);
                callback(err);
                return;
            }
            if(args.length > 2){
                sql_args = args[1];
            }
        connection.query(args[0], sql_args, function(err, results) {
		//console.log("always put connection back in pool after last query ");
          connection.release(); // always put connection back in pool after last query
          if(err){
				/* console.log("Error in connection_new.js @@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!!!!!!!#####################################error while in connection : - ");
                    console.log(err);
                    callback(err);
                    return; */
					console.log("Error in connection_new.js @@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!!!!!!!#####################################error while in connection : - ");
					throw err;
                }
          callback(null, results);
        });
        });
    }
};