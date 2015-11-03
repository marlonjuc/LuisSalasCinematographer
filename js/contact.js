$(document).ready(function(){
	$("#ajax-contact-form").submit(function(){
	
		var str = $(this).serialize();
		
		   $.ajax({
		   type: "POST",
		   url: "php/contact.php",
		   data: str,
		   success: function(msg){
		    
		$("#note").ajaxComplete(function(event, request, settings){
		
			if(msg == 'OK') // Message Sent? Show the 'Thank You' message and hide the form
			{
				if(getPageName(window.location.pathname).indexOf("-es") >= 0){
					result = '<div class="notification_ok">Su mensaje ha sido enviado exitosamente. Gracias!!!</div>';
				}else{
					result = '<div class="notification_ok">Your message has been sent Succesfully. Thank you!!!</div>';
				}
				$("#fields").hide();
			}
			else
			{
				result = msg;
			}
			
			$(this).hide();
			$(this).html(result).slideDown("slow");
			
			$(this).html(result);
			
			});
			
			}
			
			});
			
			return false;
	
	});
	
	//addGoogleMap();

});


function addGoogleMap()
{
demo.add(function() {
	$('#map_canvas').gmap({'mapTypeControl': true,'mapTypeControlOptions': {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},'zoomControl': true,'zoomControlOptions': {style: google.maps.ZoomControlStyle.SMALL},'mapTypeId': google.maps.MapTypeId.ROADMAP,'center': '10.07981, -84.47680', 'zoom': 15, 'disableDefaultUI':true, 'callback': function() {
		var self = this;
		self.addMarker({'position': this.get('map').getCenter() }).click(function() {
			self.openInfoWindow({ 'content': 'Hello World!' }, this);
		});	
	}});
}).load();
}

