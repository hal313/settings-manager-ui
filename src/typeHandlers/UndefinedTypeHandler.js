import { isDefinedOrNotEmpty } from '../util/isDefinedOrNotEmpty.js';
import { createError } from '../util/createError.js';
import { Constants } from '../Constants.js';

export class UndefinedTypeHandler {

    constructor() {}

    getType() {
        return 'undefined';
    }

    getValue(/*element*/) {
        return undefined;
    }

    setValue(element/*, value*/) {
        element.value = undefined;
    }

    createElement(name/* , value */) {
        if (!isDefinedOrNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }

        // return asElement(`<div name="${name}" ${Constants.ATTRIBUTE_NAME}="${name}" ${Constants.ATTRIBUTE_TYPE}="${this.getType()}" value="${value}" />`);
        let element = document.createElement('div');
        element.setAttribute('name', name);
        element.setAttribute('value', undefined);
        element.value = undefined;
        element.setAttribute(Constants.ATTRIBUTE_NAME, name);
        element.setAttribute(Constants.ATTRIBUTE_TYPE, this.getType());
        return element;
    }

};