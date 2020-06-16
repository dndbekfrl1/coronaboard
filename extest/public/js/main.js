


$(function(){

    

    var settings = {
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
        "timeout": 0,
      };

      $.ajax(settings).done(function (response) {
        var Global = 'Global'; Global=response[Global];
        var Countries='Countries';Countries=response[Countries];
        /* 한국 */
        var korea_south=Countries[88];
        //누적 확진자 
        $(".live-confirmed").
        text("+"+korea_south.NewConfirmed+"명");
        //새 확진자 
        $(".changed-confirmed").text(korea_south.TotalConfirmed+"명");
        //새 확진자 증가 원그래프 애니메이션 
        var inc=korea_south.NewConfirmed*1;
        $(".korea-changed").animate({
            width: inc+'%',
            height: inc+'%'
        });
        //////////////
        /* 전세계 확진자 순 나열 */ 
        $(".NewConfirmed").text(Global.NewConfirmed+" 명");
        Countries.sort(function(a,b){return b.TotalConfirmed-a.TotalConfirmed;});
        console.log(Countries);
   
        //board for문으로 수정해야함...
        for(var i=0;i<5;i++){
            $(".worldwide-board li:nth-child("+(i+1)+")").children('.rank').text(i+1);
            $(".worldwide-board li:nth-child("+(i+1)+")").children('.country').text(Countries[i].Country);
            $(".worldwide-board li:nth-child("+(i+1)+")").children('.confirmed').children('.total-confirmed').text(Countries[i].TotalConfirmed+"명");
            var today_updated=parseInt(Countries[i].NewConfirmed);
            if(today_updated>0){
                $(".worldwide-board li:nth-child("+(i+1)+")").children('.confirmed').children('.today-updated').text("+"+today_updated).css('color','#D15252');
            }else{
                $(".worldwide-board li:nth-child("+(i+1)+")").children('.confirmed').children('.today-updated').text(today_updated);
            }
            
            console.log(i);
        }
       
        //////////////
        /*관련 뉴스 */
        for(var  i=0;i<5;i++){
            $( 'ul > li:nth-child('+i+') > a').attr('href',NewsData[i].Link);
            $( 'ul > li:nth-child('+i+') > a > div.headline').text(NewsData[i].Headline);
            $( 'ul > li:nth-child('+i+') > a > div.summary').text(NewsData[i].Summary);
            $( 'ul > li:nth-child('+i+') > a > div.date').text(NewsData[i].Date);
        }
      });
    
});

