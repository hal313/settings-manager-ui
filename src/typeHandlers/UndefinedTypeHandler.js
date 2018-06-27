import { isDefinedAndNotEmpty } from '../util/isDefinedAndNotEmpty.js';
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
        if (!isDefinedAndNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }

        let element = document.createElement('div');
        element.setAttribute('name', name);
        element.setAttribute('value', undefined);
        element.setAttribute(Constants.ATTRIBUTE_NAME, name);
        element.setAttribute(Constants.ATTRIBUTE_TYPE, this.getType());

        this.setValue(element, undefined);

        return element;
    }

};