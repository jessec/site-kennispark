jQuery(document).ready(function($) {

  function getQueryString() {
      var queryStringKeyValue = window.parent.location.search.replace('?', '').split('&');
      var qsJsonObject = {};
      if (queryStringKeyValue != '') {
        for (i = 0; i < queryStringKeyValue.length; i++) {
          qsJsonObject[queryStringKeyValue[i].split('=')[0]] = queryStringKeyValue[i].split('=')[1];
        }
      }
      return qsJsonObject;
  }

  if (getQueryString().id) {
    setTimeout(function() {
      $('#' + getQueryString().id).trigger('click');
    } , 1000);
  }

  var api = $('.megafolio-container').megafoliopro(
  {
		filterChangeAnimation:"fade",	// fade, rotate, scale, rotatescale, pagetop, pagebottom,pagemiddle
		filterChangeSpeed:800,			  // Speed of Transition
		filterChangeRotate:4,			    // If you ue scalerotate or rotate you can set the rotation (99 = random !!)
		filterChangeScale:0.6,			  // Scale Animation Endparameter
		delay:20,						          // The Time between the Animation of single mega-entry points
		paddingHorizontal:10,			    // Padding between the mega-entrypoints
		paddingVertical:10,
		layoutarray:[8]		            // Defines the Layout Types which can be used in the Gallery. 2-9 or "random". You can define more than one, like {5,2,6,4} where the first items will be orderd in layout 5, the next comming items in layout 2, the next comming items in layout 6 etc... You can use also simple {9} then all item ordered in Layout 9 type.
	});

	// call filter function if any filter has been clicked
	$('.filter').click(function() {
    api.megafilter($(this).data('category'));
  });

  $('.fancybox').fancybox({
    
    'maxWidth' : 640,
    'width' : 640,
    'minWidth' : 640,

    beforeShow: function () {

      // hide the background image in the popup if it's a .svg
      if ($(this.element).data('bkgrnd')) {
        $('.fancybox-image').hide();
      }

      if (this.title) {
        title = this.title;
        this.title = '<h4>' + title + '</h4>';
      } else {
        this.title = '';
      }
      
      // Add content
      this.title += $(this.element).parent().find('p').text();

      // Add share button
      this.title += '<div class="addthis"><span class="addthis_toolbox" addthis:url="http://www.kennispark.nl/jaarplan/?id=' + $(this.element).attr('id') + '" addthis:title="' + title + '"><a class="addthis_button_compact event-share"><img src="/wp-content/themes/kennispark/images/assets/trans.png" alt="" width="1" height="1" />Share</a></span></div>';
    },

    afterShow: function() {
      // Render AddThis
      addthis.toolbox(
        $('.addthis_toolbox').get()
      );
    },

    afterClose: function() {
      $(".chart-div").show();
    },

    'helpers' : {
     'title' : {
        'type' : 'inside'
     },
     'overlay' : {
        'css' : {
          'background' : 'rgba(255, 255, 255, 0.75)'
        },
      }
    }
  });

  $('.video').click(function() {
    $.fancybox({

      'maxWidth' : 640,
      'width' : 640,
      'height' : 460,

      beforeShow: function () {
        if (this.title) {
          title = this.title;
          this.title = '<h4>' + title + '</h4>';
        } else {
          this.title = '';
        }
        
        // Add content
        this.title += $(this.element).find('p').text();

        // Add share button
        this.title += '<div class="addthis"><span class="addthis_toolbox" addthis:url="http://www.kennispark.nl/jaarplan/?id=' + $(this.element).attr('id') + '" addthis:title="' + title + '"><a class="addthis_button_compact event-share"><img src="/wp-content/themes/kennispark/images/assets/trans.png" alt="" width="1" height="1" />Share</a></span></div>';
      },

       afterShow: function() {
         // Render AddThis
         addthis.toolbox(
            $('.addthis_toolbox').get()
          );
        },

      'padding' : 10,
      'autoScale' : false,
      'transitionIn'  : 'none',
      'transitionOut' : 'none',
      'title' : this.title,
      
      'href' : 'http://vimeo.com/moogaloop.swf?clip_id=81373648',
      'type' : 'swf',
      'swf' : {
        'wmode' : 'transparent',
        'allowfullscreen' : 'true'
      },

      'helpers' : {
        'title' : {
          'type' : 'inside'
        },
        'overlay' : {
          'css' : {
            'background' : 'rgba(255, 255, 255, 0.75)'
          },
        }
      }
    });

    return false;
  });

  $('.filter').click(function() {
    $('.filter').removeClass('selected');
    $(this).addClass('selected');
  });

  function getBackgroundColor(color) {
    switch (color) {
      case 'red':
        color = '#ca291c';
        break;
      case 'green':
        color = '#7daf18';
        break;
      case 'pink':
        color = '#790e62';
        break;
      case 'blue':
        color = '#00788c';
        break;
      case 'purple':
        color = '#3b256e';
        break;
    }
    return color;
  }

  // set default backgroud
  $('.mega-title').css('color', '#ca291c');
  // set custom backgroud color and image
  $('.fancybox').each(function() {
    if ($(this).data('bkgrnd')) {
      var color = getBackgroundColor($(this).data('bkgrnd'));
      $(this).closest('.mega-entry').find('.mega-entry-innerwrap').css('background-color', color);
      $(this).closest('.mega-entry').find('.mega-entry-innerwrap').css('background-image', 'url(' + $(this).attr('href') + '), linear-gradient(rgba(255, 255, 255, 0.1) 60%, transparent 40%, transparent)');
      $(this).closest('.mega-entry').find('.mega-title').css('color', '#fff');
    } else {
      $(this).closest('.mega-entry').find('.mega-entry-innerwrap').css('background-color', '#f8f8f8');
    }
  });

  function generateBarChartData(element) {
    var data = {};
    data.labels = element.data('labels').split(",");
    data.datasets = [];
    var bars = element.data('bars').split(",");
    for (var i = bars.length - 1; i >= 0; i--) {
      data.datasets.push({
        data: element.data(bars[i]).split(","),
        label: "Label " + i,
        fillColor: (chartcolors['fillColor'].length > i) ? chartcolors['fillColor'][i] : chartcolors['fillColor'][0],
        strokeColor: (chartcolors['strokeColor'].length > i) ? chartcolors['strokeColor'][i] : chartcolors['strokeColor'][0],
        highlightFill: (chartcolors['highlightFill'].length > i) ? chartcolors['highlightFill'][i] : chartcolors['highlightFill'][0],
        highlightStroke: (chartcolors['highlightStroke'].length > i) ? chartcolors['highlightStroke'][i] : chartcolors['highlightStroke'][0],
      });
    };
    return data;
  }

  function generatePieChartData(element) {
    var data = [];
    var labels = element.data('labels').split(",");
    var values = element.data('values').split(",");
    for (var i = values.length - 1; i >= 0; i--) {
      data.push({
        value: parseInt(values[i]),
        label: labels[i],
        color: (chartcolors['highlightFill'].length > i) ? chartcolors['highlightFill'][i] : chartcolors['highlightFill'][0],
        highlight: (chartcolors['fillColor'].length > i) ? chartcolors['fillColor'][i] : chartcolors['fillColor'][0]
      });
    };
    return data;
  }

  var chartcolors = {
    fillColor   : ["rgba(125, 175, 24, 0.5)", "rgba(202, 41, 28, 0.5)", "rgba(0, 120, 140, 0.5)", "rgba(59, 37, 110, 0.5)", "rgba(121, 14, 98, 0.5)", "rgba(220,220,220,0.5)"],
    strokeColor : ["rgba(125, 175, 24, 0.8)", "rgba(202, 41, 28, 0.8)", "rgba(0, 120, 140, 0.8)", "rgba(59, 37, 110, 0.8)",  "rgba(121, 14, 98, 0.8)", "rgba(220,220,220,0.8)"],
    highlightFill : ["rgba(125, 175, 24, 0.75)", "rgba(202, 41, 28, 0.75)", "rgba(0, 120, 140, 0.75)", "rgba(59, 37, 110, 0.75)",  "rgba(121, 14, 98, 0.75)", "rgba(220,220,220,0.75)"],
    highlightStroke : ["rgba(0, 0, 0, 1)"]
  }

  // load the charts
  setTimeout(function() {
    $('.mega-entry').each(function() {
      var dataSrc = $(this).data('chart');
      if(dataSrc !== undefined) {
        var element = $(this);
        var ctx = element.find('canvas').get(0).getContext("2d");
        if(dataSrc === "bar") {
          var data =  generateBarChartData(element);
          var chart = new Chart(ctx).Bar(data, {
            responsive: true
          });
        }
        if(dataSrc === "pie") {
          var data =  generatePieChartData(element);
          console.log(data);
          var chart = new Chart(ctx).Pie(data, {
            responsive: true
          });
        }
      }
    });
  }, 1000);
  
  // add .svg and .php to the range of images
  $.fancybox.isImage = function(str) {
    return str && $.type(str) === "string" && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|svg|html|php|webp)((\?|#).*)?$)/i);
  };

});