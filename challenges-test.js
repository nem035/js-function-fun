function test(result, expected, text) {

  const resultWrapper = document.createElement('div');
  resultWrapper.className += ' result';

  let resultNode = document.createElement('div');
  if (result !== expected) {
    resultNode.innerHTML = `
      <p><span class="label">${text}</span></p>
      <p>Expected <span class="label">${expected}</span>, got <span class="label">${result}</span>
    `;
    resultWrapper.className += ' failed';
  } else {
    resultNode.innerHTML = `
      <p><span class="label">${text}</span></p>
    `;
    resultWrapper.className += ' passed';
  }

  resultWrapper.appendChild(resultNode);
  document.body.appendChild(resultWrapper);
}

// identity
test(identity(3), 3, 'identity(3) === 3');

// add, sub, mul
test(add(3, 4), 3 + 4, 'add(3, 4) === 3 + 4');
test(sub(3, 4), 3 - 4, 'sub(3, 4) === 3 - 4');
test(mul(3, 4), 3 * 4, 'mul(3, 4) === 3 * 4');

// identityf
test(identityf(3)(), 3, 'identityf(3)() === 3');

// addf
test(addf(3)(4), 3 + 4, 'addf(3)(4) === 3 + 4');

// liftf
test(liftf(add)(3)(4), 3 + 4, 'liftf(add)(3)(4) === 3 + 4');
test(liftf(sub)(3)(4), 3 - 4, 'liftf(sub)(3)(4) === 3 - 4');
test(liftf(mul)(3)(4), 3 * 4, 'liftf(mul)(3)(4) === 3 * 4');

// curry
test(curry(add, 3)(4), 3 + 4, 'curry(add, 3)(4) === 3 + 4');
test(curry(sub, 3)(4), 3 - 4, 'curry(sub, 3)(4) === 3 - 4');
test(curry(mul, 3)(4), 3 * 4, 'curry(mul, 3)(4) === 3 * 4');

// inc
test(inc1(5), 5 + 1, 'inc1(5) === 5 + 1');
test(inc1(inc1(5)), 5 + 1 + 1, 'inc1(inc1(5)) === 5 + 1 + 1');

test(inc2(5), 5 + 1, 'inc2(5) === 5 + 1');
test(inc2(inc2(5)), 5 + 1 + 1, 'inc2(inc2(5)) === 5 + 1 + 1');

test(inc3(5), 5 + 1, 'inc3(5) === 5 + 1');
test(inc3(inc3(5)), 5 + 1 + 1, 'inc3(inc3(5)) === 5 + 1 + 1');

test(inc4(5), 5 + 1, 'inc4(5) === 5 + 1');
test(inc4(inc4(5)), 5 + 1 + 1, 'inc4(inc4(5)) === 5 + 1 + 1');

// twice
test(twice(add)(11), 11 + 11, 'twice(add)(11) === 11 + 11');
test(twice(sub)(11), 11 - 11, 'twice(sub)(11) === 11 - 11');
test(twice(mul)(11), 11 * 11, 'twice(mul)(11) === 11 * 11');

// reverse
test(reverse(sub)(3, 2), 2 - 3, 'reverse(sub)(3, 2) === 2 - 3');

// composeu
test(composeu(twice(add), twice(mul))(5), (5 + 5) * (5 + 5), 'composeu(doubl, square)(5) === (5 + 5) * (5 + 5)');

// composeb
test(composeb(add, mul)(2, 3, 7), (2 + 3) * 7, 'composeb(add, mul)(2, 3, 7) === (2 + 3) * 7');

// limit
var addLimited = limit(add, 1);
test(addLimited(3, 4), 3 + 4, 'first call: limit(add, 1)(3, 4) === 3 + 4');
test(addLimited(3, 5), undefined, 'second call: limit(add, 1)(3, 5) === undefined');
