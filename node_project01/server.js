var http = require("http");
var express = require("express");
var fs = require("fs");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var ejs = require("ejs");

var app=express();
var client = mysql.createConnection({
	url : "localhost",
	user : "root",
	password : ""
});
client.query("use iot");

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.route("/project/game").get(function(request,response){
	var content = fs.readFileSync("./game/project01_7.html","utf8");
	response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
	response.end(content);

});

app.route("/project/write").post(function(request,response){
	console.log(request.body.jum);

	var sql ="insert into game(jumsu) values ("+request.body.jum+")";
	client.query(sql,function(error,data){
		//console.log("입력성공");
		//response.writeHead(200,{"Content-Type" : "text/html;charset=utf-8;"});
		//var content = fs.readFileSync("./game/gameover1_1.html","utf8");
		response.redirect("/project/list");
		
	});
});
//get방식으로 다시 구현
app.route("/project/writeuser1/:board_id/:user").get(function(request,response){
	var board_id=request.params.board_id;
	var user = request.params.user;
	console.log(board_id);
	console.log(request.params.user);
	var sql= "update game set user = '"+user+"' where board_id = "+board_id;
	client.query(sql,function(error,data){
		response.redirect("/project/list");
	});

	

});


//포스트방식의 유저 구현
app.route("/project/writeuser").post(function(request,response){
	console.log(request.body.board_id);

	var sql ="insert into game(user) values ('"+request.body.user+"')";
	console.log(sql);
	client.query(sql,function(error,data){
		console.log("입력성공");
		//response.writeHead(200,{"Content-Type" : "text/html;charset=utf-8;"});
		//var content = fs.readFileSync("./game/gameover1_1.html","utf8");
		response.redirect("/project/list");
	
	});


});

app.route("/project/list").get(function(request,response){
	response.writeHead(200,{"Content-Type" : "text/html;charset=utf-8;"});
	
	var sql="select * from game order by board_id desc limit 0,10";
	client.query(sql,function(error,jum){
		//console.log(jum);
		var content = fs.readFileSync("./game/gameover1_1.html","utf8");

		response.end(ejs.render(content,{dataList:jum}));
	
	});
});

var server = http.createServer(app);
server.listen(9999,function(){
	console.log("Sever is runnig at 9999.....");
});

