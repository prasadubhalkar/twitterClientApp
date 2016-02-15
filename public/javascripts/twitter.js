var TwitterAPI = (function(){
    function makeRequest(method,url,params,dataType,callback){
        $.ajax({
            type : method,
            url : url + params,
            dataType : dataType
        }).done(callback)
          .fail(function(){
            $("#searchErrorText").empty();
            $("#searchErrorText").html("Error retrieving data");    
        });
    }

	function initSearch(searchText){
        makeRequest('GET',"/users/search/",searchText,"JSON",function(data){
            if(!data.errors && data.statuses){
                renderGivenTimeLine(data.statuses);
            } else {
                $("#searchErrorText").empty();
                $("#searchErrorText").html("Error retrieving data");
            }
        });
    }

    function initUserTimeLine(){
        makeRequest('GET',"/users/success/usertimeline/","","JSON",function(data){
            renderGivenTimeLine(data);
        });
    }

    function loadHomeTimeLine(){
        makeRequest('GET',"/users/success/hometimeline/","","JSON",function(data){
            renderGivenTimeLine(data);
        });   
    }

    function renderGivenTimeLine(data) {
        var text = "";
        var urlsText = [];
        var urls = {};
        var tweetElem = {};
        $("#tweetsText").empty();


        if(!data.errors && data.length > 0){
            for (var i = 0; i < data.length; i++) {
                text = "";
                tweetElem = $($("#tweetDetails").html());
                $("#userName",tweetElem).html("@"+data[i].user.screen_name);
                $("#userName",tweetElem).attr("title",data[i].user.description);
                
                if(data[i].entities.urls.length > 0) {
                    urls = data[i].entities.urls;
                    urlsText = [];  
                    for (var j = 0; j < urls.length; j++) {
                        urlsText.push("<a href='" + urls[j].url + "'>more... </a>");
                    } 
                    text += data[i].text + "&nbsp;&nbsp;"+ urlsText.join(" ");           
                } else {
                    text += data[i].text;
                }

                $("#actualTweet",tweetElem).html(text)
                if(i % 2) { 
                    $(".row",tweetElem).addClass("odd");
                } 

                $("#tweetsText").append($(tweetElem).html());
            }
        } else {
            $("#searchErrorText").empty();
            $("#searchErrorText").html("Error retrieving data");
        }
    }

    function initLogin(){
        makeRequest('GET',"/users/login/","","JSON",function(data){
            window.location = data.redirect
        });
    }

    return {
        init : initSearch,
        login : initLogin,
        userTimeline : initUserTimeLine,
        homeTimeline : loadHomeTimeLine
    }
}());

function bindEvents(){
    $("#loadSearch").click(function(event){
        var searchText = $("#searchFor").val();
        TwitterAPI.init(searchText);
    });

    $("#loadUserTimeLine").click(function(event){
        TwitterAPI.userTimeline();
    });

    $("#loadHomeTimeLine").click(function(event){
       TwitterAPI.homeTimeline(); 
    });

    $("#loadLogin").click(function(event){
        TwitterAPI.login(); 
    });
}

$(document).ready(function(){
    bindEvents();
});
