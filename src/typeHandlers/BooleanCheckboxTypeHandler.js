import { isDefinedAndNotEmpty } from '../util/isDefinedAndNotEmpty.js';
import { createError } from '../util/createError.js';
import { isBoolean } from '../util/isBoolean.js';
import { isElement } from '../util/isElement.js';
import { TypeHandler } from './TypeHandler.js';

export class BooleanCheckboxTypeHandler extends TypeHandler {

    constructor() {
        super();
    }

    getType() {
        return BooleanCheckboxTypeHandler.TYPE;
    }

    getValue(element) {
        return !!element.checked;
    }

    setValue(element, value) {
        if (!isElement(element)) {
            throw createError('The "element" parameter must be an Element');
        }
        if (!isBoolean(value)) {
            throw createError('The "value" parameter must be a boolean value');
        }

        element.value = !!value;
        element.checked = !!value;
    }

    createElement(name, value) {
        if (!isDefinedAndNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }
        if (!isBoolean(value)) {
            throw createError('The "value" parameter must be a boolean value');
        }

        let element = document.createElement('input');
        element.setAttribute('type', 'checkbox');
        element.setAttribute('name', name);

        this.setValue(element, value);

        return element;
    }

};
BooleanCheckboxTypeHandler.TYPE = 'boolean:checkbox';