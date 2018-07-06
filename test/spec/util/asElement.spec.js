import { asElement } from '../../../src/util/asElement';
import { isElement } from '../../../src/util/isElement';

describe('asElement', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(asElement).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {


        [true, false, -1, 0, 1, NaN, {}, [], () => {}, '', '   '].forEach((value) => {
            test(`should throw when the element parameter is "${value}"`, () => {
                expect(() => asElement(value)).toThrowError();
            });
        });

        test('should return the element when an Element is passed in', () => {
            const element = document.createElement('div');
            expect(asElement(element)).toBe(element);
        });

        test('should return a new element of the type represented by the passed in string', () => {
            const type = 'div';
            const htmlString = `<${type}></${type}>`;
            const element = asElement(htmlString);
            expect(isElement(element)).toBe(true);
            expect(element.tagName.toLowerCase()).toEqual(type.toLowerCase());
            expect(isElement(element)).toBe(true);
        });

        test('should fix strings when an invalid string is passed in', () => {
            let element = asElement('<hotdog></not-hotdog>');
            expect(element.tagName.toLowerCase).toBe('hotdog');
        });

    });

});