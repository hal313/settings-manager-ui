import {isDefinedAndNotEmpty} from '../util/isDefinedAndNotEmpty.js';
import {createError} from '../util/createError.js';
import { Constants } from '../Constants.js';

export class StringPasswordTypeHandler {

    constructor() {}

    getType() {
        return 'string:password';
    }

    getValue(element) {
        return element.value;
    }

    setValue(element, value) {
        element.value = value;
    }

    createElement(name, value) {
        if (!isDefinedAndNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }

        let element = document.createElement('input');
        element.setAttribute('name', name);
        element.setAttribute('type', 'password');

        this.setValue(element, value);

        return element;
    }

};