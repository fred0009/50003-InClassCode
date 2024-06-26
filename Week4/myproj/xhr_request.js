import XMLHttpRequest from 'xhr2';

var xhr = new XMLHttpRequest();

var args = process.argv;

if (args.length > 2) {
   var input = args[2];
   xhr.onreadystatechange = function() {
    console.log(xhr.readyState);
       if (xhr.readyState == 4) {
           var res = xhr.responseText;
           console.log(res);
       }
   };
   xhr.open('GET', `https://postman-echo.com/get?x=${input}`);
   xhr.send();
} else {
   console.log("USAGE: node index.js input");
}
