function test(name, tests) {

  const resultWrapper = document.createElement('div');
  const testName = document.createElement('h3');
  testName.appendChild(document.createTextNode(name));
  resultWrapper.appendChild(testName);
  resultWrapper.className += ' test-wrapper';

  tests.forEach(({ result, expected, text }) => {

    let resultNode = document.createElement('div');
    resultNode.className += ' test';

    let resultClass;
    let resultHTML;

    if (result === expected) {
      resultHTML = text;
      resultClass = 'passed';
    } else {
      resultHTML = `
        <span>${text}</span>
        Expected <span class="label">${expected}</span>, got <span class="label">${result}</span>
      `;
      resultClass = 'failed';
    }

    resultNode.innerHTML = `<div class="result">${resultHTML}</div>`;
    resultNode.className += ` ${resultClass}`;

    resultWrapper.appendChild(resultNode);
  });

  document.body.appendChild(resultWrapper);
}

// identity
test('identity', [{
  result: identity(3),
  expected: 3,
  text: 'identity(3) === 3'
}]);

// add, sub, mul
test('add', [{
  result: add(3, 4),
  expected: 3 + 4,
  text: 'add(3, 4) === 3 + 4'
}]);
test('sub', [{
  result: sub(3, 4),
  expected: 3 - 4,
  text: 'sub(3, 4) === 3 - 4'
}]);
test('mul', [{
  result: mul(3, 4),
  expected: 3 * 4,
  text: 'mul(3, 4) === 3 * 4'
}]);

// identityf
test('identityf', [{
  result: identityf(3)(),
  expected: 3,
  text: 'identityf(3)() === 3'
}]);

// addf
test('addf', [{
  result: addf(3)(4),
  expected: 3 + 4,
  text: 'addf(3)(4) === 3 + 4'
}]);

// liftf
test('liftf', [{
  result: liftf(add)(3)(4),
  expected: 3 + 4,
  text: 'liftf(add)(3)(4) === 3 + 4'
}, {
  result: liftf(sub)(3)(4),
  expected: 3 - 4,
  text: 'liftf(sub)(3)(4) === 3 - 4'
}, {
  result: liftf(mul)(3)(4),
  expected: 3 * 4,
  text: 'liftf(mul)(3)(4) === 3 * 4'
}]);

// curry
test('curry', [{
  result: curry(add, 3)(4),
  expected: 3 + 4,
  text: 'curry(add, 3)(4) === 3 + 4'
}, {
  result: curry(sub, 3)(4),
  expected: 3 - 4,
  text: 'curry(sub, 3)(4) === 3 - 4'
}, {
  result: curry(mul, 3)(4),
  expected: 3 * 4,
  text: 'curry(mul, 3)(4) === 3 * 4'
}]);

// inc
test('inc1', [{
  result: inc1(5),
  expected: 5 + 1,
  text: 'inc1(5) === 5 + 1'
}, {
  result: inc1(inc1(5)),
  expected: 5 + 1 + 1,
  text: 'inc1(inc1(5)) === 5 + 1 + 1'
}]);

test('inc2', [{
  result: inc2(5),
  expected: 5 + 1,
  text: 'inc2(5) === 5 + 1'
}, {
  result: inc2(inc2(5)),
  expected: 5 + 1 + 1,
  text: 'inc2(inc2(5)) === 5 + 1 + 1'
}]);

test('inc3', [{
  result: inc3(5),
  expected: 5 + 1,
  text: 'inc3(5) === 5 + 1'
}, {
  result: inc3(inc3(5)),
  expected: 5 + 1 + 1,
  text: 'inc3(inc3(5)) === 5 + 1 + 1'
}]);

test('inc4', [{
  result: inc4(5),
  expected: 5 + 1,
  text: 'inc4(5) === 5 + 1'
}, {
  result: inc4(inc4(5)),
  expected: 5 + 1 + 1,
  text: 'inc4(inc4(5)) === 5 + 1 + 1'
}]);

// twice
test('twice', [{
  result: twice(add)(11),
  expected: 11 + 11,
  text: 'twice(add)(11) === 11 + 11'
}, {
  result: twice(sub)(11),
  expected: 11 - 11,
  text: 'twice(sub)(11) === 11 - 11'
}, {
  result: twice(mul)(11),
  expected: 11 * 11,
  text: 'twice(mul)(11) === 11 * 11'
}])

// reverse
test('reverse', [{
  result: reverse(sub)(3, 2),
  expected: 2 - 3,
  text: 'reverse(sub)(3, 2) === 2 - 3'
}]);

// composeu
test('composeu', [{
  result: composeu(twice(add), twice(mul))(5),
  expected: (5 + 5) * (5 + 5),
  text: 'composeu(doubl, square)(5) === (5 + 5) * (5 + 5)'
}]);

// composeb
test('composeb', [{
  result: composeb(add, mul)(2, 3, 7),
  expected: (2 + 3) * 7,
  text: 'composeb(add, mul)(2, 3, 7) === (2 + 3) * 7'
}]);

// limit
var addLimited = limit(add, 1);
test('limit', [{
  result: addLimited(3, 4),
  expected: 3 + 4,
  text: 'first call: addLimited(3, 4) === 3 + 4'
}, {
  result: addLimited(3, 4),
  expected: undefined,
  text: 'second call: addLimited(3, 4) === undefined'
}]);

// genFrom
var index = genFrom(0);
test('genFrom', [{
  result: index(),
  expected: 0,
  text: 'first call: genFrom(0) === 0'
}, {
  result: index(),
  expected: 1,
  text: 'second call: genFrom(0) === 1'
}, {
  result: index(),
  expected: 2,
  text: 'third call: genFrom(0) === 2'
}]);

// genTo
var index = genTo(genFrom(1), 3);
test('genTo', [{
  result: index(),
  expected: 1,
  text: 'first call: genTo(genFrom(1), 3) === 1'
}, {
  result: index(),
  expected: 2,
  text: 'second call: genTo(genFrom(1), 3) === 2'
}, {
  result: index(),
  expected: undefined,
  text: 'third call: genTo(genFrom(1), 3) === undefined'
}]);

// genFromTo
var index = genFromTo(0, 3);
test('genFromTo', [{
  result: index(),
  expected: 0,
  text: 'first call: genFromTo(0, 3) === 0'
}, {
  result: index(),
  expected: 1,
  text: 'second call: genFromTo(0, 3) === 1'
}, {
  result: index(),
  expected: 2,
  text: 'third call: genFromTo(0, 3) === 2'
}, {
  result: index(),
  expected: undefined,
  text: 'fourth call: genFromTo(0, 3) === undefined'
}]);

// element with a generator
var ele = element([
  'a', 'b', 'c', 'd'
], genFromTo(1, 3));
test('element', [{
  result: ele(),
  expected: 'b',
  text: "first call: element(['a', 'b', 'c', 'd'], genFromTo(1, 3)) === 'b'"
}, {
  result: ele(),
  expected: 'c',
  text: "second call: element(['a', 'b', 'c', 'd'], genFromTo(1, 3)) === 'c'"
}, {
  result: ele(),
  expected: undefined,
  text: "third call: element(['a', 'b', 'c', 'd'], genFromTo(1, 3)) === undefined"
}]);

// element2
var ele = element2([
  'a', 'b', 'c', 'd'
]);
test('element2', [{
  result: ele(),
  expected: 'a',
  text: "first call: element2(['a', 'b', 'c', 'd']) === 'a'"
}, {
  result: ele(),
  expected: 'b',
  text: "second call: element2(['a', 'b', 'c', 'd']) === 'b'"
}, {
  result: ele(),
  expected: 'c',
  text: "third call: element2(['a', 'b', 'c', 'd']) === 'c'"
}, {
  result: ele(),
  expected: 'd',
  text: "fourth call: element2(['a', 'b', 'c', 'd']) === 'd'"
}, {
  result: ele(),
  expected: undefined,
  text: "fifth call: element2(['a', 'b', 'c', 'd']) === undefined"
}]);

// collect
var array = [];
var col = collect(genFromTo(0, 2), array);

test('collect', [{
  result: col(),
  expected: 0,
  text: "first call: collect(genFromTo(0, 2), array) === 0"
}, {
  result: array[0],
  expected: 0,
  text: "first call: collect(genFromTo(0, 2), array) === array[0] === 0"
}, {
  result: col(),
  expected: 1,
  text: "second call: collect(genFromTo(0, 2), array) === 1"
}, {
  result: array[1],
  expected: 1,
  text: "second call: collect(genFromTo(0, 2), array) === array[1] === 1"
}, {
  result: col(),
  expected: undefined,
  text: "third call: collect(genFromTo(0, 2), array) === undefined"
}]);

// filter
var third = function(val) {
  return val % 3 === 0;
}
var fil = filter(genFromTo(0, 5), third);

test('filter', [{
  result: fil(),
  expected: 0,
  text: "first call: filter(genFromTo(0, 5), third) === 0"
}, {
  result: fil(),
  expected: 3,
  text: "second call: filter(genFromTo(0, 5), third) === 3"
}, {
  result: fil(),
  expected: undefined,
  text: "third call: filter(genFromTo(0, 5), third) === undefined"
}]);

// concat
var con = concat(genFromTo(0, 3), genFromTo(0, 2));

test('concat', [{
  result: con(),
  expected: 0,
  text: 'first call: concat(genFromTo(0, 3), genFromTo(0, 2)) === 0'
}, {
  result: con(),
  expected: 1,
  text: 'second call: concat(genFromTo(0, 3), genFromTo(0, 2)) === 1'
}, {
  result: con(),
  expected: 2,
  text: 'third call: concat(genFromTo(0, 3), genFromTo(0, 2)) === 2'
}, {
  result: con(),
  expected: 0,
  text: 'fourth call: concat(genFromTo(0, 3), genFromTo(0, 2)) === 0'
}, {
  result: con(),
  expected: 1,
  text: 'fifth call: concat(genFromTo(0, 3), genFromTo(0, 2)) === 1'
}, {
  result: con(),
  expected: undefined,
  text: 'sixth call: concat(genFromTo(0, 3), genFromTo(0, 2)) === undefined'
}]);

// gensymf
var genG = gensymf('G');
var genH = gensymf('H');

test('gensymf', [{
  result: genG(),
  expected: 'G1',
  text: "first call gensymf('G') === 'G1'"
}, {
  result: genG(),
  expected: 'G2',
  text: "second call gensymf('G') === 'G2'"
}, {
  result: genH(),
  expected: 'H1',
  text: "first call gensymf('H') === 'H1'"
}, {
  result: genH(),
  expected: 'H2',
  text: "second call gensymf('H') === 'H2'"
}]);

// gensymff
var gensymf2 = gensymff(inc1, 0);
var genGG = gensymf2('GG');
var genHH = gensymf2('HH');

test('gensymff', [{
  result: genGG(),
  expected: 'GG1',
  text: "first call gensymff(inc, 0)('GG') === 'GG1'"
}, {
  result: genGG(),
  expected: 'GG2',
  text: "second call gensymff(inc, 0)('GG') === 'GG2'"
}, {
  result: genHH(),
  expected: 'HH1',
  text: "first call gensymff(inc, 0)('HH') === 'HH1'"
}, {
  result: genHH(),
  expected: 'HH2',
  text: "second call gensymff(inc, 0)('HH') === 'HH2'"
}]);

// fibonaccif1
var fib = fibonaccif1(0, 1);
test('fibonaccif1', [{
  result: fib(),
  expected: 0,
  text: 'first call: fibonaccif1(0, 1) === 0'
}, {
  result: fib(),
  expected: 1,
  text: 'second call: fibonaccif1(0, 1) === 1'
}, {
  result: fib(),
  expected: 1,
  text: 'third call: fibonaccif1(0, 1) === 1'
}, {
  result: fib(),
  expected: 2,
  text: 'fourth call: fibonaccif1(0, 1) === 2'
}, {
  result: fib(),
  expected: 3,
  text: 'fifth call: fibonaccif1(0, 1) === 3'
}, {
  result: fib(),
  expected: 5,
  text: 'sixth call: fibonaccif1(0, 1) === 5'
}]);

// fibonaccif2
var fib = fibonaccif2(0, 1);
test('fibonaccif2', [{
  result: fib(),
  expected: 0,
  text: 'first call: fibonaccif2(0, 1) === 0'
}, {
  result: fib(),
  expected: 1,
  text: 'second call: fibonaccif2(0, 1) === 1'
}, {
  result: fib(),
  expected: 1,
  text: 'third call: fibonaccif2(0, 1) === 1'
}, {
  result: fib(),
  expected: 2,
  text: 'fourth call: fibonaccif2(0, 1) === 2'
}, {
  result: fib(),
  expected: 3,
  text: 'fifth call: fibonaccif2(0, 1) === 3'
}, {
  result: fib(),
  expected: 5,
  text: 'sixth call: fibonaccif2(0, 1) === 5'
}]);

// fibonaccif3
var fib = fibonaccif3(0, 1);
test('fibonaccif3', [{
  result: fib(),
  expected: 0,
  text: 'first call: fibonaccif3(0, 1) === 0'
}, {
  result: fib(),
  expected: 1,
  text: 'second call: fibonaccif3(0, 1) === 1'
}, {
  result: fib(),
  expected: 1,
  text: 'third call: fibonaccif3(0, 1) === 1'
}, {
  result: fib(),
  expected: 2,
  text: 'fourth call: fibonaccif3(0, 1) === 2'
}, {
  result: fib(),
  expected: 3,
  text: 'fifth call: fibonaccif3(0, 1) === 3'
}, {
  result: fib(),
  expected: 5,
  text: 'sixth call: fibonaccif3(0, 1) === 5'
}]);

// fibonaccif4
var fib = fibonaccif4(0, 1);
test('fibonaccif4', [{
  result: fib(),
  expected: 0,
  text: 'first call: fibonaccif4(0, 1) === 0'
}, {
  result: fib(),
  expected: 1,
  text: 'second call: fibonaccif4(0, 1) === 1'
}, {
  result: fib(),
  expected: 1,
  text: 'third call: fibonaccif4(0, 1) === 1'
}, {
  result: fib(),
  expected: 2,
  text: 'fourth call: fibonaccif4(0, 1) === 2'
}, {
  result: fib(),
  expected: 3,
  text: 'fifth call: fibonaccif4(0, 1) === 3'
}, {
  result: fib(),
  expected: 5,
  text: 'sixth call: fibonaccif4(0, 1) === 5'
}]);

// fibonaccif5
var fib = fibonaccif5(0, 1);
test('fibonaccif5', [{
  result: fib(),
  expected: 0,
  text: 'first call: fibonaccif5(0, 1) === 0'
}, {
  result: fib(),
  expected: 1,
  text: 'second call: fibonaccif5(0, 1) === 1'
}, {
  result: fib(),
  expected: 1,
  text: 'third call: fibonaccif5(0, 1) === 1'
}, {
  result: fib(),
  expected: 2,
  text: 'fourth call: fibonaccif5(0, 1) === 2'
}, {
  result: fib(),
  expected: 3,
  text: 'fifth call: fibonaccif5(0, 1) === 3'
}, {
  result: fib(),
  expected: 5,
  text: 'sixth call: fibonaccif5(0, 1) === 5'
}]);

// fibonaccif6
var fib = fibonaccif6(0, 1);
test('fibonaccif6', [{
  result: fib(),
  expected: 0,
  text: 'first call: fibonaccif6(0, 1) === 0'
}, {
  result: fib(),
  expected: 1,
  text: 'second call: fibonaccif6(0, 1) === 1'
}, {
  result: fib(),
  expected: 1,
  text: 'third call: fibonaccif6(0, 1) === 1'
}, {
  result: fib(),
  expected: 2,
  text: 'fourth call: fibonaccif6(0, 1) === 2'
}, {
  result: fib(),
  expected: 3,
  text: 'fifth call: fibonaccif6(0, 1) === 3'
}, {
  result: fib(),
  expected: 5,
  text: 'sixth call: fibonaccif6(0, 1) === 5'
}]);
