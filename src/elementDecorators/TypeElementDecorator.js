import { Constants } from '../Constants';

export class TypeElementDecorator {

    decorate(element, type, name, value) {
        element.setAttribute(Constants.ATTRIBUTE_TYPE, type);
    }

}