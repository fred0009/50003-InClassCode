function handleSendButtonClick() {
    var message = document.getElementById("message");
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
       if (xhr.readyState == 4) {
          var res = xhr.responseText;
          var json = JSON.parse(res);
          update_messagesregion(json);
       }
    };
    // constructing a HTTP POST request
    var params = `msg=${message.value}`;
    xhr.open('POST', `/echo/submit/`, true);
    // Send the proper header information along with the request
    xhr.setRequestHeader('Content-type',     'application/x-www-form-urlencoded');
    xhr.send(params);
 }
 
 function update_messagesregion(json) {
  var html = "";
  for (let i = 0; i < json.length; i++) {
    const message = json[i];
    html += `<li><div>${message.time}</div><div>${message.msg}</div></li>`;
  }
  var region = document.getElementById("messagesregion");
  region.innerHTML = html;
}
// set up the event listener for the send button
// call /echo/all to get the current list of messages
function run() {
  var sendButton = document.getElementById("sendButton");
  sendButton.addEventListener("click", handleSendButtonClick);
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var res = xhr.responseText;
      var json = JSON.parse(res);
      update_messagesregion(json);
    }
  };
  xhr.open("GET", `/echo/all`);
  xhr.send();
}
document.addEventListener("DOMContentLoaded", run);
