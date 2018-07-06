import { TypeResolver } from '../../../src/util/TypeResolver';
import { asElement } from '../../../src/util/asElement';
import { UndefinedTypeHandler } from '../../../src/typeHandlers/UndefinedTypeHandler';
import { CollectionObjectTypeHandler } from '../../../src/typeHandlers/CollectionObjectTypeHandler';
import { NullTypeHandler } from '../../../src/typeHandlers/NullTypeHandler';

describe('TypeResolver', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(TypeResolver).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {

        let typeResolver;

        beforeEach(() => {
            typeResolver = new TypeResolver();
        });

        describe('getTypeFromElement', () => {

            [true, false, -1, 0, 1, NaN, '', null, undefined, [], () => {}].forEach((value) => {
                test(`should throw when "${value}" is passed in`, () => {
                    expect(() => typeResolver.getTypeFromElement(value)).toThrowError();
                });
            });

            [{declared: 'string', expected: 'string'}, {declared: 'checkbox', expected: 'boolean'}].forEach((typeDescriptor) => {
                test(`should return "${typeDescriptor.expected}" when the element type is "${typeDescriptor.declared}"`, () => {
                    let element = asElement('<div></div>');
                    element.type = typeDescriptor.declared;
                    expect(typeResolver.getTypeFromElement(element)).toEqual(typeDescriptor.expected);
                });
            });

            test(`should return "${NullTypeHandler.TYPE}" when the element type is "null" (string)`, () => {
                let element = asElement('<div></div>');
                    element.type = 'null';
                    expect(typeResolver.getTypeFromElement(element)).toEqual(NullTypeHandler.TYPE);
            });

            test(`should return "${UndefinedTypeHandler.TYPE}" when the element type is "undefined" (string)`, () => {
                let element = asElement('<div></div>');
                    element.type = 'undefined';
                    expect(typeResolver.getTypeFromElement(element)).toEqual(UndefinedTypeHandler.TYPE);
            });

            test('should invoke getTypeFromValue when an unknown native element type is encountered', () => {
                let element = asElement('<div></div>');
                    element.type = 'someType';
                    element.value = 'someValue';
                    jest.spyOn(typeResolver, 'getTypeFromValue');
                    typeResolver.getTypeFromElement(element);
                    expect(typeResolver.getTypeFromValue).toHaveBeenCalledWith(element.value);
            });

        });

        describe('getTypeFromValue', () => {

            test(`should return ${CollectionObjectTypeHandler.TYPE} when an array is passed in`, () => {
                expect(typeResolver.getTypeFromValue([])).toEqual(CollectionObjectTypeHandler.TYPE);
            });

            test(`should return ${NullTypeHandler.TYPE} when an array is passed in`, () => {
                expect(typeResolver.getTypeFromValue(null)).toEqual(NullTypeHandler.TYPE);
            });

            test(`should return ${UndefinedTypeHandler.TYPE} when an array is passed in`, () => {
                expect(typeResolver.getTypeFromValue(undefined)).toEqual(UndefinedTypeHandler.TYPE);
            });

            test('should return "number" when a number value is passed in', () => {
                expect(typeResolver.getTypeFromValue(123)).toEqual('number');
                expect(typeResolver.getTypeFromValue(-123)).toEqual('number');
                expect(typeResolver.getTypeFromValue(0)).toEqual('number');
                expect(typeResolver.getTypeFromValue(NaN)).toEqual('number');
            });

            test('should return "string" when a string value is passed in', () => {
                expect(typeResolver.getTypeFromValue('some string')).toEqual('string');
                expect(typeResolver.getTypeFromValue('  ')).toEqual('string');
                expect(typeResolver.getTypeFromValue('')).toEqual('string');
            });

            test('should return "boolean" when a boolean value is passed in', () => {
                expect(typeResolver.getTypeFromValue(true)).toEqual('boolean');
                expect(typeResolver.getTypeFromValue(false)).toEqual('boolean');
            });

            test('should return "object" when an object value is passed in', () => {
                expect(typeResolver.getTypeFromValue({})).toEqual('object');
            });

            test('should return "function" when a function value is passed in', () => {
                expect(typeResolver.getTypeFromValue(() => {})).toEqual('function');
            });


        });


        // test('should return undefined when no type is present on the element', () => {
        //     expect(TypeResolver(asElement('<div></div>'))).toEqual(UndefinedTypeHandler.TYPE);
        // });



        // test('should return the element name', () => {
        //     let elementType = 'elementtype';
        //     let element = asElement(`<div ${Constants.ATTRIBUTE_TYPE}="${elementType}"></div>`);
        //     expect (TypeResolver(element)).toEqual(elementType);
        // });

    });

});