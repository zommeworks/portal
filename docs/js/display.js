const wThreshold = 480;
var screen_state;
var screen_state_old;
var SCREEN_ENUM = Object.freeze({
	PC: 0,
	TABLET: 1,
	MOBILE: 2,
});
var columnVal = [
  {
    'type': 'pcLandscape',
    'number': [3,2,3,3,2,3],
    'height': [],
  },
  {
    'type': 'pcPortrait',
    'number': [4,4,4,4],
    'height': [],
  },
  {
    'type': 'mobilePortrait',
    'number': [8,8],
    'height': [],
  }
];

$(document).on('contextmenu', function(){
	return false;
});

$(document).ready(function(){
  setCSS();
  setBackground();
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



function setBackground(){
  var color = colorIndex[Math.floor(Math.random() * colorIndex.length)];
  $('.canvas').css('background-color', `var(--c-${color})`);
}


function shuffleCell(){
  var shuffleIndex;
  var blankCount = 16 - index.length;
  if(blankCount > 0){
    for(i = 0; i < blankCount; i++){
      var fileNum = i%3+1;
      var tempCell = {
        'name': '',
        'url': '',
        'description': '',
        'file': `src/cell_blank${fileNum}.svg`,
      }
      index.push(tempCell);
    }
  }
  shuffleIndex = shuffle(index);
  console.log(shuffleIndex);
  return(shuffleIndex);
}



function putCell(){
  var tempIndex = shuffleCell();
  $(tempIndex).each(function(i, item){
    var cell = $('<div></div>');
    var itemImage = $('<img>');
    $(itemImage).addClass('cellImage');
    $(itemImage).attr('src', item.file);
    $(cell).addClass('cell');
    //$(cell).height(columnVal.pcLandscape.height[i]);
    $(cell).append(itemImage);
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
    $(item).css('height', heightValue[i]);
  });
}



function setColumn(column){
  var heightArray = [];
  $(column.number).each(function(i, item){
    var tempSum = 0;
    for(j = 0; j < item - 1; j++){
      var randNum = Math.round(10*Math.random())%3/2;//0, 0.5, 1
      var temp = 100/(item + 1) + 100/(item + 1)/(item-1)*randNum;
      tempSum += temp;
      heightArray.push(temp + '%');
      if(j == item - 2){
        heightArray.push(100 - tempSum + '%');
      }
    }
  });
  column.height = heightArray;
}



function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
