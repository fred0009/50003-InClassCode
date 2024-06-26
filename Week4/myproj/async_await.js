// defining a blocking delay - never use this in practice!
var delay = (millis) => {
  var date = new Date();
  while (new Date() - date < millis) {}
};

// demo 1 - global scope await
console.log("Demo 1");
var x = new Promise((resolve) => {
  console.log("promise x created");
  delay(2000);
  resolve("Resolved value of x");
});

var y = await x; // await in global scope - blocking
console.log("await result: " + y);

// demo 2 - async function and await
console.log("\nDemo 2");
async function return_z(str) {
  var z = await x.then((c) => {
    // try with and without await
    console.log(str + " inside then: " + c);
    delay(3000);
    return 33.33;
  });

  console.log("var z inside function: " + z);
  return z;
}
var output1 = await return_z("1"); // try with and without await
console.log("I am outside: " + output1);
