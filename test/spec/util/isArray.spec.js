import { isArray } from '../../../src/util/isArray';

describe('isArray', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isArray).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        test('returns false when the value is undefined', () => {
            expect(isArray(undefined)).toBe(false);
        });

        test('returns false when the value is null', () => {
            expect(isArray(null)).toBe(false);
        });

        test('returns false when the value is a string', () => {
            expect(isArray('some string')).toBe(false);
        });

        test('returns false when the value is the empty string', () => {
            expect(isArray('')).toBe(false);
        });

        test('returns false when the value is true', () => {
            expect(isArray(true)).toBe(false);
        });

        test('returns false when the value is false', () => {
            expect(isArray(undefined)).toBe(false);
        });

        test('returns false when the value is a number', () => {
            expect(isArray(0)).toBe(false);
            expect(isArray(101)).toBe(false);
        });

        test('returns false when the value is NaN', () => {
            expect(isArray(NaN)).toBe(false);
        });

        test('returns false when the value is an object', () => {
            expect(isArray({})).toBe(false);
        });

        test('returns false when the value is a Function', () => {
            expect(isArray(() => {})).toBe(false);
        });

        test('returns true when the value is an array', () => {
            expect(isArray([])).toBe(true);
        });

    });

});