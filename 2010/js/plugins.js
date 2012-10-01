/************************************************************************
 * @name: bPopup
 * @author: Bjoern Klinggaard (http://dinbror.dk/bpopup)
 * @version: 0.4.0.min
 ************************************************************************/ 
(function(a){a.fn.bPopup=function(f,j){function s(){var c=a("input[type=text]",b).length!=0,k=o.vStart!=null?o.vStart:d.scrollTop()+g;if(o.xLink){a("a#bContinue").attr({href:a("a.xlink").attr("href")});a("a#bContinue .btnLink").text(a("a.xlink").attr("title"))}b.css({left:d.scrollLeft()+h,position:"absolute",top:k,"z-index":o.zIndex}).appendTo(o.appendTo).hide(function(){c&&b.each(function(){b.find("input[type=text]").val("")});o.loadUrl!=null&&b.load(o.loadUrl)}).fadeIn(o.fadeSpeed,function(){c&&
b.find("input[type=text]:first").focus();a.isFunction(j)&&j()});t()}function i(){o.modal&&a("#bModal").fadeOut(o.fadeSpeed,function(){a("#bModal").remove()});b.fadeOut(o.fadeSpeed,function(){o.loadUrl!=null&&b.empty()});o.scrollBar||a("html").css("overflow","auto");a("."+o.closeClass).die("click");a("#bModal").die("click");d.unbind("keydown.bPopup");e.unbind(".bPopup");b.data("bPopup",null);return false}function u(){if(m){var c=[d.height(),d.width()];return{"background-color":o.modalColor,height:c[0],
left:l(),opacity:0,position:"absolute",top:0,width:c[1],"z-index":o.zIndex-1}}else return{"background-color":o.modalColor,height:"100%",left:0,opacity:0,position:"fixed",top:0,width:"100%","z-index":o.zIndex-1}}function t(){a("."+o.closeClass).live("click",i);o.modalClose&&a("#bModal").live("click",i);o.follow&&e.bind("scroll.bPopup",function(){b.stop().animate({left:d.scrollLeft()+h,top:d.scrollTop()+g},o.followSpeed)}).bind("resize.bPopup",function(){if(o.modal&&m){var c=[d.height(),d.width()];
n.css({height:c[0],width:c[1],left:l()})}c=p(b,o.amsl);g=c[0];h=c[1];b.stop().animate({left:d.scrollLeft()+h,top:d.scrollTop()+g},o.followSpeed)});o.escClose&&d.bind("keydown.bPopup",function(c){c.which==27&&i()})}function l(){return e.width()<a("body").width()?0:(a("body").width()-e.width())/2}function p(c,k){var q=(e.height()-c.height())/2-k,v=(e.width()-c.width())/2+l();return[q<20?20:q,v]}if(a.isFunction(f)){j=f;f=null}o=a.extend({},a.fn.bPopup.defaults,f);o.scrollBar||a("html").css("overflow",
"hidden");var b=a(this),n=a('<div id="bModal"></div>'),d=a(document),e=a(window),r=p(b,o.amsl),g=r[0],h=r[1],m=a.browser.msie&&parseInt(a.browser.version)==6&&typeof window.XMLHttpRequest!="object";this.close=function(){o=b.data("bPopup");i()};return this.each(function(){if(!b.data("bPopup")){o.modal&&n.css(u()).appendTo(o.appendTo).animate({opacity:o.opacity},o.fadeSpeed);b.data("bPopup",o);s()}})};a.fn.bPopup.defaults={amsl:150,appendTo:"body",closeClass:"bClose",escClose:true,fadeSpeed:250,follow:true,
followSpeed:500,loadUrl:null,modal:true,modalClose:true,modalColor:"#000",opacity:0.7,scrollBar:true,vStart:null,zIndex:9999}})(jQuery);



//Display tweets plugin
(function($) {
 
  $.fn.tweet = function(o){
    var s = {
      username: ["seaofclouds"],              // [string]   required, unless you want to display our tweets. :) it can be an array, just do ["username1","username2","etc"]
      list: null,                              //[string]   optional name of list belonging to username
      avatar_size: null,                      // [integer]  height and width of avatar if displayed (48px max)
      count: 3,                               // [integer]  how many tweets to display?
      intro_text: null,                       // [string]   do you want text BEFORE your your tweets?
      outro_text: null,                       // [string]   do you want text AFTER your tweets?
      join_text:  null,                       // [string]   optional text in between date and tweet, try setting to "auto"
      auto_join_text_default: "i said,",      // [string]   auto text for non verb: "i said" bullocks
      auto_join_text_ed: "i",                 // [string]   auto text for past tense: "i" surfed
      auto_join_text_ing: "i am",             // [string]   auto tense for present tense: "i was" surfing
      auto_join_text_reply: "i replied to",   // [string]   auto tense for replies: "i replied to" @someone "with"
      auto_join_text_url: "i was looking at", // [string]   auto tense for urls: "i was looking at" http:...
      loading_text: null,                     // [string]   optional loading text, displayed while tweets load
      query: null,                            // [string]   optional search query
      refresh_interval: null                  // [integer]  optional number of seconds after which to reload tweets
    };
    
    if(o) $.extend(s, o);
    
    $.fn.extend({
      linkUrl: function() {
        var returning = [];
        var regexp = /((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi;
        this.each(function() {
          returning.push(this.replace(regexp,"<a href=\"$1\">$1</a>"));
        });
        return $(returning);
      },
      linkUser: function() {
        var returning = [];
        var regexp = /[\@]+([A-Za-z0-9-_]+)/gi;
        this.each(function() {
          returning.push(this.replace(regexp,"<a href=\"http://twitter.com/$1\">@$1</a>"));
        });
        return $(returning);
      },
      linkHash: function() {
        var returning = [];
        var regexp = /(?:^| )[\#]+([A-Za-z0-9-_]+)/gi;
        this.each(function() {
          returning.push(this.replace(regexp, ' <a href="http://search.twitter.com/search?q=&tag=$1&lang=all&from='+s.username.join("%2BOR%2B")+'">#$1</a>'));
        });
        return $(returning);
      },
      capAwesome: function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(/\b(awesome)\b/gi, '<span class="awesome">$1</span>'));
        });
        return $(returning);
      },
      capEpic: function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(/\b(epic)\b/gi, '<span class="epic">$1</span>'));
        });
        return $(returning);
      },
      makeHeart: function() {
        var returning = [];
        this.each(function() {
          returning.push(this.replace(/(&lt;)+[3]/gi, "<tt class='heart'>&#x2665;</tt>"));
        });
        return $(returning);
      }
    });

    function parse_date(date_str) {
      // The non-search twitter APIs return inconsistently-formatted dates, which Date.parse
      // cannot handle in IE. We therefore perform the following transformation:
      // "Wed Apr 29 08:53:31 +0000 2009" => "Wed, Apr 29 2009 08:53:31 +0000"
      return Date.parse(date_str.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, '$1,$2$4$3'));
    }

    function relative_time(time_value) {
      var parsed_date = parse_date(time_value);
      var relative_to = (arguments.length > 1) ? arguments[1] : new Date();
      var delta = parseInt((relative_to.getTime() - parsed_date) / 1000);
      var r = '';
      if (delta < 60) {
	r = delta + ' seconds ago';
      } else if(delta < 120) {
	r = 'a minute ago';
      } else if(delta < (45*60)) {
	r = (parseInt(delta / 60, 10)).toString() + ' minutes ago';
      } else if(delta < (2*60*60)) {
	r = 'an hour ago';
      } else if(delta < (24*60*60)) {
	r = '' + (parseInt(delta / 3600, 10)).toString() + ' hours ago';
      } else if(delta < (48*60*60)) {
	r = 'a day ago';
      } else {
	r = (parseInt(delta / 86400, 10)).toString() + ' days ago';
      }
      return 'about ' + r;
    }

    function build_url() {
      var proto = ('https:' == document.location.protocol ? 'https:' : 'http:');
      if (s.list) {
        return proto+"//api.twitter.com/1/"+s.username[0]+"/lists/"+s.list+"/statuses.json?per_page="+s.count+"&callback=?";
      } else if (s.query == null && s.username.length == 1) {
        return proto+'//api.twitter.com/1/statuses/user_timeline.json?screen_name='+s.username[0]+'&count='+s.count+'&include_rts=1&callback=?';
      } else {
        var query = (s.query || 'from:'+s.username.join(' OR from:'));
        return proto+'//search.twitter.com/search.json?&q='+encodeURIComponent(query)+'&rpp='+s.count+'&callback=?';
      }
    }

    return this.each(function(i, widget){
      var list = $('<ul class="tweet_list">').appendTo(widget);
      var intro = '<p class="tweet_intro">'+s.intro_text+'</p>';
      var outro = '<p class="tweet_outro">'+s.outro_text+'</p>';
      var loading = $('<p class="loading">'+s.loading_text+'</p>');

      if(typeof(s.username) == "string"){
        s.username = [s.username];
      }

      if (s.loading_text) $(widget).append(loading);
      $(widget).bind("load", function(){
        $.getJSON(build_url(), function(data){
          if (s.loading_text) loading.remove();
          if (s.intro_text) list.before(intro);
          list.empty();
          var tweets = (data.results || data);
          $.each(tweets, function(i,item){
            // auto join text based on verb tense and content
            if (s.join_text == "auto") {
              if (item.text.match(/^(@([A-Za-z0-9-_]+)) .*/i)) {
                var join_text = s.auto_join_text_reply;
              } else if (item.text.match(/(^\w+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+) .*/i)) {
                var join_text = s.auto_join_text_url;
              } else if (item.text.match(/^((\w+ed)|just) .*/im)) {
                var join_text = s.auto_join_text_ed;
              } else if (item.text.match(/^(\w*ing) .*/i)) {
                var join_text = s.auto_join_text_ing;
              } else {
                var join_text = s.auto_join_text_default;
              }
            } else {
              var join_text = s.join_text;
            };
   
            var from_user = item.from_user || item.user.screen_name;
            var profile_image_url = item.profile_image_url || item.user.profile_image_url;
            var join_template = '<span class="tweet_join"> '+join_text+' </span>';
            var join = ((s.join_text) ? join_template : ' ');
            var avatar_template = '<a class="tweet_avatar" href="http://twitter.com/'+from_user+'"><img src="'+profile_image_url+'" height="'+s.avatar_size+'" width="'+s.avatar_size+'" alt="'+from_user+'\'s avatar" title="'+from_user+'\'s avatar" border="0"/></a>';
            var avatar = (s.avatar_size ? avatar_template : '');
            var date = '<span class="tweet_time"><a href="http://twitter.com/'+from_user+'/statuses/'+item.id+'" title="view tweet on twitter">'+relative_time(item.created_at)+'</a></span>';
            var text = '<span class="tweet_text">' +$([item.text]).linkUrl().linkUser().linkHash().makeHeart().capAwesome().capEpic()[0]+ '</span>';
   
            // until we create a template option, arrange the items below to alter a tweet's display.
            list.append('<li>' + avatar + date + join + text + '</li>');
   
            list.children('li:first').addClass('tweet_first');
            list.children('li:odd').addClass('tweet_even');
            list.children('li:even').addClass('tweet_odd');
          });
          if (s.outro_text) list.after(outro);
          $(widget).trigger("loaded").trigger((tweets.length == 0 ? "empty" : "full"));
          if (s.refresh_interval) {
            window.setTimeout(function() { $(widget).trigger("load"); }, 1000 * s.refresh_interval);
          };
        });
      }).trigger("load");
    });
  };
})(jQuery);



// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};



// catch all document.write() calls
(function(doc){
  var write = doc.write;
  doc.write = function(q){ 
    log('document.write(): ',arguments); 
    if (/docwriteregexwhitelist/.test(q)) write.apply(doc,arguments);  
  };
})(document);


/**
 * Plugin: jquery.zRSSFeed
 * 
 * Version: 1.0.1
 * (c) Copyright 2010, Zazar Ltd
 * 
 * Description: jQuery plugin for display of RSS feeds via Google Feed API
 *              (Based on original plugin jGFeed by jQuery HowTo)
 * 
 * History:
 * 1.0.1 - Corrected issue with multiple instances
 *
 **/

(function($){var current=null;$.fn.rssfeed=function(url,options){var defaults={limit:10,header:true,titletag:'h4',date:true,content:true,snippet:true,showerror:true,errormsg:'',key:null};var options=$.extend(defaults,options);return this.each(function(i,e){var $e=$(e);if(!$e.hasClass('rssFeed'))$e.addClass('rssFeed');if(url==null)return false;var api="http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+url;if(options.limit!=null)api+="&num="+options.limit;if(options.key!=null)api+="&key="+options.key;$.getJSON(api,function(data){if(data.responseStatus==200){_callback(e,data.responseData.feed,options);}else{if(options.showerror)
if(options.errormsg!=''){var msg=options.errormsg;}else{var msg=data.responseDetails;};$(e).html('<div class="rssError"><p>'+msg+'</p></div>');};});});};var _callback=function(e,feeds,options){if(!feeds){return false;}
var html='';var row='odd';if(options.header)
html+='<div class="rssHeader">'+'<a href="'+feeds.link+'" title="'+feeds.description+'">'+feeds.title+'</a>'+'</div>';html+='<div class="rssBody">'+'<ul>';for(var i=0;i<feeds.entries.length;i++){var entry=feeds.entries[i];var entryDate=new Date(entry.publishedDate);var pubDate=entryDate.toLocaleDateString()+' '+entryDate.toLocaleTimeString();html+='<li class="rssRow '+row+'">'+'<'+options.titletag+'><a href="'+entry.link+'" title="View this feed at '+feeds.title+'">'+entry.title+'</a></'+options.titletag+'>'
if(options.date)html+='<div>'+pubDate+'</div>'
if(options.content){if(options.snippet&&entry.contentSnippet!=''){var content=entry.contentSnippet;}else{var content=entry.content;}
html+='<p>'+content+'</p>'}
html+='</li>';if(row=='odd'){row='even';}else{row='odd';}}
html+='</ul>'+'</div>'
$(e).html(html);};})(jQuery);