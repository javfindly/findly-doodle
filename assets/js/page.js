"use strict"

var $ = require('jquery');
var handlebars = require('handlebars');

var MainPage = function() {

}

MainPage.prototype.start = function() {
	var self = this;
	$(document).bind("game.lost", function(e) {
		self.gameLost(window.doodle.score.currentScore);
		window.doodle.freeze();
	})
};

MainPage.prototype.gameLost = function(score) {
	this.loadTemplate('/assets/hbs/gamelost.hbs', function(template) {
		var context = {score: score};
		var lostTemplate = template(context);
		$(".gameLost").show().animate({
	      top:'40%',
	      opacity: 1,
	    }).html(lostTemplate);
	});

};

MainPage.prototype.loadTemplate = function(src, callback) {
	var source;
    var template;

    $.ajax({
        url: src,
        success: function(data) {
            source    = data;
            template  = handlebars.compile(source);
            //execute the callback if passed
            if (callback) callback(template);
        }
    });
}

MainPage.prototype.share = function(type) {
	var shareUrl = window.location.href;
	var url;
	var message = "My score in Findly doodle is " + window.doodle.score.currentScore;
    switch(type) {
        case "facebook":
            url = "http://www.facebook.com/sharer/sharer.php?s=100&p[url]="+shareUrl+"&p[images][0]=&p[title]=Findly-Doodle&p[summary]=" + message;
            break;
        case "twitter":
            var status = message + " " + shareUrl;
            url = "http://twitter.com/home?status=" + status;
            break;
    }
    if(url) {
    	window.open(url,'Share on ' + type,'height=500,width=500');
    }
}

module.exports = MainPage;
