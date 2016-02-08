var TwitterAPI = (function(){
	function initSearch(searchText){
        $.ajax({
            type : "GET",
            url : "/users/search/" + searchText,
            dataType : "JSON"
        }).done(function(data){
            if(!data.errors && data.statuses){
                $("#tweetsText").empty();
                for (var i = 0; i < data.statuses.length; i++) {
                    $("#tweetsText").append(data.statuses[i].text + "<hr/>");
                }
            } else {
                $("#searchErrorText").empty();
                $("#searchErrorText").html("Error retrieving data");
            }
        });
    }

    function initUserTimeLine(){
        $.ajax({
            type : "GET",
            url : "/users/success/usertimeline/",
            dataType : "JSON"
        }).done(function(data){
            console.log(data);
            if(!data.errors && data.length > 0){
                $("#tweetsText").empty();
                for (var i = 0; i < data.length; i++) {
                    $("#tweetsText").append(data[i].text + "<hr/>");
                }
            } else {
                $("#searchErrorText").empty();
                $("#searchErrorText").html("Error retrieving data");
            }
        });
    }

    function loadHomeTimeLine(){
        $.ajax({
            type : "GET",
            url : "/users/success/hometimeline/",
            dataType : "JSON"
        }).done(function(data){
            console.log(data);
            if(!data.errors && data.length > 0){
                $("#tweetsText").empty();
                for (var i = 0; i < data.length; i++) {
                    $("#tweetsText").append(data[i].text + "<hr/>");
                }
            } else {
                $("#searchErrorText").empty();
                $("#searchErrorText").html("Error retrieving data");
            }
        });   
    }

    function initLogin(){
        $.ajax({
            type : "GET",
            url : "/users/login/",
            dataType : "JSON"
        }).done(function(data){
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
