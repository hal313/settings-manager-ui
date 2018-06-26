import { isFunction } from '../../../src/util/isFunction';

describe('isFunction', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isFunction).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        test('returns false when the value is undefined', () => {
            expect(isFunction(undefined)).toBe(false);
        });

        test('returns false when the value is null', () => {
            expect(isFunction(null)).toBe(false);
        });

        test('returns false when the value is a string', () => {
            expect(isFunction('some string')).toBe(false);
        });

        test('returns false when the value is the empty string', () => {
            expect(isFunction('')).toBe(false);
        });

        test('returns false when the value is true', () => {
            expect(isFunction(true)).toBe(false);
        });

        test('returns false when the value is false', () => {
            expect(isFunction(undefined)).toBe(false);
        });

        test('returns false when the value is true', () => {
            expect(isFunction(true)).toBe(false);
        });

        test('returns false when the value is a number', () => {
            expect(isFunction(0)).toBe(false);
            expect(isFunction(101)).toBe(false);
        });

        test('returns false when the value is NaN', () => {
            expect(isFunction(NaN)).toBe(false);
        });

        test('returns false when the value is an object', () => {
            expect(isFunction({})).toBe(false);
        });

        test('returns true when the value is a Function', () => {
            expect(isFunction(() => {})).toBe(true);
        });

        test('returns false when the value is an array', () => {
            expect(isFunction([])).toBe(false);
        });

    });

});