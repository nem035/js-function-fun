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
  text: 'identity(3) === ',
}]);

// addBinary, subBinary, mul
test('addBinary', [{
  result: addBinary(1, 2),
  expected: 1 + 2,
  text: 'addBinary(1, 2) === ' + (1 + 2),
}]);
test('subBinary', [{
  result: subBinary(1, 2),
  expected: 1 - 2,
  text: 'subBinary(1, 2) === ' + (1 - 2),
}]);
test('mulBinary', [{
  result: mulBinary(1, 2),
  expected: 1 * 2,
  text: 'mulBinary(1, 2) === ' + (1 * 2),
}]);

// add, sub, mul
test('add', [{
  result: add(1, 2, 4),
  expected: 1 + 2 + 4,
  text: 'add(1, 2, 4) === ' + (1 + 2 + 4),
}]);
test('sub', [{
  result: sub(1, 2, 4),
  expected: 1 - 2 - 4,
  text: 'sub(1, 2, 4) === ' + (1 - 2 - 4),
}]);
test('mul', [{
  result: mul(1, 2, 4),
  expected: 1 * 2 * 4,
  text: 'mul(1, 2, 4) === ' + (1 * 2 * 4),
}]);

// addTail, mulTail
test('addTail', [{
  result: addTail(1, 2, 4),
  expected: 1 + 2 + 4,
  text: 'addTail(1, 2, 4) === ' + (1 + 2 + 4),
}]);
test('mulTail', [{
  result: mulTail(1, 2, 4),
  expected: 1 * 2 * 4,
  text: 'mulTail(1, 2, 4) === ' + (1 * 2 * 4),
}]);

// acc
test('acc', [{
  result: acc((a, b) => a + b, 0)(1, 2, 4),
  expected: 1 + 2 + 4,
  text: 'acc((a, b) => a + b, 0)(1, 2, 4) === ' + (1 + 2 + 4),
}, {
  result: acc((a, b) => a * b, 1)(1, 2, 4),
  expected: 1 * 2 * 4,
  text: 'acc((a, b) => a * b, 1)(1, 2, 4) === ' + (1 * 2 * 4),
}]);

// accTail
test('accTail', [{
  result: accTail((a, b) => a + b, 0)(1, 2, 4),
  expected: 1 + 2 + 4,
  text: 'accTail((a, b) => a + b, 0)(1, 2, 4) === ' + (1 + 2 + 4),
}, {
  result: accTail((a, b) => a * b, 1)(1, 2, 4),
  expected: 1 * 2 * 4,
  text: 'accTail((a, b) => a * b, 1)(1, 2, 4) === ' + (1 * 2 * 4),
}]);

// identityf
test('identityf', [{
  result: identityf(3)(),
  expected: 3,
  text: 'identityf(3)() === ' + 3,
}]);

// addf
test('addf', [{
  result: addf(3)(4),
  expected: 3 + 4,
  text: 'addf(3)(4) === ' + (3 + 4),
}]);

// liftf
test('liftf', [{
  result: liftf(add)(3)(4),
  expected: 3 + 4,
  text: 'liftf(add)(3)(4) === ' + (3 + 4),
}, {
  result: liftf(sub)(3)(4),
  expected: 3 - 4,
  text: 'liftf(sub)(3)(4) === ' + (3 - 4),
}, {
  result: liftf(mul)(3)(4),
  expected: 3 * 4,
  text: 'liftf(mul)(3)(4) === ' + (3 * 4),
}]);

// pure
test('pure', [{
  result: pure(20, 5)[0],
  expected: 6,
  text: 'pure(20, 5)[0] === ' + pure(20, 5)[0]
}, {
  result: pure(20, 5)[1],
  expected: 120,
  text: 'pure(20, 5)[1] === ' + pure(20, 5)[1]
}, {
  result: pure(25, 6)[0],
  expected: 7,
  text: 'pure(25, 6)[0] === ' + pure(25, 6)[0]
}, {
  result: pure(25, 6)[1],
  expected: 175,
  text: 'pure(25, 6)[1] === ' + pure(25, 6)[1]
}]);

// curryBinary
test('curryBinary', [{
  result: curryBinary(add, 3)(4),
  expected: 3 + 4,
  text: 'curryBinary(add, 3)(4) === ' + (3 + 4),
}, {
  result: curryBinary(sub, 3)(4),
  expected: 3 - 4,
  text: 'curryBinary(sub, 3)(4) === ' + (3 - 4),
}, {
  result: curryBinary(mul, 3)(4),
  expected: 3 * 4,
  text: 'curryBinary(mul, 3)(4) === ' + (3 * 4),
}]);

// curry
test('curry', [{
  result: curry(add, 1, 2, 4)(4, 2, 1),
  expected: 1 + 2 + 4 + 4 + 2 + 1,
  text: 'curry(add, 1, 2, 4)(4, 2, 1) === ' + (1 + 2 + 4 + 4 + 2 + 1),
}, {
  result: curry(sub, 1, 2, 4)(4, 2, 1),
  expected: 1 - 2 - 4 - 4 - 2 - 1,
  text: 'curry(sub, 1, 2, 4)(4, 2, 1) === ' + (1 - 2 - 4 - 4 - 2 - 1),
}, {
  result: curry(mul, 1, 2, 4)(4, 2, 1),
  expected: 1 * 2 * 4 * 4 * 2 * 1,
  text: 'curry(mul, 1, 2, 4)(4, 2, 1) === ' + (1 * 2 * 4 * 4 * 2 * 1),
}]);

// inc
test('inc', [{
  result: inc(5),
  expected: 5 + 1,
  text: 'inc(5) === 5 + 1',
}, {
  result: inc(inc(5)),
  expected: 5 + 1 + 1,
  text: 'inc(inc(5)) === 5 + 1 + 1',
}]);

test('inc2', [{
  result: inc2(5),
  expected: 5 + 1,
  text: 'inc2(5) === 5 + 1',
}, {
  result: inc2(inc2(5)),
  expected: 5 + 1 + 1,
  text: 'inc2(inc2(5)) === 5 + 1 + 1',
}]);

test('inc3', [{
  result: inc3(5),
  expected: 5 + 1,
  text: 'inc3(5) === 5 + 1',
}, {
  result: inc3(inc3(5)),
  expected: 5 + 1 + 1,
  text: 'inc3(inc3(5)) === 5 + 1 + 1',
}]);

test('inc4', [{
  result: inc4(5),
  expected: 5 + 1,
  text: 'inc4(5) === 5 + 1',
}, {
  result: inc4(inc4(5)),
  expected: 5 + 1 + 1,
  text: 'inc4(inc4(5)) === 5 + 1 + 1',
}]);

// twiceUnary
test('twiceUnary', [{
  result: twiceUnary(add)(11),
  expected: 11 + 11,
  text: 'twiceUnary(add)(11) === ' + (11 + 11),
}, {
  result: twiceUnary(sub)(11),
  expected: 11 - 11,
  text: 'twiceUnary(sub)(11) === ' + (11 - 11)
}, {
  result: twiceUnary(mul)(11),
  expected: 11 * 11,
  text: 'twiceUnary(mul)(11) === ' + (11 * 11)
}]);

// doubl, square
test('doubl', [{
  result: doubl(3),
  expected: 3 + 3,
  text: 'doubl(3) === ' + (3 + 3)
}]);
test('square', [{
  result: square(3),
  expected: 3 * 3,
  text: 'square(3) === ' + (3 * 3)
}]);

// twice
test('twice', [{
  result: twice(add)(1, 2, 4),
  expected: 1 + 2 + 4 + 1 + 2 + 4,
  text: 'twice(add)(1, 2, 4) === ' + (1 + 2 + 4 + 1 + 2 + 4)
}, {
  result: twice(sub)(1, 2, 4),
  expected: 1 - 2 - 4 - 1 - 2 - 4,
  text: 'twice(sub)(1, 2, 4) === ' + (1 - 2 - 4 - 1 - 2 - 4)
}, {
  result: twice(mul)(1, 2, 4),
  expected: 1 * 2 * 4 * 1 * 2 * 4,
  text: 'twice(mul)(1, 2, 4) === ' + (1 * 2 * 4 * 1 * 2 * 4)
}]);

// reverseBinary
test('reverseBinary', [{
  result: reverseBinary(subBinary)(3, 2),
  expected: 2 - 3,
  text: 'reverseBinary(subBinary)(3, 2) === ' + (2 - 3)
}]);

// reverse
test('reverse', [{
  result: reverse(sub)(1, 2, 4),
  expected: 4 - 2 - 1,
  text: 'reverse(sub)(1, 2, 4) === ' + (4 - 2 - 1)
}]);

// composeuTwo
test('composeuTwo', [{
  result: composeuTwo(doubl, square)(5),
  expected: (5 + 5) * (5 + 5),
  text: 'composeuTwo(doubl, square)(5) === ' + ((5 + 5) * (5 + 5))
}]);

// composeu
test('composeu', [{
  result: composeu(doubl, square, identity, curry(add, 1, 2))(5),
  expected: (5 + 5) * (5 + 5) + 1 + 2,
  text: 'composeu(doubl, square, identity, curry(add, 1, 2))(5) === ' + ((5 + 5) * (5 + 5) + 1 + 2)
}]);

// composeb
test('composeb', [{
  result: composeb(add, mul)(2, 3, 7),
  expected: (2 + 3) * 7,
  text: 'composeb(add, mul)(2, 3, 7) === ' + ((2 + 3) * 7)
}]);

// limitBinary
let addLmtBinary = limitBinary(add, 1);
test('limitBinary', [{
  result: addLmtBinary(3, 4),
  expected: 3 + 4,
  text: 'first call: addLmtBinary(3, 4) === ' + (3 + 4)
}, {
  result: addLmtBinary(3, 4),
  expected: undefined,
  text: 'second call: addLmtBinary(3, 4) === ' + undefined
}]);

// limit
let addLmt = limit(add, 1);
test('limit', [{
  result: addLmt(1, 2, 4),
  expected: 1 + 2 + 4,
  text: 'first call: addLmt(1, 2, 4) === ' + (1 + 2 + 4)
}, {
  result: addLmt(1, 2, 4),
  expected: undefined,
  text: 'second call: addLmt(1, 2, 4) === ' + undefined
}]);

// genFrom
let indexFrom = genFrom(0);
test('genFrom', [{
  result: indexFrom(),
  expected: 0,
  text: 'first call: genFrom(0) === ' + 0
}, {
  result: indexFrom(),
  expected: 1,
  text: 'second call: genFrom(0) === ' + 1
}, {
  result: indexFrom(),
  expected: 2,
  text: 'third call: genFrom(0) === ' + 2
}]);

// genTo
let indexTo = genTo(genFrom(1), 3);
test('genTo', [{
  result: indexTo(),
  expected: 1,
  text: 'first call: genTo(genFrom(1), 3) === ' + 1
}, {
  result: indexTo(),
  expected: 2,
  text: 'second call: genTo(genFrom(1), 3) === ' + 2
}, {
  result: indexTo(),
  expected: undefined,
  text: 'third call: genTo(genFrom(1), 3) === ' + undefined
}]);

// genFromTo
let indexFromTo = genFromTo(0, 3);
test('genFromTo', [{
  result: indexFromTo(),
  expected: 0,
  text: 'first call: genFromTo(0, 3) === ' + 0
}, {
  result: indexFromTo(),
  expected: 1,
  text: 'second call: genFromTo(0, 3) === ' + 1
}, {
  result: indexFromTo(),
  expected: 2,
  text: 'third call: genFromTo(0, 3) === ' + 2
}, {
  result: indexFromTo(),
  expected: undefined,
  text: 'fourth call: genFromTo(0, 3) === ' + undefined
}]);

// elementGen
let eleGen = elementGen([
  'a', 'b', 'c', 'd'
], genFromTo(1, 3));
test('elementGen', [{
  result: eleGen(),
  expected: 'b',
  text: "first call: elementGen(['a', 'b', 'c', 'd'], genFromTo(1, 3)) === " + 'b'
}, {
  result: eleGen(),
  expected: 'c',
  text: "second call: elementGen(['a', 'b', 'c', 'd'], genFromTo(1, 3)) === " + 'c'
}, {
  result: eleGen(),
  expected: undefined,
  text: "third call: elementGen(['a', 'b', 'c', 'd'], genFromTo(1, 3)) === " + undefined
}]);

// element
let ele = element([
  'a', 'b', 'c', 'd'
]);
test('element', [{
  result: ele(),
  expected: 'a',
  text: "first call: element(['a', 'b', 'c', 'd']) === " + 'a'
}, {
  result: ele(),
  expected: 'b',
  text: "second call: element(['a', 'b', 'c', 'd']) === " + 'b'
}, {
  result: ele(),
  expected: 'c',
  text: "third call: element(['a', 'b', 'c', 'd']) === " + 'c'
}, {
  result: ele(),
  expected: 'd',
  text: "fourth call: element(['a', 'b', 'c', 'd']) === " + 'd'
}, {
  result: ele(),
  expected: undefined,
  text: "fifth call: element(['a', 'b', 'c', 'd']) === " + undefined
}]);

// collect
let array = [];
let col = collect(genFromTo(0, 2), array);
test('collect', [{
  result: col(),
  expected: 0,
  text: "first call: collect(genFromTo(0, 2), array) === " + 0
}, {
  result: array[0],
  expected: 0,
  text: "first call: collect(genFromTo(0, 2), array) -> array[0] === " + 0
}, {
  result: col(),
  expected: 1,
  text: "second call: collect(genFromTo(0, 2), array) === " + 1
}, {
  result: array[1],
  expected: 1,
  text: "second call: collect(genFromTo(0, 2), array) -> array[1] === " + 1
}, {
  result: col(),
  expected: undefined,
  text: "third call: collect(genFromTo(0, 2), array) === " + undefined
}]);

// filter, filterTail
let third = val => val % 3 === 0;

let fil = filter(genFromTo(0, 5), third);
test('filter', [{
  result: fil(),
  expected: 0,
  text: "first call: filter(genFromTo(0, 5), third) === " + 0
}, {
  result: fil(),
  expected: 3,
  text: "second call: filter(genFromTo(0, 5), third) === " + 3
}, {
  result: fil(),
  expected: undefined,
  text: "third call: filter(genFromTo(0, 5), third) === " + undefined
}]);


let filTail = filterTail(genFromTo(0, 5), third);
test('filterTail', [{
  result: filTail(),
  expected: 0,
  text: "first call: filterTail(genFromTo(0, 5), third) === " + 0
}, {
  result: filTail(),
  expected: 3,
  text: "second call: filterTail(genFromTo(0, 5), third) === " + 3
}, {
  result: filTail(),
  expected: undefined,
  text: "third call: filterTail(genFromTo(0, 5), third) === " + undefined
}]);

// concatTwo
let conTwo = concatTwo(genFromTo(0, 3), genFromTo(0, 2));
test('concatTwo', [{
  result: conTwo(),
  expected: 0,
  text: 'first call: concatTwo(genFromTo(0, 3), genFromTo(0, 2)) === ' + 0
}, {
  result: conTwo(),
  expected: 1,
  text: 'second call: concatTwo(genFromTo(0, 3), genFromTo(0, 2)) === ' + 1
}, {
  result: conTwo(),
  expected: 2,
  text: 'third call: concatTwo(genFromTo(0, 3), genFromTo(0, 2)) === ' + 2
}, {
  result: conTwo(),
  expected: 0,
  text: 'fourth call: concatTwo(genFromTo(0, 3), genFromTo(0, 2)) === ' + 0
}, {
  result: conTwo(),
  expected: 1,
  text: 'fifth call: concatTwo(genFromTo(0, 3), genFromTo(0, 2)) === ' + 1
}, {
  result: conTwo(),
  expected: undefined,
  text: 'sixth call: concatTwo(genFromTo(0, 3), genFromTo(0, 2)) === ' + undefined
}]);

// concat
let con = concat(genFromTo(0, 3), genFromTo(0, 2), genFromTo(5, 7));
test('concat', [{
  result: con(),
  expected: 0,
  text: 'first call: concat(genFromTo(0, 3), genFromTo(0, 2), genFromTo(5, 7)) === ' + 0
}, {
  result: con(),
  expected: 1,
  text: 'second call: concat(genFromTo(0, 3), genFromTo(0, 2), genFromTo(5, 7)) === ' + 1
}, {
  result: con(),
  expected: 2,
  text: 'third call: concat(genFromTo(0, 3), genFromTo(0, 2), genFromTo(5, 7)) === ' + 2
}, {
  result: con(),
  expected: 0,
  text: 'fourth call: concat(genFromTo(0, 3), genFromTo(0, 2), genFromTo(5, 7)) === ' + 0
}, {
  result: con(),
  expected: 1,
  text: 'fifth call: concat(genFromTo(0, 3), genFromTo(0, 2), genFromTo(5, 7)) === ' + 1
}, {
  result: con(),
  expected: 5,
  text: 'sixth call: concat(genFromTo(0, 3), genFromTo(0, 2), genFromTo(5, 7)) === ' + 5
}, {
  result: con(),
  expected: 6,
  text: 'seventh call: concat(genFromTo(0, 3), genFromTo(0, 2), genFromTo(5, 7)) === ' + 6
}, {
  result: con(),
  expected: undefined,
  text: 'eight call: concat(genFromTo(0, 3), genFromTo(0, 2), genFromTo(5, 7)) === ' + undefined
}]);

// concatTail
let conTail = concatTail(genFromTo(0, 3), genFromTo(0, 2));
test('concatTail', [{
  result: conTail(),
  expected: 0,
  text: 'first call: concatTail(genFromTo(0, 3), genFromTo(0, 2)) === ' + 0
}, {
  result: conTail(),
  expected: 1,
  text: 'second call: concatTail(genFromTo(0, 3), genFromTo(0, 2)) === ' + 1
}, {
  result: conTail(),
  expected: 2,
  text: 'third call: concatTail(genFromTo(0, 3), genFromTo(0, 2)) === ' + 2
}, {
  result: conTail(),
  expected: 0,
  text: 'fourth call: concatTail(genFromTo(0, 3), genFromTo(0, 2)) === ' + 0
}, {
  result: conTail(),
  expected: 1,
  text: 'fifth call: concatTail(genFromTo(0, 3), genFromTo(0, 2)) === ' + 1
}, {
  result: conTail(),
  expected: undefined,
  text: 'sixth call: concatTail(genFromTo(0, 3), genFromTo(0, 2)) === ' + undefined
}]);

// gensymf
let genG = gensymf('G');
let genH = gensymf('H');
test('gensymf', [{
  result: genG(),
  expected: 'G1',
  text: "first call gensymf('G') === " + 'G1'
}, {
  result: genG(),
  expected: 'G2',
  text: "second call gensymf('G') === " + 'G2'
}, {
  result: genH(),
  expected: 'H1',
  text: "first call gensymf('H') === " + 'H1'
}, {
  result: genH(),
  expected: 'H2',
  text: "second call gensymf('H') === " + 'H2'
}]);

// gensymff
let gensymfFunc = gensymff(inc, 0);
let genGG = gensymfFunc('GG');
let genHH = gensymfFunc('HH');
test('gensymff', [{
  result: genGG(),
  expected: 'GG1',
  text: "first call gensymff(inc, 0)('GG') === " + 'GG1'
}, {
  result: genGG(),
  expected: 'GG2',
  text: "second call gensymff(inc, 0)('GG') === " + 'GG2'
}, {
  result: genHH(),
  expected: 'HH1',
  text: "first call gensymff(inc, 0)('HH') === " + 'HH1'
}, {
  result: genHH(),
  expected: 'HH2',
  text: "second call gensymff(inc, 0)('HH') === " + 'HH2'
}]);

// fibonaccif
let fib = fibonaccif(0, 1);
test('fibonaccif', [{
  result: fib(),
  expected: 0,
  text: 'first call: fibonaccif(0, 1) === 0'
}, {
  result: fib(),
  expected: 1,
  text: 'second call: fibonaccif(0, 1) === 1'
}, {
  result: fib(),
  expected: 1,
  text: 'third call: fibonaccif(0, 1) === 1'
}, {
  result: fib(),
  expected: 2,
  text: 'fourth call: fibonaccif(0, 1) === 2'
}, {
  result: fib(),
  expected: 3,
  text: 'fifth call: fibonaccif(0, 1) === 3'
}, {
  result: fib(),
  expected: 5,
  text: 'sixth call: fibonaccif(0, 1) === 5'
}]);

// fibonaccif2
let fib2 = fibonaccif2(0, 1);
test('fibonaccif2', [{
  result: fib2(),
  expected: 0,
  text: 'first call: fibonaccif2(0, 1) === 0'
}, {
  result: fib2(),
  expected: 1,
  text: 'second call: fibonaccif2(0, 1) === 1'
}, {
  result: fib2(),
  expected: 1,
  text: 'third call: fibonaccif2(0, 1) === 1'
}, {
  result: fib2(),
  expected: 2,
  text: 'fourth call: fibonaccif2(0, 1) === 2'
}, {
  result: fib2(),
  expected: 3,
  text: 'fifth call: fibonaccif2(0, 1) === 3'
}, {
  result: fib2(),
  expected: 5,
  text: 'sixth call: fibonaccif2(0, 1) === 5'
}]);

// fibonaccif3
let fib3 = fibonaccif3(0, 1);
test('fibonaccif3', [{
  result: fib3(),
  expected: 0,
  text: 'first call: fibonaccif3(0, 1) === 0'
}, {
  result: fib3(),
  expected: 1,
  text: 'second call: fibonaccif3(0, 1) === 1'
}, {
  result: fib3(),
  expected: 1,
  text: 'third call: fibonaccif3(0, 1) === 1'
}, {
  result: fib3(),
  expected: 2,
  text: 'fourth call: fibonaccif3(0, 1) === 2'
}, {
  result: fib3(),
  expected: 3,
  text: 'fifth call: fibonaccif3(0, 1) === 3'
}, {
  result: fib3(),
  expected: 5,
  text: 'sixth call: fibonaccif3(0, 1) === 5'
}]);

// fibonaccif4
let fib4 = fibonaccif4(0, 1);
test('fibonaccif4', [{
  result: fib4(),
  expected: 0,
  text: 'first call: fibonaccif4(0, 1) === 0'
}, {
  result: fib4(),
  expected: 1,
  text: 'second call: fibonaccif4(0, 1) === 1'
}, {
  result: fib4(),
  expected: 1,
  text: 'third call: fibonaccif4(0, 1) === 1'
}, {
  result: fib4(),
  expected: 2,
  text: 'fourth call: fibonaccif4(0, 1) === 2'
}, {
  result: fib4(),
  expected: 3,
  text: 'fifth call: fibonaccif4(0, 1) === 3'
}, {
  result: fib4(),
  expected: 5,
  text: 'sixth call: fibonaccif4(0, 1) === 5'
}]);

// fibonaccif5
let fib5 = fibonaccif5(0, 1);
test('fibonaccif5', [{
  result: fib5(),
  expected: 0,
  text: 'first call: fibonaccif5(0, 1) === 0'
}, {
  result: fib5(),
  expected: 1,
  text: 'second call: fibonaccif5(0, 1) === 1'
}, {
  result: fib5(),
  expected: 1,
  text: 'third call: fibonaccif5(0, 1) === 1'
}, {
  result: fib5(),
  expected: 2,
  text: 'fourth call: fibonaccif5(0, 1) === 2'
}, {
  result: fib5(),
  expected: 3,
  text: 'fifth call: fibonaccif5(0, 1) === 3'
}, {
  result: fib5(),
  expected: 5,
  text: 'sixth call: fibonaccif5(0, 1) === 5'
}]);

// fibonaccif6
let fib6 = fibonaccif6(0, 1);
test('fibonaccif6', [{
  result: fib6(),
  expected: 0,
  text: 'first call: fibonaccif6(0, 1) === 0'
}, {
  result: fib6(),
  expected: 1,
  text: 'second call: fibonaccif6(0, 1) === 1'
}, {
  result: fib6(),
  expected: 1,
  text: 'third call: fibonaccif6(0, 1) === 1'
}, {
  result: fib6(),
  expected: 2,
  text: 'fourth call: fibonaccif6(0, 1) === 2'
}, {
  result: fib6(),
  expected: 3,
  text: 'fifth call: fibonaccif6(0, 1) === 3'
}, {
  result: fib6(),
  expected: 5,
  text: 'sixth call: fibonaccif6(0, 1) === 5'
}]);

// counter
let obj = counter(10);
let up = obj.up;
let down = obj.down;
test('counter', [{
  result: up(),
  expected: 11,
  text: 'first call: counter(10).up === ' + 11
}, {
  result: down(),
  expected: 10,
  text: 'first call: counter(10).down === ' + 10
}, {
  result: down(),
  expected: 9,
  text: 'first call: counter(10).down === ' + 9
}, {
  result: up(),
  expected: 10,
  text: 'first call: counter(10).up === ' + 10
}]);

// revocableBinary
let revBin = revocableBinary(add);
test('revocableBinary', [{
  result: revBin.invoke(3, 4),
  expected: 3 + 4,
  text: 'invocation: revocableBinary(add).invoke(3, 4) === ' + (3 + 4)
}, {
  result: revBin.revoke(),
  expected: undefined,
  text: 'revocation: revocableBinary(add).revoke() === ' + undefined
}, {
  result: revBin.invoke(5, 7),
  expected: undefined,
  text: 'invocation after revocation: revocableBinary(add).invoke(5, 7) === ' + undefined
}]);

// revocable
let rev = revocable(add);
test('revocable', [{
  result: rev.invoke(1, 2, 4),
  expected: 1 + 2 + 4,
  text: 'invocation: revocable(add).invoke(1, 2, 4) === ' + (1 + 2 + 4)
}, {
  result: rev.revoke(),
  expected: undefined,
  text: 'revocation: revocable(add).revoke() === ' + undefined
}, {
  result: rev.invoke(5, 7, 9),
  expected: undefined,
  text: 'invocation after revocation: revocable(add).invoke(5, 7, 9) === ' + undefined
}]);

// extract
let people = [{ name: 'john'}, { name: 'bob' }];
test('extract', [{
  result: extract(people, 'name')[0],
  expected: 'john',
  text: "extract([{ name: 'john'}, { name: 'bob' }], 'name')[0] === " + 'john'
}, {
  result: extract(people, 'name')[1],
  expected: 'bob',
  text: "extract([{ name: 'john'}, { name: 'bob' }], 'name')[1] === " + 'bob'
}]);

// m
test('m', [{
  result: JSON.stringify(m(1)),
  expected: JSON.stringify({ value: 1, source: '1' }),
  text: 'JSON.stringify(m(1)) === ' + JSON.stringify({ value: 1, source: '1' })
}, {
  result: JSON.stringify(m(Math.PI, "pi")),
  expected: JSON.stringify({ value: Math.PI, source: 'pi' }),
  text: 'JSON.stringify(m(Math.PI, "pi")) === ' + JSON.stringify({ value: Math.PI, source: 'pi' })
}]);

// addmTwo
test('addmTwo', [{
  result: JSON.stringify(addmTwo(m(3), m(4))),
  expected: JSON.stringify({ value: 3 + 4, source: '(3+4)' }),
  text: 'JSON.stringify(addmTwo(m(3), m(4))) === ' + JSON.stringify({ value: 3 + 4, source: '(3+4)' })
}, {
  result: JSON.stringify(addmTwo(m(1), m(Math.PI, "pi"))),
  expected: JSON.stringify({ value: 1 + Math.PI, source: '(1+pi)'}),
  text: 'JSON.stringify(addmTwo(m(1), m(Math.PI, "pi"))) === ' + JSON.stringify({ value: 1 + Math.pi, source: '(1+pi)'})
}]);

// addm
test('addm', [{
  result: JSON.stringify(addm(m(1), m(2), m(4))),
  expected: JSON.stringify({ value: (1 + 2 + 4), source: '(1+2+4)' }),
  text: 'JSON.stringify(addm(m(1), m(2), m(4))) === ' + JSON.stringify({ value: (1 + 2 + 4), source: '(1+2+4)' })
}]);

// liftmBinaryM
test('liftmBinaryM', [{
  result: JSON.stringify(liftmBinaryM(addBinary, "+")(m(3), m(4))),
  expected: JSON.stringify({ value: (3 + 4), source: '(3+4)' }),
  text: 'JSON.stringify(liftmBinaryM(addBinary, "+")(m(3), m(4))) === ' + JSON.stringify({ value: (3 + 4), source: '(3+4)' })
}, {
  result: JSON.stringify(liftmBinaryM(mulBinary, "*")(m(3), m(4))),
  expected: JSON.stringify({ value: (3 * 4), source: '(3*4)' }),
  text: 'JSON.stringify(liftmBinaryM(mulBinary, "*")(m(3), m(4))) === ' + JSON.stringify({ value: (3 * 4), source: '(3*4)' })
}]);

// liftmBinary
test('liftmBinary', [{
  result: JSON.stringify(liftmBinary(addBinary, "+")(3, 4)),
  expected: JSON.stringify({ value: (3 + 4), source: '(3+4)' }),
  text: 'JSON.stringify(liftmBinary(addBinary, "+")(3, 4)) === ' + JSON.stringify({ value: (3 + 4), source: '(3+4)' })
}, {
  result: JSON.stringify(liftmBinary(mulBinary, "*")(3, 4)),
  expected: JSON.stringify({ value: (3 * 4), source: '(3*4)' }),
  text: 'JSON.stringify(liftmBinary(mulBinary, "*")(3, 4)) === ' + JSON.stringify({ value: (3 * 4), source: '(3*4)' })
}]);

// liftm
test('liftm', [{
  result: JSON.stringify(liftm(add, "+")(3, 4)),
  expected: JSON.stringify({ value: (3 + 4), source: '(3+4)' }),
  text: 'JSON.stringify(liftm(add, "+")(3, 4)) === ' + JSON.stringify({ value: (3 + 4), source: '(3+4)' })
}, {
  result: JSON.stringify(liftm(mul, "*")(3, 4)),
  expected: JSON.stringify({ value: (3 * 4), source: '(3*4)' }),
  text: 'JSON.stringify(liftm(mul, "*")(3, 4)) === ' + JSON.stringify({ value: (3 * 4), source: '(3*4)' })
}]);

// exp
test('exp', [{
  result: exp([mul, 1, 2, 4]),
  expected: 1 * 2 * 4,
  text: 'exp([mul, 1, 2, 4]) === ' + (1 * 2 * 4)
}, {
  result: exp(42),
  expected: 42,
  text: 'exp(42) === ' + 42
}]);

// expn
let nae = [ Math.sqrt, [ add, [square, 3], [square, 4] ] ];
test('expn', [{
  result: expn([ Math.sqrt, [ add, [square, 3], [square, 4] ] ]),
  expected: Math.sqrt(((3*3)+(4*4))),
  text: 'expn([ Math.sqrt, [ add, [square, 3], [square, 4] ] ]) === ' + Math.sqrt(((3*3)+(4*4)))
}]);

// addg
test('addg', [{
  result: addg(),
  expected: undefined,
  text: 'addg() === ' + undefined
}, {
  result: addg(2)(),
  expected: 2,
  text: 'addg(2)() === ' + 2
}, {
  result: addg(2)(7)(),
  expected: 9,
  text: 'addg(2)(7)() === ' + 9
}, {
  result: addg(3)(0)(4)(),
  expected: 7,
  text: 'addg(3)(0)(4)() === ' + 7
}, {
  result: addg(1)(2)(4)(8)(),
  expected: 15,
  text: 'addg(1)(2)(4)(8)() === ' + 15
}]);

// addg2
test('addg2', [{
  result: addg2(),
  expected: undefined,
  text: 'addg2() === ' + undefined
}, {
  result: addg2(2)(),
  expected: 2,
  text: 'addg2(2)() === ' + 2
}, {
  result: addg2(2)(7)(),
  expected: 2 + 7,
  text: 'addg2(2)(7)() === ' + (2 + 7)
}, {
  result: addg2(3)(0)(4)(),
  expected: 3 + 0 + 4,
  text: 'addg2(3)(0)(4)() === 7' + (3 + 0 + 4)
}, {
  result: addg2(1)(2)(4)(8)(),
  expected: 1 + 2 + 4 + 8,
  text: 'addg2(1)(2)(4)(8)() === ' + (1 + 2 + 4 + 8)
}]);

// liftg
test('liftg', [{
  result: liftg(mulBinary)(),
  expected: undefined,
  text: 'liftg(mulBinary)() === ' + undefined
}, {
  result: liftg(mulBinary)(3)(),
  expected: 3,
  text: 'liftg(mulBinary)(3)() === ' + 3
}, {
  result: liftg(mulBinary)(3)(0)(4)(),
  expected: 3 * 0 * 4,
  text: 'liftg(mulBinary)(3)(0)(4)() === ' + (3 * 0 * 4)
}, {
  result: liftg(mulBinary)(1)(2)(4)(8)(),
  expected: 1 * 2 * 4 * 8,
  text: 'liftg(mulBinary)(1)(2)(4)(8)() === ' + (1 * 2 * 4 * 8)
}]);

// liftg2
test('liftg2', [{
  result: liftg2(mulBinary)(),
  expected: undefined,
  text: 'liftg2(mulBinary)() === ' + undefined
}, {
  result: liftg2(mulBinary)(3)(),
  expected: 3,
  text: 'liftg2(mulBinary)(3)() === ' + 3
}, {
  result: liftg2(mulBinary)(3)(0)(4)(),
  expected: 3 * 0 * 4,
  text: 'liftg2(mulBinary)(3)(0)(4)() === ' + (3 * 0 * 4)
}, {
  result: liftg2(mulBinary)(1)(2)(4)(8)(),
  expected: 1 * 2 * 4 * 8,
  text: 'liftg2(mulBinary)(1)(2)(4)(8)() === ' + (1 * 2 * 4 * 8)
}]);

// liftg3
test('liftg3', [{
  result: liftg3(mulBinary)(),
  expected: undefined,
  text: 'liftg3(mulBinary)() === ' + undefined
}, {
  result: liftg3(mulBinary)(3)(),
  expected: 3,
  text: 'liftg3(mulBinary)(3)() === ' + 3
}, {
  result: liftg3(mulBinary)(3)(0)(4)(),
  expected: 3 * 0 * 4,
  text: 'liftg3(mulBinary)(3)(0)(4)() === ' + (3 * 0 * 4)
}, {
  result: liftg3(mulBinary)(1)(2)(4)(8)(),
  expected: 1 * 2 * 4 * 8,
  text: 'liftg3(mulBinary)(1)(2)(4)(8)() === ' + (1 * 2 * 4 * 8)
}]);

// arrayg
test('arrayg', [{
  result: JSON.stringify(arrayg()),
  expected: JSON.stringify([]),
  text: 'arrayg() === ' + JSON.stringify([])
}, {
  result: JSON.stringify(arrayg(3)()),
  expected: JSON.stringify([3]),
  text: 'arrayg(3)() === ' + JSON.stringify([3])
}, {
  result: JSON.stringify(arrayg(3)(4)(5)()),
  expected: JSON.stringify([3, 4, 5]),
  text: 'arrayg(3)(4)(5)() === ' + JSON.stringify([3, 4, 5])
}]);

// arrayg2
test('arrayg2', [{
  result: JSON.stringify(arrayg2()),
  expected: JSON.stringify([]),
  text: 'arrayg2() === ' + JSON.stringify([])
}, {
  result: JSON.stringify(arrayg2(3)()),
  expected: JSON.stringify([3]),
  text: 'arrayg2(3)() === ' + JSON.stringify([3])
}, {
  result: JSON.stringify(arrayg2(3)(4)(5)()),
  expected: JSON.stringify([3, 4, 5]),
  text: 'arrayg2(3)(4)(5)() === ' + JSON.stringify([3, 4, 5])
}]);

// arrayg3
test('arrayg3', [{
  result: JSON.stringify(arrayg3()),
  expected: JSON.stringify([]),
  text: 'arrayg3() === ' + JSON.stringify([])
}, {
  result: JSON.stringify(arrayg3(3)()),
  expected: JSON.stringify([3]),
  text: 'arrayg3(3)() === ' + JSON.stringify([3])
}, {
  result: JSON.stringify(arrayg3(3)(4)(5)()),
  expected: JSON.stringify([3, 4, 5]),
  text: 'arrayg3(3)(4)(5)() === ' + JSON.stringify([3, 4, 5])
}]);

// continuizeu
test('continuizeu', [{
  result: continuizeu(Math.sqrt)(identity, 81),
  expected: Math.sqrt(81),
  text: 'continuizeu(Math.sqrt)(identity, 81) === ' + Math.sqrt(81)
}]);

// continuize
test('continuize', [{
  result: continuize(add)(identity, 1, 2, 4),
  expected: add(1, 2, 4),
  text: 'continuize(add)(identity, 1, 2, 4) === ' + (1 + 2 + 4)
}]);

// vector
let v = vector();
v.append(7);
v.store(1, 8);
test('vector', [{
  result: v.get(0),
  expected: 7,
  text: 'vector test 1'
}, {
  result: v.get(1),
  expected: 8,
  text: 'vector test 2'
}]);

// vector exploitVector
let data = exploitVector(v);
test('vector exploitVector', [{
  result: Array.isArray(data) &&
    data.length === 2 &&
    data[0] === v.get(0) &&
    data[1] === v.get(1),
  expected: true,
  text: 'vector exploit works'
}]);

// vectorSafe
let vSafe = vectorSafe();
vSafe.append(7);
vSafe.store(1, 8);
test('vectorSafe', [{
  result: vSafe.get(0),
  expected: 7,
  text: 'vectorSafe test 1'
}, {
  result: vSafe.get(1),
  expected: 8,
  text: 'vectorSafe test 2'
}]);

// vector exploit
let dataTwo = exploitVector(vSafe);
test('vector exploitVector', [{
  result: dataTwo === undefined,
  expected: true,
  text: 'vectorSafe exploit is fixed'
}]);

// pubsub
let ps = pubsub();
test('pubsub', [{
  result: (function() {
    ps.publish = undefined;
    return typeof ps.publish;
  })(),
  expected: 'function',
  text: 'pubsub methods are safe'
}, {
  result: (function() {
    ps.subscribe(() => console.log('still here'));
    ps.subscribe(function() {
      this.length = 0;
    });
    ps.publish();
    return ps.size();
  })(),
  expected: 2,
  text: 'pubsub `this` is safe'
}]);
