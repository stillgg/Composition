"use strict";

const checkArguments = (...fns) => {
  fns.forEach((arg) => {
    if (typeof arg !== "function") {
      throw new Error(`invalid argument '${arg}' must be function`);
    }
  });
};

const pipe = (...fns) => {
  checkArguments(...fns);

  return (x) => {
    let res = x;
    for (const fn of fns) {
      res = fn(res);
    }
    return res;
  };
};

const inc = (x) => ++x;
const twice = (x) => x * 2;
const cube = (x) => x ** 3;

// const f1 = pipe(inc, twice, cube);

// const f2 = pipe(inc, inc);

// const f3 = pipe(inc, 7, cube);

module.exports = { pipe };
