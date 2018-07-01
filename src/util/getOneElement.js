import { createError } from './createError.js';
import { getAllElements } from './getAllElements.js';
import { isElement } from './isElement.js';
import { isString } from './isString.js';
import { isDefined } from './isDefined.js';

/**
 * Returns exactly one element from the search. If 0 or multiple elements are
 * found, then an error is thrown.
 *
 * @param {Element|String} target the target to get one element from (either an Element or an css selector)
 * @param {Element} [rootElement] the element to start the search from (defautls to document.body)
 * @returns {Element} the only element which matches the search, rooted from the rootElement
 * @throws when the type is wrong or 0 or more than 1 elements are found
 */
let getOneElement = (target, rootElement) => {
    if (isElement(target)) {
        return target;
    }
    if (!isString(target)) {
        throw createError('"target" must be an Element or a String');
    }
    if (!isElement(rootElement) && isDefined(rootElement)) {
        throw createError('"rootElement" must be an element');
    }

    let elements = getAllElements(target, rootElement);
    let elementCount = elements.length;
    let returnValue = elements[0];

    if (0 === elementCount) {
        throw createError(`No UI elements found for "${target}"`);
    } else if (1 < elementCount) {
        throw createError(`Multiple UI elements found for "${target}"`);
    }

    return returnValue;
};

export {getOneElement};