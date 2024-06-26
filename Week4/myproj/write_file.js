import XMLHttpRequest from 'xhr2';
import { writeFile } from 'node:fs';

var xhr = new XMLHttpRequest();
var args = process.argv;
if (args.length > 2) {
   var input = args[2];
   xhr.onreadystatechange = function() {
       if (xhr.readyState == 4) {
           var res = xhr.responseText;
           writeFile('api_result.txt', res, (err) => {
               if (err) throw err;
               console.log('The file has been saved!');
           });
       }
   };
   xhr.open('GET', `https://postman-echo.com/get?x=${input}`);
   xhr.send();
} else {
   console.log("USAGE: node index.js input");
}
