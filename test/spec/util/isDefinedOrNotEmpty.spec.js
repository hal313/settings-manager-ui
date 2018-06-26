import { isDefinedOrNotEmpty } from '../../../src/util/isDefinedOrNotEmpty';

describe('isDefinedOrNotEmpty', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isDefinedOrNotEmpty).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        test('returns false when the value is undefined', () => {
            expect(isDefinedOrNotEmpty(undefined)).toBe(false);
        });

        test('returns false when the value is null', () => {
            expect(isDefinedOrNotEmpty(null)).toBe(false);
        });

        test('returns true when the value is a string', () => {
            expect(isDefinedOrNotEmpty('some string')).toBe(true);
        });

        test('returns false when the value is the empty string', () => {
            expect(isDefinedOrNotEmpty('')).toBe(false);
        });

        test('returns true when the value is true', () => {
            expect(isDefinedOrNotEmpty(true)).toBe(true);
        });

        test('returns true when the value is false', () => {
            expect(isDefinedOrNotEmpty(false)).toBe(true);
        });

        test('returns true when the value is true', () => {
            expect(isDefinedOrNotEmpty(true)).toBe(true);
        });

        test('returns true when the value is a number', () => {
            expect(isDefinedOrNotEmpty(0)).toBe(true);
            expect(isDefinedOrNotEmpty(101)).toBe(true);
        });

        test('returns true when the value is NaN', () => {
            expect(isDefinedOrNotEmpty(NaN)).toBe(true);
        });

        test('returns true when the value is an object', () => {
            expect(isDefinedOrNotEmpty({})).toBe(true);
        });

        test('returns true when the value is a Function', () => {
            expect(isDefinedOrNotEmpty(() => {})).toBe(true);
        });

        test('returns true when the value is an array', () => {
            expect(isDefinedOrNotEmpty([])).toBe(true);
        });

    });

});