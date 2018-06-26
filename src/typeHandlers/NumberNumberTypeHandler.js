import {isDefinedAndNotEmpty} from '../util/isDefinedAndNotEmpty.js';
import {createError} from '../util/createError.js';
import { Constants } from '../Constants.js';

export class NumberNumberTypeHandler {

    constructor() {}

    getType() {
        return 'number:number';
    }

    getValue(element) {
        return +element.value;
    }

    setValue(element, value) {
        element.value = +value;
    }

    createElement(name, value) {
        if (!isDefinedAndNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }

        // return asElement(`<input name="${name}" ${Constants.ATTRIBUTE_NAME}="${name}" ${Constants.ATTRIBUTE_TYPE}="${this.getType()}" type="number" value="${value}"/>`);
        let element = document.createElement('input');
        element.setAttribute('name', name);
        element.setAttribute('type', 'number');
        element.setAttribute('value', value);
        element.setAttribute(Constants.ATTRIBUTE_NAME, name);
        element.setAttribute(Constants.ATTRIBUTE_TYPE, this.getType());
        return element;
    }

};