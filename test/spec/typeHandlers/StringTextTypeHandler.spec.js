import { StringTextTypeHandler } from '../../../src/typeHandlers/StringTextTypeHandler';
import { Constants } from '../../../src/Constants';

// TODO: Test types (or cast to boolean)
// TODO: Handle bad cases (null element, etc)
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
                expect(() => stringTextTypeHandler.createElement(undefined, 'someValue')).toThrow();
            });

            test('should throw when name is null', () => {
                expect(() => stringTextTypeHandler.createElement(null, 'someValue')).toThrow();
            });

            test('should throw when name is the empty string', () => {
                expect(() => stringTextTypeHandler.createElement('', 'someValue')).toThrow();
            });

            test('should throw when name is whitespace', () => {
                expect(() => stringTextTypeHandler.createElement('   ', 'someValue')).toThrow();
            });

            test('should create a text string input element', () => {
                const name = 'fieldName';
                const value = 'some string value;'

                // Create the element
                const element = stringTextTypeHandler.createElement(name, value);

                // Check the type
                expect(element instanceof Element).toBeTruthy();
                // Check the required attributes
                expect(element.getAttribute(Constants.ATTRIBUTE_NAME)).toEqual(name);
                expect(element.getAttribute(Constants.ATTRIBUTE_TYPE)).toEqual(stringTextTypeHandler.getType());
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