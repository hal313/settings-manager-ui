import { createError } from '../../../src/util/createError.js';

describe('createError', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(createError).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        test('returns an error object', () => {
            expect(createError('error') instanceof Error).toBe(true);
        });

        [true, false, -1, 0, 1, NaN, 'some string', {}, []].forEach((value) => {
            test(`returns an error with message "${value}" when "${value}" is passed in`, () => {
                expect(createError(value).message).toEqual('' + value);
            });
        });

        test('returns an error with message "[object Object]" when an object is passed in', () => {
            expect(createError({}).message).toEqual({}.toString());
        });

        [undefined, null, '', '    '].forEach((value) => {
            test(`returns an error with message "Unknown error" when ${value} is passed in`, () => {
                expect(createError(value).message).toEqual('Unknown error');
            });
        });

    });

});