import { isDefinedAndNotEmpty } from '../../../src/util/isDefinedAndNotEmpty.js';

describe('isDefinedAndNotEmpty', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isDefinedAndNotEmpty).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [null, undefined, '', '  '].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(isDefinedAndNotEmpty(value)).toEqual(false);
            });
        });

        [true, false, -1, 0, 1, NaN, 'some string', [], () => {}].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isDefinedAndNotEmpty(value)).toEqual(true);
            });
        });

    });

});