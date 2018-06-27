import { NullTypeHandler } from '../../../src/typeHandlers/NullTypeHandler';
import { Constants } from '../../../src/Constants';

// TODO: Test types (or cast to boolean)
// TODO: Handle bad cases (null element, etc)
describe('NullTypeHandler', () => {

    describe('Lifecycle', () => {

        test('should exist', () => {
            expect(NullTypeHandler).toBeDefined();
        });

    });

    describe('API', () => {
        let nullTypeHandler;

        beforeEach(() => {
            nullTypeHandler = new NullTypeHandler();
        });

        describe('createElement', () => {

            test('should throw when name is undefined', () => {
                expect(() => nullTypeHandler.createElement(undefined, 'someValue')).toThrowError();
            });

            test('should throw when name is null', () => {
                expect(() => nullTypeHandler.createElement(null, 'someValue')).toThrowError();
            });

            test('should throw when name is the empty string', () => {
                expect(() => nullTypeHandler.createElement('', 'someValue')).toThrowError();
            });

            test('should throw when name is whitespace', () => {
                expect(() => nullTypeHandler.createElement('   ', 'someValue')).toThrowError();
            });

            test('should create a null value element', () => {
                const name = 'fieldName';

                // Create the element
                const element = nullTypeHandler.createElement(name, null);

                // Check the type
                expect(element instanceof Element).toBeTruthy();
                // Check the required attributes
                expect(element.getAttribute(Constants.ATTRIBUTE_NAME)).toEqual(name);
                expect(element.getAttribute(Constants.ATTRIBUTE_TYPE)).toEqual(nullTypeHandler.getType());
                // Check the value
                expect(element.value).toEqual(null);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

        describe('getValue', () => {

            test('should get the value from a self-created element', () => {
                const name = 'fieldName';

                // Create the element
                const element = nullTypeHandler.createElement(name, null);

                // Check the value
                expect(nullTypeHandler.getValue(element)).toEqual(null);
            });

        });

        describe('setValue', () => {

            test('should set the value for a self-created element', () => {
                const name = 'fieldName';

                // Create the element
                const element = nullTypeHandler.createElement(name, null);

                // Precondition check
                expect(nullTypeHandler.getValue(element)).toEqual(null);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();

                // Set the new value
                nullTypeHandler.setValue(element, 'not null value');

                // Check the new value
                expect(nullTypeHandler.getValue(element)).toEqual(null);

                // Check the value
                expect(element.value).toEqual(null);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

    });

});