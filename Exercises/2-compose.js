"use strict";

const emitter = () => {
  const events = {};

  emitter.on = (event, callback) => {
    events[event] = callback;
  };

  emitter.emit = (event, ...args) => events[event](...args);

  return emitter;
};

const compose = (...fns) => {
  const e = emitter();

  e.on("error", () => {});

  const wrapper = (x) => {
    let res = x;

    const reversed = fns.reverse();

    for (const fn of reversed) {
      try {
        res = fn(res);
      } catch (err) {
        e.emit("error", err);
        return;
      }
    }

    return res;
  };

  wrapper.on = e.on;

  return wrapper;
};

const inc = (x) => ++x;
const twice = (x) => x * 2;
const cube = (x) => x ** 3;

// const f1 = compose(inc, twice, cube);

// console.log(f1(5));

// const f2 = compose(inc, twice, 5, cube);

// f2.on("error", (e) => {
//   console.log("e - ", e);
// });

// f2(5);

// console.log("ex - ", ex);

module.exports = { compose };
