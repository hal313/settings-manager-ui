import { isUndefined } from '../../../src/util/isUndefined';

describe('isUndefined', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isUndefined).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [null, true, false, -1, 0, 1, NaN, 'some string', '', '  ', [], () => {}].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(isUndefined(value)).toEqual(false);
            });
        });

        [undefined].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isUndefined(value)).toEqual(true);
            });
        });

    });

});