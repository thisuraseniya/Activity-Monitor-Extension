// /* data is sent to the local server (127.0.0.1:5244) where Activity Monitor (parent app) will be listening*/

function getURL() {
  var url = window.location.origin;    
  
  if (url == "https://www.youtube.com") {
    var paused = document.getElementsByTagName('video')[0].paused;   
    var video = null;  
  }
  else {
    var paused = null;    
    var iframes = document.getElementsByTagName('iframe');
    var arrayLength = iframes.length;
    var video = null;

    if (arrayLength > 0) {
      for (var i = 0; i < arrayLength; i++) {
        var u = iframes[i].src;      
        var hasYouTube = (/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?/.test(u));    
        if (hasYouTube === true) { 
          video = true;
          break; 
        }        
      }    
    }    
  }
  $.ajax({url: "http://127.0.0.1:5244/tracker/isRunning",
    type: "GET",
    timeout:500,
    statusCode: {
      200: function (running) {
        if (running === "1" ) {
          console.log("Sending");
          $.ajax({
            url:"http://127.0.0.1:5244/tracker/url",
            method:"POST",
            data:{url: url, browser: "Browser", paused: paused, video: video},            
          });  
        }         
      }                
    }
  }); 
}


setInterval(function () {
  if(document.hasFocus()){
    getURL();
  }  
}, 1000);

