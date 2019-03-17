const wThreshold = 480;
var screen_state;
var screen_state_old;
var SCREEN_ENUM = Object.freeze({
	PC: 0,
	TABLET: 1,
	MOBILE: 2,
});
var screen_name = ['pcLandscape', 'pcPortrait', 'mobilePortrait'];
/*
var columnVal = {
  'pcLandscape': {
    'number': [3,2,3,3,2,3],
    'height': [],
  },
  'pcPortrait': {
    'number': [4,4,4,4],
    'height': [],
  },
  'mobilePortrait': {
    'number': [8,8],
    'height': [],
  },
};
*/
var columnVal = [
  {
    'number': [3,2,3,3,2,3],
    'height': [],
  },
  {
    'number': [4,4,4,4],
    'height': [],
  },
  {
    'number': [8,8],
    'height': [],
  }
];

$(document).on('contextmenu', function(){
	return false;
});

$(document).ready(function(){
  setCSS();
  /*
  setColumn(columnVal.pcLandscape);
  setColumn(columnVal.pcPortrait);
  setColumn(columnVal.mobilePortrait);
  */
  $(columnVal).each(function(i, item){
    setColumn(columnVal[i]);
  });
  putCell();
  changeHeight();
});

$(window).resize(function(){
  changeHeight();
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

function putCell(){
  $(index).each(function(i, item){
    var cell = $('<div></div>');
    $(cell).addClass('cell');
    //$(cell).height(columnVal.pcLandscape.height[i]);
    $('.liner').append(cell);
  });
}
function changeHeight(){
  var wW = $(window).width();
  var wH = $(window).height();
  var wR = wW/wH;
  if(wW > wThreshold){
    if(wR > 1){//pc
      screen_state = SCREEN_ENUM.PC;
    }
    else{//tablet
      screen_state = SCREEN_ENUM.TABLET;
    }
  }
  else{//mobile
    screen_state = SCREEN_ENUM.MOBILE;
  }
  /* check difference */
  if(screen_state_old == null){//put default value
    screen_state_old = screen_state;
    setHeight(screen_state);
  }
  else {//compare old value
    if(screen_state != screen_state_old){
      setHeight(screen_state);
      screen_state_old = screen_state;
    }
  }
}



function setHeight(state){
  var heightValue = columnVal[state].height;
  $('.cell').each(function(i, item){
    $(item).height(heightValue[i]);
    console.log(state + '/' + heightValue[i]);
  });
}



function setColumn(column){
  var heightArray = [];
  $(column.number).each(function(i, item){
    switch(item){
      case 2:
        var temp = 40 + 20 * Math.random();
        heightArray.push(temp + '%');
        heightArray.push(100 - temp + '%');
        break;
      case 3:
        var temp1 = 25 + 12.5 * Math.random();
        var temp2 = 25 + 12.5 * Math.random();
        heightArray.push(temp1 + '%');
        heightArray.push(temp2 + '%');
        heightArray.push(100 - (temp1 + temp2) + '%');
        break;
      case 4:
        var temp1 = 20 + 8 * Math.random();
        var temp2 = 20 + 8 * Math.random();
        var temp3 = 20 + 8 * Math.random();
        heightArray.push(temp1 + '%');
        heightArray.push(temp2 + '%');
        heightArray.push(temp3 + '%');
        heightArray.push(100 - (temp1 + temp2 + temp3) + '%');
        break;
    }
  });
  column.height = heightArray;
}
