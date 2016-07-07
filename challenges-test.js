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

    if (result !== expected) {
      resultHTML = `
        <div><span class="result">${text}</span></div>
        <div>Expected <span class="label">${expected}</span>, got <span class="label">${result}</span>
      `;
      resultClass = 'failed';
    } else {
      resultHTML = `
        <div><span class="result">${text}</span></div>
      `;
      resultClass = 'passed';
    }

    resultNode.innerHTML = resultHTML;
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
