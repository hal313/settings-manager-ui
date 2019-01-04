import {isDefinedAndNotEmpty} from '../util/isDefinedAndNotEmpty.js';
import {createError} from '../util/createError.js';
import { isElement } from '../util/isElement.js';
import { TypeHandler } from './TypeHandler.js';

export class StringTextTypeHandler extends TypeHandler {

    constructor() {
        super();
    }

    getType() {
        return StringTextTypeHandler.TYPE;
    }

    getValue(element) {
        return element.value;
    }

    setValue(element, value) {
        if (!isElement(element)) {
            throw createError('The "element" parameter must be an Element');
        }

        element.value = value;
        // Is it not necessary to set the attribute, like so:
        //   element.setAttribute('value', value);
        // https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute:
        // To access or modify the current values, you should use the properties. For example,
        // use Element.value instead of Element.setAttribute().
    }

    createElement(name, value) {
        if (!isDefinedAndNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }

        let element = document.createElement('input');
        element.setAttribute('name', name);
        element.setAttribute('type', 'text');
        element.setAttribute('value', value);

        this.setValue(element, value);

        return element;
    }

};
StringTextTypeHandler.TYPE = 'string:text';