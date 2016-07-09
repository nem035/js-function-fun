/*
  Write function `identity` that
  takes an argument and returns
  that argument

  identity(3) // 3
*/
function identity(x) {
  return x;
}

// ------------------------------------------------------------
/*
  Write three binary functions,
  `addBinary`, `subBinary`, and
  `mulBinary`, that take two
  numbers and return their sum,
  difference and product

  addBinary(3, 4) // 7
  subBinary(3, 4) // -1
  mulBinary(3, 4) // 12
*/
function addBinary(a, b) {
  return a + b;
}

function subBinary(a, b) {
  return a - b;
}

function mulBinary(a, b) {
  return a * b;
}

// ------------------------------------------------------------
/*
  Write functions `add`, `sub` and
  `mul` that are generalized for
  any amount of arguments

  add(1, 2, 4) // 7
  sub(1, 2, 4) // -5
  mul(1, 2, 4) // 8
*/
function add(...nums) {
  return nums.reduce((total, curr) => total + curr, 0);
}

function sub(first, ...rest) {
  return rest.reduce((total, curr) => total - curr, first);
}

function mul(...nums) {
  return nums.reduce((total, curr) => total * curr, 1);
}

// ------------------------------------------------------------
/*
  Write a function `acc` that
  takes a function and a
  starting value and returns
  a function that runs the
  initial function on each
  argument

  let add = acc((total, curr) => total + curr, 0);
  add(1, 2, 4) // 7

  let mul = acc((total, curr) => total + curr, 1);
  mul(1, 2, 4) // 8

*/

function acc(func, start) {
  return function(...args) {
    return args.reduce((total, curr, idx) => func(total, curr, idx), start);
  }
}

// ------------------------------------------------------------
/*
  Write a function identityf
  that takes an argument and
  returns a function that
  returns that argument

  let three = identityf(3);
  three(); // 3
*/
function identityf(x) {
  return function() {
    return identity(x);
  };
}

// ------------------------------------------------------------
/*
  Write a function addf that
  adds from two invocations

  addf(3)(4) // 7
*/
function addf(a) {
  return function(b) {
    return addBinary(a, b);
  };
}

// ------------------------------------------------------------
/*
  Write a function liftf that
  takes a binary function, and
  makes it callable with two
  invocations

  let addf = liftf(add);
  addf(3)(4); // 7

  liftf(mul)(5)(6) // 30
*/
function liftf(binary) {
  return function(a) {
    return function(b) {
      return binary(a, b);
    };
  };
}

// ------------------------------------------------------------
/*
  Write a function `curryBinary` that
  takes a binary function and
  an argument, and returns a
  function that can take a
  second argument

  let add3 = curryBinary(add, 3);
  add3(4); // 7

  curry(mul, 5)(6); // 30
*/
function curryBinary(binary, a) {
  return function(b) {
    return binary(a, b);
  };
}

function curryBinary2(binary, a) {
  return liftf(binary)(a);
}

// ------------------------------------------------------------
/*
  Write a function `curry` that
  is generalized for any amount
  of arguments

  curry(add, 1, 2, 4)(4, 2, 1) = 1 + 2 + 4 + 4 + 2 + 1 = 14
  curry(sub, 1, 2, 4)(4, 2, 1) = 1 - 2 - 4 - 4 - 2 - 1 = 0
  curry(mul, 1, 2, 4)(4, 2, 1) = 1 * 2 * 4 * 4 * 2 * 1 = 64
*/

function curry(func, ...outerArgs) {
  return function(...innerArgs) {
    return func(...outerArgs, ...innerArgs);
  }
}

// ------------------------------------------------------------
/*
  Without writting any new functions,
  show multiple ways to create the `inc`
  function

  let inc = _ _ _ :

  inc(5)      // 6
  inc(inc(5)) // 7
*/

function inc(x) {
  return add(1, x);
}

function inc2(x) {
  return addf(1)(x);
}

function inc3(x) {
  return liftf(add)(x)(1);
}

function inc4(x) {
  return curry(add, x)(1);
}

// ------------------------------------------------------------
/*
  Write a function `twiceUnary`
  that takes a binary function
  and returns a unary function
  that passes its argument to
  the binary function twice

  let doubl = twice(add);
  doubl(11) // 22

  let square = twice(mul);
  square(11) // 121
*/

function twiceUnary(binary) {
  return function(x) {
    return binary(x, x)
  };
}

// ------------------------------------------------------------
/*
  Use the function `twiceUnary` to
  create the `square` and `doubl`
  functions

  doubl(11) // 22
  square(11) // 121
*/

let doubl = twiceUnary(add);
let square = twiceUnary(mul);

// ------------------------------------------------------------
/*
  Write a function `twice` that
  is generalized for any amount
  of arguments

  let doubleSum = twice(add);
  doubleSum(1, 2, 4) // 1 + 2 + 4 + 1 + 2 + 4 = 14
*/
function twice(func) {
  return function(...args) {
    return func(...args, ...args);
  }
}

// ------------------------------------------------------------
/*
  Write a function `reverseBinary` that
  reverses the arguments of a
  binary function

  let bus = reverseBinary(sub);
  bus(3, 2) // -1
*/

function reverseBinary(binary) {
  return function(a, b) {
    return binary(b, a);
  };
}

// ------------------------------------------------------------
/*
  Write a function `reverse` that
  is generalized for any amount
  of arguments

  reverse(sub)(1, 2, 4) // 4 - 2 - 1 = 1
*/

function reverse(func) {
  return function(...args) {
    return func(...args.reverse());
  }
}

// ------------------------------------------------------------
/*
  Write a function `composeuTwo` that
  takes two unary functions and
  returns a unary function that
  calls them both

  composeuTwo(doubl, square)(5) // 100
*/

function composeuTwo(unary1, unary2) {
  return function(x) {
    return unary2(unary1(x));
  };
}

// ------------------------------------------------------------
/*
  Write a function `composeu` that
  is generalized for any amount
  of arguments

  composeu(doubl, square, identity, curry(add, 1, 2))(5) // (5 + 5) * (5 + 5) + 1 + 2 = 103
*/

function composeu(...funcs) {
  return function(x) {
    return funcs.reduce((result, func) => func(result), x);
  }
}

// ------------------------------------------------------------
/*
  Write a function composeb that
  takes two binary functions and
  returns a function that calls
  them both

  composeb(add, mul)(2, 3, 7) // 35
*/

function composeb(func1, func2) {
  return function(a, b, c) {
    return func2(func1(a, b), c);
  };
}

// ------------------------------------------------------------
/*
  Write a function `limitBinary`
  that allows a binary function
  to be called a limited number
  of times

  let addLmtBinary = limitBinary(addBinary, 1);
  addLmtBinary(3, 4) // 7
  addLmtBinary(3, 5) // undefined
*/

function limitBinary(binary, lmt) {
  return function(a, b) {
    if (lmt > 0) {
      lmt -= 1;
      return binary(a, b);
    }
    return undefined; // be explicit
  };
}

// ------------------------------------------------------------
/*
  Write a function `limit` that
  is generalized for any amount
  of arguments

  let addLmt = limit(add, 1);
  addLmt(1, 2, 4)    // 7
  addLmt(3, 5, 9, 2) // undefined
*/

function limit(func, lmt) {
  return function(...args) {
    if (lmt > 0) {
      lmt -= 1;
      return func(...args);
    }
    return undefined; // be explicit
  };
}

// ------------------------------------------------------------
/*
  Write a function `genFrom` that
  produces a generator that will
  produces a series of values

  let index = genFrom(0);

  index() // 0
  index() // 1
  index() // 2
*/

function genFrom(x) {
  return function() {
    let next = x;
    x += 1;
    return next;
  };
}

// ------------------------------------------------------------
/*
  Write a function `genTo` that
  takes a generator and an end
  limit, and returns a generator
  that will produce numbers up
  to that limit

  let index = genTo(genFrom(1), 3);

  index() // 1
  index() // 2
  index() // undefined
*/

function genTo(gen, lmt) {
  return function(x) {
    let next = gen(x);
    if (next < lmt) {
      return next;
    }
    return undefined; // be explicit
  };
}

// ------------------------------------------------------------
/*
  Write a function `genFromTo` that
  produces a generator that will
  produce values in a range

  let index = genFromTo(0, 3);
  index() // 0
  index() // 1
  index() // 2
  index() // undefined
*/

function genFromTo(min, max) {
  return genTo(genFrom(min), max);
}

// ------------------------------------------------------------
/*
  Write a function `elementGen` that
  takes an array and a generator
  and returns a generator that will
  produce elements from the array

  let ele = elementGen([
    'a', 'b', 'c', 'd'
  ], genFromTo(1, 3));

  ele() // 'b'
  ele() // 'c'
  ele() // undefined
*/

function elementGen(array, gen) {
  return function() {
    let index = gen();
    return index !== undefined ? array[index] : undefined;
  };
}

// ------------------------------------------------------------
/*
  Write a function `element` that is a
  modified `elementGen` function so that
  the generator argument is optional.
  If a generator is not provided, then
  each of the elements of the array
  will be produced.

  let ele = element([
    'a', 'b', 'c', 'd'
  ]);

  ele() // 'a'
  ele() // 'b'
  ele() // 'c'
  ele() // 'd'
  ele() // undefined
*/
function element(array, gen) {
  if (typeof gen !== 'function') {
    gen = genFromTo(0, array.length);
  }
  return elementGen(array, gen);
}

// ------------------------------------------------------------
/*
  Write a function `collect` that takes a
  generator and an array and produces
  a function that will collect the results
  in the array

  let array = [];
  let col = collect(genFromTo(0, 2), array);

  col() // 0
  col() // 1
  col() // undefined
  array // [0, 1]
*/

function collect(gen, array) {
  return function() {
    let next = gen();
    if (next !== undefined) {
      array.push(next);
    }
    return next;
  };
}

// ------------------------------------------------------------
/*
  Write a function `filter` that takes a
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

function filter(gen, predicate) {
  return function() {
    let next;
    do {
      next = gen();
    } while (next !== undefined && !predicate(next));
    return next;
  };
}

// ------------------------------------------------------------
/*
  Write a function `filterTail` that uses
  tail-recursion to perform the filtering

  let third = val => val % 3 === 0;
  let fil = filterTail(genFromTo(0, 5), third);

  fill() // 0
  fill() // 3
  fill() // undefined
*/

// The reason this is an ES6-exclusive improvement
// is because in ES6, tail-recursion is optimized
// http://benignbemine.github.io/2015/07/19/es6-tail-calls/
function filterTail(gen, predicate) {
  return function recurse() {
    let next = gen();
    if (next === undefined || predicate(next)) {
      return next;
    }
    return recurse();
  }
}

// ------------------------------------------------------------
/*
  Write a function `concatTwo` that takes
  two generators and produces a generator
  that combines the sequences

  let con = concatTwo(genFromTo(0, 3), genFromTo(0, 2), genFromTo(5, 7));
  con() // 0
  con() // 1
  con() // 2
  con() // 0
  con() // 1
  col() // 5
  col() // 6
  con() // undefined
*/

function concatTwo(gen1, gen2) {
  return function() {
    let next = gen1();
    if (next === undefined) {
      next = gen2();
    }
    return next;
  };
}

// ------------------------------------------------------------
/*
  Write a function `concat` that
  is generalized for any amount
  of arguments
*/

function concat(...gens) {
  return function gen() {
    let value;
    gens.some(gen => {
      value = gen();
      if (value !== undefined) {
        return true;
      } else {
        gens = gens.slice(1);
        return false;
      }
    });
    return value;
  }
}


// ------------------------------------------------------------
/*
  Write a function `concatTail` that uses
  tail-recursion to perform the concating

  let con = concat(genFromTo(0, 3), genFromTo(0, 2));
  con() // 0
  con() // 1
  con() // 2
  con() // 0
  con() // 1
  con() // undefined
*/

function concatTail(...gens) {
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

// ------------------------------------------------------------
/*
  Write a function `gensymf` that
  makes a function that generates
  unique symbols

  let genG = gensymf('G');
  let genH = gensymf('H');

  genG() // 'G1'
  genH() // 'H1'
  genG() // 'G2'
  genH() // 'H2'
*/

function gensymf(symbol) {
  let index = genFrom(1);
  return function() {
    return `${symbol}${index()}`;
  };
}

// ------------------------------------------------------------
/*
  Write a function `gensymff` that
  takes a unary function and a
  seed and returns a `gensymf`

  let gensymf = gensymff(inc, 0);
  let genG = gensymf('G');
  let genH = gensymf('H');

  genG() // 'G1'
  genH() // 'H1'
  genG() // 'G2'
  genH() // 'H2'
*/

function gensymff(unary, seed) {
  return function(symbol) {
    let index = seed;
    return function() {
      index = unary(index);
      return `${symbol}${index}`;
    }
  };
}

// ------------------------------------------------------------
/*
  Write a function `fibonaccif` that
  returns a generator that will
  return the next fibonacci number

  let fib = fibonaccif(0, 1);
  fib() // 0
  fib() // 1
  fib() // 2
  fib() // 3
  fib() // 5
  fib() // 8
*/

function fibonaccif(first, second) {
  let firstUsed = false;
  let secondUsed = false;
  return function() {

    if (!firstUsed) {
      firstUsed = true;
      return first;
    }

    if (!secondUsed) {
      secondUsed = true;
      return second;
    }

    let next = first + second;
    first = second;
    second = next;
    return next;
  };
}

function fibonaccif2(first, second) {
  let i = 0;
  return function() {
    if (i === 0) {
      i = 1;
      return first;
    }
    if (i === 1) {
      i = 2;
      return second;
    }

    let next = first + second;
    first = second;
    second = next;
    return next;
  };
}

function fibonaccif3(first, second) {
  let i = 0;
  return function() {
    let next;
    switch (i) {
      case 0:
        i = 1;
        return first;
      case 1:
        i = 2;
        return second;
      default:
        next = first + second;
        first = second;
        second = next;
        return next;
    }
  };
}

function fibonaccif4(first, second) {
  return function() {
    let next = first;
    first = second;
    second += next;
    return next;
  };
}


function fibonaccif5(first, second) {
  const identityLmt = x => limit(identityf(x), 1);
  return concat(
    identityLmt(first),
    identityLmt(second),
    function fibonacci() {
      let next = first + second;
      first = second;
      second = next;
      return next;
    }
  );
}

function fibonaccif6(first, second) {
  return concat(
    element([ first, second ]),
    function fibonacci() {
      let next = first + second;
      first = second;
      second = next;
      return next;
    }
  );
}

// ------------------------------------------------------------
/*
  Write a function `counter` that
  returns an object containing
  two functions that implement
  an up/down counter, hiding
  the counter

  let obj = counter(10);
  let up = object.up;
  let down = object.down;

  up()   // 11
  down() // 10
  down() // 9
  up()   // 10
*/

function counter(i) {
  return {
    up() {
      i += 1;
      return i;
    },
    down() {
      i -= 1;
      return i;
    }
  };
}

// ------------------------------------------------------------
/*
  Write a function `revocableBinary`
  that takes a binary function, and
  returns an object containing an
  `invoke` function that can invoke a
  function and a `revoke` function
  that disables the `invoke` function

  let rev = revocableBinary(addBinary);

  rev.invoke(3, 4); // 7
  rev.revoke();
  rev.invoke(5, 7); // undefined
*/

function revocableBinary(binary) {
  return {
    invoke(a, b) {
      return typeof binary === 'function' ? binary(a, b) : undefined;
    },
    revoke() {
      binary = undefined;
    }
  };
}

// ------------------------------------------------------------
/*
  Write a function `revocable` that
  is generalized for any amount of
  arguments

  let rev = revocable(add);

  rev.invoke(3, 4); // 7
  rev.revoke();
  rev.invoke(5, 7); // undefined
*/

function revocable(func) {
  return {
    invoke() {
      return typeof func === 'function' ? func(...arguments) : undefined;
    },
    revoke() {
      func = undefined;
    }
  };
}

// ------------------------------------------------------------
/*
  Write a function `extract` that
  takes an array of objects and an
  object property name and converts
  each object in the array by
  extracting that property

  let people = [{ name: 'john'}, { name: 'bob' }];
  let names = extract(people, 'name'); // ['john', 'bob']
*/
function extract(array, prop) {
  return array.map(obj => obj[prop]);
}

// ------------------------------------------------------------
/*
  Write a function `m` that
  takes a value and an
  optional source string
  and returns them in an
  object

  JSON.stringify(m(1))
  // '{"value":1,"source":"1"}'

  JSON.stringify(m(Math.PI, "pi"))
  // '{"value":3.14159...,"source":"pi"}'
*/

function m(value, source) {
  return {
    value,
    source: typeof source === 'string' ? source : String(value)
  };
}

// ------------------------------------------------------------
/*
  Write a function `addmTwo` that
  adds two `m` objects and
  returns an `m` object

  JSON.stringify(addmTwo(m(3), m(4)))
  // '{"value":7,"source":"(3+4)"}'

  JSON.stringify(addmTwo(m(1), m(Math.PI, "pi")))
  // '{"value":4.14159...,"source":"(1+pi)"}'
*/

function addmTwo(m1, m2) {
  return m(
    addBinary(m1.value, m2.value),
    `(${m1.source}+${m2.source})`
  );
}

// ------------------------------------------------------------
/*
  Write a function `addm` that
  is generalized for any amount of
  arguments

  JSON.stringify(addm(m(1), m(2), m(4)))
  // '{"value":7,"source":"(1+2+4)"}'
*/
function addm(...ms) {
  const values = extract(ms, 'value');
  const sources = extract(ms, 'source');
  return m(
    add(...values),
    `(${sources.join('+')})`
  );
}

// ------------------------------------------------------------
/*
  Write a function `liftmBinaryM` that
  takes a binary function and
  a string and returns a function
  that acts on `m` objects

  let addmBinary = liftmBinaryM(addBinary, '+');

  JSON.stringify(addmBinary(m(3), m(4)))
  // '{"value":7,"source":"(3+4)"}'

  JSON.stringify(liftmBinaryM(mul, '*')(m(3), m(4)))
  // '{"value":12,"source":"(3*4)"}'
*/

function liftmBinaryM(binary, op) {
  return function(m1, m2) {
    return m(
      binary(m1.value, m2.value),
      `(${m1.source}${op}${m2.source})`
    );
  };
}

// ------------------------------------------------------------
/*
  Write a function `liftmBinary` that
  is a modified function `liftmBinaryM`
  that can accept arguments that
  are either numbers or m objects

  let addmBinary = liftmBinary(addBinary, '+')

  JSON.stringify(addmBinary(3, 4))
  // '{"value":7,"source":"(3+4)"}'
*/

function liftmBinary(binary, op) {
  return function(a, b) {
    if (typeof a === 'number') {
      a = m(a);
    }
    if (typeof b === 'number') {
      b = m(b);
    }
    return m(
      binary(a.value, b.value),
      '(' + a.source + op + b.source + ')'
    );
  }
}

// ------------------------------------------------------------
/*
  Write a function `liftm` that
  is generalized for any amount of
  arguments

  let addm = liftm(add, '+');

  JSON.stringify(addm(m(3), m(4)))
  // '{"value":7,"source":"(3+4)"}'

  JSON.stringify(liftm(mul, '*')(m(3), m(4)))
  // '{"value":12,"source":"(3*4)"}'
*/

function liftm(func, op) {
  const toMs = args => args.map(arg => typeof arg === 'number' ? m(arg) : arg);
  return function(...args) {
    const ms = toMs(args);
    const msValues = extract(ms, 'value');
    const msSources = extract(ms, 'source');
    const value = func(...msValues);
    const source = `(${msSources.join(op)})`;
    return m(value, source);
  };
}

// ------------------------------------------------------------
/*
  Write a function `exp` that
  evaluates simple array
  expressions

  let sae = [mul, 1, 2, 4];
  exp(sae) // 1 * 2 * 4 = 8
  exp(42)  // 42
*/

function exp(value) {
  if (Array.isArray(value)) {
    const [ func, ...args ] = value;
    return func(...args);
  }
  return value;
}

// ------------------------------------------------------------
/*
  Write a function `expn`
  that is a modified `exp` that
  can evaluate nested array
  expressions

  let nae = [
    Math.sqrt,
    [
      add,
      [square, 3],
      [square, 4]
    ]
  ];

  expn(nae) // sqrt(((3*3)+(4*4))) === 5
*/

function expn(value) {
  if (Array.isArray(value)) {
    const [ func, ...args ] = value;
    return func(...args.map(expn));
  }
  return value;
}

// ------------------------------------------------------------
/*
  Write a function `addg` that
  adds from many invocations,
  until it sees an empty
  invocation

  addg()             // undefined
  addg(2)()          // 2
  addg(2)(7)()       // 9
  addg(3)(0)(4)()    // 7
  addg(1)(2)(4)(8)() // 15
*/

function addg(value) {
  if (value === undefined) {
    return value;
  }

  return function(next) {
    if (next === undefined) {
      return value;
    }
    return addg(value + next);
  }
}

function addg2(first) {
  function more(next) {
    if (next === undefined) {
      return first;
    }
    first += next;
    return more;
  }
  if (first !== undefined) {
    return more;
  }
}

// ------------------------------------------------------------
/*
  Write a function `liftg` that
  will take a binary function
  and apply it to many invocations

  liftg(mulBinary)()             // undefined
  liftg(mulBinary)(3)()          // 3
  liftg(mulBinary)(3)(0)(4)()    // 0
  liftg(mulBinary)(1)(2)(4)(8)() // 64
*/

function liftg(binary) {
  return function op(value) {
    if (value === undefined) {
      return value;
    }
    return function (next) {
      if (next === undefined) {
        return value;
      }
      return op(binary(value, next));
    }
  }
}

function liftg2(binary) {
  return function (first) {
    function more(next) {
      if (next === undefined) {
        return first;
      }
      first = binary(first, next);
      return more;
    }
    if (first !== undefined) {
      return more;
    }
  }
}

function liftg3(binary) {
  return function(first) {
    if (first === undefined) {
      return first;
    }
    return function more(next) {
      if (next === undefined) {
        return first;
      }
      first = binary(first, next);
      return more;
    }
  }
}

// ------------------------------------------------------------
/*
  Write a function `arrayg` that
  will build an array from many
  invocations

  arrayg()          // []
  arrayg(3)()       // [3]
  arrayg(3)(4)(5)() // [3, 4, 5]
*/

function arrayg(value) {
  let array = [];
  if (value === undefined) {
    return array;
  }
  array.push(value);
  return function op(next) {
    if (next === undefined) {
      return array;
    }
    array.push(next);
    return op;
  }
}

function arrayg2(first) {
  let array = [];
  function more(next) {
    if (next === undefined) {
      return array;
    }
    array.push(next);
    return more;
  }
  return more(first);
}

function arrayg3(first) {
  if (first === undefined) {
    return [];
  }
  return liftg(
    function(array, value) {
      array.push(value);
      return array;
    }
  )([ first ]);
}

// ------------------------------------------------------------
/*
  Write a function `continuizeu`
  that takes a unary function
  and returns a function that
  takes a callback and an
  argument

  sqrtc = continuizeu(Math.sqrt);
  sqrtc(console.log, 81); // logs '9'
*/

function continuizeu(unary) {
  return function(cb, arg) {
    return cb(unary(arg));
  }
}

// ------------------------------------------------------------
/*
  Write a function `continuize`
  that takes a function and
  returns a function that
  takes a callback and an
  argument

  sqrtc = continuizeu(Math.sqrt);
  sqrtc(console.log, 1, 2, 4); // logs '1 2 4'
*/

function continuize(any) {
  return function(cb, ...x) {
    return cb(any(...x));
  }
}
