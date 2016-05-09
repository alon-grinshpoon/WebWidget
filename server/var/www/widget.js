(function() {
  // Define needed parameters
  var jQuery;
  var serverFQDN = 'http://localhost:80';
  var marketURL = 'https://market.elephantjournal.com';
  var cdnURL = '//djjy93q16xqqw.cloudfront.net/upload_images/';
  var timeoutId, container;

  // Define widget container
  if (!window.Peakardo) window.Peakardo = {};
    Peakardo.Widget = function(opts) {
    container = '.widget-body';
  };

  function init() {
    // Initilaize jQuery: Load jQuery if not present
    if (window.jQuery === undefined || window.jQuery.fn.jquery !== '1.6.4') {
      var script_tag = document.createElement('script');
      script_tag.setAttribute("type","text/javascript");
      script_tag.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js");
      // Try to find the head, otherwise default to the documentElement
      (document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
      if (script_tag.attachEvent) {
        script_tag.onreadystatechange = function() { // for old versions of IE
          if (this.readyState == 'complete' || this.readyState == 'loaded') {
            this.onreadystatechange = null;
            scriptLoadHandler();
          }
        };
      } else { // other browsers
        script_tag.onload = scriptLoadHandler;
      }
    } else {
      // jQuery already exists on page
      jQuery = window.jQuery;
      // Call the main function
      main();
    }
  }

  function scriptLoadHandler() {
    // Restore $ and window.jQuery to their previous values and store the
    // new jQuery in our local jQuery variable
    jQuery = window.jQuery.noConflict(true);
    // jQuery is now loaded
    // Call the main function
    main();
  }
  
  function main() {
    jQuery(document).ready(function($) {
      
      jQuery('head').append('<link href="' + serverFQDN + '/vendor/cleanslate.css" rel="stylesheet" type="text/css">');
      jQuery('head').append('<link href="' + serverFQDN + '/widget.css" rel="stylesheet" type="text/css">');
      jQuery.getScript(serverFQDN + '/vendor/json2.js');

      // GET JSON and update widget
      // Using PHP Server
      //jQuery.getJSON(serverFQDN + '/widget_submit.php?callback=?', {
      //market_url: marketURL, cdn_url: cdnURL }, serverResponse);
      // Using Python Server
      jQuery.getJSON(serverFQDN + '/cgi-bin//widget_server.py?callback=?', {
      market_url: marketURL, cdn_url: cdnURL }, serverResponse);

   });
  }

  function serverResponse(data){
    jQuery(document).ready(function($) {
	 
	//$('#peakardo-widget-container').html("<h1>" + data.product_name_1 + "</h1> \
	//					<img src='http:" + cdnURL + data.product_pic_1 + "'></img> \
	//					<h2>" + data.product_price_1 + "</h2>");

$('#peakardo-widget-container').html("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css' integrity='sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7' crossorigin='anonymous'>");
$('#peakardo-widget-container').append("\
<div class='row'> \
 <div class='col-sm-4 col-md-2'> \
    <div class='thumbnail'> \
      <img src='http:" + cdnURL + data.product_pic_1 + "'alt='" + data.product_name_1  + "'> \
      <div class='caption'> \
        <h3>" + data.product_name_1 + "</h3> \
        <p class='text-success'>$" + data.product_price_1 + "</p> \
        <p><a href='" + marketURL  + "/products/" + data.product_id_1 + "' class='btn btn-warning' role='button'>BUY NOW</a></p> \
      </div> \
    </div> \
  </div> \
 <div class='col-sm-4 col-md-2'> \
    <div class='thumbnail'> \
      <img src='http:" + cdnURL + data.product_pic_2 + "'alt='" + data.product_name_1  + "'> \
      <div class='caption'> \
        <h3>" + data.product_name_2 + "</h3> \
        <p class='text-success'>$" + data.product_price_2 + "</p> \
        <p><a href='" + marketURL  + "/products/" + data.product_id_2 + "' class='btn btn-warning' role='button'>BUY NOW</a></p> \
      </div> \
    </div> \
  </div> \
 <div class='col-sm-4 col-md-2'> \
    <div class='thumbnail'> \
      <img src='http:" + cdnURL + data.product_pic_3 + "'alt='" + data.product_name_1  + "'> \
      <div class='caption'> \
        <h3>" + data.product_name_3 + "</h3> \
        <p class='text-success'>$" + data.product_price_3 + "</p> \
        <p><a href='" + marketURL  + "/products/" + data.product_id_3 + "' class='btn btn-warning' role='button'>BUY NOW</a></p> \
      </div> \
    </div> \
  </div> \
</div>");

    });
  }

  init();
  
})(); // Call the anonymous function immediately
