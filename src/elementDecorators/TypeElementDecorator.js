import { Constants } from '../Constants.js';

export class TypeElementDecorator {

    decorate(element, type, name, value) {
        element.setAttribute(Constants.ATTRIBUTE_TYPE, type);
    }

}