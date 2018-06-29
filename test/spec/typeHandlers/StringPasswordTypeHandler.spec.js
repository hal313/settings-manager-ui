import { StringPasswordTypeHandler } from '../../../src/typeHandlers/StringPasswordTypeHandler';
import { Constants } from '../../../src/Constants';

// TODO: Test types (or cast to boolean)
// TODO: Handle bad cases (null element, etc)
describe('StringPasswordTypeHandler', () => {

    describe('Lifecycle', () => {

        test('should exist', () => {
            expect(StringPasswordTypeHandler).toBeDefined();
        });

    });

    describe('API', () => {
        let stringPasswordTypeHandler;

        beforeEach(() => {
            stringPasswordTypeHandler = new StringPasswordTypeHandler();
        });

        describe('createElement', () => {

            test('should throw when name is undefined', () => {
                expect(() => stringPasswordTypeHandler.createElement(undefined, 'someValue')).toThrowError();
            });

            test('should throw when name is null', () => {
                expect(() => stringPasswordTypeHandler.createElement(null, 'someValue')).toThrowError();
            });

            test('should throw when name is the empty string', () => {
                expect(() => stringPasswordTypeHandler.createElement('', 'someValue')).toThrowError();
            });

            test('should throw when name is whitespace', () => {
                expect(() => stringPasswordTypeHandler.createElement('   ', 'someValue')).toThrowError();
            });

            test('should create a text string input element', () => {
                const name = 'fieldName';
                const value = 'some string value;'

                // Create the element
                const element = stringPasswordTypeHandler.createElement(name, value);

                // Check the type
                expect(element instanceof Element).toBeTruthy();
                // Check the required attributes
                expect(element.getAttribute('name')).toEqual(name);
                expect(element.getAttribute('type')).toEqual('password');
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
                const element = stringPasswordTypeHandler.createElement(name, value);

                // Check the value
                expect(stringPasswordTypeHandler.getValue(element)).toEqual(value);
            });

        });

        describe('setValue', () => {

            test('should set the value for a self-created element', () => {
                const name = 'fieldName';
                const value = 'some string value';

                // Create the element
                const element = stringPasswordTypeHandler.createElement(name, value);

                // Precondition check
                expect(stringPasswordTypeHandler.getValue(element)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();

                // Set the new value
                const newValue = value.split('').reverse().join('');
                stringPasswordTypeHandler.setValue(element, newValue);

                // Check the new value
                expect(stringPasswordTypeHandler.getValue(element)).toEqual(newValue);

                // Check the value
                expect(element.value).toEqual(newValue);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

    });

});