module.exports = function (app) {
   app.get('/', function (req, res) {
      res.render('index.html')
   });
   /*다이나믹 서비스*/
   app.get('/dynamic', function(req, res){
      var lis = '';
      for(var i = 0; i <5; i++){
          lis += '<li>coding ' + i + '</li>';
      }
      // 자바스크립트 새로운 표준 formatted text 기능
      // ` `(grave accent) 사용을 통해서 JS에서 여려줄의 코드를 넣을 수 없는 문제를 해결
      var output =
      `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body>
          hello Dynamic html~~!
              <ul>
                  ${lis} <!--문자열 내에서 변수 사용-->
              </ul>
        </body>
      </html>`;
      res.send(output);
    });
    
   /* 뉴스 데이터 크롤링 */
   app.get('/test', function (req, res) {
      console.log("testing ...");
      var request = require('request');
      var cheerio = require('cheerio');

      var fs = require('fs');

      request.get({ url: 'https://www.ytn.co.kr/issue/corona.php' }, function (err, response, body) {

         var $ = cheerio.load(body);
         var NewsArray = new Array();
         var headline; var summary; var date; var link;

         for (var i = 1; i <= 5; i++) {
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
            News.Headline = headline;
            News.Summary = summary;
            News.Date = date;
            News.Link = link;

            console.log(i);
            NewsArray.push(News);
         }

         console.log(NewsArray);
         fs.writeFile("newsdata.js", "var NewsData =" + JSON.stringify(NewsArray), function (err) {
            if (err) throw err;
            console.log('complete');
         }
         );
      })

      res.send(NewsArray);

   });

}