// When you start executing your JS code,
// we start from main() frame in call stack

var count = 0;

let x = new Promise( (resolve, reject) => {
  setImmediate( () => {console.log("A")} );
  resolve(count);
  console.log(count + "Skipped the resolve");
});

x.then((c) => {
  console.log(c);
  count++;
  return count;
  //   return new Promise( (resolve)=>{resolve(count)} );
}).then((x) => console.log(x + " what?"));

console.log("Main stack " + count);

// once reach the end of file,
// main() frame will be popped