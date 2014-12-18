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
    }, 1000);
  }

  var api = $('.megafolio-container').megafoliopro({
    filterChangeAnimation: "fade", // fade, rotate, scale, rotatescale, pagetop, pagebottom,pagemiddle
    filterChangeSpeed: 800,        // Speed of Transition
    filterChangeRotate: 4,         // If you use scalerotate or rotate you can set the rotation (99 = random !!)
    filterChangeScale: 0.6,        // Scale Animation Endparameter
    delay: 20,                     // The Time between the Animation of single mega-entry points
    paddingHorizontal: 10,         // Padding between the mega-entrypoints
    paddingVertical: 10,
    layoutarray: [8]               // Defines the Layout Types which can be used in the Gallery. 2-9 or "random". You can define more than one, like {5,2,6,4} where the first items will be orderd in layout 5, the next comming items in layout 2, the next comming items in layout 6 etc... You can use also simple {9} then all item ordered in Layout 9 type.
  });

  // don't try to form a background image when a chart is used
  $('.barchart').parent().css('background-image', 'none');
  $('.piechart').parent().css('background-image', 'none');

  $('.filter').click(function() {
    var category = $(this).data('category');

    // call Megafolio filter function
    api.megafilter(category);
    $(window).trigger('resize');

    // highlight current filter item
    $('.filter').removeClass('selected');
    $(this).addClass('selected');

    // add `categories` for fancybox
    $('.' + category + ' .fancybox').each(function() {
      $(this).attr("data-fancybox-group", category);
    });

    // reload charts after filtering
    setTimeout(function() {
      $('.chart-div').each(function() {
        var chartID = $(this).data("chartid");
        if (chartID) {
          var instance = Chart.instances[chartID];
          instance.resize(instance.render, false);
        }
      });
    }, 500);
  });

  $('.fancybox').fancybox({

    'maxWidth': 600,
    'width': 600,
    'minWidth': 600,

    beforeShow: function() {

      if ($(this.element).hasClass('icon')) {
        // make popup less high
        $('.fancybox-inner').css('max-height', '400px');

        // move navigation arrows
        // $('.fancybox-nav span').css('margin-top', '40px');
      }

      if (this.title) {
        title = this.title;
        this.title = '<h4>' + title + '</h4>';
      } else {
        this.title = '';
      }

      var content = $(this.element).parent().find('.mega-content').html();
      if (content) {
        this.title += content;
      }

      // Add share button
      this.title += '<div class="addthis"><span class="addthis_toolbox" addthis:url="http://www.kennispark.nl/?p=4990&amp;id=' + $(this.element).attr('id') + '" addthis:title="' + title + '"><a class="addthis_button_compact event-share"><img src="/wp-content/themes/kennispark/images/assets/trans.png" alt="" width="1" height="1" />Share</a></span></div>';
    },

    afterShow: function() {
      // Render AddThis
      addthis.toolbox(
        $('.addthis_toolbox').get()
      );

      if ($(this.content).data("chartid")) {
        var chartid = $(this.content).data("chartid");
        var instance = Chart.instances[chartid];
        instance.resize(instance.render, true);
        if($(this.content).find(".legend").length < 1) {
          $(this.content).append("<div class=\"legend\">" + instance.generateLegend() + "</div>");
        }
      }
      
      // make the chart fit better in the popup
      $('.fancybox-inner canvas').css({
        'width': '90%',
        'height': '90% !important'
      });
    },

    afterClose: function() {
      $(".chart-div").show();
      $(this.content).children(".legend").remove();

      $(window).trigger('resize');

      $('.fancybox-overlay').hide();
    },

    'helpers': {
      'title': {
        'type': 'inside'
      },
      'overlay': {
        'css': {
          'background': 'rgba(255, 255, 255, 0.75)'
        },
      }
    }
  });

  $('.video').click(function() {

    var content = $(this).parent().find('.mega-content').html();

    $.fancybox({

      'maxWidth': 640,
      'width': 640,
      'minWidth': 640,
      'height': 460,
      'padding': 10,
      'autoScale': false,
      'transitionIn': 'none',
      'transitionOut': 'none',
      'title': this.title,
      'href': this.href.replace(new RegExp("([0-9])", "i"), 'moogaloop.swf?clip_id=$1') + '&autoplay=0',
      'type': 'swf',
      'swf': {
        'wmode': 'transparent',
        'allowfullscreen': 'true'
      },
      
      beforeShow: function() {
        if (this.title) {
          title = this.title; // used for AddThis title
          this.title = '<h4>' + title + '</h4>';
        } else {
          title = ''; // used for AddThis title
          this.title = title;
        }

        if (content) {
          this.title += content;
        }

        // Add share button
        this.title += '<div class="addthis"><span class="addthis_toolbox" addthis:url="http://www.kennispark.nl/?p=4990&amp;id=' + $(this.element).attr('id') + '" addthis:title="' + title + '"><a class="addthis_button_compact event-share"><img src="/wp-content/themes/kennispark/images/assets/trans.png" alt="" width="1" height="1" />Share</a></span></div>';
      },

      afterShow: function() {
        // Render AddThis
        addthis.toolbox(
          $('.addthis_toolbox').get()
        );
      },

      'helpers': {
        'title': {
          'type': 'inside'
        },
        'overlay': {
          'css': {
            'background': 'rgba(255, 255, 255, 0.75)'
          },
        }
      }
    });

    return false;
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

  // set default title color
  $('.mega-entry').css('color', '#fff');

  // set custom backgroud color and image
  $('.fancybox').each(function() {
    if ($(this).data('bkgrnd')) {
      var color = getBackgroundColor($(this).data('bkgrnd'));
      $(this).closest('.mega-entry').find('.mega-entry-innerwrap').css('background-color', color);
      $(this).closest('.mega-entry').find('.mega-entry-innerwrap').css('background-image', 'url(' + $(this).attr('href') + '), linear-gradient(rgba(255, 255, 255, 0.1) 60%, transparent 40%, transparent)');
    } else {
      $(this).closest('.mega-entry').find('.mega-entry-innerwrap').css('background-color', '#f8f8f8');
      $(this).closest('.mega-entry').find('.mega-title').css('color', '#ca291c');
    }

    if ($(this).attr('href').indexOf('images') > -1) {
      // if background is an image, make sure it fills the entire `mega entry` block
      $(this).closest('.mega-entry').find('.mega-entry-innerwrap').addClass('background-cover');
      $(this).closest('.mega-entry').find('.mega-title').css('color', '#fff');
    }
  });

  $('.video').each(function() {
    // if background is an image, make sure it fills the entire `mega entry` block
    $(this).closest('.mega-entry').find('.mega-entry-innerwrap').addClass('background-cover');
  });

  function generateBarChartData(element) {
    var data = {};
    data.labels = element.data('labels').split(",");
    data.datasets = [];
    var bars = element.data('bars').split(",");
    for (var i = bars.length - 1; i >= 0; i--) {
      data.datasets.push({
        data: element.data(bars[i]).split(","),
        label: bars[i],
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
    fillColor: ["rgba(125, 175, 24, 0.8)", "rgba(202, 41, 28, 0.8)", "rgba(0, 120, 140, 0.8)", "rgba(59, 37, 110, 0.8)", "rgba(121, 14, 98, 0.8)", "rgba(220, 220, 220, 0.8)"],
    strokeColor: ["rgb(248, 248, 248)"],
    highlightFill: ["rgba(125, 175, 24, 1.0)", "rgba(202, 41, 28, 1.0)", "rgba(0, 120, 140, 1.0)", "rgba(59, 37, 110, 1.0)", "rgba(121, 14, 98, 1.0)", "rgba(220, 220, 220, 1.0)"],
    highlightStroke: ["rgb(248, 248, 248)"]
  }

  // load the charts
  setTimeout(function() {
    drawCharts();
  }, 1000);

  // add .svg and .php to the range of images
  $.fancybox.isImage = function(str) {
    return str && $.type(str) === "string" && str.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|svg|html|php|webp)((\?|#).*)?$)/i);
  };

  function drawCharts() {
    $('.mega-entry').each(function() {
      var dataChart = $(this).data('chart');
      var scaleLabel = $(this).data('scale');
      if (dataChart !== undefined) {
        var element = $(this);

        var chartid = element.find(".chart-div").data("chartid");
        var rendered = false;
        if(chartid !== undefined) {
          var instance = Chart.instances[chartid];
          if(instance !== undefined) {
            instance.resize(instance.render, true);
            rendered = true;
          }
        }
        if(!rendered) {
          var canvas = element.find('canvas');
          var height = element.find('.mega-covercaption').height() - element.find(".mega-title").height() - element.find(".mega-title").position().top;
          var width = canvas.closest(".chart-div").width();
          canvas.attr("width",width);
          canvas.attr("height",height);

          var ctx = element.find('canvas').get(0).getContext("2d");
          var chart = {};
          if (dataChart === "bar") {
            var data = generateBarChartData(element);
            if ((scaleLabel !== undefined) && (scaleLabel ===  "procent")) {
              chart = new Chart(ctx).Bar(data, {
                // responsive: true,
                scaleShowGridLines: false,
                scaleLabel : "<%= value + '%' %>",
                legendTemplate: "" +
                "<ul class=\"<%=name.toLowerCase()%>-legend chartlegend\">" +
                  "<% for (var i=0; i<datasets.length; i++){%>" +
                    "<li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li>" +
                  "<%}%>" +
                "</ul>"
              });
            } else {
              chart = new Chart(ctx).Bar(data, {
                // responsive: true,
                scaleShowGridLines: false,
                legendTemplate: "" +
                "<ul class=\"<%=name.toLowerCase()%>-legend chartlegend\">" +
                  "<% for (var i=0; i<datasets.length; i++){%>" +
                    "<li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li>" +
                  "<%}%>" +
                "</ul>"
              });
            }
          }
          if (dataChart === "pie") {
            var data = generatePieChartData(element);
            chart = new Chart(ctx).Pie(data, {
              // responsive: true,
              scaleShowGridLines: false,
              legendTemplate: "" +
              "<ul class=\"<%=name.toLowerCase()%>-legend chartlegend\">" +
                "<% for (var i=0; i<segments.length; i++){%>" +
                  "<li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li>" +
                "<%}%>" +
              "</ul>"
            });
          }
          element.find(".chart-div").attr("data-chartid", chart.id);
        }
      }
    });  
  }

  window.onresize = function(event){
    setTimeout(function() {
      drawCharts();
    }, 1000);
  };
});

