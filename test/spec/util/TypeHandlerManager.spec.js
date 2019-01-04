import { TypeHandlerManager } from '../../../src/util/TypeHandlerManager';
import { TypeHandler } from '../../../src/typeHandlers/TypeHandler';

describe('TypeHandlerManager', () => {

    describe('Lifecycle', () => {

        test('exists as a function', () => {
            expect(TypeHandlerManager).toEqual(expect.any(Function));
        });

    });

    describe('API', function () {
        class DummyTypeHandler extends TypeHandler{
            getType() {
                return 'dummy';
            }
        }

        let typeHandlerManager;

        beforeEach(() => {
            typeHandlerManager = new TypeHandlerManager();
        });

        describe('addTypeHandler', () => {

            [null, undefined, true, false, -1, 0, 1, NaN, [], {}, () => {}, '', '  '].forEach(value => {
                test(`should throw for "${value}"`, () => {
                    expect(() => typeHandlerManager.addTypeHandler(value)).toThrowError();
                });
            });

            test('should add a type handler', () => {
                let typeHandler = new DummyTypeHandler();
                let type = typeHandler.getType();
                typeHandlerManager.addTypeHandler(typeHandler);
                expect(typeHandlerManager.getTypeHandlerByType(type)).toBe(typeHandler);
            });

            test('should throw when a duplicate type is added', () => {
                typeHandlerManager.addTypeHandler(new DummyTypeHandler());
                expect(() => typeHandlerManager.addTypeHandler(new DummyTypeHandler())).toThrowError();
            });

            describe('With name', () => {

                [true, false, -1, 0, 1, NaN, [], {}, () => {}, '', '  '].forEach(value => {
                    test(`should throw for "${value}"`, () => {
                        expect(() => typeHandlerManager.addTypeHandler(new DummyTypeHandler(), value)).toThrowError();
                    });
                });

                test('should add by name', () => {
                    let typeHandler = new DummyTypeHandler();
                    let name = 'name';
                    typeHandlerManager.addTypeHandler(typeHandler, name);
                    expect(typeHandlerManager.getTypeHandlerByName(name)).toBe(typeHandler);
                });

                test('should throw when adding duplicate names', () => {
                    let name = 'name';
                    typeHandlerManager.addTypeHandler(new DummyTypeHandler(), name);

                    expect(() => typeHandlerManager.addTypeHandler(new DummyTypeHandler(), name)).toThrowError();
                });

            });

        });

        describe('getTypeHandler', () => {

            test('should return the type handler by type', () => {
                let typeHandler = new DummyTypeHandler();
                typeHandlerManager.addTypeHandler(typeHandler);
                expect(typeHandlerManager.getTypeHandlerByType(typeHandler.getType())).toBe(typeHandler);
            });

            test('should throw when no handler matches', () => {
                expect(() => typeHandlerManager.getTypeHandler('nomatch')).toThrowError();
            });

        });

        describe('setTypeOverride', () => {

            test('should return an overridden type', () => {
                let typeHandler = new DummyTypeHandler();
                let type = typeHandler.getType();

                let mappingType = `${type}:${type}`;
                typeHandlerManager.addTypeHandler(typeHandler);
                typeHandlerManager.setTypeOverride(mappingType, type);

                expect(typeHandlerManager.getTypeHandlerByType(mappingType)).toEqual(typeHandler);
            });

            test('should return an overridden type (multiple overrides)', () => {
                let typeHandler = new DummyTypeHandler();
                let type = typeHandler.getType();

                let mappingType1 = `${type}:${type}`;
                let mappingType2 = `${type}:${type}:${type}`;
                typeHandlerManager.addTypeHandler(typeHandler);
                typeHandlerManager.setTypeOverride(mappingType1, type);
                typeHandlerManager.setTypeOverride(mappingType2, mappingType1);

                expect(typeHandlerManager.getTypeHandlerByType(mappingType2)).toEqual(typeHandler);
            });

        });

        describe('addTypeHandler', () => {});
    });

});