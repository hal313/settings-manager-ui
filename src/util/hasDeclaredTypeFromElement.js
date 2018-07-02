import { createError } from './createError.js';
import { isElement } from './isElement.js';
import { Constants } from '../Constants.js';
import { isDefinedAndNotEmpty } from './isDefinedAndNotEmpty.js';

/**
 * Determines if an element has a declared type.
 *
 * @param {Element} element the element to check
 * @returns {Boolean} true if the element has a declared type
 */
let hasDeclaredTypeFromElement = (element) => {
    if (!isElement(element)) {
        throw createError('"element" must be an Element');
    }

    // Check declared type
    let type = element.getAttribute(Constants.ATTRIBUTE_TYPE);

    return isDefinedAndNotEmpty(type);
};

export {hasDeclaredTypeFromElement};