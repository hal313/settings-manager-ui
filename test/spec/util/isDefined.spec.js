import { isDefined } from '../../../src/util/isDefined';

describe('isDefined', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isDefined).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [null, undefined].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(isDefined(value)).toEqual(false);
            });
        });

        [true, false, -1, 0, 1, NaN, 'some string', '', '  ', [], () => {}].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isDefined(value)).toEqual(true);
            });
        });

    });

});