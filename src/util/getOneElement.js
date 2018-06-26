// TODO: Test
import { isElement } from './isElement.js';
import { createError } from './createError.js';

let getOneElement = (target, rootElement) => {
    if (isElement(target)) {
        return target;
    }

    let elements = (rootElement||document.body).querySelectorAll(target);
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