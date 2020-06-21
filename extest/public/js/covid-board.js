/* 확진자 정보 */
$(function(){
    console.log("??");
    var settings = {
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
        "timeout": 0,
      };
      $.ajax(settings).done(function (response) {
        var Global = 'Global'; Global=response[Global];
        var Countries='Countries';Countries=response[Countries];
       
        /* 전세계 확진자 순 나열 */ 
        $(".NewConfirmed").text(Global.NewConfirmed+" 명");
        Countries.sort(function(a,b){return b.TotalConfirmed-a.TotalConfirmed;});
        console.log(Countries);
   
        //board for문으로 수정해야함...

        var cell=document.getElementById('worldwide-board-cell');
        for(var i=0;i<Countries.length();i++){
            cell = cell.cloneNode(true);
            document.getElementById("worldwide-board").appendChild(cell);
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
      }); 
});