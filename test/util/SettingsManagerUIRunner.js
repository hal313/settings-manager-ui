// TODO: Replace "should" with something else
// TODO: Test 'data-setting-container-member-validate="empty(value):ignore"'
// TODO: Test 'data-setting-container-member-validate="empty(object):ignore"'
// TODO: Test numeric/string/boolean/undefined on object/objectarray
// TODO: Test validators
// TODO: Test from handlers
// TODO: Test from native HTML
// TODO: Remove old code
// TODO: As class?

module.exports = function() {
    'use strict';

    return {
        runSpecs: function runSpecs(SettingsManagerUI) {

            describe('SettingsManagerUI', function() {

                describe('Lifecycle', function() {

                    test('SettingsManagerUI should exist as a global', function () {
                        expect(SettingsManagerUI).toEqual(expect.any(Function));
                    });

                });

                describe('API', function() {
                    // The settings manager
                    var settingsManagerUI;

                    beforeEach(function() {
                        // Instantiate the settings manager
                        settingsManagerUI = new SettingsManagerUI();
                    });


                    // describe('getValueFrom', () => {

                    //     test('should get a string value', () => {
                    //         const id = 'someString';
                    //         const selector = `#${id}`;
                    //         const initialValue = 'blarg!';

                    //         // Set up the DOM
                    //         document.body.innerHTML = `<input id="${id}" data-setting-name="someString" data-setting-type="string:text" type="text" value="${initialValue}"/>`;

                    //         // Check the initial state
                    //         expect(settingsManagerUI.getValueFrom(selector)).toBe(initialValue);
                    //     });

                    //     describe('boolean', () => {

                    //         [true, false].forEach((initialValue) => {
                    //             test(`should get a boolean value of ${initialValue}`, () => {
                    //                 const id = 'someBoolean';
                    //                 const selector = `#${id}`;

                    //                 // Set up the DOM
                    //                 document.body.innerHTML = `<input id="${id}" data-setting-name="someBoolean" data-setting-type="boolean:checkbox" type="checkbox" ${!!initialValue?'checked':''}/>`;

                    //                 // Check the initial state
                    //                 expect(settingsManagerUI.getValueFrom(selector)).toBe(initialValue);
                    //             });
                    //         });

                    //     });

                    //     test('should get a number value', () => {
                    //         const id = 'someNumber';
                    //         const selector = `#${id}`;
                    //         const initialValue = 101;

                    //         // Set up the DOM
                    //         document.body.innerHTML = `<input id="${id}" data-setting-name="someNumber" data-setting-type="number:number" type="number" value="${initialValue}" />`;

                    //         // Check the initial state
                    //         expect(settingsManagerUI.getValueFrom(selector)).toBe(initialValue);
                    //     });

                    //     test('should get an object value', () => {
                    //     //     document.body.innerHTML = `
                    //     //     <input id="string1" data-setting-name="os1_e1" data-setting-type="string:text" type="text" value="os1_e1-V" />
                    //     //     <input data-setting-name="os1_e2" data-setting-type="string:text" type="text" value="os1_e2-V" />
                    //     //     <input data-setting-name="os_b1" data-setting-type="boolean:checkbox" type="checkbox" checked/> os_b1
                    //     //     <input data-setting-name="os_b2" data-setting-type="boolean:checkbox" type="checkbox" /> os_b2
                    //     //     <input data-setting-name="os_n1" data-setting-type="number:number" type="number" value="2"/>
                    //     // `;
                    //         pending();
                    //     });

                    //     test('should get a string[] value', () => {
                    //         pending();
                    //     });

                    //     test('should get a boolean[] value', () => {
                    //         pending();
                    //     });

                    //     test('should get a number[] value', () => {
                    //         pending();
                    //     });

                    //     test('should get an object[] value', () => {
                    //         pending();
                    //     });

                    // });

                    // describe('setValueTo', () => {


                    //     test('should set a string value', () => {
                    //         const name = 'someString';
                    //         const selector = `#${name}`;
                    //         const initialValue = '';
                    //         const newValue = 'blarg!';

                    //         // Set up the DOM
                    //         document.body.innerHTML = `<input id="${name}" data-setting-name="${name}" data-setting-type="string:text" type="text" />`;

                    //         // Check the initial state
                    //         expect(settingsManagerUI.getValueFrom(selector)).toBe(initialValue);

                    //         // Set the value
                    //         settingsManagerUI.setValueTo(selector, newValue);

                    //         // Expect the value to have been changed
                    //         expect(settingsManagerUI.getValueFrom(selector)).toBe(newValue);
                    //     });

                    //     describe('boolean', () => {
                    //         [true, false].forEach((value) => {
                    //             test(`should set a boolean value of ${value}`, () => {
                    //                 const name = 'someBoolean';
                    //                 const selector = `#${name}`;
                    //                 const initialValue = value;
                    //                 const newValue = !initialValue;

                    //                 // Set up the DOM
                    //                 document.body.innerHTML = `<input id="${name}" data-setting-name="${name}" data-setting-type="boolean:checkbox" type="checkbox" ${!!value?'checked':''}/>`;

                    //                 // Check the initial state
                    //                 expect(settingsManagerUI.getValueFrom(selector)).toBe(initialValue);

                    //                 // Set the value
                    //                 settingsManagerUI.setValueTo(selector, newValue);

                    //                 // Expect the value to have been changed
                    //                 expect(settingsManagerUI.getValueFrom(selector)).toBe(newValue);
                    //             });
                    //         });
                    //     });

                    //     test('should set a number value', () => {
                    //         const id = 'someNumber';
                    //         const selector = `#${id}`;
                    //         const initialValue = 0;
                    //         const newValue = 101;

                    //         // Set up the DOM
                    //         document.body.innerHTML = `<input id="${id}" data-setting-name="${id}" data-setting-type="number:number" type="number" />`;

                    //         // Check the initial state
                    //         expect(settingsManagerUI.getValueFrom(selector)).toBe(initialValue);

                    //         // Set the value
                    //         settingsManagerUI.setValueTo(selector, newValue);

                    //         // Expect the value to have been changed
                    //         expect(settingsManagerUI.getValueFrom(selector)).toBe(newValue);
                    //     });

                    //     test('should set an object value', () => {
                    //         pending();
                    //     });

                    //     test('should set a string[] value', () => {
                    //         pending();
                    //     });

                    //     test('should set a boolean[] value', () => {
                    //         pending();
                    //     });

                    //     test('should set a number[] value', () => {
                    //         pending();
                    //     });

                    //     test('should set an object[] value', () => {
                    //         pending();
                    //     });

                    // });

                    describe('setSettings', () => {
                        // The id and selector
                        const id = 'root';
                        const selector = `#${id}`;

                        beforeEach(() => {
                            // data-setting-container=""
                            // data-setting-type="object"
                            // data-setting-name="settings"
                            // TODO: data-setting-type="object:default" must be set for some reason?!?
                            document.body.innerHTML = `<div id="${id}"></div>`
                        });

                        test('should set a basic object', () => {
                            const settings = {
                                stringValue: 'hello world!',
                                numberValue: 101,
                                booleanValue: true,
                                nullValue: null,
                                undefinedValue: undefined
                            };

                            // Set the settings
                            settingsManagerUI.setSettings(settings, selector);

                            // Check the HTML
                            expect(document.body.innerHTML).toMatchSnapshot();
                        });

                        test('should set a nested object', () => {
                            const settings = {
                                stringValue: 'hello world!',
                                numberValue: 101,
                                booleanValue: true,
                                objectValue: {
                                    nestedStringValue: 'another string value'
                                }
                            };

                            // Set the settings
                            settingsManagerUI.setSettings(settings, selector);

                            // Check the HTML
                            expect(document.body.innerHTML).toMatchSnapshot();
                        });

                        test('should set a deeply nested object', () => {
                            const settings = {
                                stringValue: 'hello world!',
                                numberValue: 101,
                                booleanValue: true,
                                objectValue: {
                                    nestedStringValue: 'another string value',
                                    nestedObjectValue: {
                                        nestedNestedStringValue: 'yet another string value'
                                    }
                                }
                            };

                            // Set the settings
                            settingsManagerUI.setSettings(settings, selector);

                            // Check the HTML
                            expect(document.body.innerHTML).toMatchSnapshot();
                        });

                        test('should set an array', () => {
                            const settings = {
                                people: [
                                    {name: 'John'},
                                    {name: 'David'},
                                    {name: 'Jennifer'}
                                ]
                            };

                            // Set the settings
                            settingsManagerUI.setSettings(settings, selector);

                            // Check the HTML
                            expect(document.body.innerHTML).toMatchSnapshot();
                        });

                    });

                    describe('getSettings', () => {
                        // TODO: Special cases, undefined, null, illegal structure, etc.
                        const id = 'root';
                        const selector = `#${id}`;

                        // TODO: Parse from HTML AND ALSO test from set/get

                        test('should get settings from a simple object', () => {
                            const expectedSettings = {
                                stringValue: 'hello world!',
                                numberValue: 101,
                                booleanValue: true
                            };

                            document.body.innerHTML = `
                            <div id="${id}" data-setting-container="" data-setting-type="object">
                                <input data-setting-name="stringValue"  data-setting-type="string:text"      type="text"     value="${expectedSettings.stringValue}">
                                <input data-setting-name="numberValue"  data-setting-type="number:number"    type="number"   value="${expectedSettings.numberValue}">
                                <input data-setting-name="booleanValue" data-setting-type="boolean:checkbox" type="checkbox" ${expectedSettings.booleanValue?'checked':''}>
                            </div>`;

                            const settings = settingsManagerUI.getSettings(selector);
                            expect(settings).toEqual(expectedSettings);
                        });

                        test('should get settings from a nested object', () => {
                            const expectedSettings = {
                                stringValue: 'hello world!',
                                numberValue: 101,
                                booleanValue: true,
                                objectValue: {
                                    nestedStringValue: 'another string value'
                                }
                            };

                            document.body.innerHTML = `
                            <div id="${id}" data-setting-container="" data-setting-type="object">
                                <input data-setting-name="stringValue"  data-setting-type="string:text"      type="text"     value="${expectedSettings.stringValue}">
                                <input data-setting-name="numberValue"  data-setting-type="number:number"    type="number"   value="${expectedSettings.numberValue}">
                                <input data-setting-name="booleanValue" data-setting-type="boolean:checkbox" type="checkbox" ${expectedSettings.booleanValue?'checked':''}>
                                <div data-setting-name="objectValue" data-setting-container="" data-setting-type="object">
                                    <input data-setting-name="nestedStringValue" data-setting-type="string:text" type="text" value="${expectedSettings.objectValue.nestedStringValue}">
                                </div>
                            </div>`;

                            const settings = settingsManagerUI.getSettings(selector);
                            expect(settings).toEqual(expectedSettings);
                        });

                        test('should get settings from a deeply nested object', () => {
                            const expectedSettings = {
                                stringValue: 'hello world!',
                                numberValue: 101,
                                booleanValue: true,
                                objectValue: {
                                    nestedStringValue: 'another string value',
                                    nestedObjectValue: {
                                        deeplyNestedStringValue: 'yet another string value'
                                    }
                                }
                            };

                            document.body.innerHTML = `
                            <div id="${id}" data-setting-container="" data-setting-type="object">
                                <input data-setting-name="stringValue"  data-setting-type="string:text"      type="text"     value="${expectedSettings.stringValue}">
                                <input data-setting-name="numberValue"  data-setting-type="number:number"    type="number"   value="${expectedSettings.numberValue}">
                                <input data-setting-name="booleanValue" data-setting-type="boolean:checkbox" type="checkbox" ${expectedSettings.booleanValue?'checked':''}>
                                <div data-setting-name="objectValue" data-setting-container="" data-setting-type="object">
                                    <input data-setting-name="nestedStringValue" data-setting-type="string:text" type="text" value="${expectedSettings.objectValue.nestedStringValue}">
                                    <div data-setting-name="nestedObjectValue" data-setting-container="" data-setting-type="object">
                                        <input data-setting-name="deeplyNestedStringValue" data-setting-type="string:text" type="text" value="${expectedSettings.objectValue.nestedObjectValue.deeplyNestedStringValue}">
                                    </div>
                                </div>
                            </div>`;

                            const settings = settingsManagerUI.getSettings(selector);
                            expect(settings).toEqual(expectedSettings);
                        });

                        test('should get an array', () => {
                            const settings = {
                                people: [
                                    {name: 'John'},
                                    {name: 'David'},
                                    {name: 'Jennifer'}
                                ]
                            };

                            // Set the settings
                            settingsManagerUI.setSettings(settings, selector);

                            let readSettings = settingsManagerUI.getSettings(selector);
                            expect(readSettings).toEqual(settings);

                            // Check the HTML
                            expect(document.body.innerHTML).toMatchSnapshot();
                        });
                    });

                    // describe('createElement', () => {

                    //     test('should create a string value', () => {
                    //         const name = 'fieldName';
                    //         const value = 'someValue';
                    //         const element = settingsManagerUI.createElement('string', name, value);

                    //         expect(element instanceof Element);
                    //         expect(element.name).toEqual(name);
                    //         expect(element.value).toEqual(value);

                    //         // console.log('element', element.attributes);
                    //         // Test against the kit
                    //         expect(settingsManagerUI.getValueFrom(element)).toEqual(value);
                    //     });

                    //     describe('boolean', () => {

                    //         [true, false].forEach((value) => {
                    //             test(`should create a boolean value of ${value}`, () => {
                    //                 const name = 'fieldName';
                    //                 const element = settingsManagerUI.createElement('boolean', name, value);

                    //                 expect(element instanceof Element);
                    //                 expect(element.name).toEqual(name);
                    //                 expect(element.checked).toEqual(value);

                    //                 // Test against the kit
                    //                 expect(settingsManagerUI.getValueFrom(element)).toEqual(value);
                    //             });
                    //         });

                    //     });

                    //     test('should create a number value', () => {
                    //         const name = 'fieldName';
                    //         const value = 100;
                    //         const element = settingsManagerUI.createElement('number', name, value);

                    //         expect(element instanceof Element);
                    //         expect(element.name).toEqual(name);
                    //         expect(+element.value).toEqual(value);

                    //         // Test against the kit
                    //         expect(settingsManagerUI.getValueFrom(element)).toEqual(value);
                    //     });

                    //     test('should create an object value', () => {
                    //         pending();
                    //     });

                    //     test('should create a string[] value', () => {
                    //         pending();
                    //     });

                    //     test('should create a boolean[] value', () => {
                    //         pending();
                    //     });

                    //     test('should create a number[] value', () => {
                    //         pending();
                    //     });

                    //     test('should create an object[] value', () => {
                    //         pending();
                    //     });

                    // });
                    // describe('Get Values From the UI', function() {

                    //     test('should get settings from the UI', function() {
                    //         var settings = settingsManagerUI.getSettingsFromElement();
                    //         expect(settings).toEqual(expect.any(Object));
                    //     });

                    //     // TODO: Check null, empty, etc.

                    //     describe('Data Types', function() {

                    //         var objectArray = [
                    //             {
                    //                 oa1_e1_m1: 'oa1_e1_m1-V',
                    //                 oa1_e1_m2: 'oa1_e1_m2-V'
                    //             },
                    //             {
                    //                 oa1_e2_m1: 'oa1_e2_m1-V',
                    //                 oa1_e2_m2: 'oa1_e2_m2-V'
                    //             }
                    //         ];

                    //         test('should get the boolean value for a boolean settings', function() {
                    //             var settings = settingsManagerUI.getSettingsFromElement();
                    //             expect(settings['boolean-single']).toEqual(true);
                    //         });

                    //         test('should get the number value for a number settings', function() {
                    //             var settings = settingsManagerUI.getSettingsFromElement();
                    //             expect(settings['number-single']).toEqual(1);
                    //         });

                    //         test('should get the string value for a string settings', function() {
                    //             var settings = settingsManagerUI.getSettingsFromElement();
                    //             expect(settings['string-single']).toEqual('someString');
                    //         });

                    //         test('should get the object value for a single object', function() {
                    //             var settings = settingsManagerUI.getSettingsFromElement();
                    //             var actual = settings['object-single'];
                    //             expect(actual).toEqual(objectSingle);
                    //         });

                    //         test('should get the object array for an object array', function() {
                    //             var settings = settingsManagerUI.getSettingsFromElement();
                    //             expect(settings['object-array-read']).toEqual(objectArray);
                    //         });

                    //     });

                    // });

                    // describe('Put Values in the UI', function() {

                    //     var objectArray = [
                    //         {
                    //             oa1_ex_m1: 'oa1_ex_m1-V',
                    //             oa1_ex_m2: 'oa1_ex_m2-V'
                    //         },
                    //         {
                    //             oa1_ex_m1: 'oa1_ex_m1-V',
                    //             oa1_ex_m2: 'oa1_ex_m2-V'
                    //         }
                    //     ];

                    //     describe('Data Types', function() {

                    //         test('should set a boolean value for a boolean setting', function() {
                    //             settingsManagerUI.putSettingsIntoElement({'boolean-single': true});
                    //             var settings = settingsManagerUI.getSettingsFromElement();
                    //             expect(settings['boolean-single']).toEqual(true);
                    //         });

                    //         test('should set the number value for a number setting', function() {
                    //             settingsManagerUI.putSettingsIntoElement({'number-single': 1});
                    //             var settings = settingsManagerUI.getSettingsFromElement();
                    //             expect(settings['number-single']).toEqual(1);
                    //         });

                    //         test('should set a string value for a string setting', function() {
                    //             settingsManagerUI.putSettingsIntoElement({'string-single': 'someString'});
                    //             var settings = settingsManagerUI.getSettingsFromElement();
                    //             expect(settings['string-single']).toEqual('someString');
                    //         });

                    //         test('should set the correct settings for a single object', function() {
                    //             settingsManagerUI.putSettingsIntoElement({'object-single': objectSingle});
                    //             var settings = settingsManagerUI.getSettingsFromElement();
                    //             expect(settings['object-single']).toEqual(objectSingle);
                    //         });

                    //         // TODO: This test fails on PhantomJS only - not sure why, but it appears to be linked to jQuery modifying the DOM
                    //         test('should create the correct number of \'element\' DOM elements for object arrays', function() {
                    //             var SettingsManagerUI = settingsManagerUI;
                    //             var $root = $('[data-setting-name=\'object-array-write\']');

                    //             // Be sure that only one root element exists
                    //             expect($root.length).toEqual(1);

                    //             // Be sure that no 'element' elements are present on the DOM
                    //             expect($root.find('[data-setting-container-element]').length).toEqual(0);

                    //             // Load the settings into the DOM
                    //             SettingsManagerUI.putSettingsIntoElement({'object-array-write': objectArray});

                    //             // Be sure that there are now two 'element' DOM elements
                    //             expect($root.find('[data-setting-container-element]').length).toEqual(2);
                    //         });

                    //         test('should set the correct settings for an object array', function() {
                    //             // Clear the inputs
                    //             $('input').val('');

                    //             // Empty the template additions
                    //             $('[object-array-write]').empty();

                    //             var settings;

                    //             // Load the settings into the DOM
                    //             settingsManagerUI.putSettingsIntoElement({'object-array-write': objectArray});

                    //             // Get the settings from the DOM
                    //             settings = settingsManagerUI.getSettingsFromElement();

                    //             // Expect that the loaded settings are the same as the set settings
                    //             expect(settings['object-array-write']).toEqual(objectArray);

                    //         });

                    //     });

                    // });

                });
            });

        }

    };

};
