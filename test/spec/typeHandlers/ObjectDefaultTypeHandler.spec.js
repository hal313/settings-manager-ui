import { ObjectDefaultTypeHandler } from '../../../src/typeHandlers/ObjectDefaultTypeHandler.js';
import { SettingModifier } from '../../../src/util/SettingModifier.js';
import { Constants } from '../../../src/Constants.js';

describe('ObjectDefaultTypeHandler', () => {

    describe('Lifecycle', () => {

        test('should exist', () => {
            expect(ObjectDefaultTypeHandler).toBeDefined();
        });

    });

    describe('API', () => {
        let objectDefaultTypeHandler;
        let settingModifier;

        beforeEach(() => {
            settingModifier = new SettingModifier();
            objectDefaultTypeHandler = settingModifier.typeHandlerManager.getTypeHandlerByType(ObjectDefaultTypeHandler.TYPE);
        });


        describe('getType', () => {

            test('the type is "object:default"', () => {
                expect(objectDefaultTypeHandler.getType()).toEqual(ObjectDefaultTypeHandler.TYPE);
            });

        });

        describe('createElement', () => {

            test('should throw when name is undefined', () => {
                expect(() => objectDefaultTypeHandler.createElement(undefined, 'someValue')).toThrowError();
            });

            test('should throw when name is null', () => {
                expect(() => objectDefaultTypeHandler.createElement(null, 'someValue')).toThrowError();
            });

            test('should throw when name is the empty string', () => {
                expect(() => objectDefaultTypeHandler.createElement('', 'someValue')).toThrowError();
            });

            test('should throw when name is whitespace', () => {
                expect(() => objectDefaultTypeHandler.createElement('   ', 'someValue')).toThrowError();
            });

            test('should create an element with child elements representing the members as input elements', () => {
                const name = 'person';
                const value = {
                    name: 'person name',
                    age: 21,
                    registeredVoter: true
                };

                // Create the element
                const element = objectDefaultTypeHandler.createElement(name, value, settingModifier);

                // Check the type
                expect(element instanceof Element).toBeTruthy();
                // Check the required attributes
                expect(element.getAttribute('name')).toEqual(name);
                expect(element.hasAttribute(Constants.ATTRIBUTE_CONTAINER_ELEMENT)).toBe(true);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

            test('should create an element with deeply nested child elements representing the members as input elements', () => {
                const name = 'person';
                const value = {
                    name: {
                        first: 'firstname',
                        last: 'lastname',
                        optional: {
                            middle: 'middlename'
                        }
                    },
                    age: 21,
                    registeredVoter: true
                };

                // Create the element
                const element = objectDefaultTypeHandler.createElement(name, value, settingModifier);

                // Check the type
                expect(element instanceof Element).toBeTruthy();
                // Check the required attributes
                expect(element.hasAttribute(Constants.ATTRIBUTE_CONTAINER_ELEMENT)).toBe(true);
                // Check the value
                expect(element.value).toBe(value);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

        describe('getValue', () => {

            test('should get the value from a self-created element', () => {
                const name = 'person';
                const value = {
                    name: 'person name',
                    age: 21,
                    registeredVoter: true
                };

                // Create the element
                const element = objectDefaultTypeHandler.createElement(name, value, settingModifier);

                // Check the value
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(value);
            });

            test('should get the value from a self-created nested element', () => {
                const name = 'person';
                const value = {
                    name: {
                        first: 'person',
                        last: 'name'
                    },
                    age: 21,
                    registeredVoter: true
                };

                // Create the element
                const element = objectDefaultTypeHandler.createElement(name, value, settingModifier);

                // Check the value
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(value);
            });

            test('should get the value from a self-created deeply nested element', () => {
                const name = 'person';
                const value = {
                    name: {
                        first: 'person',
                        last: 'name',
                        optional: {
                            middle: 'middle'
                        }
                    },
                    age: 21,
                    registeredVoter: true
                };

                // Create the element
                const element = objectDefaultTypeHandler.createElement(name, value, settingModifier);

                // Check the value
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(value);
            });

        });

        describe('setValue', () => {

            test('should set the value for a self-created simple element', () => {
                const name = 'person';
                const value = {
                    name: 'person name',
                    age: 21,
                    registeredVoter: true
                };

                // Create the element
                const element = objectDefaultTypeHandler.createElement(name, value, settingModifier);

                // Precondition check
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();

                // Set the new value
                //
                const newValue = JSON.parse(JSON.stringify(value));
                newValue.name = 'name, person';
                delete newValue.age;
                // Set the value
                objectDefaultTypeHandler.setValue(element, newValue, settingModifier);


                // Check the new value
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(newValue);
                // Check the value
                expect(element.value).toBe(newValue);

                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

            test('should remove a child element from the DOM when the value no longer exists', () => {
                const name = 'person';
                const value = {
                    name: 'person name',
                    age: 21,
                    registeredVoter: true
                };

                // Create the element
                const element = objectDefaultTypeHandler.createElement(name, value, settingModifier);

                // Precondition check
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();

                // Set the new value
                //
                // Create the value
                const newValue = JSON.parse(JSON.stringify(value));
                delete newValue.age;
                // Set the new value
                objectDefaultTypeHandler.setValue(element, newValue, settingModifier);


                // Check the new value
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(newValue);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

            test('should update a child element value when the value exists in the DOM and in the value object', () => {
                const name = 'person';
                const value = {
                    name: 'person name',
                    age: 21,
                    registeredVoter: true
                };

                // Create the element
                const element = objectDefaultTypeHandler.createElement(name, value, settingModifier);

                // Precondition check
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();


                // Set the new value
                //
                // Create the new value
                const newValue = JSON.parse(JSON.stringify(value));
                newValue.age = 22;
                newValue.name = 'name, person';
                // Set the value
                objectDefaultTypeHandler.setValue(element, newValue, settingModifier);


                // Check the new value
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(newValue);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

            test('should add a child element value when the setting does not exist in the DOM and the setting is in the value object', () => {
                const name = 'person';
                const value = {
                    name: 'person name',
                    age: 21,
                    registeredVoter: true
                };

                // Create the element
                const element = objectDefaultTypeHandler.createElement(name, value, settingModifier);

                // Validate that the element has the correct value
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();


                // Set the new value
                // Create a clone of the old value
                const newValue = JSON.parse(JSON.stringify(value));
                newValue.eyeColor = 'brown';
                // Set the value
                objectDefaultTypeHandler.setValue(element, newValue, settingModifier);

                // Check the new settings object
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(newValue);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

            test('should add a child element value when the setting does not exist in the DOM and the setting is in the value object during an update', () => {
                const name = 'person';
                const value = {
                    name: 'person name',
                    age: 21,
                    registeredVoter: true
                };

                // Create the element
                const element = objectDefaultTypeHandler.createElement(name, value, settingModifier);

                // Validate that the element has the correct value
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(value);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();


                // Set the new value
                //
                // Create a clone of the old value
                const newValue = JSON.parse(JSON.stringify(value));
                newValue.height = {
                    feet: 5,
                    inches: 10
                };
                // Set the value
                objectDefaultTypeHandler.setValue(element, newValue, settingModifier);


                // Check the new settings object
                expect(objectDefaultTypeHandler.getValue(element, settingModifier)).toEqual(newValue);
                // Match the HTML
                expect(element.outerHTML).toMatchSnapshot();
            });

        });

    });

});
