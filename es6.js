// ------------------------------------------------------------
/*
  Write three functions, add, sub,
  and mul, that take any number of
  numbers and return their sum,
  difference and product

  add(3, 4) // 7
  sub(3, 4) // -1
  mul(3, 4) // 12
*/
function add(...nums) {
  return nums.reduce((total, curr) => total + curr, 0);
}

add(2, 3, 4) // 9

function sub(first, ...rest) {
  return rest.reduce((total, curr) => total - curr, first);
}

sub(2, 3, 4) // -5

function mul(...nums) {
  return nums.reduce((total, curr) => total * curr, 1);
}

mul(2, 3, 4) // 24

// ------------------------------------------------------------
/*
  Write a function curry that
  takes a function and any
  number of arguments, and
  returns a function that can
  take any amount of arguments
  and invokes the initial
  function with curry's arguments
  and passed in arguments
*/

// generic argument number currying
function curry(func, ...outerArgs) {
  return function(...innerArgs) {
    return func(...outerArgs, ...innerArgs);
  }
}

// test
curry(add, 2, 3, 4)(1, 2, 3) // (2 + 3 + 4) + 1 + 2 + 3 = 15
curry(sub, 2, 3, 4)(1, 2, 3) // (2 - 3 - 4) - 1 - 2 - 3 = -11
curry(mul, 2, 3, 4)(1, 2, 3) // (2 * 3 * 4) * 1 * 2 * 3 = 144

// ------------------------------------------------------------
/*
  Write a function twice that
  takes a function and
  returns a function that
  passes its argument to the
  initial function twice

  let doubl = twice(add);
  doubl(11) // 22

  let square = twice(mul);
  square(11) // 121
*/

function twice(func) {
  return function(...nums) {
    return func(...nums, ...nums)
  }
}

// test
twice(add)(1, 2, 3) // (1 + 2 + 3) + 1 + 2 + 3 = 12
twice(sub)(1, 2, 3) // (1 - 2 - 3) - 1 - 2 - 3 = -10
twice(mul)(1, 2, 3) // (1 * 2 * 3) * 1 * 2 * 3 = 36

// ------------------------------------------------------------
/*
  Write a function reverse that
  reverses the arguments of the
  given function

  let bus = reverse(sub);
  bus(3, 2) // -1
*/

function reverse(func) {
  return function(...args) {
    return func(...args.reverse());
  }
}

// test
reverse(sub)(3, 2) // 2 - 3 = -1

// ------------------------------------------------------------
/*
  Write a function composeu that
  takes any number of functions
  and returns a unary function
  that calls all the input functions

  composeu(doubl, square, add3)(5) // ((5 + 5) * (5 + 5)) + 3 = 103
*/

function composeu(...funcs) {
  return function(x) {
    return funcs.reduce((result, func) => {
      return func(result);
    }, x);
  }
}

// test
// doubl = twice(add)
// square = twice(mul)
// add3 = curry(add, 3)
composeu(twice(add), twice(mul), curry(add, 3))(5) // ((5 + 5) * (5 + 5)) + 3 = 103

// ------------------------------------------------------------
/*
  Write a function limit that
  allows a given function to
  be called a limited numbers
  of times

  let addLimited = limit(add, 2);
  addLimited(1, 2, 3) // first call: 6
  addLimited(3, 4)    // second call: 7
  addLimited(10, 20)  // third call: undefined
*/

function limit(func, lmt) {
  return function(...args) {
    if (lmt > 0) {
      lmt -= 1;
      return func(...args);
    }
  }
}

const addLimited = limit(add, 2);
addLimited(1, 2, 3) // first call: 6
addLimited(3, 4)    // second call: 7
addLimited(10, 20)  // third call: undefined

// ------------------------------------------------------------
/*
  Write a function filter that takes a
  generator and a predicate and produces
  a generator that produces only the
  values approved by the predicate

  let third = function(val) {
    return val % 3 === 0;
  }
  let fil = filter(genFromTo(0, 5), third);

  fill() // 0
  fill() // 3
  fill() // undefined
*/

// The reason this is an ES6-exclusive improvement
// is because in ES6, tail-recursion is optimized
// http://benignbemine.github.io/2015/07/19/es6-tail-calls/
function filter(gen, predicate) {
  return function recurse() {
    let next = gen();
    if (next === undefined || predicate(next)) {
      return next;
    }
    return recurse();
  }
}

// test
let third = function(val) {
  return val % 3 === 0;
}
let fil = filter(genFromTo(0, 5), third);

fill() // 0
fill() // 3
fill() // undefined

// ------------------------------------------------------------
/*
  Write a function concat that takes
  two generators and produces a generator
  that combines the sequences

  var con = concat(genFromTo(0, 3), genFromTo(0, 2));
  con() // 0
  con() // 1
  con() // 2
  con() // 0
  con() // 1
  con() // undefined
*/

function concat(...gens) {
  let next = element(gens);
  let gen = next();
  return function recurse() {
    let value = gen();
    if (value === undefined) {
      gen = next();
      if (gen !== undefined) {
        return recurse();
      }
    }
    return value;
  }
}

// test
var con = concat(genFromTo(0, 3), genFromTo(0, 2), genFromTo(5, 7));
con() // 0
con() // 1
con() // 2
con() // 0
con() // 1
con() // 5
con() // 6
con() // undefined
