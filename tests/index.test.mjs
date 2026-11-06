import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('known triples', () => {
  assert.deepEqual(api.pythagoreanTriples(13), [
    { a: 3, b: 4, c: 5 },
    { a: 6, b: 8, c: 10 },
    { a: 5, b: 12, c: 13 },
  ]);
});
test('primitive selection', () => {
  assert.deepEqual(api.pythagoreanTriples(13, true), [
    { a: 3, b: 4, c: 5 },
    { a: 5, b: 12, c: 13 },
  ]);
});
test('small boundary', () => {
  assert.deepEqual(api.pythagoreanTriples(4), []);
  assert.equal(api.pythagoreanTriples(5).length, 1);
});
test('input validation', () => {
  for (const n of [-1, 1.2, Infinity, 100001]) assert.throws(() => api.pythagoreanTriples(n));
  assert.throws(() => api.pythagoreanTriples(10, 'yes'));
});
test('no duplicate sides', () => {
  const rows = api.pythagoreanTriples(500);
  assert.equal(new Set(rows.map((x) => JSON.stringify(x))).size, rows.length);
  assert.ok(rows.every((x) => x.a * x.a + x.b * x.b === x.c * x.c));
});
test('brute-force oracle', () => {
  const expected = [];
  for (let c = 1; c <= 100; c++)
    for (let a = 1; a < c; a++)
      for (let b = a; b < c; b++) if (a * a + b * b === c * c) expected.push({ a, b, c });
  assert.deepEqual(api.pythagoreanTriples(100), expected);
});
