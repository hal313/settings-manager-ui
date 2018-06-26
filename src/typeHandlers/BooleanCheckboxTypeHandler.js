import { isDefinedAndNotEmpty } from '../util/isDefinedAndNotEmpty.js';
import { createError } from '../util/createError.js';
import { Constants } from '../Constants.js';

export class BooleanCheckboxTypeHandler {

    constructor() {}

    getType() {
        return 'boolean:checkbox';
    }

    getValue(element) {
        // return !!element.value;
        return !!element.hasAttribute('checked');
    }

    setValue(element, value) {
        // element.value = !!value
        !!value ? element.setAttribute('checked', '') : element.removeAttribute('checked');
    }

    createElement(name, value) {
        if (!isDefinedAndNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }

        // return asElement(`<input name="${name}" ${Constants.ATTRIBUTE_NAME}="${name}" ${Constants.ATTRIBUTE_TYPE}="${this.getType()}" type="checkbox" ${!!value?'checked':''}/> ${name}`);
        let element = document.createElement('input');
        element.setAttribute('type', 'checkbox');
        element.setAttribute('name', name);
        if (!!value) {
            element.setAttribute('checked', '');
        }
        element.setAttribute(Constants.ATTRIBUTE_NAME, name);
        element.setAttribute(Constants.ATTRIBUTE_TYPE, this.getType());
        return element;
    }

};