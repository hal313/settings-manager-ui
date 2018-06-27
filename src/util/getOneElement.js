// TODO: Test
import { createError } from './createError.js';
import { getAllElements } from './getAllElements.js';

let getOneElement = (target, rootElement) => {
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