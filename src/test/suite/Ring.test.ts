import { Ring } from '../../Ring';
import { describe, it } from 'mocha';
import * as assert from 'assert';

describe('Ring', () => {
	describe('#constructor', () => {
		it('creates a new Ring instance', () => {
			const ring = new Ring<number>();
			assert.ok(ring instanceof Ring);
		});

		it('creates a new Ring instance with initial items', () => {
			const ring = new Ring<number>(1, 2, 3);
			assert.deepStrictEqual(ring, [1, 2, 3]);
		});
	});

	describe('#current', () => {
		it('returns the current item in the ring', () => {
			const ring = new Ring<number>(1, 2, 3);
			assert.strictEqual(ring.current, 1);
		});

		it('sets the current item in the ring', () => {
			const ring = new Ring<number>(1, 2, 3);
			ring.current = 2;
			assert.strictEqual(ring.current, 2);
		});
	});

	describe('#first', () => {
		it('returns the first item in the ring', () => {
			const ring = new Ring<number>(1, 2, 3);
			assert.strictEqual(ring.first, 1);
		});
	});

	describe('#last', () => {
		it('returns the last item in the ring', () => {
			const ring = new Ring<number>(1, 2, 3);
			assert.strictEqual(ring.last, 3);
		});
	});

	describe('#next', () => {
		it('returns the next item in the ring', () => {
			const ring = new Ring<number>(1, 2, 3);
			assert.strictEqual(ring.next(), 2);
			assert.strictEqual(ring.next(), 3);
			assert.strictEqual(ring.next(), 1);
		});
	});

	describe('#prev', () => {
		it('returns the previous item in the ring', () => {
			const ring = new Ring<number>(1, 2, 3);
			assert.strictEqual(ring.prev(), 3);
			assert.strictEqual(ring.prev(), 2);
			assert.strictEqual(ring.prev(), 1);
		});
	});

	describe('#insertBefore', () => {
		it('inserts an item before the current item', () => {
			const ring = new Ring<number>(1, 2, 3);
			ring.insertBefore(0);
			assert.deepStrictEqual(ring, [0, 1, 2, 3]);
			assert.strictEqual(ring.current, 0);
		});
	});

	describe('#insertAfter', () => {
		it('inserts an item after the current item', () => {
			const ring = new Ring<number>(1, 2, 3);
			ring.insertAfter(4);
			assert.deepStrictEqual(ring, [1, 2, 3, 4]);
			assert.strictEqual(ring.current, 1);
		});
	});

	describe('#delete', () => {
		it('deletes an item from the ring', () => {
			const ring = new Ring<number>(1, 2, 3);
			ring.delete(2);
			assert.deepStrictEqual(ring, [1, 3]);
			assert.strictEqual(ring.current, 1);
		});

		it('deletes the current item from the ring', () => {
			const ring = new Ring<number>(1, 2, 3);
			ring.deleteCurrent();
			assert.deepStrictEqual(ring, [2, 3]);
			assert.strictEqual(ring.current, 2);
		});

		it('deletes the last item from the ring', () => {
			const ring = new Ring<number>(1, 2, 3);
			ring.current = 3;
			ring.deleteCurrent();
			assert.deepStrictEqual(ring, [1, 2]);
			assert.strictEqual(ring.current, 1);
		});

		it('does not delete an item that is not in the ring', () => {
			const ring = new Ring<number>(1, 2, 3);
			ring.delete(4);
			assert.deepStrictEqual(ring, [1, 2, 3]);
			assert.strictEqual(ring.current, 1);
		});
	});
});
