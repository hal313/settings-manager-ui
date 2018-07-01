import { asBoolean } from '../../../src/util/asBoolean.js';

describe('asBoolean', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(asBoolean).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {


        [false, 0, NaN, '', '   '].forEach((value) => {
            test(`should return false when the element parameter is "${value}"`, () => {
                expect(asBoolean(value)).toBe(false);
            });
        });

        [true, -1, 1, {}, [], () => {}].forEach((value) => {
            test(`should return true when the element parameter is "${value}"`, () => {
                expect(asBoolean(value)).toBe(true);
            });
        });

    });

});