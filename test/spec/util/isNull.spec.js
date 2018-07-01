import { isNull } from '../../../src/util/isNull.js';

describe('isNull', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isNull).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [undefined, true, false, -1, 0, 1, NaN, 'some string', '', '  ', [], () => {}].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(isNull(value)).toEqual(false);
            });
        });

        [null].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isNull(value)).toEqual(true);
            });
        });

    });

});