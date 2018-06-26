import {isDefinedAndNotEmpty} from '../util/isDefinedAndNotEmpty.js';
import {createError} from '../util/createError.js';
import { Constants } from '../Constants.js';

export class StringTextTypeHandler {

    constructor() {}

    getType() {
        return 'string:text';
    }

    getValue(element) {
        return element.value;
    }

    setValue(element, value) {
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

        // return asElement(`<input name="${name}" ${Constants.ATTRIBUTE_NAME}="${name}" ${Constants.ATTRIBUTE_TYPE}="${this.getType()}" type="text" value="${value}" />`);
        let element = document.createElement('input');
        element.setAttribute('name', name);
        element.setAttribute('type', 'text');
        element.setAttribute('value', value);
        element.setAttribute(Constants.ATTRIBUTE_NAME, name);
        element.setAttribute(Constants.ATTRIBUTE_TYPE, this.getType());
        return element;
    }

};