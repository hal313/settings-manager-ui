import { isArray } from '../../../src/util/isArray';

describe('isArray', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isArray).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [true, false, -1, 0, 1, NaN, '', 'some string', null, undefined, {}, () => {}].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(isArray(value)).toEqual(false);
            });
        });

        [[]].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isArray(value)).toEqual(true);
            });
        });

    });

});