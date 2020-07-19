module.exports = function (app) {
   app.get('/', function (req, res) {
      res.render('index.html')
   });
     
   /* 뉴스 데이터 크롤링 */
   app.get('/newsdata', function (req, res) {
      var request = require('request');
      var cheerio = require('cheerio');
      //var fs = require('fs');
      request.get({ url: 'https://www.ytn.co.kr/issue/corona.php' }, function (err, response, body) {
         var $ = cheerio.load(body);
         var NewsArray = new Array();
         var headline; var summary; var date; var link;
         var cnt=10;
         for (var i = 1; i <= cnt; i++) {
            var News = new Object(); // 뉴스 헤드라인, summary, date, 링크

            link = "https://www.ytn.co.kr"
            //헤드라인 
            headline = $(' #ytn_list_v2014 > dl:nth-child(' + i + ') >dt').text();
            //요약
            summary = $(' #ytn_list_v2014 > dl:nth-child(' + i + ') >dd.text').text();
            //날짜
            date = $(' #ytn_list_v2014 > dl:nth-child(' + i + ') >dd.date').text();
            //기사 링크
            link += $('#ytn_list_v2014 > dl:nth-child(' + i + ') > dd.text > a').attr('href');
            News.Headline = headline; News.Summary = summary; News.Date = date; News.Link = link;
            
            console.log(i);NewsArray.push(News);
            //res.send(News);
         }

         console.log(NewsArray);
         // fs.writeFile("newsdata.js", "var NewsData =" + JSON.stringify(NewsArray), function (err) {
         //    if (err) throw err;
         //    console.log('complete');
         // }
         // );
         res.send(NewsArray);
      })
   });

   app.get('/covid-board.html',function(req,res){
      res.render('covid-board.html');
   });
   app.get('/covid-news.html',function(req,res){
      res.render('covid-news.html');
   });

}