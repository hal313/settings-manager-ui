import { isString } from './isString.js';
import { isElement } from './isElement.js';
import { createError } from './createError.js';
import { isEmpty } from './isEmpty.js';
import { isDefined } from './isDefined.js';

/**
 * Gets all elements decended from "rootElement" which match the "cssSelector"
 *
 * @param {String} cssSelector the selector to use
 * @param {Element} [rootElement] the element to start the search from, defaults to document.body
 */
let getAllElements = (cssSelector, rootElement) => {
    if (!isString(cssSelector)) {
        throw createError('"cssSelector" must be a String');
    }
    if (isEmpty(cssSelector)) {
        throw createError('"cssSelector" must not be empty');
    }
    if (isDefined(rootElement) && !isElement(rootElement)) {
        throw createError('"rootElement" must be an Element');
    }

    return (rootElement||document.body).querySelectorAll(cssSelector) || [];
};

export {getAllElements};