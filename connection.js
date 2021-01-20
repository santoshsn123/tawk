var mysql      = require('mysql');
 var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'dvlp@T89',
    database    : 'tawk',
	
});
 

var connectionState = false;
/* var connection =  mysql.createConnection({
  host : 'localhost',
    user : 'root',
    password: '',
    database:'tawk'
  }); */
 
connection.on('close', function (err) {
  console.log('mysqldb conn close');
  connectionState = false;
});
connection.on('error', function (err) {
  console.log('mysqldb error: ' + err);
  connectionState = false;
});
function handleDisconnect()
{
    if(!connectionState){
    connection = mysql.createConnection(connection.config);
    connection.connect(function (err) {
      // connected! (unless `err` is set)
      if (err) {
        console.log('mysql db unable to connect: ' + err);
        connectionState = false;
      } else {
       console.log('mysql connect!');

        connectionState = true;
		
      }
    });
    connection.on('close', function (err) {
     console.log('mysqldb conn close');
      connectionState = false;
    });
    connection.on('error', function (err) {
      console.log('mysqldb error: ' + err);
 
      if (err){
        connectionState = false;
      }
 
    });
  }
}
 
handleDisconnect(connection);
setInterval(function(){
/* console.log('not connected, attempting reconnect'+connectionState); */
  if(!connectionState){
    console.log('not connected, attempting reconnect');
    handleDisconnect(connection);
  }
}, 1000);
exports.UTF8MB4_UNICODE_CI   = 224;
 module.exports = connection;