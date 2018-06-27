import { getTypeFromElement } from './getTypeFromElement.js';
import { getTypeFromValue } from './getTypeFromValue.js';

// TODO: Tests

export class SettingModifier {

    constructor(typeHandlerManager, typeDecoratorManager) {
        this.typeHandlerManager = typeHandlerManager;
        this.typeDecoratorManager = typeDecoratorManager;
    }

    getValue(element) {
        let type = getTypeFromElement(element);
        let handler = this.typeHandlerManager.getTypeHandler(type);
        return handler.getValue(element, this);
    };

    setValue(element, value) {
        let type = getTypeFromElement(element);
        let handler = this.typeHandlerManager.getTypeHandler(type);
        return handler.setValue(element, value, this);
    };

    createElement(name, value) {
        // Get the handler
        let handler = this.typeHandlerManager.derriveTypeHandler(name, value);

        // Create the element
        let element = handler.createElement(name, value, this);

        // Apply decorators
        element = this.typeDecoratorManager.applyTypeDecorators(handler.getType(), element);

        return element;
    };

};