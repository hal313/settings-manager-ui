import { isDefinedAndNotEmpty } from '../util/isDefinedAndNotEmpty.js';
import { createError } from '../util/createError.js';
import { Constants } from '../Constants.js';

export class BooleanCheckboxTypeHandler {

    constructor() {}

    getType() {
        return 'boolean:checkbox';
    }

    getValue(element) {
        return !!element.hasAttribute('checked');
    }

    setValue(element, value) {
        element.value = !!value;
        !!value ? element.setAttribute('checked', '') : element.removeAttribute('checked');
    }

    createElement(name, value) {
        if (!isDefinedAndNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }

        let element = document.createElement('input');
        element.setAttribute('type', 'checkbox');
        element.setAttribute('name', name);
        element.setAttribute(Constants.ATTRIBUTE_NAME, name);
        element.setAttribute(Constants.ATTRIBUTE_TYPE, this.getType());

        this.setValue(element, value);

        return element;
    }

};