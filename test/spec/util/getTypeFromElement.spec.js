import { getTypeFromElement } from '../../../src/util/getTypeFromElement';
import { asElement } from '../../../src/util/asElement';
import { Constants } from '../../../src/Constants.js';
import { UndefinedTypeHandler } from '../../../src/typeHandlers/UndefinedTypeHandler';

describe('getTypeFromElement', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(getTypeFromElement).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        [true, false, -1, 0, 1, NaN, '', null, undefined, [], () => {}].forEach((value) => {
            test(`should throw when "${value}" is passed in`, () => {
                expect(() => getTypeFromElement(value)).toThrowError();
            });
        });

        test('should return undefined when no type is present on the element', () => {
            expect(getTypeFromElement(asElement('<div></div>'))).toEqual(UndefinedTypeHandler.TYPE);
        });

        test('should return the element name', () => {
            let elementType = 'elementtype';
            let element = asElement(`<div ${Constants.ATTRIBUTE_TYPE}="${elementType}"></div>`);
            expect (getTypeFromElement(element)).toEqual(elementType);
        });

    });

});