/*Marlon Ulate Vimeo API implementation*/

var apiEndpoint = 'http://vimeo.com/api/v2/';
var oEmbedEndpoint = 'http://vimeo.com/api/oembed.json'
var oEmbedCallback = 'switchVideo';
var videosCallback = 'setupGallery';
var albumsCallback = 'getAlbums';
var profileCallback = 'setupProfile';
var vimeoUsername = 'user4430595';

var albumsCollection = [];

var moreBtn = "Show more";
var lessBtn = "Show less";

// Get the user's videos
$(document).ready(function() {
	$.getScript(apiEndpoint + vimeoUsername + '/albums.json?callback=' + albumsCallback);
	$.getScript(apiEndpoint + vimeoUsername + '/info.json?callback=' + profileCallback);

	/*if(getPageName(window.location.pathname).indexOf("-es") >= 0){
		moreBtn = "+ Mas";
		lessBtn = "- Menos";
	}else{*/
		moreBtn = "Show more";
		lessBtn = "Show less";
	//}

	if(jQuery.browser.mobile)
	{
		//addScroller();
	}

	//var pageName = getPageName(window.location.pathname);
	//language = pageName.indexOf("-es");
});

function setupProfile(profile)
{
	// Set the user's thumbnail and the page title
    $('#stats').prepend('<img id="portrait" src="' + profile.portrait_medium + '" />');
    $('#stats h2').text(profile.display_name + "");
	$('#stats p').append(profile.bio);
}

function getAlbums(albums) {
	for (var i = 0; i < albums.length; i++) {
		albumsCollection.push({"id":albums[i].id, "title":albums[i].title});
	}
	createCategoryMenu();
	loadAlbum(albumsCollection[0].id);
	addActiveState($(".category a:first-child"));
}

function createCategoryMenu(){
	for(var i = 0; i < albumsCollection.length; i++){
		$('.category').append("<a href='#' onclick='loadAlbum(" + albumsCollection[i].id + "); resetActiveStates(); addActiveState($(this)); return false;'>" + albumsCollection[i].title + "</a>");
	}
}

function loadAlbum(albumID){
	$.getScript(apiEndpoint + "album/" + albumID + '/videos.json?callback=' + videosCallback);
}

function addActiveState(element)
{
	element.addClass('active');
}

function resetActiveStates()
{
	$(".category a").removeClass("active");
}

function getVideo(url) {
	if($(window).width() < 840)
	{
		$.getScript(oEmbedEndpoint + '?url=' + url + '&width=320&height=240&callback=' + oEmbedCallback);
	}else{
    $.getScript(oEmbedEndpoint + '?url=' + url + '&width=800&height=600&callback=' + oEmbedCallback);
	}
}

function setupGallery(videos) {
    // Load the first video
	$("#thumbs ul").empty();
    // Add the videos to the gallery
    for (var i = 0; i < videos.length; i++) {
		if(videos[i].description.length >= 60){
        	var html = '<li><a href="' + videos[i].url + '"><img src="' + videos[i].thumbnail_medium + '" class="thumb" />';
       		html += '<p>' + videos[i].title + '</p></a>' + "<div class='text-content short-text'>" + videos[i].description + "</div><div class='show-more'></br><a href='#'>" + moreBtn + "</a></div><br/><line></line></li>";
		}else{
					 var html = '<li><a href="' + videos[i].url + '"><img src="' + videos[i].thumbnail_medium + '" class="thumb" />';
       		 html += '<p>' + videos[i].title + '</p></a>' + "<div>" + videos[i].description + "</div><div class='hidden-link'></br><a href='#'>Separator</a></div><br/><line></line></li>";
		}
        $('#thumbs ul').append(html);
    }

	getVideo(videos[0].url);

    // Switch to the video when a thumbnail is clicked
    $('#thumbs a').click(function(event) {
        event.preventDefault();
        getVideo(this.href);
				resetThumbsActive();
				addActiveState($(this));
        return false;
    });
   addExpander();

 	addActiveState($("#thumbs ul li:first-child a"));

}

function resetThumbsActive()
{
	  $('#thumbs a').removeClass("active");
}

function switchVideo(video) {
    $('#embed').html(unescape(video.html));
}



//Add Expander/Colapse Content
function addExpander()
{
$(".show-more a").on("click", function() {
    var $link = $(this);
    var $content = $link.parent().prev("div.text-content");
    var linkText = $link.text();

    $content.toggleClass("short-text, full-text");

    $link.text(getShowLinkText(linkText));

    return false;
});
}

function getShowLinkText(currentText){
  var newText = '';

    if(currentText.toUpperCase() === "SHOW MORE") {
        newText = "Show less";
    }
	if(currentText.toUpperCase() === "+ MAS") {
        newText = "- Menos";
    }
	if(currentText.toUpperCase() === "SHOW LESS") {
        newText = "Show More";
    }
	if(currentText.toUpperCase() === "- MENOS") {
        newText = "+ Mas";
    }

    return newText;
}


function addScroller(){
	// I just set some of the options
	$("#thumbs").smoothDivScroll({
		touchScrolling: true,
		manualContinuousScrolling: true,
		hotSpotScrolling: false,
		mousewheelScrolling: false
	});
}

function orderElements(){
	 /*var footer = $('.footer');
	 var separator = $('separator');

	 var w = ( $(window).width() - footer.width() ) / 2;
	 footer.css('left', w);
	 footer.css('display', 'block');
		$(window).scroll(function(){
		//alert( $(window).height() );
		 footer.css('bottom', 200);
		});

	w = ( $(window).width() - separator.width() ) / 2;
	separator.css('left', w);
	alert(separator.css('left'));
	separator.css('display', 'block');
	$(window).scroll(function(){
	 separator.css('bottom', 230);
	});*/
}
