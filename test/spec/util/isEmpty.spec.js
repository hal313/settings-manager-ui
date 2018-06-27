import { isEmpty } from '../../../src/util/isEmpty';

describe('isEmpty', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(isEmpty).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [true, false, -1, 0, 1, NaN, 'some string', null, undefined, [], () => {}].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(isEmpty(value)).toEqual(false);
            });
        });

        ['', '  '].forEach((value) => {
            test(`returns true for "${value}"`, () => {
                expect(isEmpty(value)).toEqual(true);
            });
        });

    });

});