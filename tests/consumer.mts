import { pythagoreanTriples } from '@lp-labs/pythagorean-triples';
if (pythagoreanTriples(13, true).length !== 2) throw new Error('Triples');
// @ts-expect-error invalid argument must be rejected by declarations
pythagoreanTriples('13');
