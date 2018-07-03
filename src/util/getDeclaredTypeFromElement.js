import { Constants } from '../Constants.js';
import { createError } from './createError.js';
import { isElement } from './isElement.js';
import { hasDeclaredTypeFromElement } from './hasDeclaredTypeFromElement.js';

let getDeclaredTypeFromElement = (element) => {
    if (!isElement(element)) {
        throw createError('"element" must be an Element');
    }

    if (hasDeclaredTypeFromElement(element)) {
        return element.getAttribute(Constants.ATTRIBUTE_TYPE);
    }

    throw createError('"element" has no type assigned');
};

export {getDeclaredTypeFromElement};