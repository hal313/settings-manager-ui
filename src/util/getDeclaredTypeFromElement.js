import { Constants } from '../Constants.js';
import { isDefinedAndNotEmpty } from './isDefinedAndNotEmpty.js';
import { createError } from './createError.js';
import { isElement } from './isElement.js';

let getDeclaredTypeFromElement = (element) => {
    if (!isElement(element)) {
        throw createError('"element" must be an Element');
    }

    let name = element.getAttribute(Constants.ATTRIBUTE_TYPE);
    if (isDefinedAndNotEmpty(name)) {
        return name;
    }

    throw createError('"element" has no type assigned');
};

export {getDeclaredTypeFromElement};