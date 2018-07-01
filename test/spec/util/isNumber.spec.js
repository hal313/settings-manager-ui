import { isNumber } from '../../../src/util/isNumber.js';

describe('isNumber', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isNumber).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [true, false, '', '  ', NaN, 'some string', null, undefined, [], () => {}].forEach((value, index) => {
            test(`returns false for "${value}" ${index}`, () => {
                expect(isNumber(value)).toEqual(false);
            });
        });

        [ -1, 0, 1].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isNumber(value)).toEqual(true);
            });
        });

    });

});