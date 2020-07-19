$(function(){
    var max=10;
    for (var i = 0; i < max; i++) {
        console.log(i);
        var cell = $("#news-list-cell").clone(true);
        $("#news-list-cell").after(cell);
    }

    var settings = {
        "url": "/newsdata",
        "method": "GET",
        "timeout": 0,
      };
    $.ajax(settings).done(function (response) {
        NewsData=response;
        var m=3;
        /*관련 뉴스 */


         for(var  i=0;i<max;i++){
            $( 'ul > li:nth-child('+i+') > a').attr('href',NewsData[i].Link);
            $( 'ul > li:nth-child('+i+') > a > div.headline').text(NewsData[i].Headline);
            $( 'ul > li:nth-child('+i+') > a > div.summary').text(NewsData[i].Summary);
            $( 'ul > li:nth-child('+i+') > a > div.date').text(NewsData[i].Date);
        }
    });
})