<script type="text/javascript">
var descs = {
				projective: 'Projective Website Design',
				twizcard: 'Twizcard Website Design',
				vcard: 'Virtual Business Card Design',
				webform: 'HTML5 and CSS3 Webform',
				unportal: 'UNHQ Interns Web Portal'
			};
			
			$('li').focus(function() {
				var useText = (typeof descs[$(this).attr('id')] != 'undefined') ? descs[$(this).attr('id')] : '';
				$('#description').html(useText).fadeIn(200);
			}).blur(function() {
				$('#description').fadeOut(100);
			});

   $(document).ready(function() {
      $('ul#myRoundabout').roundabout({
	        minOpacity: 0.1,
			minScale: 0.3,
			shape: 'square',
			btnNext: '#next',
			btnPrev: '#previous'
				
	      });
   });

$(document).ready(function(){
   $("a#click").bind('click', function(){
      $("#popup").bPopup();
      return false
   });
});



</script>

<script type='text/javascript'>
$(document).ready(function(){
    $(".tweet").tweet({
        username: "ramanujam",
        join_text: "auto",
        avatar_size: 0,
        count: 3,
		tweet_time: 0
		,
        auto_join_text_default: "", 
        auto_join_text_ed: "",
        auto_join_text_ing: "",
        auto_join_text_reply: "",
        auto_join_text_url: "",
        loading_text: ""
    });
});
</script>

<script type="text/javascript">
$(document).ready(function () {
  $('#feed').rssfeed('http://socialcouch.com/feed', {
    limit: 3,
	snippet:false,
	content:false,
	date:false,
	header:false
  });
});
</script>