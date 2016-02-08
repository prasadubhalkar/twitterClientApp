var express = require('express');
var router = express.Router();

/**
 * [Handle user search]
 * @param  {[type]} req   [request object]
 * @param  {[type]} res   [response object]
 * @return {undefined}
 */
router.get('/search/:text', function(req, res, next) {
    var query = encodeURIComponent(req.params.text);
	var url = req.config.getBaseurl() + req.config.getPartialSearchUrl() + query;
	
    req.config.getOAuth().get(url,req.config.getAccessToken(),req.config.getAccessTokenSecret(),
        function(err,body,response){
            if(!err && response.statusCode === 200){
                res.send(body)
            } else {
                res.send(err);
            }
        }
    );
});

/**
 * [Handle successful user authentication response]
 * @param  {[type]} req   [request object]
 * @param  {[type]} res   [response object]
 * @return {undefined}
 */
router.get('/success/', function(req, res, next) {
	res.render("success.html",{ScreenName : req.config.getCurrentScreenName()});
});


/**
 * [Handle request to load user timeline]
 * @param  {[type]} req   [request object]
 * @param  {[type]} res   [response object]
 * @return {undefined}
 */
router.get('/success/usertimeline/', function(req, res, next) {
    var timeLineUrl = req.config.getBaseurl() + req.config.getUserTimeLineUrl() + req.config.getCurrentScreenName() + "&count=20";

    req.config.getOAuth().get(timeLineUrl,req.config.getAccessToken(),req.config.getAccessTokenSecret(),
        function(err,body,response){
            if(!err && response.statusCode === 200){
                res.send(body);
            } else {
                res.send(err);
            }
        }
    );
});

/**
 * [Handle request to load users home timeline]
 * @param  {[type]} req   [request object]
 * @param  {[type]} res   [response object]
 * @return {undefined}
 */
router.get('/success/hometimeline/', function(req, res, next) {
    var timeLineUrl = req.config.getBaseurl() + req.config.getHomeTimeLineUrl() + "20";

    req.config.getOAuth().get(timeLineUrl,req.config.getAccessToken(),req.config.getAccessTokenSecret(),function(err,body,response){
        if(!err && response.statusCode === 200){
            res.send(body);
        } else {
            res.send(err);
        }
    });
});

/**
 * [Handle user authentication login request]
 * @param  {[type]} req   [request object]
 * @param  {[type]} res   [response object]
 * @return {undefined}
 */
router.get('/login/', function(req, res, next) {
	req.config.getOAuth().getOAuthRequestToken(function (error, oauth_token, oauth_token_secret, results) {
        if (error) {
            console.log(error);
            next();
        }
        else {
            var oauth = {};
            oauth.token = oauth_token;
            oauth.token_secret = oauth_token_secret;
            var url = req.config.getExternalAuthUrl() + oauth.token;
			res.send({redirect: url});
        }
    });
});

/**
 * [Handle response from authentication from twitter]
 * @param  {[type]} req   [request object]
 * @param  {[type]} res   [response object]
 * @return {undefined}
 */
router.get('/access/', function(req, res, next) {
	req.config.getOAuth().getOAuthAccessToken(req.query.oauth_token, req.config.getAccessTokenSecret(), req.query.oauth_verifier,
        function (error, oauth_access_token, oauth_access_token_secret, results) {
            if (error) {
                console.log('ERROR: ' + error);
                next();
            } else {
                req.config.setCurrentUserId(results.user_id)
                req.config.setCurrentScreenName(results.screen_name);
            	res.redirect("/users/success/");
            }
        }
    );
});

module.exports = router;