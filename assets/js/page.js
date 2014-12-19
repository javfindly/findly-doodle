"use strict"

var $ = require('jquery');
var handlebars = require('handlebars');

var MainPage = function() {

}

MainPage.prototype.start = function() {
	var self = this;
	$(document).on("click", "#shareOnFacebook", function (evt) {
		evt.preventDefault();
		self.share('facebook');
	});

	$(document).on("click", "#shareOnTwitter", function (evt) {
		evt.preventDefault();
		self.share('twitter');
	});

	$(document).on("click", "#shareOnGoogle", function (evt) {
		evt.preventDefault();
		self.share('google');
	});

	$(document).on("click", "#restart", function (evt) {
		evt.preventDefault();
		self.restart();
		$('.gameLost').empty().hide();
	});

	$(document).bind("game.lost", function(e) {
		self.gameLost(window.doodle.score.currentScore);
		window.doodle.freeze();
	});
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
};

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
				case "google":
						url = "https://plus.google.com/share?url=" + shareUrl;
						break;
    }
    if(url) {
    	window.open(url,'Share on ' + type,'height=500,width=500');
    }
};

MainPage.prototype.restart = function () {
	window.doodle.restart();
};

module.exports = MainPage;
