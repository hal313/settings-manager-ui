import { isRegExp } from '../../../src/util/isRegExp.js';

describe('isRegExp', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isRegExp).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [undefined, null, true, false, -1, 0, 1, NaN, 'some string', '', '  ', [], () => {}].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(isRegExp(value)).toEqual(false);
            });
        });

        [/s/].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isRegExp(value)).toEqual(true);
            });
        });

    });

});