// /* data is sent to the local server (127.0.0.1:5244) where Activity Monitor (parent app) will be listening*/

function getURL() {
  var url = window.location.origin;
  console.log(url);
  if (url == "https://www.youtube.com") {
    var paused = document.getElementsByTagName('video')[0].paused;    
  }
  else {
    var paused = null;    
  }
  
  $.ajax({
    url:"http://127.0.0.1:5244/tracker/url",
    method:"POST",
    data:{url: url, browser: "Browser", paused: paused},            
  });    
}

setInterval(function () {
  if(document.hasFocus()){
    getURL();
  }  
}, 1000);

