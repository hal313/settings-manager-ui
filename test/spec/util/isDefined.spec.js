import { isDefined } from '../../../src/util/isDefined';

describe('isDefined', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isDefined).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        test('returns false when the value is undefined', () => {
            expect(isDefined(undefined)).toBe(false);
        });

        test('returns false when the value is null', () => {
            expect(isDefined(null)).toBe(false);
        });

        test('returns true when the value is a string', () => {
            expect(isDefined('some string')).toBe(true);
        });

        test('returns true when the value is the empty string', () => {
            expect(isDefined('')).toBe(true);
        });

        test('returns true when the value is true', () => {
            expect(isDefined(true)).toBe(true);
        });

        test('returns true when the value is false', () => {
            expect(isDefined(false)).toBe(true);
        });

        test('returns true when the value is true', () => {
            expect(isDefined(true)).toBe(true);
        });

        test('returns true when the value is a number', () => {
            expect(isDefined(0)).toBe(true);
            expect(isDefined(101)).toBe(true);
        });

        test('returns true when the value is NaN', () => {
            expect(isDefined(NaN)).toBe(true);
        });

        test('returns true when the value is an object', () => {
            expect(isDefined({})).toBe(true);
        });

        test('returns true when the value is a Function', () => {
            expect(isDefined(() => {})).toBe(true);
        });

        test('returns true when the value is an array', () => {
            expect(isDefined([])).toBe(true);
        });

    });

});