import { Constants } from '../Constants.js';

export class NameElementDecorator {

    decorate(element, type, name, value) {
        element.setAttribute(Constants.ATTRIBUTE_NAME, name);
    }

}