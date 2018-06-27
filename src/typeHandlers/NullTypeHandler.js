import { isDefinedAndNotEmpty } from '../util/isDefinedAndNotEmpty.js';
import { createError } from '../util/createError.js';
import { Constants } from '../Constants.js';

export class NullTypeHandler {

    constructor() {}

    getType() {
        return 'null';
    }

    getValue(/*element*/) {
        return null;
    }

    setValue(element/*, value*/) {
        element.value = null;
    }

    createElement(name/* , value */) {
        if (!isDefinedAndNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }

        let element = document.createElement('div');
        element.setAttribute('name', name);
        element.setAttribute('value', null);
        element.setAttribute(Constants.ATTRIBUTE_NAME, name);
        element.setAttribute(Constants.ATTRIBUTE_TYPE, this.getType());

        this.setValue(element, null);

        return element;
    }

};