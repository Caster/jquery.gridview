$(function() {
  
  // ------------------------------------
  // -- GRIDVIEW DEMO 1                --
  // ------------------------------------
  var initFontSize = parseFloat($('.gridViewParent').css('font-size'), 10),
	  initLineHeight = parseFloat($('.gridViewParent').css('line-height'), 10);
  
  // Populate the grid with some more children
  for (var i = 0; i < 42; i++) {
	$('.gridViewParent').append(
	  $('<div />')
		.addClass('gridViewChild')
		.html(i)
	);
  }
  
  $('.gridViewParent').gridview({
	animationSpeed: 3000,
	onZoom: function(oldZoom, newZoom) {
	  return {
		  fontSize: initFontSize / newZoom,
		  lineHeight: initLineHeight / newZoom + 'px'
		};
	},
	width: 800,
	height: 500
  });
  $('.gridViewParent').gridview('zoom', {
	level: 7
  });
  
  // Set actions for various buttons
  // Set number of blocks
  $('.gridViewSettings [name=numBlocks]').next().click(function() {
	var inVal = parseInt($(this).prev().val());
	if (!isNaN(inVal) && inVal >= 0 && inVal < 100) {
	  // Refresh gridview
	  var aniSpeed = $('.gridViewParent').gridview('animationSpeed');
	  $('.gridViewParent')
		.gridview('animationSpeed', 500)
		.gridview('zoom', {
			level: 1,
			onAnimationComplete: function() {
			  // Clear and repopulate
			  $('.gridViewParent').html('');
			  for (var i = 0; i < inVal; i++) {
				$('.gridViewParent').append(
				  $('<div />')
					.addClass('gridViewChild')
					.html(i)
				);
			  }
			  // Refresh gridview
			  $('.gridViewParent')
			  .gridview('refresh')
			  .gridview('zoom', {
				  level: Math.ceil(Math.sqrt(inVal)),
				  onAnimationComplete: function() {
					$('.gridViewParent').gridview('animationSpeed', aniSpeed);
				  }
				});
			}
		  });
	} else {
	  $(this).parent().after(
		  $('<p/>')
			.html('You should specify a number between 0 and 100, including 0, excluding 100.')
			.addClass('gridViewError')
			.delay(5000)
			.queue(function(n) {
			  $(this).hide('slow', function() { $(this).remove(); });
			  n();
			})
		);
	}
  });
  // Set animation speed
  $('.gridViewSettings [name=aniSpeed]').first().next().click(function() {
	var inVal = parseInt($(this).prev().val());
	if (!isNaN(inVal) && inVal >= 0 && inVal <= 10000) {
	  $('.gridViewParent').gridview('animationSpeed', inVal);
	} else {
	  $(this).parent().after(
		  $('<p/>')
			.html('You should specify a number between 0 and 10000, including 0, including 10000.')
			.addClass('gridViewError')
			.delay(5000)
			.queue(function(n) {
			  $(this).hide('slow', function() { $(this).remove(); });
			  n();
			})
		);
	}
  });
  // Zoom to block
  $('.gridViewSettings [name=zoomTo]').next().click(function() {
	var inVal = parseInt($(this).prev().val());
	if (!isNaN(inVal) && inVal >= 0 && inVal < $('.gridViewParent div').size()) {
	  $('.gridViewParent').gridview('zoomTo', inVal);
	} else {
	  $(this).parent().after(
		  $('<p/>')
			.html('You should specify a number between 0 and ' + $('.gridViewParent div').size() + ', including 0, excluding ' + $('.gridViewParent div').size() + '.')
			.addClass('gridViewError')
			.delay(5000)
			.queue(function(n) {
			  $(this).hide('slow', function() { $(this).remove(); });
			  n();
			})
		);
	}
  });
  
  
  // ------------------------------------
  // -- GRIDVIEW DEMO 2                --
  // ------------------------------------
  // Populate the grid with some more children
  for (var i = 0; i < 256; i++) {
    // Color string
    var cS = i.toString(16);
    if (cS.length == 1) {
      cS = '0' + cS;
    }
    
    $('.gridViewParent2').append(
      $('<div />')
	    .addClass('gridViewChild2')
	    .css('background', '#' + cS + cS + cS)
    );
  }
  
  $('.gridViewParent2').gridview({
	animationSpeed: 1000,
	draggable: false,
	width: 800,
	height: 50,
	scrollToZoom: false,
	onPosition: 'simple-vertical'
  });
  
  $('.gridViewSettings [name=goLeft]').click(function() {
    $('.gridViewParent2').gridview('zoomTo', 0);
  });
  
  $('.gridViewSettings [name=goRight]').click(function() {
    $('.gridViewParent2').gridview('zoomTo', 255);
  });
  
  $('.gridViewSettings [name=aniSpeed]').eq(1).next().click(function() {
    var inVal = parseInt($(this).prev().val());
    if (!isNaN(inVal) && inVal >= 0 && inVal <= 100000) {
      $('.gridViewParent2').gridview('animationSpeed', inVal);
    } else {
      $(this).parent().after(
	      $('<p/>')
		    .html('You should specify a number between 0 and 100.000, including 0, including 100.000.')
		    .addClass('gridViewError')
		    .delay(5000)
		    .queue(function(n) {
		      $(this).hide('slow', function() { $(this).remove(); });
		      n();
		    })
	    );
    }
  });
  
  $('.gridViewSettings [name=margin]').next().click(function() {
    var inVal = parseInt($(this).prev().val());
    if (!isNaN(inVal) && inVal >= 0 && inVal <= 15) {
      $('.gridViewParent2').gridview('margin', inVal).gridview('refresh');
    } else {
      $(this).parent().after(
	      $('<p/>')
		    .html('You should specify a number between 0 and 15, including 0, including 15.')
		    .addClass('gridViewError')
		    .delay(5000)
		    .queue(function(n) {
		      $(this).hide('slow', function() { $(this).remove(); });
		      n();
		    })
	    );
    }
  });
  
  $('.gridViewSettings [name=direction]').next().click(function() {
    if ($(this).prev().val() === 'horizontal') {
      $('.gridviewSettingDirection1').text('left');
      $('.gridviewSettingDirection2').text('right');
      $('.gridViewParent2').gridview('onPosition', 'simple-horizontal').gridview('refresh');
    } else {
      $('.gridviewSettingDirection1').text('top');
      $('.gridviewSettingDirection2').text('bottom');
      $('.gridViewParent2').gridview('onPosition', 'simple-vertical').gridview('refresh');
    }
  });
  
  
  // ------------------------------------
  // -- GRIDVIEW DEMO 3                --
  // ------------------------------------
  $('.gridViewParent3').gridview({
      animationSpeed: 1000,
      draggable: false,
      width: 800,
      height: 800,
      onPosition: function(i, zoomedChild, margin, oldZoom, newZoom) {
	return {
	  noOffset: true,
	  newZoom: (oldZoom == 1 && newZoom == 0 ? $('.gridViewParent3 div').size() : newZoom),
	  x: 400 + 250 * Math.cos((i + newZoom) / $('.gridViewParent3 div').size() * 2 * Math.PI) - 25,
	  y: 400 + 250 * Math.sin((i + newZoom) / $('.gridViewParent3 div').size() * 2 * Math.PI) - 25
	};
      },
      onZoom: function(oldZoom, newZoom) {
	return {
	  width: 30,
	  height: 30
	};
      }
  });
  
  
});