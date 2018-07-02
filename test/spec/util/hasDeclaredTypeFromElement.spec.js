import { hasDeclaredTypeFromElement } from '../../../src/util/hasDeclaredTypeFromElement.js';
import { asElement } from '../../../src/util/asElement.js';
import { Constants } from '../../../src/Constants.js';

describe('hasDeclaredTypeFromElement', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(hasDeclaredTypeFromElement).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [true, false, -1, 0, 1, NaN, '', 'some string', null, undefined, {}, () => {}, []].forEach((value) => {
            test(`returns false for "${value}"`, () => {
                expect(() => hasDeclaredTypeFromElement(value)).toThrowError();
            });
        });

        test(`returns when the element has a declared type`, () => {
            let element = asElement(`<div ${Constants.ATTRIBUTE_TYPE}="sometype"></div>`);
            expect(hasDeclaredTypeFromElement(element)).toEqual(true);
        });

        test(`return false when the element has no declared type value`, () => {
            let element = asElement(`<div ${Constants.ATTRIBUTE_TYPE}></div>`);
            expect(hasDeclaredTypeFromElement(element)).toEqual(false);
        });

        test(`return false when the element has no declared type`, () => {
            let element = asElement(`<div ${Constants.ATTRIBUTE_TYPE}=""></div>`);
            expect(hasDeclaredTypeFromElement(element)).toEqual(false);
        });

        test(`return false when the element has an empty declared type`, () => {
            let element = asElement(`<div ${Constants.ATTRIBUTE_TYPE}="    "></div>`);
            expect(hasDeclaredTypeFromElement(element)).toEqual(false);
        });

    });

});