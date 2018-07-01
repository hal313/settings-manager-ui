import { isObject } from '../../../src/util/isObject.js';

describe('isObject', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isObject).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [true, false, -1, 0, 1, NaN, '', 'some string', null, undefined, [], () => {}].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(isObject(value)).toEqual(false);
            });
        });

        [{}].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isObject(value)).toEqual(true);
            });
        });

    });

});