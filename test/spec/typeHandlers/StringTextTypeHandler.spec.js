import { StringTextTypeHandler } from '../../../src/typeHandlers/StringTextTypeHandler';
import { Constants } from '../../../src/Constants';

describe('StringTextTypeHandler', () => {

    describe('Lifecycle', () => {

        test('should exist', () => {
            expect(StringTextTypeHandler).toBeDefined();
        });

    });

    describe('API', () => {
        let stringTextTypeHandler;

        beforeEach(() => {
            stringTextTypeHandler = new StringTextTypeHandler();
        });

        describe('createElement', () => {

            test('should throw when name is undefined', () => {
                expect(() => stringTextTypeHandler.createElement(undefined, 'someValue')).toThrowError();
            });

            test('should throw when name is null', () => {
                expect(() => stringTextTypeHandler.createElement(null, 'someValue')).toThrowError();
            });

            test('should throw when name is the empty string', () => {
                expect(() => stringTextTypeHandler.createElement('', 'someValue')).toThrowError();
            });

            test('should throw when name is whitespace', () => {
                expect(() => stringTextTypeHandler.createElement('   ', 'someValue')).toThrowError();
            });

            test('should create a text string input element', () => {
                const name = 'fieldName';
                const value = 'some string value;'

                // Create the element
                const element = stringTextTypeHandler.createElement(name, value);

                // Check the type
                expect(element instanceof Element).toBeTruthy();
                // Check the required attributes
                expect(element.getAttribute('name')).toEqual(name);
                expect(element.getAttribute('type')).toEqual('text');
                expect(element.getAttribute('value')).toEqual(value);

                // Check the value
                expect(element.value).toEqual(value);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

        describe('getValue', () => {

            test('should get the value from a self-created element', () => {
                const name = 'fieldName';
                const value = 'some string value';

                // Create the element
                const element = stringTextTypeHandler.createElement(name, value);

                // Check the value
                expect(stringTextTypeHandler.getValue(element)).toEqual(value);
            });

        });

        describe('setValue', () => {

            test('should set the value for a self-created element', () => {
                const name = 'fieldName';
                const value = 'some string value';

                // Create the element
                const element = stringTextTypeHandler.createElement(name, value);

                // Precondition check
                expect(stringTextTypeHandler.getValue(element)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();

                // Set the new value
                const newValue = value.split('').reverse().join('');
                stringTextTypeHandler.setValue(element, newValue);

                // Check the new value
                expect(stringTextTypeHandler.getValue(element)).toEqual(newValue);

                // Check the value
                expect(element.value).toEqual(newValue);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

    });

});