$(document).on('contextmenu', function(){
	return false;
});

$(document).ready(function(){
  setCSS();
});

function setCSS(){
  $("head").append("<link rel='stylesheet' href='style-common.css' type='text/css' media='screen' />");
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		//console.log('mobile browser');
	 	$("head").append("<link rel='stylesheet' href='style-mobile.css' type='text/css' media='screen' />");
	}
	else{
		//console.log('pc browser');
		$("head").append("<link rel='stylesheet' href='style-pc.css' type='text/css' media='screen' />");
	}
}
