import { isDefinedAndNotEmpty } from '../util/isDefinedAndNotEmpty.js';
import { createError } from '../util/createError.js';
import { isElement } from '../util/isElement.js';
import { TypeHandler } from './TypeHandler.js';

export class UndefinedTypeHandler extends TypeHandler {

    constructor() {
        super();
    }

    getType() {
        return UndefinedTypeHandler.TYPE;
    }

    getValue(/*element*/) {
        return undefined;
    }

    setValue(element/*, value*/) {
        if (!isElement(element)) {
            throw createError('The "element" parameter must be an Element');
        }

        element.value = undefined;
    }

    createElement(name/* , value */) {
        if (!isDefinedAndNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }

        let element = document.createElement('div');
        element.setAttribute('name', name);
        element.setAttribute('value', undefined);

        this.setValue(element, undefined);

        return element;
    }

};
UndefinedTypeHandler.TYPE = 'undefined';