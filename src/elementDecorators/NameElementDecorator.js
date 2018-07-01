import { Constants } from '../Constants';

export class NameElementDecorator {

    decorate(element, type, name, value) {
        element.setAttribute(Constants.ATTRIBUTE_NAME, name);
    }

}