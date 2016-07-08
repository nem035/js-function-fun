/*
  Write an identity function that takes an argument
  and returns that argument

  identity(3) // 3
*/
function identity(x) {
  return x;
}

// ------------------------------------------------------------
/*
  Write three binary functions,
  add, sub, and mul, that take
  two numbers and return their
  sum, difference and product

  add(3, 4) // 7
  sub(3, 4) // -1
  mul(3, 4) // 12
*/
function add(a, b) {
  return a + b;
}

function sub(a, b) {
  return a - b;
}

function mul(a, b) {
  return a * b;
}

// ------------------------------------------------------------
/*
  Write a function identityf
  that takes an argument and
  returns a function that
  returns that argument

  var three = identityf(3);
  three(); // 3
*/
function identityf(x) {
  return function() {
    return x;
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
    return add(a, b);
  };
}

// ------------------------------------------------------------
/*
  Write a function liftf that
  takes a binary function, and
  makes it callable with two
  invocations

  var addf = liftf(add);
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
  Write a function curry that
  takes a binary function and
  an argument, and returns a
  function that can take a
  second argument

  var add3 = curry(add, 3);
  add3(4); // 7

  curry(mul, 5)(6); // 30
*/
function curry(binary, a) {
  return function(b) {
    return binary(a, b);
  };
}

// Other possibility
// function curry(binary, a) {
//   return liftf(binary)(a);
// }

// ------------------------------------------------------------
/*
  Without writting any new functions,
  show three ways to create the inc
  function

  var inc = _ _ _ :

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
  Write a function twice that
  takes a binary function and
  returns a unary function that
  passes its argument to the
  binary function twice

  var doubl = twice(add);
  doubl(11) // 22

  var square = twice(mul);
  square(11) // 121
*/

function twice(binary) {
  return function(x) {
    return binary(x, x)
  };
}

// ------------------------------------------------------------
/*
  Write a function reverse that
  reverses the arguments of a
  binary function

  var bus = reverse(sub);
  bus(3, 2) // -1
*/

function reverse(binary) {
  return function(a, b) {
    return binary(b, a);
  };
}

// ------------------------------------------------------------
/*
  Write a function composeu that
  takes two unary functions and
  returns a unary function that
  calls them both

  composeu(doubl, square)(5) // 100
*/

function composeu(unary1, unary2) {
  return function(x) {
    return unary2(unary1(x));
  };
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
  Write a function limit that
  allows a binary function to
  be called a limited numbers
  of times

  var addLimited = limit(add, 1);
  addLimited(3, 4) // 7
  addLimited(3, 5) // undefined
*/

function limit(binary, lmt) {
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
  Write a function genFrom that
  produces a generator that will
  produces a series of values

  var index = genFrom(0);

  index() // 0
  index() // 1
  index() // 2
*/

function genFrom(x) {
  return function() {
    var next = x;
    x += 1;
    return next;
  };
}

// ------------------------------------------------------------
/*
  Write a function genTo that
  takes a generator and an end
  limit, and returns a generator
  that will produce numbers up
  to that limit

  var index = genTo(genFrom(1), 3);

  index() // 1
  index() // 2
  index() // undefined
*/

function genTo(gen, lmt) {
  return function(x) {
    var next = gen(x);
    if (next < lmt) {
      return next;
    }
    return undefined; // be explicit
  };
}

// ------------------------------------------------------------
/*
  Write a function genFromTo that
  produces a generator that will
  produce values in a range

  var index = genFromTo(0, 3);
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
  Write a function element that
  takes an array and a generator
  and returns a generator that will
  produce elements from the array

  var ele = element([
    'a', 'b', 'c', 'd'
  ], genFromTo(1, 3));

  ele() // 'b'
  ele() // 'c'
  ele() // undefined
*/

function element(array, gen) {
  return function() {
    var index = gen();
    return index !== undefined ? array[index] : undefined;
  };
}

// ------------------------------------------------------------
/*
  Write a function element2 that is a
  modified element function so that
  the generator argument is optional.
  If a generator is not provided, then
  each of the elements of the array
  will be produced.

  var ele = element2([
    'a', 'b', 'c', 'd'
  ]);

  ele() // 'a'
  ele() // 'b'
  ele() // 'c'
  ele() // 'd'
  ele() // undefined
*/
function element2(array, gen) {
  if (typeof gen !== 'function') {
    gen = genFromTo(0, array.length);
  }
  return function() {
    var index = gen();
    return index !== undefined ? array[index] : undefined;
  };
}

// ------------------------------------------------------------
/*
  Write a function collect that takes a
  generator and an array and produces
  a function that will collect the results
  in the array

  var array = [];
  var col = collect(genFromTo(0, 2), array);

  col() // 0
  col() // 1
  col() // undefined
  array // [0, 1]
*/

function collect(gen, array) {
  return function() {
    var next = gen();
    if (next !== undefined) {
      array.push(next);
    }
    return next;
  };
}

// ------------------------------------------------------------
/*
  Write a function filter that takes a
  generator and a predicate and produces
  a generator that produces only the
  values approved by the predicate

  var third = function(val) {
    return val % 3 === 0;
  }
  var fil = filter(genFromTo(0, 5), third);

  fill() // 0
  fill() // 3
  fill() // undefined
*/

function filter(gen, predicate) {
  return function() {
    var next;
    do {
      next = gen();
    } while (next !== undefined && !predicate(next));
    return next;
  };
}

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

function concat(gen1, gen2) {
  return function() {
    var next = gen1();
    if (next === undefined) {
      next = gen2();
    }
    return next;
  };
}

// ------------------------------------------------------------
/*
  Write a function gensymf that
  makes a function that generates
  unique symbols

  var genG = gensymf('G');
  var genH = gensymf('H');

  genG() // 'G1'
  genH() // 'H1'
  genG() // 'G2'
  genH() // 'H2'
*/

function gensymf(symbol) {
  var index = genFrom(1);
  return function() {
    return symbol + index();
  };
}

// ------------------------------------------------------------
/*
  Write a function gensymff that
  takes a unary function and a
  seed and returns a gensymf

  var gensymf = gensymff(inc, 0);
  var genG = gensymf('G');
  var genH = gensymf('H');

  genG() // 'G1'
  genH() // 'H1'
  genG() // 'G2'
  genH() // 'H2'
*/

function gensymff(unary, seed) {
  return function(symbol) {
    var index = seed;
    return function() {
      index = unary(index);
      return symbol + index;
    }
  };
}

// ------------------------------------------------------------
/*
  Write a function fibonaccif that
  returns a generator that will
  return the next fibonacci number

  var fib = fibonaccif(0, 1);
  fib() // 0
  fib() // 1
  fib() // 2
  fib() // 3
  fib() // 5
  fib() // 8
*/

function fibonaccif(first, second) {
  var firstUsed = false;
  var secondUsed = false;
  return function() {

    if (!firstUsed) {
      firstUsed = true;
      return first;
    }

    if (!secondUsed) {
      secondUsed = true;
      return second;
    }

    var next = first + second;
    first = second;
    second = next;

    return next;
  };
}

function fibonaccif2(first, second) {
  var i = 0;
  return function() {
    var next;
    if (i === 0) {
      i = 1;
      return first;
    }
    if (i === 1) {
      i = 2;
      return second;
    }
    next = first + second;
    first = second;
    second = next;
    return next;
  };
}

function fibonaccif3(first, second) {
  var i = 0;
  return function() {
    var next;
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
    var next = first;
    first = second;
    second += next;
    return next;
  };
}

function fibonaccif5(first, second) {
  return concat(
    concat(
      limit(identityf(first), 1),
      limit(identityf(second), 1)
    ),
    function fibonacci() {
      var next = first + second;
      first = second;
      second = next;
      return next;
    }
  );
}

function fibonaccif6(first, second) {
  return concat(
    element2([ first, second ]),
    function fibonacci() {
      var next = first + second;
      first = second;
      second = next;
      return next;
    }
  );
}

// ------------------------------------------------------------
/*
  Write a function counter that
  returns an object containing
  two functions that implement
  an up/down counter, hiding
  the counter

  var obj = counter(10);
  var up = object.up;
  var down = object.down;

  up()   // 11
  down() // 10
  down() // 9
  up()   // 10
*/

function counter(i) {
  return {
    up: function() {
      i += 1;
      return i;
    },
    down: function() {
      i -= 1;
      return i;
    }
  };
}

// ------------------------------------------------------------
/*
  Write a function revocable that
  takes a binary function, and
  returns an object containing an
  invoke function that can invoke
  function that disables the
  invoke function

  var rev = revocable(add);

  rev.invoke(3, 4); // 7
  rev.revoke();
  rev.invoke(5, 7); // undefined
*/

function revocable(binary) {
  return {
    invoke(a, b) {
      return typeof binary === 'function' ? binary(a, b) : undefined;
    },
    revoke() {
      binary = undefined;
    }
  }
}

// ------------------------------------------------------------
/*
  Write a function m that
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
    value: value,
    source: typeof source === 'string' ? source : String(value)
  };
}

// ------------------------------------------------------------
/*
  Write a function addm that
  adds two m objects and
  returns an m object

  JSON.stringify(addm(m(3), m(4)))
  // '{"value":7,"source":"(3+4)"}'

  JSON.stringify(addm(m(1), m(Math.PI, "pi")))
  // '{"value":4.14159...,"source":"(1+pi)"}'
*/

function addm(m1, m2) {
  return m(
    m1.value + m2.value,
    '(' + m1.source + '+' + m2.source + ')'
  );
}

// ------------------------------------------------------------
/*
  Write a function liftm that
  takes a binary function and
  a string and returns a function
  that acts on m objects

  var addm = liftm(add, '+');

  JSON.stringify(addm(m(3), m(4)))
  // '{"value":7,"source":"(3+4)"}'

  JSON.stringify(liftm(mul, '*')(m(3), m(4)))
  // '{"value":12,"source":"(3*4)"}'
*/

function liftm(binary, op) {
  return function(m1, m2) {
    return m(
      binary(m1.value, m2.value),
      '(' + m1.source + op + m2.source + ')'
    );
  }
}

// ------------------------------------------------------------
/*
  Write a function liftm2 that
  is a modified function liftm
  that can accept arguments that
  are either numbers or m objects

  var addm = liftm(add, '+')

  JSON.stringify(addm(3, 4))
  // '{"value":7,"source":"(3+4)"}'
*/

function liftm2(binary, op) {
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
  Write a function exp that
  evaluates simple array
  expressions

  var sae = [mul, 5, 11];
  exp(sae) // 55
  exp(42) // 42
*/

function exp(value) {
  return (
    Array.isArray(value) ?
    value[0](value[1], value[2]) :
    value
  );
}

// ------------------------------------------------------------
/*
  Write a function exp2 that
  is a modified exp that can
  evaluate nested array
  expressions

  var nae = [
    Math.sqrt,
    [
      add,
      [square, 3],
      [square, 4]
    ]
  ];

  exp(nae) // sqrt(((3*3)+(4*4))) === 5
*/

function exp2(value) {
  return (
    Array.isArray(value)
      ? value[0](
        exp2(value[1]),
        exp2(value[2])
      )
      : value
  );
}

// ------------------------------------------------------------
/*
  Write a function addg that
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
  Write a function liftg that
  will take a binary function
  and apply it to many invocations

  liftg(mul)()             // undefined
  liftg(mul)(3)()          // 3
  liftg(mul)(3)(0)(4)()    // 0
  liftg(mul)(1)(2)(4)(8)() // 64
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
  Write a function arrayg that
  will build an array from many
  invocations

  arrayg()          // []
  arrayg(3)()       // [3]
  arrayg(3)(4)(5)() // [3, 4, 5]
*/

function arrayg(value) {
  var array = [];
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
  var array = [];
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
  Write a function continuize
  that takes a unary function
  and returns a function that
  takes a callback and an
  argument

  sqrtc = continuize(Math.sqrt);
  sqrtc(alert, 81); // 9
*/

function continuize(unary) {
  return function(cb, arg) {
    return cb(unary(arg));
  }
}

// ES6
// function continuize(any) {
//   return function(cb, ...x) {
//     return cb(any(...x));
//   }
// }
