import { isDefinedAndNotEmpty } from '../util/isDefinedAndNotEmpty.js';
import { createError } from '../util/createError.js';
import { isNull } from '../util/isNull.js';
import { isElement } from '../util/isElement.js';
import { TypeHandler } from './TypeHandler.js';

export class NullTypeHandler extends TypeHandler {

    constructor() {
        super();
    }

    getType() {
        return NullTypeHandler.TYPE;
    }

    getValue(/*element*/) {
        return null;
    }

    setValue(element/* , value */) {
        if (!isElement(element)) {
            throw createError('The "element" parameter must be an Element');
        }
        element.value = null;
    }

    createElement(name/* , value */) {
        if (!isDefinedAndNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }

        let element = document.createElement('div');
        element.setAttribute('name', name);
        element.setAttribute('value', null);

        this.setValue(element, null);

        return element;
    }

};
NullTypeHandler.TYPE = 'null';