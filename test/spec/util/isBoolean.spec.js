import { isBoolean } from '../../../src/util/isBoolean.js';

describe('isBoolean', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isBoolean).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [-1, 0, 1, NaN, '', '  ', 'some string', null, undefined, [], () => {}].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(isBoolean(value)).toEqual(false);
            });
        });

        [true, false].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isBoolean(value)).toEqual(true);
            });
        });

    });

});