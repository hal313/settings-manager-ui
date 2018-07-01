import { isObjectArray } from '../../../src/util/isObjectArray.js';

describe('isObjectArray', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isObjectArray).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [true, false, -1, 0, 1, NaN, '', 'some string', null, undefined, [], [1, 2, 3], [true, false], [{}, 2], [{}, true], [{}, 'test'], ['', 'one'], () => {}].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(isObjectArray(value)).toEqual(false);
            });
        });

        [[{}]].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isObjectArray(value)).toEqual(true);
            });
        });

    });

});