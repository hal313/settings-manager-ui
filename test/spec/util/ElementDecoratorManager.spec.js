import { ElementDecoratorManager } from '../../../src/util/ElementDecoratorManager';
import { asElement } from '../../../src/util/asElement';
import { Constants } from '../../../src/Constants';

describe('ElementDecoratorManager', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(ElementDecoratorManager).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        let elementDecoratorManager;

        beforeEach(() => {
            elementDecoratorManager = new ElementDecoratorManager();
        });

        describe('addElementDecorator', () => {

            test('should exist as a function', () => {
                expect(elementDecoratorManager.addElementDecorator).toEqual(expect.any(Function));
            });

            [null, undefined, true, false, -1, 0, 1, NaN, [], '', '  ', {}].forEach((value) => {
                test(`should throw when "${value}" is passed in as the "type"`, () => {
                    expect(() => elementDecoratorManager.addElementDecorator(value)).toThrowError();
                });
            });

            [true, false, -1, 0, 1, NaN].forEach((value) => {
                test(`should throw when "${value}" is passed in as the "elementDecorator"`, () => {
                    expect(() => elementDecoratorManager.addElementDecorator('type', value)).toThrowError();
                });
            });

            ['', '  ', true, false, -1, 0, 1, NaN].forEach((value) => {
                test(`should throw when "${value}" is passed in as the "name"`, () => {
                    expect(() => elementDecoratorManager.addElementDecorator('type', {}, value)).toThrowError();
                });
            });

            test('should add a decorator', () => {
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(0);
                elementDecoratorManager.addElementDecorator('.*', {});
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(1);
            });

            test('should add multiple decorators for a type (string)', () => {
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(0);
                elementDecoratorManager.addElementDecorator('.*', {});
                elementDecoratorManager.addElementDecorator('.*', {});
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(2);
            });

            test('should add multiple decorators for a type (RegExp)', () => {
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(0);
                elementDecoratorManager.addElementDecorator(new RegExp('.*'), {});
                elementDecoratorManager.addElementDecorator(new RegExp('.*'), {});
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(2);
            });

            test('should add multiple decorators for a type (Function)', () => {
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(0);
                elementDecoratorManager.addElementDecorator(() => true, {});
                elementDecoratorManager.addElementDecorator(() => true, {});
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(2);
            });

            test('should add multiple decorators for a type with different patterns', () => {
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(0);
                elementDecoratorManager.addElementDecorator('sometype', {});
                elementDecoratorManager.addElementDecorator('.*', {});
                expect(elementDecoratorManager.getElementDecoratorsByType('sometype').length).toBe(2);
            });

        });

        describe('getElementDecoratorsByType', () => {

            [null, undefined, true, false, -1, 0, 1, NaN, [], '', '  ', {}].forEach((value) => {
                test(`should throw when ${value} is used as the "type" parameter`, () => {
                    expect(() => elementDecoratorManager.getElementDecoratorsByType(value)).toThrowError();
                });
            });

            test('should support one decorator', () => {
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(0);
                elementDecoratorManager.addElementDecorator('.*', {});
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(1);
            });

            test('should support multiple decorators for a type', () => {
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(0);
                elementDecoratorManager.addElementDecorator('.*', {});
                elementDecoratorManager.addElementDecorator('.*', {});
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(2);
            });

            test('should support multiple decorators for a type with different patterns', () => {
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(0);
                elementDecoratorManager.addElementDecorator('sometype', {});
                elementDecoratorManager.addElementDecorator('.*', {});
                expect(elementDecoratorManager.getElementDecoratorsByType('sometype').length).toBe(2);
            });

            test('should support multiple decorators for a type with different patterns on recall', () => {
                expect(elementDecoratorManager.getElementDecoratorsByType('pattern').length).toBe(0);
                elementDecoratorManager.addElementDecorator('sometype', {});
                elementDecoratorManager.addElementDecorator('.*', {});
                expect(elementDecoratorManager.getElementDecoratorsByType('sometype').length).toBe(2);
                expect(elementDecoratorManager.getElementDecoratorsByType('othertype').length).toBe(1);
            });

        });

        describe('applyElementDecorators', () => {

            [null, undefined, true, false, -1, 0, 1, NaN, [], '', '  ', {}].forEach((value) => {
                test(`should throw when ${value} is used as the "type" parameter`, () => {
                    expect(() => elementDecoratorManager.applyElementDecorators(value)).toThrowError();
                });
            });

            [null, undefined, true, false, -1, 0, 1, NaN, [], '', '  ', {}].forEach((value) => {
                test(`should throw when ${value} is used as the "type" parameter`, () => {
                    expect(() => elementDecoratorManager.applyElementDecorators('type', value)).toThrowError();
                });
            });

            [null, undefined, true, false, -1, 0, 1, NaN, [], '', '  ', {}].forEach((value) => {
                test(`should throw when ${value} is used as the "type" parameter`, () => {
                    expect(() => elementDecoratorManager.applyElementDecorators('type', asElement('<div></div>'), value)).toThrowError();
                });
            });

            test('should apply matching decorators to the element by type (string match)', () => {
                let element = asElement('<div></div>');
                let type = 'sometype';
                let allElementDecorator = jest.fn();
                let valueName = 'valueName';
                let valueValue = {};

                elementDecoratorManager.addElementDecorator('.*', {
                    decorate: allElementDecorator
                });
                element.type = type;

                elementDecoratorManager.applyElementDecorators(type, element, valueName, valueValue);

                expect(allElementDecorator).toBeCalledWith(element, type, valueName, valueValue);
                expect(allElementDecorator).toHaveBeenCalledTimes(1);
            });

            test('should apply matching decorators to the element by type (RegExp match)', () => {
                let element = asElement('<div></div>');
                let type = 'sometype';
                let allElementDecorator = jest.fn();
                let valueName = 'valueName';
                let valueValue = {};

                elementDecoratorManager.addElementDecorator(new RegExp('.*'), {
                    decorate: allElementDecorator
                });
                element.type = type;

                elementDecoratorManager.applyElementDecorators(type, element, valueName, valueValue);

                expect(allElementDecorator).toBeCalledWith(element, type, valueName, valueValue);
                expect(allElementDecorator).toHaveBeenCalledTimes(1);
            });

            test('should apply matching decorators to the element by type (function match)', () => {
                let element = asElement('<div></div>');
                let type = 'sometype';
                let allElementDecorator = jest.fn();
                let valueName = 'valueName';
                let valueValue = {};

                elementDecoratorManager.addElementDecorator(() => true, {
                    decorate: allElementDecorator
                });
                element.type = type;

                elementDecoratorManager.applyElementDecorators(type, element, valueName, valueValue);

                expect(allElementDecorator).toBeCalledWith(element, type, valueName, valueValue);
                expect(allElementDecorator).toHaveBeenCalledTimes(1);
            });

            test('should apply matching decorators to the element with multiple matches', () => {
                let element = asElement('<div></div>');
                let type = 'sometype';
                let allElementDecorator = jest.fn();
                let valueName = 'valueName';
                let valueValue = {};

                elementDecoratorManager.addElementDecorator('.*', {
                    decorate: allElementDecorator
                });
                elementDecoratorManager.addElementDecorator('.*', {
                    decorate: allElementDecorator
                });
                element.type = type;

                elementDecoratorManager.applyElementDecorators(type, element, valueName, valueValue);

                expect(allElementDecorator).toBeCalledWith(element, type, valueName, valueValue);
                expect(allElementDecorator).toHaveBeenCalledTimes(2);
            });

            test('should apply matching decorators to the element with specific pattern matches', () => {
                let element = asElement('<div></div>');
                let type = 'sometype';
                let allElementDecorator_1 = jest.fn();
                let allElementDecorator_2 = jest.fn();
                let valueName = 'valueName';
                let valueValue = {};

                // element.type = type;
                element.setAttribute(Constants.ATTRIBUTE_TYPE, type);

                elementDecoratorManager.addElementDecorator('.*', {
                    decorate: allElementDecorator_1
                });
                elementDecoratorManager.addElementDecorator(type, {
                    decorate: allElementDecorator_2
                });

                elementDecoratorManager.applyElementDecorators(type, element, valueName, valueValue);

                expect(allElementDecorator_1).toBeCalledWith(element, type, valueName, valueValue);
                expect(allElementDecorator_1).toHaveBeenCalledTimes(1);

                expect(allElementDecorator_2).toBeCalledWith(element, type, valueName, valueValue);
                expect(allElementDecorator_2).toHaveBeenCalledTimes(1);
            });

            test('should not apply non-matching decorators to the element', () => {
                let element = asElement('<div></div>');
                let type = 'sometype';
                let allElementDecorator = jest.fn();
                let valueName = 'valueName';
                let valueValue = {};

                elementDecoratorManager.addElementDecorator('.*', {
                    decorate: allElementDecorator
                });
                elementDecoratorManager.addElementDecorator(type.split('').reverse().join(''), {
                    decorate: allElementDecorator
                });
                element.type = type;

                elementDecoratorManager.applyElementDecorators(type, element, valueName, valueValue);

                expect(allElementDecorator).toBeCalledWith(element, type, valueName, valueValue);
                expect(allElementDecorator).toHaveBeenCalledTimes(1);
            });

            test('should apply decorators by name, then declared type', () => {
                let element = asElement('<div></div>');
                let type = 'sometype';
                let name_1 = 'namedecorator1';
                let name_2 = 'namedecorator2';
                let typeElementDecorator_1Executed;
                let typeElementDecorator_2Executed;
                let nameElementDecorator_1Executed;
                let nameElementDecorator_2Executed;

                let typeElementDecorator_1 = () => {
                    typeElementDecorator_1Executed = new Date().getTime();
                    expect(nameElementDecorator_1Executed).toBeDefined();
                    expect(nameElementDecorator_2Executed).toBeDefined();
                    expect(typeElementDecorator_2Executed).not.toBeDefined();
                };
                let typeElementDecorator_2 = () => {
                    typeElementDecorator_2Executed = new Date().getTime();
                    expect(nameElementDecorator_1Executed).toBeDefined();
                    expect(nameElementDecorator_2Executed).toBeDefined();
                    expect(typeElementDecorator_1Executed).toBeDefined();
                };
                let nameElementDecorator_1 = () => {
                    nameElementDecorator_1Executed = new Date().getTime();
                    expect(nameElementDecorator_2Executed).not.toBeDefined();
                    expect(typeElementDecorator_1Executed).not.toBeDefined();
                    expect(typeElementDecorator_2Executed).not.toBeDefined();
                };
                let nameElementDecorator_2 = () => {
                    nameElementDecorator_2Executed = new Date().getTime();
                    expect(nameElementDecorator_1Executed).toBeDefined();
                    expect(typeElementDecorator_1Executed).not.toBeDefined();
                    expect(typeElementDecorator_2Executed).not.toBeDefined();
                };

                // Setup the element
                element.setAttribute(ElementDecoratorManager.ATTRIBUTE_DECORATOR, `${name_1}, ${name_2}`);

                // Add the decorators
                elementDecoratorManager.addElementDecorator('.*', {
                    decorate: typeElementDecorator_1
                });
                elementDecoratorManager.addElementDecorator('.*', {
                    decorate: typeElementDecorator_2
                });
                elementDecoratorManager.addElementDecorator('nomatch', {
                    decorate: nameElementDecorator_1
                }, name_1);
                elementDecoratorManager.addElementDecorator('nomatch', {
                    decorate: nameElementDecorator_2
                }, name_2);


                // Apply the decorators
                elementDecoratorManager.applyElementDecorators(type, element, 'valueName');
            });

            test('should apply decorators by name, then declared type, running each decorator one time only', () => {
                let element = asElement('<div></div>');
                let type = 'sometype';
                let name_1 = 'namedecorator1';
                let name_2 = 'namedecorator2';

                let typeElementDecorator_1 = jest.fn();
                let typeElementDecorator_2 = jest.fn();
                let nameElementDecorator_1 = jest.fn();
                let nameElementDecorator_2 = jest.fn();

                // Setup the element
                element.setAttribute(ElementDecoratorManager.ATTRIBUTE_DECORATOR, `${name_1}, ${name_2}`);

                // Add the decorators
                elementDecoratorManager.addElementDecorator('.*', {
                    decorate: typeElementDecorator_1
                });
                elementDecoratorManager.addElementDecorator('.*', {
                    decorate: typeElementDecorator_2
                });
                elementDecoratorManager.addElementDecorator('nomatch', {
                    decorate: nameElementDecorator_1
                }, name_1);
                elementDecoratorManager.addElementDecorator('nomatch', {
                    decorate: nameElementDecorator_2
                }, name_2);


                // Apply the decorators
                elementDecoratorManager.applyElementDecorators(type, element, 'valueName');


                // Check the execution times
                expect(nameElementDecorator_1).toHaveBeenCalledTimes(1);
                expect(nameElementDecorator_2).toHaveBeenCalledTimes(1);
                expect(typeElementDecorator_1).toHaveBeenCalledTimes(1);
                expect(typeElementDecorator_2).toHaveBeenCalledTimes(1);
            });

        });

        describe('getElementDecoratorsByName', () => {

            [null, undefined, true, false, -1, 0, 1, NaN, [], '', '  ', {}].forEach((value) => {
                test(`should throw when ${value} is used as the "type" parameter`, () => {
                    expect(() => elementDecoratorManager.getElementDecoratorsByName(value)).toThrowError();
                });
            });

            test('should return the named decorators', () => {
                let name = 'decoratorName';
                let decorator = {
                    decorate: jest.fn()
                };
                expect(elementDecoratorManager.getElementDecoratorsByName(name).length).toBe(0);
                elementDecoratorManager.addElementDecorator('type', decorator, name);
                expect(elementDecoratorManager.getElementDecoratorsByName(name).length).toBe(1);
            });

            test('should not return the named decorators which do not match', () => {
                let name = 'decoratorName';
                let decorator = {
                    decorate: jest.fn()
                };
                expect(elementDecoratorManager.getElementDecoratorsByName(name).length).toBe(0);
                elementDecoratorManager.addElementDecorator('type', decorator, name);
                expect(elementDecoratorManager.getElementDecoratorsByName(name).length).toBe(1);
                expect(elementDecoratorManager.getElementDecoratorsByName(name.split('').reverse().join('')).length).toBe(0);
            });

        });

        describe('getElementDecoratorsByElement', () => {

            [null, undefined, true, false, -1, 0, 1, NaN, [], '', '  ', {}, () => {}].forEach((value) => {
                test(`should throw when ${value} is used as the "type" parameter`, () => {
                    expect(() => elementDecoratorManager.getElementDecoratorsByElement(value)).toThrowError();
                });
            });

            test('should return only the decorator matching the attribute value', () => {
                let name = 'name';
                let element = asElement(`<div ${ElementDecoratorManager.ATTRIBUTE_DECORATOR}="${name}"></div>`);
                elementDecoratorManager.addElementDecorator('.*', {}, name);
                expect(elementDecoratorManager.getElementDecoratorsByElement(element).length).toBe(1);
            });

            test('should return all the decorators matching the attribute value', () => {
                let names = ['name1', 'name2'];
                let element = asElement(`<div ${ElementDecoratorManager.ATTRIBUTE_DECORATOR}="${names.join(',')}"></div>`);
                names.forEach((name) => elementDecoratorManager.addElementDecorator('.*', {}, name));
                expect(elementDecoratorManager.getElementDecoratorsByElement(element).length).toBe(2);
            });

            test('should not return decorators not matching the name', () => {
                let name = 'name';
                let element = asElement(`<div ${ElementDecoratorManager.ATTRIBUTE_DECORATOR}="${name}"></div>`);

                // Add an element decorator that will NOT match on type, but will match on name
                elementDecoratorManager.addElementDecorator(name.split('').reverse().join(''), {}, name);
                // Verify that one decorator will match
                expect(elementDecoratorManager.getElementDecoratorsByElement(element).length).toBe(1);

                // Change the name of the decorator attribute
                element.setAttribute(ElementDecoratorManager.ATTRIBUTE_DECORATOR, name.split('').reverse().join(''));
                // Now, no decorators should match
                expect(elementDecoratorManager.getElementDecoratorsByElement(element).length).toBe(0);
            });

        });

    });

});