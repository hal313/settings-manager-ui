import { CollectionObjectTypeHandler } from '../../../src/typeHandlers/CollectionObjectTypeHandler.js';
import { SettingModifier } from '../../../src/util/SettingModifier.js';
import { Constants } from '../../../src/Constants.js';

describe('CollectionObjectTypeHandler', () => {

    describe('Lifecycle', () => {

        test('should exist', () => {
            expect(CollectionObjectTypeHandler).toBeDefined();
        });

    });

    describe('API', () => {
        let collectionObjectTypeHandler;
        let settingModifier;

        beforeEach(() => {
            settingModifier = new SettingModifier();
            collectionObjectTypeHandler = settingModifier.typeHandlerManager.getTypeHandler('collection:object');
        });

        describe('createElement', () => {

            test('should throw when name is undefined', () => {
                expect(() => collectionObjectTypeHandler.createElement(undefined, 'someValue')).toThrowError();
            });

            test('should throw when name is null', () => {
                expect(() => collectionObjectTypeHandler.createElement(null, 'someValue')).toThrowError();
            });

            test('should throw when name is the empty string', () => {
                expect(() => collectionObjectTypeHandler.createElement('', 'someValue')).toThrowError();
            });

            test('should throw when name is whitespace', () => {
                expect(() => collectionObjectTypeHandler.createElement('   ', 'someValue')).toThrowError();
            });

            test('should create an element which holds array values', () => {
                const name = 'fieldName';
                const value = [
                    {first: 1},
                    {second: true},
                    {third: '3'}
                ];

                // Create the element
                const element = collectionObjectTypeHandler.createElement(name, value, settingModifier);

                // Check the type
                expect(element instanceof Element).toBeTruthy();
                // Check the required attributes
                expect(element.getAttribute(Constants.ATTRIBUTE_NAME)).toEqual(name);
                expect(element.getAttribute(Constants.ATTRIBUTE_CONTAINER_ELEMENT)).toBeDefined();
                // Check the value
                expect(element.value).toEqual(value);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

        describe('getValue', () => {

            test('should get the value from a self-created element', () => {
                const name = 'fieldName';
                const value = [
                    {first: 1},
                    {second: true},
                    {third: '3'}
                ];

                // Create the element
                const element = collectionObjectTypeHandler.createElement(name, value, settingModifier);

                // Check the value
                expect(collectionObjectTypeHandler.getValue(element, settingModifier)).toEqual(value);
            });

        });

        describe('setValue', () => {

            test('should set the value for a self-created element', () => {
                const name = 'fieldName';
                const value = [
                    {first: 1},
                    {second: true},
                    {third: '3'}
                ];
                const newValue = [
                    {first: 11},
                    {second: false},
                    {third: '33'}
                ]

                // Create the element
                const element = collectionObjectTypeHandler.createElement(name, value, settingModifier);

                // Precondition check
                expect(collectionObjectTypeHandler.getValue(element, settingModifier)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();

                collectionObjectTypeHandler.setValue(element, newValue, settingModifier);

                // Check the new value
                expect(collectionObjectTypeHandler.getValue(element, settingModifier)).toEqual(newValue);

                // Check the value
                expect(element.value).toEqual(newValue);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

            test.skip('should set the value for a self-created element with changing types', () => {
                const name = 'fieldName';
                const value = [
                    {first: 1},
                    {second: true},
                    {third: '3'}
                ];
                const newValue = [
                    {first: 'one'},
                    {second: false},
                    {third: 3}
                ]

                // Create the element
                const element = collectionObjectTypeHandler.createElement(name, value, settingModifier);

                // Precondition check
                expect(collectionObjectTypeHandler.getValue(element, settingModifier)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();


                // Set the value
                collectionObjectTypeHandler.setValue(element, newValue, settingModifier);


                // Check the new value
                expect(collectionObjectTypeHandler.getValue(element, settingModifier)).toEqual(newValue);
                // Check the value
                expect(element.value).toEqual(newValue);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

            test('should set the value for a self-created element when one element is removed', () => {
                const name = 'fieldName';
                const value = [
                    {first: 1},
                    {second: true},
                    {third: '3'}
                ];
                const newValue = [
                    {first: 1},
                    {second: false}
                ]

                // Create the element
                const element = collectionObjectTypeHandler.createElement(name, value, settingModifier);

                // Precondition check
                expect(collectionObjectTypeHandler.getValue(element, settingModifier)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();

                collectionObjectTypeHandler.setValue(element, newValue, settingModifier);

                // Check the new value
                expect(collectionObjectTypeHandler.getValue(element, settingModifier)).toEqual(newValue);

                // Check the value
                expect(element.value).toEqual(newValue);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

            test('should set the value for a self-created element when one element is changed', () => {
                const name = 'people';
                const value = [
                    {firstName: 'first name 1', lastName: 'last name 1'},
                    {firstName: 'first name 2', lastName: 'last name 2'},
                    {firstName: 'first name 3', lastName: 'last name 3'},
                ];
                const newValue = [
                    {firstName: 'first name 1', lastName: 'last name 1'},
                    {firstName: 'first name 2', lastName: 'last name 2'},
                    {firstName: 'first name CHANGED', lastName: 'last name CHANGED'},
                ]

                // Create the element
                const element = collectionObjectTypeHandler.createElement(name, value, settingModifier);

                // Precondition check
                expect(collectionObjectTypeHandler.getValue(element, settingModifier)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();

                collectionObjectTypeHandler.setValue(element, newValue, settingModifier);

                // Check the new value
                expect(collectionObjectTypeHandler.getValue(element, settingModifier)).toEqual(newValue);
                // Check the value
                expect(element.value).toEqual(newValue);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

            test('should set the value for a self-created element when one element is added', () => {
                const name = 'fieldName';
                const value = [
                    {first: 1},
                    {second: true},
                    {third: '3'}
                ];
                const newValue = [
                    {first: 11},
                    {second: false},
                    {third: '33'},
                    {fourth: 'four'}
                ]

                // Create the element
                const element = collectionObjectTypeHandler.createElement(name, value, settingModifier, {});

                // Precondition check
                expect(collectionObjectTypeHandler.getValue(element, settingModifier, {})).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();

                collectionObjectTypeHandler.setValue(element, newValue, settingModifier, {});

                // Check the new value
                expect(collectionObjectTypeHandler.getValue(element, settingModifier, {})).toEqual(newValue);

                // Check the value
                expect(element.value).toEqual(newValue);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

            test.skip('should set the value for a self-created element when one element is added with changing types', () => {
                const name = 'fieldName';
                const value = [
                    {first: 1},
                    {second: true},
                    {third: '3'}
                ];
                const newValue = [
                    {first: 'one'},
                    {second: false},
                    {third: 3},
                    {fourth: 'four'}
                ]

                // Create the element
                const element = collectionObjectTypeHandler.createElement(name, value, settingModifier);

                // Precondition check
                expect(collectionObjectTypeHandler.getValue(element, settingModifier)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();

                collectionObjectTypeHandler.setValue(element, newValue, settingModifier);

                // Check the new value
                expect(collectionObjectTypeHandler.getValue(element, settingModifier)).toEqual(newValue);

                // Check the value
                expect(element.value).toEqual(newValue);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

    });

});