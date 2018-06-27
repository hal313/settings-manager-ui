import { BooleanCheckboxTypeHandler } from '../../../src/typeHandlers/BooleanCheckboxTypeHandler';
import { Constants } from '../../../src/Constants';
import { asBoolean } from '../../../src/util/asBoolean';

// TODO: Test types (or cast to boolean)
// TODO: Handle bad cases (null element, etc)
describe('BooleanCheckboxTypeHandler', () => {

    describe('Lifecycle', () => {

        test('should exist', () => {
            expect(BooleanCheckboxTypeHandler).toBeDefined();
        });

    });

    describe('API', () => {
        let booleanCheckboxTypeHandler;

        beforeEach(() => {
            booleanCheckboxTypeHandler = new BooleanCheckboxTypeHandler();
        });

        describe('createElement', () => {

            test('should throw when name is undefined', () => {
                expect(() => booleanCheckboxTypeHandler.createElement(undefined, true)).toThrowError();
            });

            test('should throw when name is null', () => {
                expect(() => booleanCheckboxTypeHandler.createElement(null, true)).toThrowError();
            });

            test('should throw when name is the empty string', () => {
                expect(() => booleanCheckboxTypeHandler.createElement('', true)).toThrowError();
            });

            test('should throw when name is whitespace', () => {
                expect(() => booleanCheckboxTypeHandler.createElement('   ', true)).toThrowError();
            });

            [true, false].forEach((value) => {
                const name = 'fieldName';

                test(`should create a checkbox element with a "${value}" value`, () => {
                    // Create the element
                    const element = booleanCheckboxTypeHandler.createElement(name, value);

                    // Check the type
                    expect(element instanceof Element).toBeTruthy();
                    // Check the required attributes
                    expect(element.getAttribute(Constants.ATTRIBUTE_NAME)).toEqual(name);
                    expect(element.getAttribute(Constants.ATTRIBUTE_TYPE)).toEqual(booleanCheckboxTypeHandler.getType());
                    // Check the value
                    expect(element.checked).toEqual(value);
                    expect(asBoolean(element.value)).toEqual(value);

                    // Match the HTML
                    expect(element.outerHTML).toMatchSnapshot();
                });
            });

        });

        describe('getValue', () => {

            [true, false].forEach((value) => {
                const name = 'fieldName';

                test(`should get the "${value}" value from a self-created element`, () => {
                    // Create the element
                    const element = booleanCheckboxTypeHandler.createElement(name, value);

                    // Check the value
                    expect(booleanCheckboxTypeHandler.getValue(element)).toEqual(value);
                });
            });

        });

        describe('setValue', () => {

            [true, false].forEach((value) => {
                const name = 'fieldName';

                test(`should set the value to "${value}" for a self-created element`, () => {
                    // Create the element
                    const element = booleanCheckboxTypeHandler.createElement(name, value);

                    // Precondition check
                    expect(booleanCheckboxTypeHandler.getValue(element)).toEqual(value);
                    // Match the HTML
                    expect(element.outerHTML).toMatchSnapshot();

                    // Set the new value
                    const newValue = !value;
                    booleanCheckboxTypeHandler.setValue(element, newValue);

                    // Check the new value
                    expect(booleanCheckboxTypeHandler.getValue(element)).toEqual(newValue);

                    // Check the value
                    expect(element.checked).toEqual(newValue);

                    // Match the HTML
                    expect(element.outerHTML).toMatchSnapshot();
                });

            });

        });

    });

});