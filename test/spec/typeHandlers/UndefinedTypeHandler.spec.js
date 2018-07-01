import { UndefinedTypeHandler } from '../../../src/typeHandlers/UndefinedTypeHandler.js';

describe('UndefinedTypeHandler', () => {

    describe('Lifecycle', () => {

        test('should exist', () => {
            expect(UndefinedTypeHandler).toBeDefined();
        });

    });

    describe('API', () => {
        let undefinedTypeHandler;

        beforeEach(() => {
            undefinedTypeHandler = new UndefinedTypeHandler();
        });

        describe('createElement', () => {

            test('should throw when name is undefined', () => {
                expect(() => undefinedTypeHandler.createElement(undefined, 'someValue')).toThrowError();
            });

            test('should throw when name is null', () => {
                expect(() => undefinedTypeHandler.createElement(null, 'someValue')).toThrowError();
            });

            test('should throw when name is the empty string', () => {
                expect(() => undefinedTypeHandler.createElement('', 'someValue')).toThrowError();
            });

            test('should throw when name is whitespace', () => {
                expect(() => undefinedTypeHandler.createElement('   ', 'someValue')).toThrowError();
            });

            test('should create an undefined value element', () => {
                const name = 'fieldName';

                // Create the element
                const element = undefinedTypeHandler.createElement(name, undefined);

                // Check the type
                expect(element instanceof Element).toBeTruthy();
                // Check the value
                expect(element.value).toEqual(undefined);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

        describe('getValue', () => {

            test('should get the value from a self-created element', () => {
                const name = 'fieldName';

                // Create the element
                const element = undefinedTypeHandler.createElement(name, undefined);

                // Check the value
                expect(undefinedTypeHandler.getValue(element)).toEqual(undefined);
            });

        });

        describe('setValue', () => {

            test('should set the value for a self-created element', () => {
                const name = 'fieldName';

                // Create the element
                const element = undefinedTypeHandler.createElement(name, undefined);

                // Precondition check
                expect(undefinedTypeHandler.getValue(element)).toEqual(undefined);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();

                undefinedTypeHandler.setValue(element, 'not undefined value');

                // Check the new value
                expect(undefinedTypeHandler.getValue(element)).toEqual(undefined);

                // Check the value
                expect(element.value).toEqual(undefined);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

    });

});