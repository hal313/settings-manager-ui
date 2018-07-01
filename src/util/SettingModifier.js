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
import { ElementDecoratorManager } from './ElementDecoratorManager';
import { NameElementDecorator } from '../elementDecorators/NameElementDecorator.js';
import { TypeElementDecorator } from '../elementDecorators/TypeElementDecorator.js';

const ATTRIBUTE_FULLY_QUALIFIED_NAME = `${Constants.ATTRIBUTE_PREFIX}-fully-qualified-name`;
export class SettingModifier {

    constructor() {
        this.typeHandlerManager = new TypeHandlerManager();
        this.elementDecoratorManager = new ElementDecoratorManager();


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


        // Add element decorators
        this.elementDecoratorManager.addElementDecorator('.*', new TypeElementDecorator());
        this.elementDecoratorManager.addElementDecorator('.*', new NameElementDecorator());

        this.path = [];
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
        element = this.elementDecoratorManager.applyElementDecorators(handler.getType(), element, name, value);

        return element;
    };




    addTypeHandler(typeHandler) {
        this.typeHandlerManager.addTypeHandler(typeHandler);
    };

    addElementDecorator(type, elementDecorator) {
        this.elementDecoratorManager.addElementDecorators(type, elementDecorator);
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
