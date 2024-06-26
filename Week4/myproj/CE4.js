import EventEmitter from "events";

const ev1 = new EventEmitter();
const ev2 = new EventEmitter();

let count = 0;

let promise1 = new Promise((resolve, reject) => {
  resolve(count);
});

let promise2 = new Promise((resolve, reject) => {
  resolve(count);
});

function foo(x) {
  return new Promise((resolve, reject) => {
    if (x > 10) {
      resolve();
    } else if (x % 2 == 0) {
      ev1.emit("run", ++x);
    } else {
      ev2.emit("run", ++x);
    }
  });
}

ev1.on("run", (data) => {
  setImmediate(() => {
    console.log(`data ${data} received by ev1`);
    promise2.then(foo);
  });
});

ev2.on("run", (data) => {
  setImmediate(() => {
    console.log(`data ${data} received by ev2`);
    promise1.then(() => {
      return foo(data);
    });
  });
});

ev2.emit("run", count);
