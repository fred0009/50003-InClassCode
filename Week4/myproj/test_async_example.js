import fetch from 'node-fetch';
import { promises } from 'node:fs';

async function main(args, id){
   if (args.length > 2) {
       var input    = args[2];
       let response = await fetch(`https://postman-echo.com/get?x=${input}`);
       let text     = await response.text();
       let res      = await promises.writeFile('api_result.txt', text);
       console.log('The file has been saved! ' + id);
   } else {
       console.log("USAGE: node index.js input");
   }
}

main(process.argv, 1);
console.log("I am taking other request");
await main(process.argv, 2);
console.log("I am taking other request");

