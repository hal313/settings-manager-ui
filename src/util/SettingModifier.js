import { getDeclaredTypeFromElement } from './getDeclaredTypeFromElement.js';
import { Constants } from '../Constants.js';
import { StringTextTypeHandler } from '../typeHandlers/StringTextTypeHandler.js';
import { BooleanCheckboxTypeHandler } from '../typeHandlers/BooleanCheckboxTypeHandler.js';
import { NumberNumberTypeHandler } from '../typeHandlers/NumberNumberTypeHandler.js';
import { ObjectDefaultTypeHandler } from '../typeHandlers/ObjectDefaultTypeHandler.js';
import { UndefinedTypeHandler } from '../typeHandlers/UndefinedTypeHandler.js';
import { NullTypeHandler } from '../typeHandlers/NullTypeHandler.js';
import { CollectionObjectTypeHandler } from '../typeHandlers/CollectionObjectTypeHandler.js';
import { StringPasswordTypeHandler } from '../typeHandlers/StringPasswordTypeHandler.js';
import { TypeHandlerManager } from './TypeHandlerManager.js';
import { TypeDecoratorManager } from './TypeDecoratorManager.js';

const ATTRIBUTE_FULLY_QUALIFIED_NAME = `${Constants.ATTRIBUTE_PREFIX}-fully-qualified-name`;
export class SettingModifier {

    constructor() {
        this.typeHandlerManager = new TypeHandlerManager();
        this.typeDecoratorManager = new TypeDecoratorManager();


        const stringTextTypeHandler = new StringTextTypeHandler();
        const booleanCheckboxTypeHandler = new BooleanCheckboxTypeHandler();
        const numberNumberTypeHandler = new NumberNumberTypeHandler();
        const objectDefaultTypeHandler = new ObjectDefaultTypeHandler();
        const undefinedTypeHandler = new UndefinedTypeHandler();
        const nullTypeHandler = new NullTypeHandler();
        const collectionObjectTypeHandler = new CollectionObjectTypeHandler();
        const stringPasswordTypeHandler = new StringPasswordTypeHandler();


        this.typeHandlerManager.addTypeHandler(booleanCheckboxTypeHandler);
        this.typeHandlerManager.addTypeHandler(stringTextTypeHandler);
        this.typeHandlerManager.addTypeHandler(numberNumberTypeHandler);
        this.typeHandlerManager.addTypeHandler(objectDefaultTypeHandler);
        this.typeHandlerManager.addTypeHandler(undefinedTypeHandler);
        this.typeHandlerManager.addTypeHandler(nullTypeHandler);
        this.typeHandlerManager.addTypeHandler(collectionObjectTypeHandler);
        this.typeHandlerManager.addTypeHandler(stringPasswordTypeHandler);


        // Add default handlers
        this.typeHandlerManager.setDefaultHandler('string', stringTextTypeHandler.getType());
        this.typeHandlerManager.setDefaultHandler('boolean', booleanCheckboxTypeHandler.getType());
        this.typeHandlerManager.setDefaultHandler('number', numberNumberTypeHandler.getType());
        this.typeHandlerManager.setDefaultHandler('object', objectDefaultTypeHandler.getType());
        this.typeHandlerManager.setDefaultHandler('collection', collectionObjectTypeHandler.getType());

        this.typeDecoratorManager.addTypeDecorators('.*', (element, type, name, value) => {
            element.setAttribute(Constants.ATTRIBUTE_NAME, name);
            element.setAttribute(Constants.ATTRIBUTE_TYPE, type);
        });

        this.path=[];
    }

    getValue(element) {
        let type = getDeclaredTypeFromElement(element);
        let handler = this.typeHandlerManager.getTypeHandler(type);
        return handler.getValue(element, this);
    };

    setValue(element, value) {
        let type = getDeclaredTypeFromElement(element);
        let handler = this.typeHandlerManager.getTypeHandler(type);
        return handler.setValue(element, value, this);
    };

    createElement(name, value) {
        // Get the handler
        let handler = this.typeHandlerManager.inferTypeHandler(name, value);

        // Push the name onto the path
        this.path.push(name);
        // Create the element
        let element = handler.createElement(name, value, this);
        // Set the fully qualified name
        element.setAttribute(ATTRIBUTE_FULLY_QUALIFIED_NAME, this.path.join('.'));
        // Pop the path
        this.path.pop();

        // Apply decorators
        element = this.typeDecoratorManager.applyTypeDecorators(handler.getType(), element, name, value);

        return element;
    };




    addTypeHandler(typeHandler) {
        this.typeHandlerManager.addTypeHandler(typeHandler);
    };

    addTypeDecorator(type, decoratorFn) {
        this.typeDecoratorManager.addTypeDecorators(type, decoratorFn);
    };

    addTypeDecorators(type, decoratorFns) {
        this.addTypeDecorator(type, decoratorFns);
    };

    setDefaultHandler(type, typeHandler) {
        this.typeHandlerManager.setDefaultHandler(type, typeHandler);
    }

    decorateAsRoot(element) {
        if (!element.hasAttribute(Constants.ATTRIBUTE_TYPE)) {
            element.setAttribute(Constants.ATTRIBUTE_TYPE, this.typeHandlerManager.getTypeHandler('object').getType());
        }
    }

};
