import { getDeclaredTypeFromElement } from '../../../src/util/getDeclaredTypeFromElement';
import { asElement } from '../../../src/util/asElement';
import { Constants } from '../../../src/Constants';

describe('getDeclaredTypeFromElement', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(getDeclaredTypeFromElement).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [true, false, -1, 0, 1, NaN, '', null, undefined, [], () => {}].forEach((value) => {
            test(`should throw when "${value}" is passed in`, () => {
                expect(() => getDeclaredTypeFromElement(value)).toThrowError();
            });
        });

        test(`should throw when an element with no type is passed in`, () => {
            expect(() => getDeclaredTypeFromElement(asElement('<div></div>'))).toThrowError();
        });

        test('should return the element name', () => {
            let elementType = 'elementtype';
            let element = asElement(`<div ${Constants.ATTRIBUTE_TYPE}="${elementType}"></div>`);
            expect (getDeclaredTypeFromElement(element)).toEqual(elementType);
        });

    });

});