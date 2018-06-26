import { isEmpty } from '../../../src/util/isEmpty';

describe('isEmpty', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isEmpty).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        test('returns false when the value is undefined', () => {
            expect(isEmpty(undefined)).toBe(false);
        });

        test('returns false when the value is null', () => {
            expect(isEmpty(null)).toBe(false);
        });

        test('returns false when the value is a string', () => {
            expect(isEmpty('some string')).toBe(false);
        });

        test('returns true when the value is the empty string', () => {
            expect(isEmpty('')).toBe(true);
        });

        test('returns false when the value is true', () => {
            expect(isEmpty(true)).toBe(false);
        });

        test('returns false when the value is false', () => {
            expect(isEmpty(undefined)).toBe(false);
        });

        test('returns false when the value is a number', () => {
            expect(isEmpty(0)).toBe(false);
            expect(isEmpty(101)).toBe(false);
        });

        test('returns false when the value is NaN', () => {
            expect(isEmpty(NaN)).toBe(false);
        });

        test('returns false when the value is an object', () => {
            expect(isEmpty({})).toBe(false);
        });

        test('returns false when the value is a Function', () => {
            expect(isEmpty(() => {})).toBe(false);
        });

        test('returns false when the value is an array', () => {
            expect(isEmpty([])).toBe(false);
        });

    });

});