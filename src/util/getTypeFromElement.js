import { createError } from './createError.js';
import { isElement } from './isElement.js';
import { getDeclaredTypeFromElement } from './getDeclaredTypeFromElement.js';
import { hasDeclaredTypeFromElement } from './hasDeclaredTypeFromElement.js';
import { TypeResolver } from './TypeResolver.js';

const TYPE_RESOLVER = new TypeResolver();

let getTypeFromElement = (element) => {
    if (!isElement(element)) {
        throw createError('"element" must be an Element');
    }

    // Check declared type
    if (hasDeclaredTypeFromElement(element)) {
        return getDeclaredTypeFromElement(element);
    }

    // Infer Type
    return TYPE_RESOLVER.getTypeFromElement(element);
};

export {getTypeFromElement};