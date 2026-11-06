function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
export interface Triple {
  a: number;
  b: number;
  c: number;
}
function gcd(a: number, b: number): number {
  while (b) [a, b] = [b, a % b];
  return a;
}
export function pythagoreanTriples(maxHypotenuse: number, primitiveOnly = false): Triple[] {
  integer(maxHypotenuse, 0, 100000);
  if (typeof primitiveOnly !== 'boolean') throw new TypeError('Expected boolean');
  const out: Triple[] = [];
  for (let m = 2; m * m + 1 <= maxHypotenuse; m++)
    for (let n = 1; n < m; n++) {
      const c = m * m + n * n;
      if (c > maxHypotenuse) break;
      if ((m - n) % 2 === 0 || gcd(m, n) !== 1) continue;
      const x = m * m - n * n,
        y = 2 * m * n;
      for (let k = 1; k * c <= maxHypotenuse; k++) {
        if (out.length >= 100000) throw new RangeError('Triple budget');
        out.push({ a: k * Math.min(x, y), b: k * Math.max(x, y), c: k * c });
        if (primitiveOnly) break;
      }
    }
  return out.sort((x, y) => x.c - y.c || x.a - y.a);
}
