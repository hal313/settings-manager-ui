import { asArray } from '../../../src/util/asArray.js';

describe('asArray', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(asArray).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        test('returns an empty array when the value is undefined', () => {
            expect(asArray(undefined)).toEqual([]);
        });

        test('returns an empty array when the value is null', () => {
            expect(asArray(null)).toEqual([]);
        });

        test('returns an array when the value is an array', () => {
            let array = [1, 'two', true, {name: 'value'}, () => {}];
            let asArrayed = asArray(array);

            expect(array).toEqual(array);
            expect(array).toBe(asArrayed);
        });

        test('returns an array when the value is not an array', () => {
            expect(asArray(1)).toEqual([1]);
            expect(asArray(true)).toEqual([true]);
            expect(asArray(false)).toEqual([false]);
        });

    });

});