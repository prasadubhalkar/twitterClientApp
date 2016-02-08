var OAuth = require('oauth').OAuth;
var config = (function() {
	var consumerKey = "XXX"; //Your twitter app consumer key
	var consumerSecret = "XXX"; //Your twitter app consumer secret key
	var accessToken = "XXX"; //Your twitter app access token
	var accessTokenSecret = "XXX"; //Your twitter app access token secret
	var request_token = 'https://api.twitter.com/oauth/request_token'; //twitter request token URL
  	var access_token = 'https://api.twitter.com/oauth/access_token'; //twitter access token URL
  	var callbackUrl = "XXX"; //twitter app callback URL
  	var baseUrl = 'https://api.twitter.com/1.1/'; //twitter base URL
  	var searchPath = 'search/tweets.json?q='; //search partial URL
  	var externalAuthUrl = "https://api.twitter.com/oauth/authenticate?oauth_token="; //redirect user to authenticate to twitter
  	var userTimelineUrl = "statuses/user_timeline.json?screen_name="; //twitter api to load user timeline
  	var homeTimeLineUrl = "statuses/home_timeline.json?count="; //twitter api to load home timeline
  	var oauth; //open authentication object
  	var currScreenName; //will hold current twitter users screen name
  	var currUserId;	//will hold current twitter users id

  	function getConsumerKey() { return consumerKey; }

	function getConsumerSecret() { return consumerSecret; }
	
	function getAccessToken() { return accessToken; }
	
	function getAccessTokenSecret() { return accessTokenSecret; }

	function getRequestTokenUrl() { return request_token; }
  	
  	function getAccessTokenUrl() { return access_token; }

	function getAppCallbackUrl() { return callbackUrl; }

	function getBaseurl() { return baseUrl; }

	function searchTweetsUrl() { return searchPath; }

	function getExternalAuthUrl() { return externalAuthUrl; }

	function setCurrentUserId(id) { currUserId = id; }

	function setCurrentScreenName(name) { currScreenName = name; }

	function getCurrentUserId(id) { return currUserId; }

	function getCurrentScreenName(name) { return currScreenName; }

	function getUserTimeLineUrl() { return userTimelineUrl;	}

	function getHomeTimeLineUrl() { return homeTimeLineUrl; }

	function getOAuth(){
		if(oauth !== undefined){
			return oauth;
		} else {
			oauth = new OAuth(
			  request_token,
			  access_token,
			  consumerKey,
			  consumerSecret,
			  '1.0',
			  callbackUrl,
			  'HMAC-SHA1'
			);
			return oauth
		}
	}

	return {
		getConsumerKey : getConsumerKey,
		getConsumerSecret : getConsumerSecret,
		getAccessToken : getAccessToken,
		getAccessTokenSecret : getAccessTokenSecret,
		getRequestTokenUrl : getRequestTokenUrl,
		getAccessTokenUrl : getAccessTokenUrl,
		getAppCallbackUrl : getAppCallbackUrl,
		getBaseurl : getBaseurl,
		getPartialSearchUrl : searchTweetsUrl,
		getOAuth : getOAuth,
		getExternalAuthUrl : getExternalAuthUrl,
		setCurrentUserId : setCurrentUserId,
		setCurrentScreenName : setCurrentScreenName,
		getCurrentUserId : getCurrentUserId,
		getCurrentScreenName : getCurrentScreenName,
		getUserTimeLineUrl : getUserTimeLineUrl,
		getHomeTimeLineUrl : getHomeTimeLineUrl,
	}
})();

module.exports = config;
