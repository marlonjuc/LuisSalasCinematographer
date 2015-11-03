// JavaScript Document

/*! source code, other menu scripts and web UI controls
* Marlon Ulate Build July 2013*/

var menu = function () {
    var speed = 8;
    return {
        initMenu: function () {
            var m = document.getElementById('items');
            if (!m) return;
            m.style.width = m.getElementsByTagName("ul")[0].offsetWidth + 1 + "px";
            var lis = m.getElementsByTagName('li');
            var a = m.getElementsByTagName("a");
            var url = document.location.href.toLowerCase();
            var k = -1;
            var nLength = -1;
            var slip = [];

            for (i = 0; i < a.length; i++) {
                if (url.indexOf(a[i].href.toLowerCase()) != -1 && a[i].href.length > nLength) {
                    k = i;
                    nLength = a[i].href.length;
                }
            }
            if (k == -1 && /:\/\/(?:www\.)?[^.\/]+?\.[^.\/]+\/?$/.test) {
                for (var i = 0; i < a.length; i++) {
                    if (a[i].getAttribute("maptopuredomain") == "true") {
                        k = i;
                        break;
                    }
                }
                if (k == -1 && a[0].getAttribute("maptopuredomain") != "false")
                    k = 0;
            }

            for (var i = 0; i < lis.length; i++) {

                slip[i] = document.createElement('div');
                slip[i].className = 'slip';
                slip[i].style.width = lis[i].offsetWidth + "px";
                slip[i].style.height = lis[i].offsetHeight + "px";
                slip[i].style.left = lis[i].offsetWidth + 1 + "px"; // +1 to eliminate an gap color in IE5 or No DOCTYPE
                lis[i].appendChild(slip[i]);

                lis[i].onmouseover = function () {
                    clearInterval(this.t);
                    menu.move(this, 0);
                };
                lis[i].onmouseout = function () {
                    clearInterval(this.t);
                    menu.move(this, 1);
                }
            }
            if (k > -1) {
                slip[k].style.display = 'none';
                lis[k].className = 'current';
            }
        },
        move: function (li, direction) {
            var tabs = li.childNodes;
            var slipobj = tabs[tabs.length - 1];
            if (direction == 0) {
                li.t = setInterval(function () { if (slipobj.offsetLeft <= 0) { clearInterval(li.t); } else { menu.moveLeft(slipobj); } }, 15);
            }
            else {
                li.t = setInterval(function () { if (slipobj.offsetLeft >= slipobj.offsetWidth) { clearInterval(li.t); } else { menu.moveRight(slipobj); } }, 15);
            }
        },
        moveLeft: function (obj) {
            if (obj.offsetLeft < 3) {
                obj.style.left = "0px";
            }
            else {
                obj.style.left = obj.offsetLeft-Math.ceil(obj.offsetLeft / speed) + "px";
            }
        },
        moveRight: function (obj) {
            obj.style.left = obj.offsetLeft + 3 + "px";
        }
    };
} ();



$(document).ready(function() {
	if(getPageName(window.location.pathname).indexOf("-es") >= 0){
		setSpanishMenu();
	}else{
		setEnglishMenu();
		}
});

function setEnglishMenu(){
	$("#menu").append("<div id='language'>Español</div><div id='items'><ul><li><a href='index.html?p=Profile'>Profile</a></li><li><a href='work.html?p=Work'>Work</a></li><li><a href='contact.html?p=Contact'>Contact</a></li></ul></div>");
		addLanguageClickHandler();
		
		menu.initMenu();
}

function setSpanishMenu(){
	$("#menu").append("<div id='language'>English</div><div id='items'><ul><li><a href='index-es.html?p=Perfil'>Perfil</a></li><li><a href='trabajo-es.html?p=Trabajo'>Trabajo</a></li><li><a href='contacto-es.html?p=Contacto'>Contacto</a></li></ul></div>");
		addLanguageClickHandler();
		
		menu.initMenu();
}

function addLanguageClickHandler(){
	$('#language').click(function(event) {
		pageName = getPageName(window.location.pathname);
		
		switch(pageName){
			case "index":
				window.location.href = "index-es.html?p=Perfil";
			break;
			case "work":
				window.location.href = "trabajo-es.html?p=Trabajo";
			break;
			case "contact":
				window.location.href = "contacto-es.html?p=Contacto";
			break;
			case "resume":
				window.location.href = "curriculum-es.html?p=curriculum";
			break;
			case "":
				window.location.href = "index-es.html?p=Perfil";
			break;
			
			/*Spanish nav*/
			
			case "index-es":
				window.location.href = "index.html?p=Profile";
			break;
			case "trabajo-es":
				window.location.href = "work.html?p=Work";
			break;
			case "contacto-es":
				window.location.href = "contact.html?p=Contacto";
			break;
			case "curriculum-es":
				window.location.href = "resume.html?p=Resume";
			break;
			
			}
	});
}

function getPageName(url) {
    var currurl = window.location.pathname;
    var index = currurl.lastIndexOf("/") + 1;
    var filenameWithExtension = currurl.substr(index);
    var filename = filenameWithExtension.split(".")[0]; // <-- added this line
    return filename;                                    // <-- added this line
}

/*

Note: The menu item that matches current url will be highlighted. If current url is a pure domain without any specific page name, e.g. http://www.(your domain).com, the first menu item will be highlighted. If that is not what you expected, you can:

    Option 1: If the pure domain should match another menu item other than the first one, you can add maptopuredomain="true" attribute to that item. i.e.:
    <li><a href="?menu=1&skin=1&p=5" maptopuredomain="true">Milo</a></li>
    Option 2: If none of the menu items should be matched to the pure domain, you can add maptopuredomain="false" attribute to the first item:
    <li><a href="?menu=1&skin=1&p=1" maptopuredomain="false">Home</a></li>


*/