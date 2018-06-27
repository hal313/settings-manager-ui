import { isFunction } from '../../../src/util/isFunction';

describe('isFunction', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isFunction).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [true, false, -1, 0, 1, NaN, '', 'some string', null, undefined, []].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(isFunction(value)).toEqual(false);
            });
        });

        [() => {}].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isFunction(value)).toEqual(true);
            });
        });

    });

});