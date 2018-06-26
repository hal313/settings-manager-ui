import { isDefinedAndNotEmpty } from '../../../src/util/isDefinedAndNotEmpty';

describe('isDefinedAndNotEmpty', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isDefinedAndNotEmpty).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        test('returns false when the value is undefined', () => {
            expect(isDefinedAndNotEmpty(undefined)).toBe(false);
        });

        test('returns false when the value is null', () => {
            expect(isDefinedAndNotEmpty(null)).toBe(false);
        });

        test('returns true when the value is a string', () => {
            expect(isDefinedAndNotEmpty('some string')).toBe(true);
        });

        test('returns false when the value is the empty string', () => {
            expect(isDefinedAndNotEmpty('')).toBe(false);
        });

        test('returns true when the value is true', () => {
            expect(isDefinedAndNotEmpty(true)).toBe(true);
        });

        test('returns true when the value is false', () => {
            expect(isDefinedAndNotEmpty(false)).toBe(true);
        });

        test('returns true when the value is true', () => {
            expect(isDefinedAndNotEmpty(true)).toBe(true);
        });

        test('returns true when the value is a number', () => {
            expect(isDefinedAndNotEmpty(0)).toBe(true);
            expect(isDefinedAndNotEmpty(101)).toBe(true);
        });

        test('returns true when the value is NaN', () => {
            expect(isDefinedAndNotEmpty(NaN)).toBe(true);
        });

        test('returns true when the value is an object', () => {
            expect(isDefinedAndNotEmpty({})).toBe(true);
        });

        test('returns true when the value is a Function', () => {
            expect(isDefinedAndNotEmpty(() => {})).toBe(true);
        });

        test('returns true when the value is an array', () => {
            expect(isDefinedAndNotEmpty([])).toBe(true);
        });

    });

});