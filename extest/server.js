var express = require('express');
var app = express();

var router = require('./router/main')(app);


/* 정적파일  */
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(3000, function(){
    console.log("Express server has started on port 3000")
});



app.use(express.static('public'));