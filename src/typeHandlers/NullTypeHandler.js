import { isDefinedOrNotEmpty } from '../util/isDefinedOrNotEmpty.js';
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
        if (!isDefinedOrNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }

        // return asElement(`<div name="${name}" ${Constants.ATTRIBUTE_NAME}="${name}" ${Constants.ATTRIBUTE_TYPE}="${this.getType()}" value="${value}" />`);
        let element = document.createElement('div');
        element.value = null;
        element.setAttribute('name', name);
        element.setAttribute('value', null);
        element.setAttribute(Constants.ATTRIBUTE_NAME, name);
        element.setAttribute(Constants.ATTRIBUTE_TYPE, this.getType());
        return element;
    }

};