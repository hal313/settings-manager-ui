import { getAllElements } from '../../../src/util/getAllElements.js';
import { asElement } from '../../../src/util/asElement.js';

describe('getAllElements', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(getAllElements).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        beforeEach(() => {
            document.body.innerHTML = '';
        });

        [true, false, -1, 0, 1, NaN, '', null, undefined, [], () => {}, asElement('<div></div>')].forEach((value) => {
            test(`should throw when "${value}" is passed in`, () => {
                expect(() => getAllElements(value)).toThrowError();
            });
        });

        [true, false, -1, 0, 1, NaN, '', [], () => {}].forEach((value) => {
            test(`should throw when a "${value}" is passed in as the "rootElement"`, () => {
                expect(() => getAllElements('div', value)).toThrowError();
            });
        });

        test('should return an element when exactly one element is found', () => {
            document.body.appendChild(asElement('<div id="root"></div>'));
            const elements = getAllElements('#root', document.body);
            expect(elements).toBeDefined();
            expect(elements.length).toBe(1);
        });

        test('should return an element when exactly one element is found', () => {
            document.body.appendChild(asElement('<div id="root"></div>'));
            const elements = getAllElements('#root', document.body);
            expect(elements).toBeDefined();
            expect(elements.length).toBe(1);
        });

        test('should throw when no elements are found and the root element is not specified', () => {
            document.body.appendChild(asElement('<div id="root"></div>'));
            const elements = getAllElements('#rootnotfound');
            expect(elements).toBeDefined();
            expect(elements.length).toBe(0);
        });

        test('should throw when no elements are found and the root element is not specified', () => {
            document.body.appendChild(asElement('<div id="root"></div>'));
            const elements = getAllElements('#rootnotfound');
            expect(elements).toBeDefined();
            expect(elements.length).toBe(0);
        });

        test('should throw when multiple elements are found', () => {
            document.body.appendChild(asElement('<div class="classy"></div>'));
            document.body.appendChild(asElement('<div class="classy"></div>'));
            const elements = getAllElements('.classy', document.body);
            expect(elements).toBeDefined();
            expect(elements.length).toBe(2);
        });

        test('should throw when multiple elements are found and the root element is not specified', () => {
            document.body.appendChild(asElement('<div class="classy"></div>'));
            document.body.appendChild(asElement('<div class="classy"></div>'));
            const elements = getAllElements('.classy');
            expect(elements).toBeDefined();
            expect(elements.length).toBe(2);
        });


    });

});