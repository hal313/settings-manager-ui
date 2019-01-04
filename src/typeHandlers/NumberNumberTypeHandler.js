import {isDefinedAndNotEmpty} from '../util/isDefinedAndNotEmpty.js';
import {createError} from '../util/createError.js';
import { isElement } from '../util/isElement.js';
import { isNumber } from '../util/isNumber.js';
import { TypeHandler } from './TypeHandler.js';

export class NumberNumberTypeHandler extends TypeHandler
{

    constructor() {
        super();
    }

    getType() {
        return NumberNumberTypeHandler.TYPE;
    }

    getValue(element) {
        return +element.value;
    }

    setValue(element, value) {
        if (!isElement(element)) {
            throw createError('The "element" parameter must be an Element');
        }

        element.value = +value;
    }

    createElement(name, value) {
        if (!isDefinedAndNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }

        let element = document.createElement('input');
        element.setAttribute('name', name);
        element.setAttribute('type', 'number');
        element.setAttribute('value', value);

        this.setValue(element, value);

        return element;
    }

};
NumberNumberTypeHandler.TYPE = 'number:number';