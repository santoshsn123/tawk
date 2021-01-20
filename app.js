var mysql      = require('mysql');
var multer     		=       require('multer');
var fs = require('fs');
var async = require('async');
var punycode = require('punycode');
var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server),
	 agent = require('./_header'),
	 clients = [];
	 var url = require('url');
	 var path = require('path');
	 var bodyParser =	require("body-parser");
	 app.use(bodyParser.json());
	 //var site_url = "http://45.64.84.46:8080/";
	//var site_url = "http://99.111.104.82:8080/"; //Live
	//var site_url = "http://192.168.0.17:8080/"; //Local 
	var site_url = "http://62.151.181.238:8080/"; //Live New  Talk-1471893436141.jpg
	
	 
	var upload = multer({ dest: './uploads/'});
	server.listen(8080);
	var db = require('./connection_new.js');

var time = require('time');
var Jimp = require("jimp");
console.log(Date.now());
var request = require('request');

//// SMS Code /// https://api.nexmo.com/verify/json?api_key=2187ca12&api_secret=eab5e7a2&number=9175129361&brand=NexmoVerifyTest
var https = require('https');

var storage_new	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
	  console.log('file name is here : ');
	  console.log(file);
	 if(file.mimetype=='image/jpeg')
	 {
		callback(null, 'Talk-' + Date.now()+'.jpg');
	 }
	  if(file.mimetype=='audio/wav')
	 {
		callback(null, 'Talk-' + Date.now()+'.wav');
	 }
	 if(file.mimetype=='video/quicktime')
	 {
		callback(null, 'Talk-' + Date.now()+'.mov');
	 }
    
  }
});
var upload = multer({ storage : storage_new }).array('userPhoto',10);
app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});

app.post('/api/upload',function(req,res){
	upload(req,res,function(err) {
		//console.log(req.body);
		
		var value = req.files;
	console.log(value);
		 res.setHeader('Content-Type', 'application/json');
		var i = 0;
		var arraynew = new Array();
		while(i<value.length)
		{
			//console.log(value[i].filename);
			arraynew[i] =  {oldname:value[i].originalname,newname:value[i].filename}
			console.log(value[i].mimetype);
			if(value[i].mimetype=='image/jpeg')
		{
			var value_n = value[i].filename;
			var ext = value_n.split('.');
			console.log(ext[1]);
			Jimp.read('uploads/'+value[i].filename, function (err, lenna) {
			if (err) throw err;
			lenna
			.resize(256, 256)            // resize 
			.blur(20)
			.quality(60)                 // set JPEG quality 
			.write('uploads/'+ext[0]+'_blur.jpg'); // save 
			}); 
		}
		i++;
		}
			//console.log(arraynew);
			console.log('Hello There : ');
			
			return res.send(JSON.stringify(arraynew));			
		if(err) {
			return res.end("Error uploading file.");
		}
		
		res.end("File is uploaded");
	});
});

request(url, function (error, response, body) {
});


/* var Type = require('type-of-is');
var a  = new time.Date(Date.now());
console.log("Type is here : "+Type(a)); */
/* var a  = new time.Date(1454150892383);
a.setTimezone('Asia/Kolkata');
var status_st = "Last seen : "+ a.getHours()+" : "+a.getMinutes()+" : "+a.getSeconds(); */
//console.log("Please checl this time : "+status_st);


	multer({ dest: './uploads/',rename: function (fieldname, filename) {
	//console.log("Field Name : "+fieldname+"File Name : ");
		return global.name = filename+Date.now();
	},
	onFileUploadStart: function (file) {
		
	//	console.log(" File Upload Starts Here ::::::::::::::"+JSON.stringify(file)+"::::::::::::::::::::: Ends Here");
		console.log(file.originalname + ' is starting ...');
		console.log(file);
		global.ext = file.extension;
	},
	onFileUploadComplete: function (file) {
	//	global.name= file.path;
		console.log(file.fieldname + ' uploaded to  ' + file.path)
	}
});
//console.log("Time Value : - "+calcTime('Nagpur', '+05:00'));
//app.use(express.static(__dirname + "/public"));
//app.use('/public', express.static(__dirname + "/public"));
app.post('/api/photo',function(req,res){
	
	upload(req,res,function(err) {
		if(err) {
			return res.end("Error uploading file.");
		}
		var value = req.files;
		var i = 0 ;
		console.log("Mime Type is here : ");
		console.log(value);
		var newdata = value[i].originalname;
		var ext_1 = newdata.split('.');

		
		/* if(value[i].mimetype=='image/jpeg') */
		if((ext_1[ext_1.length-1])=='jpg')
		{
			var value_n = value[i].filename;
			var ext = value_n.split('.');
			console.log(ext[1]);
			Jimp.read('uploads/'+value[i].filename, function (err, lenna) {
			if (err) throw err;
			lenna
			.resize(256, 256)            // resize 
			.blur(20)
			.quality(60)                 // set JPEG quality 
			.write('uploads/'+ext[i]+'_blur.jpg'); // save 
			}); 
		}
		console.log("Hello There ::::::: ::::: ");
		console.log(value[i].filename);
		res.end(value[i].filename);
		
		//console.log("Here is global data : - "+JSON.stringify(global));
		//console.log("Success!!!!!!!!!!! "+global.name+global.ext);
	/* 	if(global.ext=='jpg')
		{
		Jimp.read('uploads/'+global.name+'.jpg', function (err, lenna) {
		if (err) throw err;
		lenna
		.resize(256, 256)            // resize 
		.blur(20)
		.quality(60)                 // set JPEG quality 
		.write('uploads/'+global.name+'_blur.jpg'); // save 
		});
console.log('conversion done  ');
			res.end(global.name+'.jpg');
		} */
		var value1 = req.files;
		
		/*
		if(global.ext=='jpg')
		{
			res.end(global.name+'.jpg');
		}
		if(global.ext=='mov')
		{
			res.end(global.name+'.mov');
		}
		if(global.ext=='wav')
		{
			res.end(global.name+'.wav');
		}
		if(global.ext=='db')
		{
			res.end(global.name+'.db');
		}
			if(global.ext=='jpg')
		{
		 Jimp.read('uploads/'+global.name+'.jpg', function (err, lenna) {
		if (err) throw err;
		lenna
		.resize(256, 256)            // resize 
		.blur(20)
		.quality(60)                 // set JPEG quality 
		.write('uploads/'+global.name+'_blur.jpg'); // save 
		}); 
		*/
			//console.log('conversion done  ');
			//res.end(global.name+'.jpg');
		//} 
		//console.log("after sending message back of Upload .....!");
	});
});


	app.get('/',function(req,res){
	//console.log('Yopu are in file to call index file please check this one also.............................');
			res.sendFile(__dirname + '/index.html');
	});
	app.get('/group',function(req,res){
	//console.log('Yopu are in file to call index file please check this one also.............................');
			res.sendFile(__dirname + '/index_new.html');
	});
//group_values.html
app.get('/group_values',function(req,res){
	//console.log('Yopu are in file to call index file please check this one also.............................');
			res.sendFile(__dirname + '/group_values.html');
	});
	app.get('/uploaded/image/:id',function(req,res){
	console.log('cecking for image is showing there');
		 var id = req.params.id;
		var img = fs.readFileSync('uploads/'+id);
		res.writeHead(200, {'Content-Type': 'image/jpg' });
		res.end(img, 'binary');
		console.log(" after image shown ");
		});
		
		app.get('/SMS/:id',function(req,res){
		 var id = req.params.id;
		// console.log(id.crash);
		 var query = db.query('SELECT * from   t_temp_messages WHERE te_to_id = ?', [data], function(err,row,res) { if(err){throw err;} });
		});
		
	var i=0;
	function random (low, high) {
    return Math.random() * (high - low) + low;
		}
		

	

io.sockets.on('connection', function(socket){
	i++;
	console.log('Welcome to server '+i);
	console.info('New client connected (id=' + socket.id + ').');
	socket.on('demo_testing', function(data){
		console.log("+================================+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++=========================================================================================================+++++++++++++++++++");
	console.log("Here is data "+data);
	//var s = JSON.stringify(data);
	//var arr = JSON.parse(s);
	//console.log("Here is data "+arr.candidate);
	//console.log("Here is data "+arr);
	//console.log("Here is data "+data);
		socket.broadcast.emit('message', data);
		console.log("data sent back");
		//var response = {flag:"code_verififcation2",status:"false", message:"Confirmation code is wrong"};
		//io.sockets.emit('message',data);
		//sockets.broadcast.emit('new message',data);
		data = '';
	});
	// Set User Id with socket Id
	socket.on('set_socket_id', function(data_n){
		//var post  = {v_group_name: "Hello there", v_type: 		"Hello My'SQL"};

console.log('Hello there This is query :- ');
console.log(query);
		
	console.log("Here is data : - "+data_n);
		var s = JSON.stringify(data_n);
		var arr = JSON.parse(s);
		var data = arr.phone_no;
		var my_own_id = arr.user_id;
		//var vcd_id = arr.vc_id;
		//var timezone = arr.timezone;
		//var timezone = "Asia/Kolkata";
		var timezone = arr.timezone;
		var blank='';
		console.log("On connect called Socket = "+socket.id+" , Phone No =>"+data);
			var query = db.query('UPDATE   t_verification SET v_on_time=?, v_badge=? , v_timezone=? WHERE v_phone = ?', [blank,0,timezone,data], function(err, result) {
			if  (err) { throw err;}
			});
			
		if(data!='' && data!=null)
		{
		//var query = db.query('SELECT * from   t_temp_messages WHERE te_to_id = ?', [data], function(err, result) {
		var query = db.query('SELECT * from   t_temp_messages WHERE te_to_id = ?', [data], function(err,row,res) {
		if(err){ throw err;}

			var cnt = row.length;
			var index=0;
			async.whilst(function () {
			
			return index < cnt;
			},
			function (next)
			{
			var result = row;
			console.log(" Console value Sender Id : - "+result[index].te_sender_id);
		//for (var index in result)
        //{
				//console.log("------------------------------------------------------To No : "+result[index].te_from_id+"<br>");
				var msg;
				if(result[index].te_type=='image')
			{
				msg =	site_url + "uploaded/image/" + result[index].te_name;
			}
			else{
				msg	= result[index].te_message;
			}
		var fileSizeInBytes;
		console.log("@@@@@@@@@@@@------@@@@@@@@@@@"+result[index].te_name);
		if (fs.existsSync("uploads/" + result[index].te_name)) {
		var stats = fs.statSync("uploads/" + result[index].te_name);
		fileSizeInBytes = stats["size"];
		console.log("File SiZe : "+fileSizeInBytes);
		} 
		console.log("value = This is important : "+result[index].te_msg_type);
		if(result[index].te_msg_type=='group')
		{
		
		if(result[index].te_type=='text')
		{
		var msg = punycode.decode(msg);
		console.log("Punny code decoded");
		}
		
		
		var response = {flag:"receive_message", message:msg,chat_with:result[index].te_from_id,date_time:result[index].te_time,data_type:result[index].te_type,file_name:fileSizeInBytes,cw_id:result[index].te_group_id,cw_type:'group',group_name:result[index].te_group_name}; //te_group_name
		io.to(socket.id).emit('receive',response);	
		
		var que = db.query('SELECT ms_id,ms_from_no,ms_group,ms_msg_id FROM  t_message_status WHERE ms_status = "0" AND ms_user=?', [data], function(err_ms,row_ms, result_ms) {  if  (err_ms) { throw err_ms;} 
		var cnt = row_ms.length;
			if(cnt>0)
			{
					
		var i=0;
			async.whilst(function () {
			return i < cnt;
			},
			function (next)
			{
				//row_ms[i].ms_from_no;
		var que = db.query('SELECT s_socket FROM  t_socket_id WHERE s_phone = ?', [row_ms[i].ms_from_no], function(err_skt,row_skt, result_skt) {  if  (err_skt) { throw err_skt;} 
			if(row_skt.length>0)
			{
			var response = {flag:"group_delivery_status",status:"delivered",delivered_to:data,delivered_group:row_ms[i].ms_group,delivered_msg_id:row_ms[i].ms_msg_id};
			io.to(row_skt[0].s_socket).emit('receive',response);
			}
			else{
			row_ms[i].ms_id;
			var que = db.query('UPDATE t_message_status SET ms_deliv_st="0" WHERE ms_id = ?', [row_ms[i].ms_id], function(err_s,row_s, result_s) {  if  (err_s) { throw err_s;}  });
			}
			var que = db.query('UPDATE t_message_status SET ms_status="1" WHERE ms_id = ?', [row_ms[i].ms_id], function(err_s,row_s, result_s) {  if  (err_s) { throw err_s;}  });
		});
			});
			}
		}); 
		}
		else{
		console.log('you are here if you have some pending messages....');
		
		console.log("Single Message"+response);
		var u_d_id = result[index].te_to_sent_id;
		global.u_d_id=u_d_id;
		var from_id = result[index].te_from_id;
		var to_id = result[index].te_to_sent_id;
			var que = db.query('SELECT s_socket FROM  t_socket_id WHERE s_phone = ?', [from_id], function(err_skt,row_skt, result_skt) {  if  (err_skt) { throw err_skt;} 
			if(row_skt.length>0)
			{
				if(u_d_id=='')
				{
					u_d_id=global.u_d_id;
				}
				console.log("From Id : - "+u_d_id+" : "+row_skt[0].s_socket);
				var response = {flag:"delivered_report", user_id:u_d_id};
				console.log(row_skt[0].s_socket+" Delivery status is here : - "+u_d_id);
				io.to(row_skt[0].s_socket).emit('receive',response);
			}
			else{
			console.log("Saving this into delivary table : - ");
				var que = db.query('INSERT INTO  t_delivery_repo SET d_contact = ? , d_user_id= ? ', [from_id,to_id], function(err_skt,row_skt, result_skt) {  if  (err_skt) { throw err_skt;} 
				}); 
			}
			
			});//fileSizeInBytes
			console.log("Herte is the file :- "+result[index].te_file_size);
			if(result[index].te_file_size=='')
			{
			var file_size = "";
			}
			else{
			var file_size= result[index].te_file_size;
			}
			if(result[index].te_type=='text')
			{
				var msg = punycode.decode(msg);
			}
		/* console.log("Punny code decoded");
		console.log(punny_message); */
		
		var response = {flag:"receive_message", message:msg,chat_with:result[index].te_from_id,date_time:result[index].te_time,data_type:result[index].te_type,file_name:file_size,cw_id:result[index].te_sender_id,cw_type:'individual',cont_status:result[index].te_cont_status};
		
		io.to(socket.id).emit('receive',response);
		}
		
		//var response = {flag:"receive_message", message:msg,chat_with:arr.from,date_time:arr.date_time,data_type:arr.data_type};
		
		//var response = {flag:"receive_message", message:msg,chat_with:arr.from,date_time:arr.date_time,data_type:arr.data_type,file_name:fileSizeInBytes,sender_id:arr.my_id,cw_id:arr.cw_id,cw_type:'group',group_name:group_name};
		
		index++;
		next();
        });
		var query = db.query('DELETE FROM  t_temp_messages WHERE te_to_id = ?', [data], function(err, result) {  if  (err) { throw err;} });
			});
		
		var query = db.query('SELECT * from   t_socket_id WHERE s_phone = ?', [data], function(err, result) {
    if  (err) { throw err;}
	else{
	if(result.length<1)
		{
			var query = db.query('INSERT INTO   t_socket_id SET s_phone = ? , s_socket=?', [data,socket.id], function(err, result) {
    if  (err) { throw err;}
	//var response = {flag:"code_verififcation2",status:"false", message:"Confirmation code is wrong"};		
		});
		}
		else{
				var query = db.query('UPDATE  t_socket_id SET  s_socket=? WHERE s_phone = ? ', [socket.id,data], function(err, result) {
    		if  (err) { throw err;}
		});
	}
	}
	});
		console.log(socket.id+" Socket Connected with username = "+ data);
		}
		var phone = data;
		
		
		
		var query = db.query('Select * FROM t_online WHERE  o_to = ?   ',[phone], function(err,result) {	if(err){throw err;}
		for (var index in result)
        {
		//console.log("Result : "+result[index].o_from);
				//console.log("------------------------------------------------------To No : "+result[index].te_from_id+"<br>");
				var query = db.query('Select * FROM t_socket_id WHERE  s_phone = ?   ',[result[index].o_from], function(errr,roww, res) {
				if (errr) { throw errr; }
				if(roww.length<1)
				{
					console.log('no record found');
				}
				else{
				//console.log("Last seen "+result[index].o_to);
				var response = {flag:"status_reply",status:" Online ",v_id:result[index].o_to};
				var socket_id = roww[0].s_socket;
				io.to(socket_id).emit('receive',response);
				}
		
		});
		}
		
	});
	
	var query = db.query('Select * FROM t_new_joined WHERE  i_contact = ?   ',[data], function(errr,roww, res) {
	if  (errr) { throw errr;}
			var cnt = roww.length;
		var i=0;
		async.whilst(function () {
  return i < cnt;
},
function (next)
{
var cont_no = roww[i].i_contact;
var name_n = roww[i].i_name_n;
var v_id = roww[i].i_v_id;
var v_online_status = roww[i].i_status;
var own_number = roww[i].i_joined_contact;
var id = roww[i].i_id;

var response = {flag:"check_if_available",status:"true", message:"Available on Tawkeaze",user_id:v_id,u_contact:own_number,cont_type:"individual",cont_status:v_online_status,user_blocked:"0"};

	//io.to(socket_id).emit('receive',response);
	 io.to(socket.id).emit('receive',response);
	
	send_push(cont_no," Joined Tawkeaze","message",name_n,v_id); // Send Push Notification

	
i++;
next();
}); 
var query = db.query('DELETE FROM t_new_joined WHERE  i_contact = ? ',[data], function(errr1,roww1, res1) { if  (errr1) { throw errr1;} });
	});
	
	//arr.phone_no
	 console.log("Socket after connecting ...");
 	var query = db.query('SELECT * FROM t_call_history WHERE c_call_to_no=? ', [arr.phone_no], function(err,row_new,result) {if  (err) { throw err;}
	 		var cnt = row_new.length;
			console.log(cnt);
		var i=0;
		if(cnt>0)
		{
	
	console.log(row_new);
	
	async.whilst(function () {
  return i < cnt;
},
function (next)
{
 	var callfrom = row_new[i].c_call_from_no;
	var callfromtime = row_new[i].c_call_time;
	var call_type = row_new[i].c_call_type;
	var c_id = row_new[i].c_id;
		var query = db.query('SELECT  v_id FROM t_verification WHERE v_phone=? ', [row_new[i].c_call_from_no], function(err1,row1,result1) {
		 if  (err1) { throw err1;}
		 row1[0].v_id;
		 var response = {flag:"call_histroy",contact:callfrom,log_time:callfromtime,call_type:call_type,cont_id:row1[0].v_id,log_type:'miss call'};
		 console.log("call history sent once : From : "+callfrom);
			io.to(socket.id).emit('receive',response);			
		});
		
		
		var query = db.query('DELETE FROM t_call_history WHERE c_id=? ', [c_id], function(err1,row1,result1) { if  (err1) { throw err1;} })

i++;
next();
}); 

}
else{
	console.log('dont have any calls ');
}
	});	 
		var query = db.query('SELECT * from   t_delivery_repo WHERE d_contact = ?  ', [phone], function(err,row, result) {
		if  (err) { throw err;}
		var cnt = row.length;
		if(cnt>0)
		{
		
		var i= 0 ;
			async.whilst(function () {
			  return i < cnt;
			},
			function (next)
			{
			//console.log("Here is increment value : - "+ i );
			var user_id = row[i].d_user_id;
			
			var response = {flag:"delivered_report", user_id:user_id};
			console.log("This is return Message : - "+response);
			io.to(socket.id).emit('receive',response);
			
			var query = db.query('DELETE FROM   t_delivery_repo WHERE d_contact = ? AND d_user_id = ?  ', [phone,user_id], function(err1,row, result) {
			if  (err1) { throw err1;}			});
			
			i++;
			next();
			}); 
		}
		});
		
	var query = db.query('SELECT * from   t_seen_status WHERE st_with_id = ?  ', [my_own_id], function(err,row, result) {
		if  (err) { throw err;}
				var cnt = row.length;
			if(cnt>0)
			{
			
			var i= 0 ;
				async.whilst(function () {
				  return i < cnt;
				},
				function (next)
				{
				/* var query = db.query('SELECT * from   t_socket_id WHERE s_phone  = ?  ', [phone], function(err1,row1, result1) {
				if  (err1) { throw err1;} */
				
				//var socket = row1[0].s_socket;
			var response = {flag:"message_seen", user_id:row[i].st_my_id};
			console.log("This is return Message : - "+response);
			io.to(socket.id).emit('receive',response);
			//console.log();
			var query = db.query('DELETE FROM   t_seen_status WHERE st_with_id = ?  AND st_my_id = ?  ', [my_own_id,row[i].st_my_id], function(err1,row, result) {
			if  (err1) { throw err1;}			});
			
				/* }); */
					
			
				i++;
				next();
				});
			}
			
		});
	var query = db.query('SELECT * from   t_group_notification_temp WHERE gt_contact = ?  ', [phone], function(err,row, result) {
	 if(err){throw err;}
	var cnt = row.length;
	if(cnt>0)
	{	var i= 0 ;
				async.whilst(function () {
				  return i < cnt;
				},
				function (next)
				{
				console.log("Socket Received : ");
		var response = {flag:"group_created_notification",group_id:row[i].gt_group_id,image_tag:row[i].gt_img_tag,image_path:site_url + "uploaded/image/" +row[i].gt_group_image,created:row[i].gt_admin,group_name:row[i].gt_group_name};
		io.to(socket.id).emit('receive',response);
		
		i++;
		next();
		});
	}
		var query = db.query('DELETE FROM t_group_notification_temp WHERE gt_contact = ?  ', [phone], function(err,row, result) { if(err){throw err;} });
	});
	
	//var response = {flag:'group_details_update',mode:arr.mode,group_id: groupid, user_id:arr.my_id,title:arr.title,updated_by:arr.my_contact,group_name:arr.title};
	
	//var response = {flag:'group_details_update',mode:arr.mode,group_id: groupid, user_id:arr.my_id,image_path:site_url + "uploaded/image/" + arr.title,img_tag:timestamp,group_name:arr.group_name,updated_by:arr.my_contact,removed_user:''};
	
	var query = db.query('SELECT * FROM   t_group_updates WHERE gr_contact=? ', [phone], function(err,row, result) { if(err){throw err;}
			var cnt = row.length;
		if(cnt>0)
		{	var i= 0 ;
					async.whilst(function () {
					  return i < cnt;
					},
					function (next)
					{
					if(row[i].gr_mode=='update_name')
					{
					var group_name = row[i].gr_title;
					}
					else{
					var group_name = row[i].gr_group_name ;
					}
					
				response = {flag:'group_details_update',mode:row[i].gr_mode,group_id: row[i].gr_group_id, user_id:row[i].gr_my_id,image_path:site_url + "uploaded/image/" + row[i].gr_title,img_tag:row[i].gr_img_tag,title:row[i].gr_title,updated_by:row[i].gr_my_contact,group_name:group_name,removed_user:row[i].gr_title,user_name:'dummy'};
				
			io.to(socket.id).emit('receive',response);
			});
		}
		var query = db.query('DELETE FROM   t_group_updates WHERE gr_contact=? ', [phone], function(err,row, result) { if(err){throw err;} });
	});
	
	var query = db.query('SELECT * FROM t_blocked   WHERE b_to = ? AND b_seen_stat="0"   ',[my_own_id], function(err,row,result) {
	if(err){throw err;}
	var cnt = row.length;
	//console.log("Console count : - "+cnt);
	if(row.length>0)
	{	var i= 0 ;
				async.whilst(function () {
				  return i < cnt;
				},
				function (next)
				{
					var response = {flag:"you_are_blocked",blocked_from:row[i].b_from,block_st:"1",blocked_from_no:row[i].b_from_no};	
					io.to(socket.id).emit('receive',response);
				i++;
				next();
				});
	}
	var query = db.query('UPDATE t_blocked SET  b_seen_stat="1"  WHERE b_to = ? AND b_seen_stat="0"   ',[my_own_id], function(err,row,result) { if(err){throw err;} });
		
	});
	
	var query = db.query('SELECT * FROM t_blocked   WHERE b_to = ? AND b_seen_unblocked="1"   ',[my_own_id], function(err,row,result) {
	if(err){throw err;}
		var cnt = row.length;
	//console.log("Console count : - "+cnt);
	if(row.length>0)
	{	var i= 0 ;
				async.whilst(function () {
				  return i < cnt;
				},
				function (next)
				{
					var response = {flag:"you_are_blocked",blocked_from:row[i].b_from,block_st:"0",blocked_from_no:row[i].b_from_no};	
					io.to(socket.id).emit('receive',response);
				i++;
				next();
				});
	}
	var query = db.query('DELETE FROM  t_blocked  WHERE b_to = ? AND b_seen_unblocked="1"   ',[my_own_id], function(err,row,result) { if(err){throw err;} });
	});
	
	//
	var query = db.query('SELECT * FROM t_message_status  WHERE ms_deliv_st = "0" AND ms_from_no=?   ',[data], function(err,row,result) {
	if(err){throw err;}
	var cnt = row.length;
	if(cnt>0)
	{
			var i= 0 ;
				async.whilst(function () {
				  return i < cnt;
				},
				function (next)
				{
					//console.log("Returning back to the user if he is back Delivered to : @@@@@@@@@@@@@@@@@@@@@@ :  "+row[i].ms_user);
					var response = {flag:"group_delivery_status",status:"delivered",delivered_to:row[i].ms_user,delivered_group:row[i].ms_group,delivered_msg_id:row[i].ms_msg_id};
					io.to(socket.id).emit('receive',response);
				i++;
				next();
				});
	var query = db.query('UPDATE  t_message_status SET ms_deliv_st = "1"   WHERE ms_deliv_st = "0" AND ms_from_no=?   ',[data], function(err,row,result) {  if(err){throw err;} 
	});
	}
	else{
		console.log("have no delivery status of group :;;;: ");
	}
	});
	
	var query = db.query('SELECT * FROM t_message_status  WHERE ms_seen_back= "0" AND ms_seen_status="1" AND ms_from_no=?   ',[data], function(err,row,result) {
	if(err){console.log("Error is here 0 "); throw err;}
	var cnt = row.length;
	if(cnt>0)
	{
			var i= 0 ;
				async.whilst(function () {
				  return i < cnt;
				},
				function (next)
				{
					var response = {flag:"group_delivery_status",status:"seen",delivered_to:row[i].ms_user,delivered_group:row[i].ms_group,delivered_msg_id:row[i].ms_msg_id};
					io.to(socket.id).emit('receive',response);
					
				i++;
				next();
				});
	var query = db.query('UPDATE  t_message_status SET ms_seen_back = "1"   WHERE ms_seen_back= "0" AND ms_seen_status="1" AND ms_from_no=?   ',[data], function(err,row,result) { if(err) { console.log("Error is here 1 "); throw err;} });
	}
	else{
		console.log("have no Seen status of group :;;;: ");
	}
	});
	
	
	
	var query = db.query('SELECT ge_user_no,ge_user_id,ge_group_id,ge_group_name,ge_exit_no FROM t_group_exit  WHERE ge_user_no= ?  ',[data], function(err,row,result) {
	if(err){console.log("Error is here 2 "); throw err;}
	var cnt = row.length;
		if(cnt>0)
		{
			var i= 0 ;
				async.whilst(function () {
				  return i < cnt;
				},
				function (next)
				{
					var response = {flag:"group_exit",user_id:row[i].ge_user_id,user_no:row[i].ge_exit_no,group_id:row[i].ge_group_id,group_name:row[i].ge_group_name};
					io.to(socket.id).emit('receive',response);
					i++;
					next();
				});
		}
	var query = db.query('DELETE FROM t_group_exit  WHERE ge_user_no= ?  ',[data], function(err,row,result) {
	if(err){throw err;} });
		});
	});
		///// set_socket_id Ends Here  ///////////////////////////////////
	/////******************Profile Update Link ***********************/////
	socket.on('profile_update', function(data){
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	//console.log(arr);
	//[arr.u_email, arr.u_name, arr.u_id, arr.u_Addrs, arr.u_city, arr.u_country] , arr.u_status
	var query = db.query('UPDATE  t_verification SET v_fname = ? , v_email=?, v_address = ?, v_city=?, v_country=? , v_online_status = ?  WHERE v_id=? ', [ arr.u_name,arr.u_email, arr.u_Addrs , arr.u_city, arr.u_country , arr.u_status , arr.u_id], function(err,row, result) {
   if (err) { throw err;}
	else{
		var response = {flag:"profile_update_res",status:"true", message:"Profile Updated Successfully"};
		 io.to(socket.id).emit('receive',response);
	}
	});
	});
	
	/////******************Profile Update Link Ends Here ***********************/////
	
	socket.on('profile_pic',function(data){
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	//console.log(arr);
	//[arr.u_image,arr.u_id]
	var query = db.query('UPDATE  t_verification SET v_img = ? , v_img_time = ?  WHERE v_id=? ', [arr.u_image,Date.now(),arr.u_id], function(err,row, result) {
	if (err) {	throw err;	}
	else{
		var response = {flag:"profile_image_updt",status:"true", message:"Profile Image Updated Successfully"};
		 io.to(socket.id).emit('receive',response);
	}
	});
	});

	socket.on('view_pics',function(data){
	//console.log('Request for View Pics');
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	//[arr.v_id,arr.v_tag] v_img_time = ? , arr.timezone
	//console.log(arr.v_id);
	var query = db.query('SELECT v_id,v_img,v_img_time,v_on_time,v_online_status from t_verification  WHERE   v_id=? ', [arr.v_id], function(err,row, result) {
	if (err) { throw err;}
	else{
		if(row.length<1)
		{
			var response = {flag:"other_images",status:"wrong id"};
		}
		else{
		if(row[0].v_on_time=='')
		{
			var status='Online';
		}
		else{
		//var a = row[0].v_on_time; Date.now();
		//console.log(a.getHours()+" :"+a.getMinutes());
	//	var date_obj = new Date(row[0].v_on_time*1000);
		//console.log(row[0].v_id);
		var date_obj = new Date(row[0].v_on_time * 1000);
		//console.log(date_obj);
		//var date_obj = new Date(row[0].v_on_time);
		//console.log(date_obj);
		
		var status_n = get_time(row[0].v_on_time,arr.timezone);
		//var a = new time.Date(row[0].v_on_time * 1000);
		/* a.setTimezone('Asia/Kolkata');
		console.log("Get current time is here  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    : : ::: : : :: : : : :"+a.getHours()+" :"+a.getMinutes()); */
		//var status = 'Last Seen : '+a.getHours()+" :"+a.getMinutes();
		var status = 'Last Seen : '+status_n;
		//var status = 'Last Seen @ dummy ';
		
		}
		//console.log("Status : "+status);
			var img_path = site_url + "uploaded/image/" + row[0].v_img;

			//console.log("Tag from client : " + arr.v_tag + " Our Value : " + row[0].v_img_time);
			
			if(row[0].v_img_time==arr.v_tag)
			{
			//console.log("Nochange");
				//var response = {flag:"other_images",status:"nochange",image_path:img_path,seen_status:status};
				var response = {flag:"other_images",status:"nochange",image_path:site_url + "uploaded/image/" + row[0].v_img,image_tag:row[0].v_img_time,u_id:arr.v_id,seen_status:status,cont_status:row[0].v_online_status};
				//console.log(" No Change Status sent :  "+row[0].v_online_status);
			}
			else{ 
			console.log("Change status : "+status);
			//row[0].v_id v_online_status
			//console.log("Image Path : "+row[0].v_img);
				var response = {flag:"other_images",status:"change",image_path:site_url + "uploaded/image/" + row[0].v_img,image_tag:row[0].v_img_time,u_id:arr.v_id,seen_status:status,cont_status:row[0].v_online_status};
			}
		}
		 io.to(socket.id).emit('receive',response);
	}
	});
	});
	///*****************Code Verification Code Starts Here****************************////
	socket.on('code_verification',function(data){
	console.log('request for varification');
		//var randomval = Math.floor(Math.random()*90000) + 10000;
		//console.log("Hello This one is message = :> "+data); 
		var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	var varification = Math.floor(Math.random()*90000) + 10000;
	var v_phone_2 = arr.countrycode+arr.mobilenumber;
		var post  = {v_cont_code:arr.countrycode,v_phone:arr.mobilenumber,v_code:varification,v_phone_2:v_phone_2};
		
		var query = db.query('SELECT v_code,v_id FROM t_verification WHERE  v_cont_code = ? AND  v_phone = ?   ',[arr.countrycode,arr.mobilenumber], function(err,row,result) {	
    if (err) 
	{
		throw err;
	}
	else{
		if(row.length<1)
		{
			var query = db.query('INSERT INTO  t_verification SET ?', post, function(err, result) {
    if (err) { throw err; }
	});
		}
		else{
		//varification =  row[0].v_code;
		var query = db.query('UPDATE t_verification SET v_code =? WHERE  v_cont_code = ? AND  v_phone = ?   ',[varification,arr.countrycode,arr.mobilenumber], function(err,row,result) {  if (err) {throw err; } });
		}
	}
		});

		 
		 /*    api_key: '2187ca12',
  api_secret: 'eab5e7a2',  //// Clients 
    api_key: '6f9a4a4e',
  api_secret: '10a622d5eaa06292',  //Created By LaxZenith (Santosh)
  */
		
var https = require('https');

var data = JSON.stringify({
  api_key: '2187ca12', //'2187ca12',
  api_secret: 'eab5e7B2', //'eab5e7B2',
  number: arr.countrycode+arr.mobilenumber,
  brand: 'Tawkeaze'
});

var options = {
  host: 'api.nexmo.com',
  path: '/verify/json',
  port: 443,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

var req = https.request(options);

req.write(data);
req.end();

var responseData = '';
req.on('response', function(res){
  res.on('data', function(chunk){
    responseData += chunk;
  });
  
  res.on('end', function(){
   console.log(JSON.parse(responseData));
  var arr_n = JSON.parse(responseData);
	 console.log(arr_n);
	if(arr_n.status=='0')
	{
			var response = {flag:"code_verification1",status:"true", message:"Data sent successfully"};
	console.log('Response message sent is : '+ response);
		//io.sockets.emit('receive',response);
		 io.to(socket.id).emit('receive',response);
	}
	else{
			var response = {flag:"code_verification1",status:"false", message:arr_n.error_text};
	console.log('Response message sent is : '+ response);
		//io.sockets.emit('receive',response);
		 io.to(socket.id).emit('receive',response);
	}
   
	//var arr_n = JSON.parse(responseData);
	
	var query = db.query('UPDATE t_verification SET v_request_id =? WHERE  v_cont_code = ? AND  v_phone = ?   ',[arr_n.request_id,arr.countrycode,arr.mobilenumber], function(err,row,result) {  if (err){ throw err; } });
  });
});



		//data = '';
	});
	//////*****************Code Verification Code Ends Here****************************////
	
	socket.on('code_verification_2', function(data){
		console.log("You are in code_verification_2");
		
		var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	console.log(arr);
	var varification = Math.floor(Math.random()*90000) + 10000;
		//var post  = {v_cont_code:arr.countrycode,v_phone:arr.mobilenumber,v_code:arr.code};
		var query = db.query('SELECT * FROM t_verification WHERE v_cont_code = ? AND v_phone = ?  ',[arr.countrycode,arr.mobilenumber], function(err,row,result) {	if (err) { console.log('in query Errorr of  : code_verification_2 ');throw err;	}
	else{
	console.log(row);
		//console.log("Total Lengt of count ============"+row.length);
		var req_id = row[0].v_request_id;
		//var value = code_verification_nexmo(req_id,arr.code);
		
		var data = JSON.stringify({
  api_key: '2187ca12',
  api_secret: 'eab5e7B2',
 // number: arr.countrycode+arr.mobilenumber,
 request_id:req_id,
  code: arr.code
});

var options = {
  host: 'api.nexmo.com',
  path: '/verify/check/json',
  port: 443,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

var req = https.request(options);

req.write(data);
req.end();

var responseData = '';
req.on('response', function(res){
  res.on('data', function(chunk){
    responseData += chunk;
  });
  
  res.on('end', function(){
   
	var arr_n = JSON.parse(responseData);
	 console.log(arr_n);
	if(arr_n.status=='0')
	{
	
		
		if(row[0].v_db!='')
		{
			var db_status = '1';
		}
		else
		{
			var db_status = '0';
		}
			var response = {flag:"code_verififcation2",status:"true", message:"Confirmation succeed ..!",u_id:row[0].v_id,db_status:db_status};	
			
		var query = db.query('UPDATE t_verification SET v_device_tocken=? , v_status=1  WHERE  v_id =  ? ',[arr.token,row[0].v_id], function(err,row,result) { if (err) { throw err; }});	
		
	
	}else{
	var response = {flag:"code_verififcation2",status:"false", message:arr_n.error_text};		
	
	}
	console.log('confirmation responce--------------------------------SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS-----------');
		 io.to(socket.id).emit('receive',response);
	//var query = db.query('UPDATE t_verification SET v_request_id =? WHERE  v_cont_code = ? AND  v_phone = ?   ',[arr_n.request_id,arr.countrycode,arr.mobilenumber], function(err,row,result) {  });
  });
});
		/* console.log("return values : - ");
		console.log(value);
		if(value=="1")
		{
			
		}
		else{
		
		}  */
		
		/* if(row.length<1)
		{
			var response = {flag:"code_verififcation2",status:"false", message:"Confirmation code is wrong"};		
		}
		else{
		if(row[0].v_db!='')
		{
			var db_status = '1';
		}
		else
		{
			var db_status = '0';
		}
			var response = {flag:"code_verififcation2",status:"true", message:"Confirmation succeed ..!",u_id:row[0].v_id,db_status:db_status};	
			
		var query = db.query('UPDATE t_verification SET v_device_tocken=? , v_status=1  WHERE  v_id =  ? ',[arr.token,row[0].v_id], function(err,row,result) { if (err) throw err;});	
		} */
		
		//io.sockets.emit('receive',response);
		
	}
	});
});	
	//Get All Contacts Saved Here on Server
	socket.on('get_allcontact', function(data){
	console.log("get_allcontact Called Here : - ");
	console.log("To add contacts --------------");
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	console.log(arr);
	var own_number = arr['mobilenumber'];
	var my_id = arr['my_id'];
	var count = arr['contact_list'].length;
	
//var que = 'SELECT * FROM t_mycontacts  WHERE c_contact = "'+own_number+'" AND c_parent !="" ';
var query = db.query('SELECT * FROM t_mycontacts  WHERE c_contact = ? AND c_parent !="" ',[own_number], function(err,row,result) {
		if (err) { throw err; }
		var cnt = row.length;
		var i=0;
		async.whilst(function () {
  return i < cnt;
},
function (next)
{
var cont_no = row[i].c_parent;
var name_n = row[i].c_name;
//var v_id = row[i].c_name;

var query = db.query('SELECT s_socket FROM t_socket_id  WHERE s_phone = ?  ',[cont_no], function(err,row1,result) {
if (err) { throw err; }

if(row1.length>0)
{	
	var query = db.query('SELECT v_id,v_online_status FROM t_verification  WHERE v_phone =?  ',[own_number], function(err,row2,result) {
		if (err) { throw err; }
	var response = {flag:"check_if_available",status:"true", message:"Available on Tawkeaze",user_id:row2[0].v_id,u_contact:own_number,cont_type:"individual",cont_status:row2[0].v_online_status,user_blocked:'0'};
	console.log("Hello There This is return value while = "+row2[0].v_online_status+", "+row2[0].v_id+", "+own_number);
	io.to(row1[0].s_socket).emit('receive',response);
	send_push(cont_no," Joined Tawkeaze","message",name_n,row2[0].v_id); // Send Push Notification
	
	i++;
	next();
	});
	
}
else{
var query = db.query('SELECT v_id,v_online_status FROM t_verification  WHERE v_phone = ?  ',[own_number], function(err,row2,result) {
if (err) { throw err; }
	send_push(cont_no," Joined Tawkeaze","message",name_n,row2[0].v_id);
	
	var query = db.query('INSERT INTO  t_new_joined SET i_contact=? , i_name_n = ? , i_v_id = ? , i_joined_contact = ?,i_status=?  ',[cont_no,name_n,row2[0].v_id,own_number,row2[0].v_online_status], function(err,row2,result) {
	if (err) { throw err; }
	});
	
	i++;
	next();
	
	});
}
});
	
	/* i++;
	next(); */
});
});

	//console.log("Array = "+JSON.stringify(arr));
	var page = 0,
    lastPage = count;
	var arraynew = new Array();
	console.log("Here is data we have got from client : - ");
	console.log(arraynew);
	console.log('after data print '+count);
var j = 0 ;
var k=0;
	//console.log("----------------------------------------"+arr['contact_list'][5]['name']);
async.whilst(function () {
  return page < lastPage;
},
function (next) {
console.log("In loop ");
	var c_name =arr['contact_list'][page]['name'];
	var c_phone =arr['contact_list'][page]['Phone'];

	//var que = 'SELECT * FROM  t_mycontacts  WHERE c_contact="'+c_phone+'" AND c_name="'+c_name+'" AND c_parent ="'+own_number+'"  ';
		//console.log(que);
		var query = db.query('SELECT * FROM  t_mycontacts  WHERE c_contact=? AND c_name=? AND c_parent =?  ',[c_phone,c_name,own_number], function(err,row,result) {
		if (err) { throw err; }
else{	
if(row.length<1)
		{
	//var que = 'INSERT INTO  t_mycontacts  SET c_contact="'+c_phone+'" , c_name="'+c_name+'" , c_parent ="'+own_number+'"  ';
			 var query = db.query('INSERT INTO  t_mycontacts  SET c_contact=? , c_name=? , c_parent =?  ',[c_phone,c_name,own_number], function(err,info) {  if (err) { throw err;}
	});
	console.log("In loop else condition ");
	//console.log('inserted '+c_phone);
		}
		
		//console.log('Inserted .... '+page);
		console.log("In loop  How is this man");
		// var que = 'SELECT * from   t_verification  WHERE  v_phone="'+c_phone+'" OR v_phone_2="'+c_phone+'"';
			 var query = db.query('SELECT * from   t_verification  WHERE  v_phone=? OR v_phone_2=? ',[c_phone,c_phone], function(err,row1,result) {  if (err) { throw err;}
				console.log(row.length);
				if(row1.length>0)
				{
				
					console.log('array values```````````````````````````````````````````````````````````````````````` Values Found');
					if(row1[0].v_phone!='')
					{
					var query = db.query('SELECT * from  t_blocked  WHERE b_from=? AND b_to=?  ',[row1[0].v_id,my_id], function(err2,row2,result2) {  if (err2) { throw err2;}
					if(row2.length>0)
					{
						global.block_status='1';
					}
					else{
						global.block_status='0';
					}
					});
					var blocked = global.block_status;
					console.log("Blocked status : - "+blocked);
					var value1 = { image_tag : row1[0].v_img_time, u_id:  row1[0].v_id, seen_status:  row1[0].v_on_time, image_path:  site_url + "uploaded/image/" + row1[0].v_img, contact:  row1[0].v_phone, cont_type:'individual', cont_status:row1[0].v_online_status,user_blocked:blocked};
					
					arraynew[j++] = value1;
					
				//res_val[k] = value1;
					
					}
					//arraynew[j++] = c_phone;
					//console.log(c_phone);
					//console.log("Query : - "+page);
				}
			//	console.log(k+"   gnfgsfgsfg sdfsd "+lastPage);
				if(k==(lastPage-1))
				{
				console.log("Data is here : ");
				//console.log(arraynew);
				var response = {flag:"all_contacts_available",data:arraynew};
			 io.to(socket.id).emit('receive',response);
			  console.log("Socket Sent Once "); 
				}
				k++;
				page++;
				next();
			 });
	}
	});
	
},
function (err) {
//console.log('this is error');
  // All things are done!
});

//send_data_back(c_phone,socket.id);
//console.log('Inserted all Here is available array '+arraynew);

		var query = db.query('SELECT * from  t_mycontacts   WHERE c_contact=?  ',[own_number], function(err,row,result) {  if (err) { throw err;}
else{	
if(row.length<1)
		{
		var query = db.query('INSERT INTO t_mycontacts  SET c_contact=? , c_parent =""   ',[own_number], function(err,info) {  if (err) { throw err;}
else{	
	//console.log("Parent Insert done");
	}
	
	});
		}
		else{
	//console.log('Parent alredy exists');
		}
	}	
	});
	//console.log("After Query Execution ");
	
	//group_created_notification t_verification //own_number 
	//	var response = {flag:"group_created_notification",group_id:insert_id,image_tag:time_now,image_path:site_url + "uploaded/image/" +group_image,created:group_admin,group_name:group_name}; 
	
	var query = db.query(' SELECT t_me_group FROM t_group_members WHERE t_me_contact= ?  ',[own_number], function(err,row,result) {
	if (err) { throw err; }
		//var group_id = row[0].t_me_group;
		var count = row.length;
		var i = 0;
		if(count>0)
		{
			async.whilst(function () {
			return i < count;
			},
			function (next) {
				var group_id = row[i].t_me_group;
				var que = db.query(' SELECT * FROM t_verification   WHERE v_id= ?  ',[row[i].t_me_group], function(err1,row1,result1) {
				if (err1) { throw err1; }
				//console.log("Here is data : - "+row1);
				var cnt = row1.length;
					if(cnt>0)
					{
						
					/* console.log("Group Name : "+row1[0].v_group_name);
					console.log("Admin Name : "+row1[0].v_group_admin); */
					
						var response = {flag:"group_created_notification",group_id:group_id,image_tag:row1[0].v_img_time,image_path:site_url + "uploaded/image/" +row1[0].v_img,created:row1[0].v_group_admin,group_name:row1[0].v_group_name}; 
						console.log("Complete Responce : - "+response);
						io.to(socket.id).emit('receive',response);
						
					}
				});
			i++;
			next();
			});

		}
		
	});
	});
	
	/////// Done this request //////////////////////////////////////////*****************/////////////////////////////////////////////////////////////////
	////******* Upload Database  ****************/////
	socket.on('database_upload', function(data){
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	//arr.filename, arr.user_id
	
	var query = db.query('UPDATE  t_verification SET  v_db=?,  v_db_date = ?  WHERE  v_id = ?   ',[arr.filename,Date.now(),arr.user_id], function(err,row,result) {
		if (err) { throw err; }
	});
	});
	////******* Upload Database  ****************/////
	////////Request For Block /////
	////******* Reply Database Starts Here  ****************/////
	socket.on('reply_database', function(data){
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	// arr.user_id
	
	var query = db.query('SELECT v_db FROM   t_verification   WHERE  v_id = ? AND  v_db!=""  ',[arr.user_id], function(err,row,result) {
		if (err) { throw err; }
		if(row.length>0)
		{
			row[0].v_db;
			var response = {flag:"reply_database",database_link:site_url + "uploaded/image/" + row[0].v_db};	
			io.to(socket.id).emit('receive',response);
		}
	});
	});
	////*******  Reply Database ENDS Here  ****************/////
	////////Request For Block /////
	

	socket.on('block_users', function(data){
	
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
//	console.log(arr); arr.mode
	var own_number = arr['my_id'];
	var mobilenumber = arr['mobilenumber'];
	var count = arr['contact_list'].length;
	//arr['contact_list'][i]['Phone']
	i=0;
	async.whilst(function () {
  return i < count;
},
function (next) {
		var user_no = arr['contact_list'][i]['contact'];
		var user_id = arr['contact_list'][i]['cont_id'];
		
		if(arr.mode=='block')
		{
		var query = db.query('SELECT * FROM   t_blocked WHERE b_from=?  AND  b_to = ?   ',[own_number,user_id], function(err,row,result) {
		if (err) { throw err; }
		if(row.length>0)
		{
			console.log("Already blocked");
		}
		else{
			
		var query = db.query('INSERT INTO  t_blocked SET  b_from=? ,   b_to = ? , b_from_no=?  ',[own_number,user_id,mobilenumber], function(err,info) {
		 if (err){ throw err;}
		var insert_id  = info.insertId;
		console.log("Insert Id : - "+insert_id);
		console.log('contact Blocked From '+own_number +'  , To '+user_id);
		
		var query = db.query('SELECT * FROM t_socket_id WHERE s_phone = ?   ',[user_no], function(err,row,result) {
		if(err){throw err;}
		if(row.length>0)
		{
			var response = {flag:"you_are_blocked",blocked_from:own_number,block_st:"1",blocked_from_no:mobilenumber};	
			io.to(row[0].s_socket).emit('receive',response);
			var query = db.query('UPDATE t_blocked  SET b_seen_stat = "1" WHERE b_id = ?   ',[insert_id], function(err,row,result) {  if (err) { throw err; } });
		}
		else{
		var query = db.query('UPDATE t_blocked  SET b_seen_stat = "0" WHERE b_id = ?   ',[insert_id], function(err,row,result) {  if (err) {throw err; } });
		}
		});
		
		//var response = {flag:"typing_in_group",typing_from:arr.typing_from,group_id:arr.cw_id,typ_stat:arr.typ_stat};	
		//io.to(row1[0].s_socket).emit('receive',response);
		
		});
		}
		 });
		 }
		 if(arr.mode=='unblock')
		 {
			var query = db.query('SELECT * FROM   t_blocked WHERE b_from=?  AND  b_to = ?   ',[own_number,user_id], function(err,row,result) { 
			 if (err) { throw err; }
				if(row.length>0)
				{
					var query = db.query('SELECT * FROM   t_socket_id WHERE s_phone=?     ',[user_no], function(err1,row1,result1) {
					 if (err1) { throw err1; }
					if(row1.length>0)
					{
						var response = {flag:"you_are_blocked",blocked_from:own_number,block_st:"0",blocked_from_no:mobilenumber};	
						io.to(row1[0].s_socket).emit('receive',response);
						
						var query = db.query('DELETE FROM  t_blocked  WHERE b_id=? ',[row[0].b_id], function(err1,row1,result1) { if(err1){throw err1;} });	
					}
					else{
					//b_seen_unblocked
					// Setting  b_seen_unblocked to 1 if he is unblocked and not available, so that when He will get online, he will be able to delete this row.
					var query = db.query('UPDATE   t_blocked SET b_seen_unblocked="1" WHERE b_id=? ',[row[0].b_id], function(err1,row1,result1) { if(err1){throw err1;} });	
					}
					});
				}
				else{
					console.log("not blocked previously ");
				}
			});
		 }
		i++;
		next();
});

	});
	
	
	////Typping in Group Starts ///////
	
		socket.on('typing_in_group', function(data){
		var s = JSON.stringify(data);
		var arr = JSON.parse(s);
			//arr.my_id,arr.cw_id,arr.typ_stat(yes/no), arr.typing_from
			console.log(arr.typing_from+" Typing in Group "+arr.cw_id+" Status : "+arr.typ_stat);
			console.log("Group_id : "+arr.cw_id);
		var query = db.query('SELECT * FROM  t_group_members WHERE   t_me_group=?   ',[arr.cw_id], function(err,row,result) {
		if (err) { throw err; }
			var count = row.length;
			console.log("Count is here : "+count);
			var i =0;
			async.whilst(function () {
		  return i < count;
		},
		function (next) {
		
		//console.log("Contact : "+row[i].t_me_contact);
		console.log('SELECT s_socket FROM   t_socket_id WHERE   s_phone='+row[i].t_me_contact);
		var que= db.query('SELECT s_socket FROM   t_socket_id WHERE   s_phone=?  ',[row[i].t_me_contact], function(err1,row1,result1) {
		if (err1) { throw err1; }
			if(row1.length>0)
			{
				//if(arr.typ_stat=='yes')
				//if(arr.typing_from!=)
				console.log("Socket : Sent : "+row1[0].s_socket);
				var response = {flag:"typing_in_group",typing_from:arr.typing_from,group_id:arr.cw_id,typ_stat:arr.typ_stat};	
				if(row1[0].s_socket!=socket.id)
				{
					io.to(row1[0].s_socket).emit('receive',response);
				}
				row1[0].s_socket;
			}
		});
		
		
		i++;
		next();
		});
			
		});
		
		});
	
	////Typping in Group Starts ///////
	//////////Request For Block Done ///   /////
	
		socket.on('create_group', function(data){
		
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	var group_admin = arr.group_admin;
	var group_name = arr.group_name;
	var group_image = arr.group_icon
	var count = arr['group_members'].length;
	var lastPage = count;
	var page = 0;
	var time_now = Date.now();
	var query = db.query('INSERT INTO  t_verification SET  v_group_name=? ,   v_group_admin = ?, v_type= "group" , v_img = ? ,v_img_time= ?  ',[group_name,group_admin,group_image,time_now], function(err,info) { if (err) { throw err; }
	var insert_id  = info.insertId;
	
	var response = {flag:"group_created_notification",group_id:insert_id,image_tag:time_now,image_path:site_url + "uploaded/image/" +group_image,created:group_admin,group_name:group_name};
	console.log('Insert Id ---------------- '+insert_id);
async.whilst(function () {
  return page < lastPage;
},
function (next) {
var name = arr['group_members'][page]['name'];
var contact = arr['group_members'][page]['contact'];

	var query = db.query('INSERT INTO  t_group_members SET  t_me_contact=? ,   t_me_name = ? , t_me_group =?  ',[contact,name,insert_id], function(err,info) {
	if (err) { throw err; }
	console.log("added ====== "+contact);
	});
		
	var que = db.query('SELECT * FROM  t_socket_id  WHERE s_phone = ?  ',[contact], function(err,row1,result1) {
	if (err) { throw err; }
	if(row1.length>0)
	{
	socket_id = row1[0].s_socket;
	console.log("Sent socket for group creation "+socket_id);	//console.log("added ====== "+contact);
	io.to(socket_id).emit('receive',response);
	//io.to(socket.id).emit('receive',response);
	}
	
	else{
	console.log("Inserted into database for group creation ");
		var que = db.query('INSERT INTO  t_group_notification_temp SET gt_contact =? , gt_group_id=?  , gt_admin = ? , gt_group_name = ? , gt_group_image=? , gt_img_tag = ?  ',[contact,insert_id,group_admin,group_name,group_image,time_now], function(err,row1,result1) {if (err) { throw err; }
		});
	}
	});
	
	//[contact,insert_id,group_image,group_name,group_admin,time_now]
	
	page++;
	next();
 
},
function (err) {
if (err) { throw err; }
console.log('this is error');
  // All things are done!
});
console.log("Sent to self : Group Created : - ");
	io.to(socket.id).emit('receive',response);
var query = db.query('INSERT INTO  t_group_members SET  t_me_contact=? ,   t_me_group =? , t_me_role = "admin"  ',[group_admin,insert_id], function(err,info) { if (err) { throw err; }
	});
	/* var response = {flag:"group_created",group_id:insert_id,image_tag:time_now,image_path:site_url + "uploaded/image/" +group_image};
			 io.to(socket.id).emit('receive',response); */
});

	});
	//////// Get All Group Data ////////////////// /////
	socket.on('get_group_data', function(data){
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	
	var groupid = arr.group_id;
	
	var query = db.query('SELECT * from    t_verification WHERE v_id = ?  ',[groupid], function(err,row,result) {
	if (err) { throw err; }
	//var image = row[0].v_img;
	var img_tag = row[0].v_img_time;	
	var img_type = row[0].v_type;
	var group_name = row[0].v_group_name;
	var img_path = site_url + "uploaded/image/" + row[0].v_img;
	var query = db.query('SELECT * from    t_group_members WHERE t_me_group = ?  ',[groupid], function(err,row_new,result) {if (err) { throw err; }
	
	var count = row_new.length;
	var i =0;
	var array_n = new Array();
	async.whilst(function () {
  return i < count;
},
function (next)
{
	var contact = row_new[i].t_me_contact;
	var role = row_new[i].t_me_role;
	
	if(role=='admin')
	{
		var data_value = role;  
	}
	else{
	var data_value = "member";  
	}
	
	array_n[i] = {cont_no:contact, role:data_value};

	if(i==(count-1))
	{
		var response = {flag:"group_data",data:array_n,group_name:group_name,img_tag:img_tag,image_path:img_path,cw_id:groupid};
		//io.sockets.emit('receive',response); 
		console.log("Responce = "+response);
		io.to(socket.id).emit('receive',response);
		 console.log('responce sent for checking group data');
		// io.to('1xUpM7d_xAjw6oCnAACC').emit('receive',response);
		console.log(response);
	}

i++;
next();
});
	});
	});
	
	/*
get_group_data	async.whilst(function () {
  return i < count;
},
function (next)
{

next();
}); */
	});
	////***************Seen Message in group Socket Starts*******************///
	/////Socket to exit Group 
		socket.on('exit_group', function(data){
		//arr.user_id, arr.user_no, arr.group_id, arr.group_name
		var s = JSON.stringify(data);
		var arr = JSON.parse(s);
		
	var query = db.query('SELECT * FROM  t_group_members  WHERE   t_me_group = ?  ',[arr.group_id], function(err,row,result) { if (err) { throw err; }
	var count = row.length;
	var i = 0;
		async.whilst(function () {
		return i < count;
		},
		function (next)
		{
		var contact_no = row[i].t_me_contact; 
		//console.log("delete contact : "+contact_no);
			var que = db.query('SELECT s_socket FROM  t_socket_id  WHERE   s_phone = ?  ',[contact_no], function(err1,row1,result1) { if (err1) { throw err1; }
			console.log(" My No : - "+arr.user_no);
			console.log(" Contact No : - "+contact_no);
			if(arr.user_no!=contact_no)
			{
				if(row1.length>0)
				{
					var response = {flag:"group_exit",user_id:arr.user_id,user_no:arr.user_no,group_id:arr.group_id,group_name:arr.group_name};
					io.to(row1[0].s_socket).emit('receive',response);
				}
				else{
					var que = db.query('INSERT INTO t_group_exit SET ge_user_id=?, ge_group_id=?, ge_user_no=?, ge_exit_no=?, ge_group_name=?   ',[arr.user_id,arr.group_id,contact_no,arr.user_no,arr.group_name], function(err2,row2,result2) { if (err2) { throw err2; } });
				}
			}
			});
			
			i++;
			next();
		});
	});
	var query = db.query('DELETE FROM  t_group_members  WHERE  t_me_group = ? AND t_me_contact=?  ',[arr.group_id,arr.user_no], function(err,row,result) { if (err) { throw err; } });
		});
/* 	socket.on('group_seen_status', function(data){
	console.log("Seen status In Group called Here :------- :");
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
		//arr.from, arr.group_id, 
		
		}); */
	////***************Seen Message in group Socket End*******************///
	
	////***************Seen Message Personal Socket Starts*******************///	
	socket.on('seen_message_socket', function(data){
	console.log("Seen status called Here :------- :");
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
		//arr.my_id, arr.chat_with_id , arr.my_contact arr.chat_type /group/individual
	console.log("here is chat type "+arr.chat_type);
	if(arr.chat_type=='group')
	{
	console.log("yes you are inside."+arr.my_contact+", chat with ID "+arr.chat_with_id);
	var query = db.query('SELECT * FROM  t_message_status  WHERE   ms_user = ? AND ms_group=? AND  ms_seen_status="0"  ',[arr.my_contact,arr.chat_with_id], function(err,row,result) { if (err) { throw err; }
	var cnt = row.length;
	console.log(cnt);
		if(cnt>0)
		{
		var i=0;
			async.whilst(function (){
			return i < cnt;
			},
			function (next)
			{
			//console.log("  MSG ID : "+row[i].ms_msg_id);
			var msg_id = row[i].ms_msg_id;
			var ms_id = row[i].ms_id;
			var query = db.query('SELECT s_socket FROM  t_socket_id WHERE   s_phone = ?  ',[row[i].ms_from_no], function(err1,row1,result1) { if (err1) { throw err1; }
			if(row1.length>0)
			{
			var response = {flag:"group_delivery_status",status:"seen",delivered_to:arr.my_contact,delivered_group:arr.chat_with_id,delivered_msg_id:msg_id};
			var socket_id = row1[0].s_socket;
			io.to(socket_id).emit('receive',response);
			var query = db.query('UPDATE t_message_status  SET ms_seen_status="1" ,ms_seen_back="1" WHERE  ms_id=?  ',[ms_id], function(err1,row1,result1) { if (err1) { throw err1; } });
			console.log("value updated Please check this one. ");
			}
			else{
				var query = db.query('UPDATE t_message_status  SET ms_seen_status="1", ms_seen_back="0"  WHERE  ms_id=?  ',[ms_id], function(err1,row1,result1) { if (err1) { throw err1; } });
			}
			
			});
			i++;
			next();
			});
			
		}
	});
		/* var query = db.query('UPDATE  t_message_status SET ms_seen_status="1"  WHERE   ms_user = ? AND ms_group=?  ',[arr.my_contact,arr.chat_with_id], function(err,row,result) { if (err) { throw err; } }); */
	}
	/* var query = db.query('SELECT ms_from_no,ms_msg_id,ms_id FROM  t_message_status  WHERE   ms_user = ? AND ms_group=?  ',[arr.my_contact,arr.chat_with_id], function(err,row,result) { if (err) { throw err; }
	//row[i].ms_from_no;
	var count = row.length;
	var i =0;
			async.whilst(function () {
		  return i < count;
		},
		function (next)
		{
		var ms_id = row[i].ms_id;
		var time = Date.now();
		var query = db.query('SELECT * FROM  t_socket_id WHERE   s_phone = ?  ',[row[i].ms_from_no], function(err1,row1,result1) { if (err1) { throw err1; }
				if(row.length>0)
				{
			
			var response = {flag:"group_delivery_status",status:"seen",delivered_to:arr.my_contact,delivered_group:arr.chat_with_id,delivered_msg_id:row[i].ms_msg_id};
			var socket_id = row1[0].s_socket;
			io.to(socket_id).emit('receive',response);
			
			var query = db.query('UPDATE  t_message_status SET ms_seen_status="1" WHERE   ms_id = ?  ',[ms_id], function(err1,row1,result1) { if (err1) { throw err1; }
			
				});
				}
				else{
				var query = db.query('UPDATE  t_message_status SET ms_seen_status="0" WHERE   ms_id = ?  ',[ms_id], function(err1,row1,result1) { if (err1) { throw err1; }		
				});
				}
				});
		i++;
		next();
		});
	
	});
		 */
		 else{
		var query = db.query('SELECT v_phone FROM t_verification WHERE   v_id = ?  ',[arr.chat_with_id], function(err,row,result) { if (err) { throw err; }
			//row[0].v_phone;
			if(row.length>0)
				{
			var query = db.query('SELECT * FROM  t_socket_id WHERE   s_phone = ?  ',[row[0].v_phone], function(err,row,result) { if (err) { throw err; }
				if(row.length>0)
				{
					var socket =  row[0].s_socket;
			var response = {flag:"message_seen",user_id:arr.my_id};
			io.to(socket).emit('receive',response);
			console.log("Socket Seen status Sent Once ");
				}
				else{
				var query = db.query('INSERT INTO t_seen_status SET st_my_id = ? , st_with_id = ?   ',[arr.my_id,arr.chat_with_id], function(err,row,result) { if (err) { throw err; }
						
				});					
				}
				
			});
			}
		});
		}
		
	});
	
	
	//////// UPDATE Group Data ////////////////// /////
	socket.on('update_group_data', function(data){
	//console.log("Group Update Request : - ");
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	//arr.group_id, arr.mode , arr.my_id, arr.title, arr.my_contact
	var groupid = arr.group_id;
	
	if(arr.mode=='update_name')
	{
		var query = db.query('UPDATE t_verification SET v_group_name = ? WHERE v_id = ?  ',[arr.title,groupid], function(err,row,result) { if (err) { throw err; }
		});
	}
	
	if(arr.mode=='add_contact')
	{
	var query = db.query('SELECT v_fname From t_verification WHERE  v_phone=?   ',[arr.title], function(err,row,result) {
		if (err) { throw err; }
		if(row.length>0)
		{
			global.fname = row[0].v_fname;
		
		var query = db.query('INSERT INTO  t_group_members SET t_me_group = ?, t_me_contact = ? , t_me_name=?   ',[groupid,arr.title,row[0].v_fname], function(err,row,result) { if (err) { throw err; }
		});
		}
		});
	}
	/* if(arr.mode=='remove_contact')
	{
		var query = db.query('INSERT INTO  t_group_members SET t_me_group = ?, t_me_contact = ? , t_me_name=? WHERE v_id = ?  ',[arr.title,groupid], function(err,row,result) { if (err) { throw err; }
		});
	} */
	var timestamp =  Date.now();
	if(arr.mode=='update_pic')
	{
	
		var query = db.query('UPDATE  t_verification SET v_img = ? , v_img_time = ?  WHERE v_id = ?  ',[arr.title,timestamp,groupid], function(err,row,result) { if (err) { throw err; }
		});
	}
	
	var query = db.query('SELECT t_me_contact from  t_group_members WHERE t_me_group = ?  ',[groupid], function(err,row_new,result) { if (err) { throw err; }
 	console.log("Exiting Array : - "+row_new);
	console.log("New array after insert "+count);
	row_new.push({ t_me_contact: arr.title });  // add a new object

	var count = row_new.length;
	
	var i =0;
	
	var array_n = new Array();
	async.whilst(function () {
  return i < count;
},
function (next)
{
	//if(row_new[i].t_me_contact!=arr.my_contact)
	{
		//var socket_id = get_socket_id(row_new[i].t_me_contact);
		var user_contact = row_new[i].t_me_contact;
		var query = db.query('SELECT s_socket from t_socket_id WHERE s_phone = ?  ',[user_contact], function(err,row_new1,result) { if (err) { throw err; }
		if(row_new1.length>0)
		{
		var socket_id = row_new1[0].s_socket;
		if(arr.mode=='update_name')
		{
				console.log("Socket ID : - "+socket_id);
				var response = {flag:'group_details_update',mode:arr.mode,group_id: groupid, user_id:arr.my_id,title:arr.title,updated_by:arr.my_contact,group_name:arr.title,removed_user:''};
				console.log('Here is data  = '+response);
				//io.to(socket_id).emit('receive',response);		
		}
		if(arr.mode=='add_contact')
		{
		//fname;
		//console.log("adding functionality is here .");
			var response = {flag:'group_details_update',mode:arr.mode,group_id: groupid, user_id:arr.my_id,title:arr.title,user_name:'dummy',group_name:arr.group_name,updated_by:arr.my_contact,removed_user:''};
		}
		if(arr.mode=='update_pic')
		{
		//timestamp
			var response = {flag:'group_details_update',mode:arr.mode,group_id: groupid, user_id:arr.my_id,image_path:site_url + "uploaded/image/" + arr.title,img_tag:timestamp,group_name:arr.group_name,updated_by:arr.my_contact,removed_user:''};
		}
		if(arr.mode=='remove_contact')
		{
		//timestamp
		console.log("removing functionality is here .");
			var response = {flag:'group_details_update',mode:arr.mode,group_id: groupid, user_id:arr.my_id,removed_user: arr.title,group_name:arr.group_name,updated_by:arr.my_contact};
		}
			io.to(socket_id).emit('receive',response);		
		}
		else{
		//arr.group_id, arr.mode , arr.my_id, arr.title, arr.my_contact
		console.log("Group Name : - "+arr.group_name);
			var query = db.query('INSERT INTO t_group_updates SET gr_group_id = ?, gr_mode = ?, gr_my_id=? , gr_title=?, gr_my_contact=? , gr_contact=? , gr_img_tag =?,gr_group_name =? ',[arr.group_id,arr.mode,arr.my_id,arr.title,arr.my_contact, user_contact,timestamp,arr.group_name], function(err,row_new1,result) { if (err) { throw err; }
			});
		}
		
		
		/* else{
		console.log('no record found');
		} */
		});
	}
	
i++;
next();
});

 if(arr.mode=='remove_contact')
	{
		var query = db.query('DELETE FROM t_group_members WHERE t_me_contact=? AND t_me_group = ? ',[arr.title,groupid], function(err,row,result) { if (err) { throw err; }
		});
	}
	
		});
	});
	
	
	
	
	//////// Group Created ////////////////// /////
	
	///////Send Message Request //////////////////////  /////////
		/* 	Data with the greating group : - {"group_admin":"7385697913","group_name":"new groups ","group_icon":"noimage","group_members":[{"name":"Qas","image_path":"http://192.168.1.2:8080/uploaded/image/profile1445989056468.jp","cont_id":"70","image_tag":"1445989066529","checked":true,"contact":"4046266289"},{"name":"Santosh Narwade","image_path":"http://192.168.1.2:8080/uploaded/image/jumba1446892878350.jpg","cont_id":"19","image_tag":"123456789","checked":true,"contact":"9175129361"}]} */

	//check if no available
	socket.on('check_ifavailable', function(data){
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	//arr.mobile_no, arr.my_id
		var query = db.query('SELECT * FROM t_verification WHERE  v_phone = ? OR v_phone_2 = ?   ',[remove_zero(arr.mobile_no),remove_zero(arr.mobile_no)], function(err,row, result) {	
		 if (err) { throw err;}
    if (err) 
	{
		throw err;
	}
	else{
	
		if(row.length<1)
		{
			var response = {flag:"check_if_available",status:"false", message:"Not Available on Tawkeaze",user_id:'',cont_type:"individual",cont_status:'',user_blocked:'0'};
			io.to(socket.id).emit('receive',response);
		}
		else{
		var query = db.query('SELECT * FROM t_blocked WHERE  b_from = ?  AND b_to=?  ',[row[0].v_id, arr.my_id], function(err1,row1, result1) { if (err1) { throw err1; }	
		if(row1.length>0)
		{
			var blocked='1';
		}
		else{
			var blocked='0';
		}
			var response = {flag:"check_if_available",status:"true", message:"Available on Tawkeaze",user_id:row[0].v_id,u_contact:row[0].v_phone,cont_type:"individual",cont_status:row[0].v_online_status,user_blocked:blocked};
			io.to(socket.id).emit('receive',response);
			 });
		}
		
		//io.sockets.emit('receive',response);
		//console.log(response);
		 
		
	}
	
	});});
	
	//check Online offline Status.
	socket.on('check_status', function(data){
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	console.log(arr);
	//[arr.v_id,arr.self_id]
		var query = db.query('SELECT v_timezone,v_on_time,v_id FROM t_verification WHERE  v_phone = ? OR v_phone_2=?  ',[arr.v_id,arr.v_id], function(err,row, result) {	
    if (err) { throw err;}
	else{
		if(row.length<1)
		{
			var response = {flag:"status_reply",status:"Not available on Tawkeaze" };
		}
		else{
		if(row[0].v_on_time=='')
		{
			var status_st = "Online";
		}
		else{
			//var a  = new time.Date(parseInt(row[0].v_on_time));
			//var a = "";
			//a.setTimezone(row[0].v_timezone);
			//a = 'this is not done';
			//var status_st = "Last seen : "+ a.getHours()+" : "+a.getMinutes();
			//var status_st = "Last seen : "+row[0].v_on_time;
/* 			var a = new time.Date(row[0].v_on_time * 1000);
		a.setTimezone('Asia/Kolkata');
		console.log("Get current time is here  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    : : ::: : : :: : : : :"+a.getHours()+" :"+a.getMinutes()); */
		var status_n = get_time(row[0].v_on_time,arr.timezone);
		var status_st = 'Last Seen : '+status_n;
		}
		console.log(status_st);
			var response = {flag:"status_reply",status:status_st,v_id:arr.v_id};
		}
		 console.log('check status response '+response);
		 io.to(socket.id).emit('receive',response);
	}
	console.log(arr.self_id);
	
	 var query = db.query("SELECT * from t_online WHERE  o_from = ?  AND  o_to = ?  ",[arr.self_id,arr.v_id], function(err,row,result) {
	 if (err) { throw err;}
	if(row.length<1)
		{
		 var query = db.query('INSERT INTO t_online SET  o_from = ? , o_to = ?  ',[arr.self_id,arr.v_id], function(err,row,result) {  if (err) { throw err;} });
		}
	 });
	
	});});
	
	////Typying Status Starts
	
	socket.on('typing_status', function(data){
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	//[arr.typing_from,arr.typing_to,arr.typ_stat]
	console.log("Typing : "+arr.typing_from+", To "+arr.typing_to+", Status : "+arr.typ_stat);
		var query = db.query('SELECT * FROM t_socket_id WHERE  s_phone = ?   ',[remove_zero(arr.typing_to)], function(err,row, result) {	
    if (err) { throw err;}
	else{
	if(row.length>0)
		{
		if(arr.typ_stat=='yes')
		{
		//console.log(arr.typing_to);
			var response = {flag:"status_reply",status:"Typing...",v_id:arr.typing_from};
		}
		else{
			var response = {flag:"status_reply",status:"Online",v_id:arr.typing_from};
		}
		io.to(row[0].s_socket).emit('receive',response);
		}
	}
	});
	
	});
	////Typying Status End
	//Online/Offline Status Update  Starts Here 
 	socket.on('status_update', function(data){
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	//[arr.u_id,arr.u_status] 
	var query = db.query('UPDATE  t_verification SET v_online_status = ?  WHERE  v_id = ?   ',[arr.u_status,arr.u_id], function(err,row, result) { if(err){throw err;}	});
	console.log("Status Updated. Thanks.");
		// io.to(socket.id).emit('receive',response);
	}); 
	//Online/Offline Status Update Ends Here 
	
	//For Video Audio Call
	socket.on('video_audio_call', function(data){
	console.log('Here we have request for call');
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	//[arr.v_id,arr.self_id] [arr.to_call,arr.from_call,arr.call_type,arr.room]
	console.log("data"+arr.to_call);
		var query = db.query('SELECT *  FROM t_socket_id WHERE  s_phone = ?   ',[remove_zero(arr.to_call)], function(err,row, result) {	
    if (err) { throw err;}
	else{
		if(row.length<1)
		{
	
	   var query = db.query('SELECT v_id,v_device_tocken,v_fname,v_phone from t_verification WHERE  v_phone = ?   ',[remove_zero(arr.to_call)], function(err,row,result) {
		  if (err){ throw err;} else{
			//console.log("in function device tocken"+row.length);
			if(row.length>0)
		{
			var device = row[0].v_device_tocken;
			//from_call:arr.to_call,room:arr.room,call_type:arr.call_type,caller_name
			
			/* var query = db.query('SELECT  v_fname,v_img from t_verification WHERE  v_phone = ?   ',[arr.from_call], function(err,row_call,result) { 
		var caller_image = site_url + "uploaded/image/" + row_call[0].v_img;
		var caller_name=row_call[0].v_fname;
		var response = {flag:"video_audio_reply",from_call:arr.to_call,room:arr.room,call_type:arr.call_type,caller_name:row[0].v_fname,caller_name:caller_name,caller_image:caller_image,calling_no:arr.from_call}; */
		
		var query = db.query('SELECT  v_id,v_fname,v_img from t_verification WHERE  v_phone = ?   ',[arr.from_call], function(err,row_call,result) { 
		if (err) { throw err; }	
		var caller_image = site_url + "uploaded/image/" + row_call[0].v_img;
		var caller_name=row_call[0].v_fname;
		var calling_id=row_call[0].v_id;
		/* console.log("from_call : "+arr.to_call+", room : "+arr.room+", call_type : "+arr.call_type+ ", caller_name : "+arr.caller_name +", caller_image : "+arr.caller_image+", calling_no : "+arr.calling_no);
		 */
			var msg = "Call From : " + caller_name;
			
		console.log('call from here so no problem....................');
		  agent.createMessage()
			.device(device)
			.alert(msg)
			.badge(1)
			.sound("notification.wav")
			.set('from_call', remove_zero(arr.to_call))
			.set('room', arr.room)
			.set('call_type', arr.call_type)
			.set('caller_name', caller_name)
			.set('caller_image', caller_image)
			.set('calling_no', arr.from_call)
			.set('calling_id',calling_id)
			.set('push_type', 'call')
			.send();
			console.log("===========================Push Sent Successfully");
			
			});
		}
		  } });
			
		}
		else{
		 var row_1 = row;
		   var query = db.query('SELECT v_device_tocken,v_fname,v_phone from t_verification WHERE  v_phone = ?   ',[remove_zero(arr.to_call)], function(err,row,result) {
		  if (err){ throw err;} else{
			//console.log("in function device tocken"+row.length);
			if(row.length>0)
		{
		console.log("------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
		//from_call
		
		var query = db.query('SELECT  v_id,v_fname,v_img  from t_verification WHERE  v_phone = ?   ',[arr.from_call], function(err,row_call,result) { 
		if (err) { throw err; }	
		var caller_image = site_url + "uploaded/image/" + row_call[0].v_img;
		if(row_call[0].v_fname=='')
		{
			var caller_name=arr.from_call;
		}
		else{
			var caller_name=row_call[0].v_fname;
		}
		var calling_id=row_call[0].v_id;
		var response = {flag:"video_audio_reply",from_call:arr.to_call,room:arr.room,call_type:arr.call_type,caller_name:caller_name,caller_image:caller_image,calling_no:arr.from_call,calling_id:row_call[0].v_id};
		
		console.log(response);
		 io.to(row_1[0].s_socket).emit('receive',response);
		 
		 var device = row[0].v_device_tocken;
			var msg = "Call From : " + caller_name;
		  agent.createMessage()
			.device(device)
			.alert(msg)
			.badge(1)
			.sound("notification.wav")
			.set('from_call', arr.to_call)
			.set('room', arr.room)
			.set('call_type', arr.call_type)
			.set('caller_name', caller_name)
			.set('caller_image', caller_image)
			.set('calling_no', arr.from_call)
			.set('calling_id', calling_id)
			.set('push_type', 'call')
			.send();
			console.log("===========================Push Sent Successfully");
			
		 });
		//console.log("row[0].v_fname"+row[0].v_fname);	
		}
		  } });
		}
	}
		});
	});
	
	//// Event When Any User Reject The call //////
socket.on('reject_call', function(data){
	console.log('Here we have request for reject call');
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	console.log(s);
	////[arr.reject_from,arr.reject_to,arr.reject_type] [arr.to_call,arr.from_call,arr.call_type,arr.room]
	console.log("data"+arr.reject_to);
	
	var query = db.query('Select * FROM t_socket_id WHERE  s_phone = ?   ',[arr.reject_to], function(errr,row, res) {
				if (errr) { throw errr; }
				if(row.length<1)
				{
					//console.log('no record found');
					var query = db.query('INSERT INTO t_call_history SET  c_call_from_no = ? , c_call_to_no = ? , c_call_type=?, c_call_time=?  ',[arr.reject_from,arr.reject_to,arr.reject_type,curent_time_n()], function(errr,row1, res1) {
					if (errr){ throw errr;}
					});
				}
				else{
				//console.log("Last seen "+result[index].o_to);
				var response = {flag:"reject_call",call_from:arr.reject_from};
				var socket_id =  row[0].s_socket;
				console.log("socket for call reject= "+socket_id);
				io.to(socket_id).emit('receive',response);	}
				});
	});
	socket.on('send_message', function(data){
	//console.log("Send Message Data : "+JSON.stringify(data));
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	
	console.log("Here is message "+ arr.message);
	//[arr.from,arr.chat_with,arr.message,arr.data_type,arr.file_name, arr.chat_type(group/single), arr.my_id,arr.cw_id]; type = image, text, video, contact, location, document,  arr.my_status
	//console.log('Here is message @@@##############@@@@@@@@@@@ : - '+arr);
	console.log('Here is message @@@##############@@@@@@@@@@@ File Name : - '+arr.file_name+" & File Type : - "+arr.data_type);
	 var query = db.query('SELECT b_id from t_blocked WHERE  b_from = ?  AND b_to=?  ',[arr.cw_id,arr.my_id], function(err,row,result) {	
	 if (err){ throw err;}
	 var r_count = row.length;
	 if(r_count>0)
	 {
		var response = {flag:"blocked_before_message",blocked_for:arr.cw_id};
	 	io.to(socket.id).emit('receive',response);
	 }
	 else{
 var query = db.query('SELECT v_phone from t_verification WHERE  v_phone = ?  OR v_phone_2 = ?  ',[remove_zero(arr.chat_with),remove_zero(arr.chat_with)], function(err1,row1,result1) {	
 if (err1){ throw err1;}
 if(row1.length>0)
 {
 var chatwith= row1[0].v_phone;
 console.log("Error is here  : - ");
 console.log(row1);
	 var query = db.query('SELECT s_socket from t_socket_id WHERE  s_phone = ?   ',[row1[0].v_phone], function(err,row,result) {	
		if (err){ throw err;}
		else{
		
		var msg;
			var fileSizeInBytes;
			if(arr.data_type=='image' || arr.data_type=='video' || arr.data_type=='audio')
			{
				msg = site_url + "uploaded/image/" + arr.file_name;		
				
		//console.log("File Name "+arr.file_name);
		if (fs.existsSync("uploads/" + arr.file_name)) {
		var stats = fs.statSync("uploads/" + arr.file_name);
		fileSizeInBytes = stats["size"];
		console.log("File SiZe : "+fileSizeInBytes);
		} 
			}
			else{
				msg	= arr.message;
				fileSizeInBytes = "1";
			}
			console.log(msg);
			//console.log("uploads/" + arr.file_name);

	if(row.length<1)
		{
			//console.log("Nothing found for file size "+fileSizeInBytes);arr.message
			if(arr.data_type=='text')
			{
				var msg = punycode.encode(msg);
			}
			console.log("inserting values in database for temporary purpose.");
			 var query = db.query('INSERT INTO t_temp_messages SET te_from_id=? , te_to_id = ? , te_message = ? , te_time=? , te_type=? , te_name =?, te_sender_id=?, te_file_size=?,te_to_sent_id=?, te_cont_status = ? ',[arr.from,chatwith,msg,arr.date_time,arr.data_type,arr.file_name,arr.my_id,fileSizeInBytes,arr.cw_id,arr.my_status], function(err,row,result) {	
			 if (err){ throw err;}
			 else{
				console.log("Device is not available online, Hence message stored in database successfully it will delivered to device when device will get online again.");	 
			 }
			 });
			 /*  var query = db.query('INSERT INTO t_delivery_repo SET d_contact=? , d_user_id = ? ',[arr.from,arr.cw_id], function(err,row,result) {	
			 if (err){ throw err;}
			  */
		}else{
			var sock_id = row[0].s_socket;
			var my_id_n = arr.my_id.toString();
		 	var response = {flag:"receive_message", message:msg,chat_with:arr.from,date_time:arr.date_time,data_type:arr.data_type,file_name:fileSizeInBytes,cw_id:arr.my_id,cw_type:"individual",group_name:'no',cont_status:arr.my_status};

			console.log("Message Replied"+response);
			io.to(sock_id).emit('receive',response);
	
		var response = {flag:"delivered_report", user_id:arr.cw_id};
		console.log("This is return Message : - "+response);
		io.to(socket.id).emit('receive',response);
		
		}
		
		var query = db.query('SELECT * FROM t_verification   WHERE  v_id = ?   ',[arr.my_id], function(err,row, result) {	
		if (err) { throw err; }
		else{
				if(row.length>0)
				{
					if(row[0].v_fname!='')
					{
						var name = row[0].v_fname;
					}
					else{
						var name = row[0].v_phone;
					}
					console.log("Message Type :- "+arr.data_type);
				send_push(chatwith,arr.message,arr.data_type,name,row[0].v_id); // Send Push Notification
				}		
		}
		});
		}
		});
	 }
	 });
		 }
	 });
	});
	///////****SEND Message Ends Here ***************///////
	
	//------------Group Messages----------------------------//
	
	socket.on('group_message', function(data){
	
		//[arr.from,arr.my_id,arr.group_id,arr.data_type,arr.file_name,arr.chat_with,arr.date_time,arr.cw_id,arr.msg_id]; type = image, text, video, contact, location, document
	//message/ send_type (individual/group) / sender
	
	var s = JSON.stringify(data);
	var arr = JSON.parse(s);
	//console.log(' FROM Message : - '+arr.from);
	var time = Date.now();
	/* var query = db.query('INSERT INTO t_message_status SET ms_from = ?, ms_group = ?,  ms_status = "0", ms_parent = "0", ms_time = ? , ms_msg_id=?  ',[arr.my_id,arr.cw_id,time,arr.msg_id], function(err,info) {	if(err){throw err;} //var insert_id  = info.insertId;
	}); */
	
	
	var query = db.query('SELECT v_id,v_group_name from t_verification WHERE  v_id = ?   ',[arr.cw_id], function(err,row,result) {	
	if (err) { throw err; }
		JSON.stringify(row);
		var group_name = row[0].v_group_name;

	query = db.query('SELECT * from t_group_members WHERE  t_me_group = ?  ',[arr.cw_id], function(err,row,result) {	
	if (err) { throw err; } 
	//console.log("Data : - "+JSON.stringify(row));
		
		
	var page = 0,
    lastPage = row.length;

async.whilst(function () {
  return page < lastPage;
},
function (next) {

var contact_no = row[page].t_me_contact;
		
			//console.log(msg);

			var fileSizeInBytes;
console.log("File name is here -------------------------- "+arr.file_name);
		if (fs.existsSync("uploads/" + arr.file_name)) {
		console.log("File Exists"+ arr.file_name);
		var stats = fs.statSync("uploads/" + arr.file_name);
		fileSizeInBytes = stats["size"];
		console.log("File SiZe : "+fileSizeInBytes);
		}
		//console.log("File Size : - "+fileSizeInBytes);
		//http://192.168.1.7:8080/uploaded/image/trebleJr1450420516697.png
		
que1 = 'SELECT s_socket FROM  t_socket_id  WHERE s_phone="'+row[page].t_me_contact+'  "   ';
	var contact_id = row[page].t_me_contact;
	console.log(contact_id);
	
		var query = db.query(que1, function(err1,row1,result1) {
			if (err1) { throw err1; }
			var my_id = arr.my_id;
			var cw_id = arr.cw_id;
			var msg_id = arr.msg_id;
			contact_id ;
			if(contact_id!=arr.from)
			{
			console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ : My Id : "+my_id+" ; CW_id : "+cw_id+" ; contact_id : "+contact_id);
			
				//////Query to Select if row available in table t_message_status/////
			var query = db.query('SELECT ms_id FROM t_message_status WHERE  ms_from=? AND ms_group=? AND ms_user=? ',[my_id,cw_id,contact_id], function(err2,row2,result1) {
			if(err2){ throw err2;}
			if(row1.length>0)
			{
				var response = {flag:"group_delivery_status",status:"delivered",delivered_to:contact_id,delivered_group:cw_id,delivered_msg_id:msg_id};
				io.to(socket.id).emit('receive',response);
				var read_stat = "1";
			}
			else{
			var read_stat = "0";
			}
			if(row2.length>0)
			{ 
				//// If Available we will update only msg id///
				var ms_id = row2[0].ms_id;
				//console.log("Inserting in global variable : - "+global.ms_id);ms_seen_back
				var query = db.query('UPDATE t_message_status SET  ms_msg_id=?,ms_status=?, ms_seen_status="0",ms_from_no=?,ms_seen_back="0" WHERE ms_id=?  ',[msg_id,read_stat,arr.from,row2[0].ms_id], function(err2,row2,result1) { if(err2){ throw err2;} });
			}
			else{
			////If Not Available we will add new row there and will update that next time
			var query = db.query('INSERT INTO t_message_status SET  ms_from=? , ms_group=? , ms_user=?, ms_msg_id=?,ms_status=?, ms_seen_status="0",ms_from_no=?,ms_seen_back="0" ',[my_id,cw_id,contact_id,msg_id,read_stat,arr.from], function(err2,info) { if(err2){ throw err2;}  /* global.ms_id = info.insertId; */ }); 
			}
			//console.log("Checking Global variable : - "+global.ms_id);
			
			});
			
			}
			//// gathering All the information ///
			var msg;
			if(arr.data_type=='image' || arr.data_type=='video' || arr.data_type=='audio')
			{
				msg =site_url + "uploaded/image/" + arr.file_name;		
			}
			else{
				msg	= arr.message;
			}
			if(row1.length>0)
			{
			console.log("++++++++ Global Id : "+global.ms_id);
			var socket_id = row1[0].s_socket;
			//console.log("Here is socket Id for group Message : "+socket_id);
			
			var response = {flag:"receive_message", message:msg,chat_with:arr.from,date_time:arr.date_time,data_type:arr.data_type,file_name:fileSizeInBytes,sender_id:arr.my_id,cw_id:arr.cw_id,cw_type:'group',group_name:group_name};
					//console.log("What is this : - "+index+", Phone Number : "+contact_n);
					if(contact_no!=arr.from)
					{
						io.to(socket_id).emit('receive',response);
						var query = db.query('SELECT v_id,v_fname,v_phone from t_verification WHERE  v_id = ?   ',[arr.my_id], function(err2,row2,result1) {
						if(err2){throw err2;}
						if(row2[0].v_fname!='')
						{name = row2[0].v_fname+ " @ "+ group_name;	}
						else{ name = row2[0].v_phone+ " @ "+ group_name;}
						//console.log("Message From groupHere is data type " +arr.data_type);
						send_push(contact_no,msg,arr.data_type,name,arr.cw_id); // Calling function to send Push notification 
						});
					}
					page++;
					next();
			}
			else{
			console.log("---------------- Global Id : "+global.ms_id);
			//var punnyencoded_message = punycode.encode(msg);
			console.log(arr.data_type);
			if(arr.data_type=='text')
			{
			console.log("Here is messages : = "+msg);
				var msg = punycode.encode(msg);
				console.log("Encoded in punny ");
			}
					var grptype = "group";
					var query = db.query('INSERT INTO t_temp_messages SET te_from_id = ? , te_to_id=? , te_msg_type = ? , te_group_id=? , te_group_name = ?, te_message = ? ,  te_time = ? , te_type = ? , te_name = ? , te_sender_id = ? ,	te_msg_id=?  ',[arr.from,contact_no,grptype,arr.cw_id ,group_name,msg,arr.date_time,arr.data_type,arr.file_name,arr.my_id,arr.msg_id], function(err,row,res) {
					if (err) { throw err; }	});
					
					var query = db.query('SELECT v_id,v_fname,v_phone from t_verification WHERE  v_id = ?   ',[arr.my_id], function(err2,row2,result1) {
						if(err2){throw err2;}
						if(row2[0].v_fname!='')
						{
							name = row2[0].v_fname+ " @ "+ group_name;
						}
						else{
							name = row2[0].v_phone+ " @ "+ group_name;
						}
						console.log("Name is here Here is new push in group........................."+name);
						send_push(contact_no,msg,arr.data_type,name,arr.cw_id);
						page++;
						next();
						});
					}
			});
console.log(page);
//console.log("Other Contact : - "+row[page].t_me_contact+" , My Contact : = "+arr.from);
/* page++;
next(); */
}
);

		/* var i = 0;
		var count = row.length;
		async.whilst(function () {
		return i < count;
		},
		function (next1) {
		if(row[i].t_me_contact!=arr.from)
		{
			var my_id = arr.my_id;
			var cw_id = arr.cw_id;
			var msg_id = arr.msg_id;
			var contact_id = row[i].t_me_contact;
			console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ : My Id : "+my_id+" ; CW_id : "+cw_id+" ; contact_id : "+contact_id);
			
			//////Query to Select if row available in table t_message_status/////
			var query = db.query('SELECT ms_id FROM t_message_status WHERE  ms_from=? AND ms_group=? AND ms_user=? ',[my_id,cw_id,contact_id], function(err2,row2,result1) {
			if(err2){ throw err2;}
			if(row2.length>0)
			{
			console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ inside : My Id : "+my_id+" ; CW_id : "+cw_id+" ; contact_id : "+contact_id);
				//// If Available we will update only msg id///
				var query = db.query('UPDATE t_message_status SET  ms_msg_id=?,ms_status="0", ms_seen_status="0" WHERE ms_id=?  ',[msg_id,row2[0].ms_id], function(err2,row2,result1) { if(err2){ throw err2;} });
				console.log("updating global value : "+row2[0].ms_id);
				var ms_id = row2[0].ms_id;
			}
			else{
			////If Not Available we will add new row there and will update that next time
			console.log("Inserting single value but it is duplicated @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@");
			var query = db.query('INSERT INTO t_message_status SET  ms_from=? , ms_group=? , ms_user=?, ms_msg_id=?,ms_status="0", ms_seen_status="0" ',[my_id,cw_id,contact_id,msg_id], function(err2,info) { if(err2){ throw err2;}  var ms_id = info.insertId; });
			}
			});
			
		i++;
		next1();
		}
		}); */

	
	});
		//console.log(data);
	});
	
	});
	socket.on('disconnect', function() {
		i=i-1;
    console.log("gone client is = "+socket.id);
	var query = db.query('Select * FROM t_socket_id WHERE  s_socket = ?   ',[socket.id], function(err,row, result) {	
		if (err) { throw err; }
		else{
		if(row.length>0)
		{
			var phone = row[0].s_phone;
			console.log('Gone client no is '+phone);
			var time_on = Date.now();
			//a.setTimezone('Asia/Kolkata');
			
			//console.log("Date Now Function :- "+Date.now());
			//var a  = new time.Date(Date.now());
			//a.setTimezone('Asia/Kolkata');
			//var status_st = "Last seen @ "+ a.getHours()+" : "+a.getMinutes()+" : "+a.getSeconds();
			//console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@ : - Here is Time : - "+status_st+", and stamp is here : "+a);
			
			//console.log(" Converted into json object : "+JSON.stringify(ab));
			//var a = JSON.parse(ab);
			//console.log("is this object "+a);
			//var status_st = "Last seen @ "+ a.getHours()+" : "+a.getMinutes()+" : "+a.getSeconds();
			//console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@ : - Here is Time : - "+status_st+", and stamp is here : "+a);
			//var a='simple dummy value';
			//a = String(a);
			console.log("Time zone : - @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-------"+Date.now());
			var query = db.query('UPDATE   t_verification SET  v_badge="0", v_on_time  = ? WHERE v_phone = ?   ',[time.time(),row[0].s_phone], function(err,row, result) {  if (err) { throw err; }		});

		console.log('Phone : '+ row[0].s_phone);
		
		var query = db.query('Select * FROM t_socket_id   ',[], function(err,row1,result) {	if (err) { throw err; }	
		var count = row1.length;
var i = 0;
async.whilst(function () {
  return i < count;
},
function (next) {
	console.log("Phone Number : - "+row1[i].s_phone);
		var query = db.query('Select v_id,v_timezone FROM t_verification WHERE  v_phone = ?   ',[row1[i].s_phone], function(errr,roww, ress) { 
		if(errr){throw errr;}
		if(roww.length>0)
		{
			console.log("Time Zone is here "+roww[0].v_timezone);
			//get_time('now',roww[0].v_timezone);
			if(roww[0].v_timezone!=='')
			{
				var status_st = "Last seen "+ get_time('now',String(roww[0].v_timezone));
			}
			else{
			var status_st = "";
			}
			//var status_st = "Last seen ";
			console.log("Status before disconnect : = "+status_st);
				//var socket_id = roww[0].s_socket;
				//io.to(row1[i].s_socket).emit('receive',response);
				var response = {flag:"status_reply",status:status_st,v_id:phone};
				io.to(row1[i].s_socket).emit('receive',response);
					
				/* var query = db.query('Select v_id FROM t_verification WHERE  v_phone = ?   ',[phone], function(errr1,roww1, ress1) {
				
				}); */
				}
				i++;
					next();
				
		});
});

		});
		
		
		/* var query = db.query('Select * FROM t_online WHERE  o_to = ?   ',[phone], function(err,result) {	
		for (var index in result)
        {
				var query = db.query('Select * FROM t_socket_id WHERE  s_phone = ?   ',[result[index].o_from], function(errr,roww, res) {
				if (errr) { throw errr; }
				if(roww.length<1)
				{
					console.log('no record found');
				}
				else{
				//console.log("Last seen "+result[index].o_to);
				//var a  = new time.Date(parseInt(result[index].o_to));
				//a.setTimezone('Asia/Kolkata');
				//var status_st = "Last seen @ "+ a.getHours()+" : "+a.getMinutes()+" : "+a.getSeconds();
				var status_st ="";
				var response = {flag:"status_reply",status:status_st,v_id:result[index].o_to};
				var socket_id = roww[0].s_socket;
				io.to(socket_id).emit('receive',response);
				}
		});
		}
		}); */
		}
		}
		});
		
		
		
		
		
	 var query = db.query('DELETE FROM  t_socket_id WHERE  s_socket = ?   ',[socket.id], function(err, result) {	
		if (err) throw err;
		});
	    var index = clients.indexOf(socket);
        if (index != -1) {
            clients.splice(index, 1);
            console.info('Client gone (id=' + socket.id + ').');
        }
		console.log('Someone is disconnected '+i);
    });
	
	
});

function get_user_data(phone_no,type)
{
//console.log('Here is type ' +type);
	  var query = db.query('SELECT v_device_tocken,v_fname,v_phone,v_img from t_verification WHERE  v_phone = ?   ',[phone_no], function(err,row,result) {
		  
		  if (err){ throw err;} else{
			//console.log("in function device tocken"+row.length);
			if(row.length>0)
		{
		//console.log("Type : "+type);
			if(type=='token')
			{
			console.log('in function device tocken '+row[0].v_device_tocken);
				return  row[0].v_device_tocken;	
			}
			if(type=='name')
			{
				console.log("Here is value returned = "+row[0].v_fname);
				return  row[0].v_fname;	
				
			}
			if(type=='image')
			{
			console.log("Here is value returned = "+row[0].v_img);
				return  row[0].v_img;	
			}
			
		}
		  } });
}

function send_push(phone_no,message,type,name,u_id)
{
	//console.log("in push  Man "+phone_no);
   var query = db.query('SELECT v_id,v_device_tocken,v_fname,v_phone,v_badge from t_verification WHERE  v_phone = ?   ',[phone_no], function(err,row,result) {	
		if (err){ throw err;} else{
			console.log(row.length);
			if(row.length>0)
		{
		//var v_id = row[0].v_id;
		var badge_n = parseInt(row[0].v_badge)+1;
		var query = db.query('UPDATE  t_verification SET v_badge=? WHERE  v_phone = ?   ',[badge_n,phone_no], function(err,result) {	if (err) { throw err; }	
		
		//console.log("Here is badge : -------@@@@@@@@@@@@@@@@@@@@------------- ".badge_n);
		var device = row[0].v_device_tocken;
		//console.log("Tocken before push. : "+row[0].v_device_tocken);
		var msg;
		console.log("Console value : "+type);
		if(name=='')
			{
				name = row[0].v_phone;
			}
		if(type=='image')
			{
				//msg = 'Image ';	
				msg = name+" : Shared Image with you";	
			}
			else if(type=='contact')
			{
				//msg = 'Contact ';	
				msg = name+" : Shared Contact with you";				
			}
			else if(type=='video')
			{
				//msg = 'Contact ';	
				msg = name+" : Shared Video with you";				
			}
			else if(type=='audio')
			{
				//msg = 'Contact ';	
				msg = name+" : Shared Audio with you";				
			}
			else if(type=='location')
			{
				//msg = 'Location ';		
				msg = name+" : Shared Location with you";
			}
			else{
				msg = name+" : "+message;
			}
			console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+u_id);
		if(device!='')
		{
		console.log("inside : - "+u_id);
			agent.createMessage()
			.device(device)
			.alert(msg)
			.badge(badge_n)
			.sound("default")
			.set('user_id', u_id)
			.set('push_type', 'message')
			.send();
			console.log("===========================Push Sent Successfully");
		}
		
		});
		}
		}});	
}

console.log('Your application is running on http://localhost:8080' );



function curent_time() {
    var minutes = 1000 * 60;
    var hours = minutes * 60;
    var days = hours * 24;
    var years = days * 365;
    var d = new Date();
    var t= d.getTime();

    var y = Math.round(t / years);
 return  d;
    //document.getElementById("demo").innerHTML = d;
}

function curent_time_n() {
var d = new Date();

 console.log(d.getHours()+" : "+d.getMinutes()+" : "+d.getSeconds());

	return d.getHours()+" : "+d.getMinutes();
 //return hours +' : '+ minutes;
    //document.getElementById("demo").innerHTML = d;
}


function callthisfunction(c_name,c_phone,own_number)
{

//var que = 'SELECT * FROM  t_mycontacts  WHERE c_contact="'+c_phone+'" AND c_name="'+c_name+'" AND c_parent ="'+own_number+'"  ';
		//console.log(que);
		var query = db.query('SELECT * FROM  t_mycontacts  WHERE c_contact=? AND c_name=? AND c_parent =?  ',[c_phone,c_name,own_number], function(err,row,result) { 
		if (err) { throw err; }
else{	
//console.log("Query 1 "+i);
if(row.length<1)
		{
	//	console.log("Name Second Time : - "+arr['contact_list'][i]['Phone']);
	var que = 'INSERT INTO  t_mycontacts  SET c_contact="'+c_phone+'" , c_name="'+c_name+'" , c_parent ="'+own_number+'"  ';
			 var query = db.query(que, function(err,info) {  if (err) { throw err;}
else{
	}
	}); 
		}
	}
	});
	
		
}






 function get_socket_id(phone)
{
//	phone;
	var que1 = 'SELECT * FROM  t_socket_id  WHERE s_phone="'+phone+'"   ';
	//console.log(que1);
		var query = db.query(que1, function(err1,row1,result1) {
			if (err1) { throw err1; }
			//console.log("In socket function : "+row1.length);
				if(row1.length>0)
				{
				console.log("In socket function : "+row1[0].s_socket);
				 global.value_data =  row1[0].s_socket;
				}
				else{
				//global.value_data = "no";
				global.value_data = "";
				}
				

			});
			




			console.log('value_data'+global.value_data);
			var data = global.value_data;
			global.value_data = '';
			console.log("Socket _id before return : - "+data);
			return data;
	
} 

/* function get_socket_id(number){

var que1 = 'SELECT s_socket FROM  t_socket_id  WHERE s_phone="'+number+'"   ';
		var query = db.query(que1, function(err1,row1,result1) {
		if (err1) { throw err1; }
		return row1[0].s_socket;
		});
} */


/* 
Send Message Data : {"from":"9175129361","chat_with":"7385697913","message":"Yes","date_time":"2015-10-02 17:19:27 IST","data_type":"text","file_name":"","my_id":"2","vc_id":"6574011"} 
 {"from":"9175129361","chat_with":"7385697913","message":"asdfsdgzsdf hgh jhv","date_time":"2015-10-02 17:19:27 IST","data_type":"text","file_name":"","my_id":"2","vc_id":"6574011"}
*/

/* Send Message Data : {"group_name":"no group","my_id":4,"date_time":"2015-12-30 12:56:41 IST","cw_id":"2","cw_type":"individual","data_type":"text","recived_status":false,"message":"I am getting ur mesg while in chatting ","from":"7385697913","file_name":"TextMessage","chat_with":"9175129361","file_downloaded":true}

Send Message Data : {"group_name":"no group","my_id":4,"date_time":"2015-12-30 13:03:49 IST","cw_id":"2","cw_type":"individual","data_type":"text","recived_status":false,"message":"dfhhgh","from":"7385697913","file_name":"TextMessage","chat_with":"9175129361","file_downloaded":true}

 */
 
 function calcTime(city, offset) {

    // create Date object for current location
    d = new Date();
    
    // convert to msec
    // add local time zone offset 
    // get UTC time in msec
    utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    
    // create new Date object for different city
    // using supplied offset
    nd = new Date(utc + (3600000*offset));
    console.log(nd.getMinutes());
	nd.getMinutes();
    // return time as a string
    return "The local time in " + city + " is " + nd.toLocaleString();
}

function get_time(stamp,zone)
{
	zone = String(zone);
	console.log("Control is in function to calculate time  ...!    "+zone);
if(stamp=='now')
{
	var a = new time.Date(Date.now());
	 var date = "Today";
}else{
	var a = new time.Date(stamp * 1000);
	console.log("Get Date : "+a.getDate());
	var currenttime =  new time.Date(Date.now());
	//console.log(currenttime);
	currenttime.setTimezone(zone);
	if(currenttime.getDate()==a.getDate() && currenttime.getMonth()==a.getMonth() && currenttime.getFullYear()==a.getFullYear())
	{
	 var date = "Today";
	}
	else{
	var monthval = a.getMonth();
	//parseInt(monthval+1);
		var date = a.getDate()+"/"+parseInt(monthval+1)+"/"+a.getFullYear();
	}
	}
	
	//console.log(a);
		a.setTimezone(zone);
		return formatAMPM(a)+", "+date;
		/* var hours =a.getHours();
		var ampm = 'AM';
		if(hours>11)
		{
			hours = hours - 12;
			var ampm = 'PM';
		}
		return hours + ":"+a.getMinutes()+" "+ampm +" "+date ; */
		//console.log("Get current time is here  @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@    : : ::: : : :: : : : :"+a.getHours()+" :"+a.getMinutes());
}

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

function code_verification_nexmo(req_id,code)
{
	var data = JSON.stringify({
  api_key: '2187ca12',
  api_secret: 'eab5e7B2',
 // number: arr.countrycode+arr.mobilenumber,
 request_id:req_id,
  code: code
});

var options = {
  host: 'api.nexmo.com',
  path: '/verify/check/json',
  port: 443,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

var req = https.request(options);

req.write(data);
req.end();

var responseData = '';
req.on('response', function(res){
  res.on('data', function(chunk){
    responseData += chunk;
  });
  
  res.on('end', function(){
   
	var arr_n = JSON.parse(responseData);
	 console.log(arr_n);
	if(arr_n.status=='0')
	{
	 return '1';
	}else{
	return '0';
	}
	//var query = db.query('UPDATE t_verification SET v_request_id =? WHERE  v_cont_code = ? AND  v_phone = ?   ',[arr_n.request_id,arr.countrycode,arr.mobilenumber], function(err,row,result) {  });
  });
});

}

function remove_zero(value)
{
	var i = 0;
	var j = 0;
	while(i<value.length)
	{
		if(value.charAt(0)=="0")
		{
			value = value.substr(1,40);
		}
		else{
			break;
		}
		i++;
	}
	return value;
}