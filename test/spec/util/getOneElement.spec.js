import { getOneElement } from '../../../src/util/getOneElement.js';
import { asElement } from '../../../src/util/asElement.js';

describe('getOneElement', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(getOneElement).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        test('should return the element when one is passed in', () => {
            const element = asElement('<div></div>');
            expect(getOneElement(element)).toBe(element);
        });

        [true, false, -1, 0, 1, NaN, '', null, undefined, [], () => {}].forEach((value) => {
            test(`should throw when "${value}" is passed in`, () => {
                expect(() => getOneElement(value)).toThrowError();
            });
        });

        [true, false, -1, 0, 1, NaN, '', null, undefined, [], () => {}].forEach((value) => {
            test(`should throw when a "${value}" is passed in as the "rootElement"`, () => {
                expect(() => getOneElement('string', value)).toThrowError();
            });
        });

        test('should return an element when exactly one element is found', () => {
            document.body.appendChild(asElement('<div id="root"></div>'));
            const element = getOneElement('#root', document.body);
            expect(element).toBeDefined();
        });

        test('should throw when no elements are found', () => {
            document.body.appendChild(asElement('<div id="root"></div>'));
            expect(() => getOneElement('#rootnotfound', document.body)).toThrowError();
        });

        test('should throw when multiple elements are found', () => {
            document.body.appendChild(asElement('<div class="classy"></div>'));
            document.body.appendChild(asElement('<div class="classy"></div>'));
            expect(() => getOneElement('.classy', document.body)).toThrowError();
        });

    });

});