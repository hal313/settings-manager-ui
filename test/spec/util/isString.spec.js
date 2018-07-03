import { isString } from '../../../src/util/isString.js';

describe('isString', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isString).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [null, undefined, true, false, -1, 0, 1, NaN, [], () => {}].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(isString(value)).toEqual(false);
            });
        });

        ['some string', '', '  '].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isString(value)).toEqual(true);
            });
        });

    });

});