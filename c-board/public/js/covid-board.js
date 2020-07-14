// $( document ).ready( function() {

//     for(var i=0;i<4;i++){
//         var cell=$("#worldwide-board-cell").clone(true);
//         $("#worldwide-board-cell").after(cell);
//     }
// })


/* 확진자 정보 */
$(function () {
    var settings = {
        "url": "https://api.covid19api.com/summary",
        "method": "GET",
        "timeout": 0,
    };
    $.ajax(settings).done(function (response) {
        var Global = 'Global'; Global = response[Global];
        var Countries = 'Countries'; Countries = response[Countries];

        /* 전세계 확진자 순 나열 */
        $(".NewConfirmed").text(Global.NewConfirmed + " 명");
        Countries.sort(function (a, b) { return b.TotalConfirmed - a.TotalConfirmed; });
        
        var max=100;
        
        for (var i = 0; i < max; i++) {
            var cell = $("#worldwide-board-cell").clone(true);
            $("#worldwide-board-cell").after(cell);
        }
        for (var i = 0; i < max; i++) {
            $(".worldwide-board li:nth-child(" + (i + 1) + ")").children('.rank').text(i + 1);
            $(".worldwide-board li:nth-child(" + (i + 1) + ")").children('.country').text(Countries[i].Country);
            $(".worldwide-board li:nth-child(" + (i + 1) + ")").children('.confirmed').children('.total-confirmed').text(Countries[i].TotalConfirmed + "명");
            var today_updated = parseInt(Countries[i].NewConfirmed);
            if (today_updated > 0) {
                $(".worldwide-board li:nth-child(" + (i + 1) + ")").children('.confirmed').children('.today-updated').text("+" + today_updated).css('color', '#D15252');
            } else {
                $(".worldwide-board li:nth-child(" + (i + 1) + ")").children('.confirmed').children('.today-updated').text(today_updated);
            }
        }
    });
});