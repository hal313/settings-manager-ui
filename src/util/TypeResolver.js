import { isArray } from './isArray.js';
import { isNull } from './isNull.js';
import { isUndefined } from './isUndefined.js';
import { isElement } from './isElement.js';
import { createError } from './createError.js';
import { CollectionObjectTypeHandler } from '../typeHandlers/CollectionObjectTypeHandler.js';
import { NullTypeHandler } from '../typeHandlers/NullTypeHandler.js';
import { UndefinedTypeHandler } from '../typeHandlers/UndefinedTypeHandler.js';

// This is the mapping; modify this in order to support more types
// The LEFT is the declared type on an element, and the RIGHT side represents the type to be handled by a TypeResolver
const TYPE_MAP = {
    'string'    :   'string',
    'checkbox'  :   'boolean',
    'null'      :   NullTypeHandler.TYPE,
    'undefined' :   UndefinedTypeHandler.TYPE
};
export class TypeResolver {

    /**
     * Gets a type from a value. Checks for arrays, null, undefined and falls back to "typeof value".
     *
     * @param {*} value the value to get the type for
     * @returns {String} the appropriate type if it can be identified; "typeof value" otherwise
     */
    getTypeFromValue(value) {
        // Because this module's internal types mirror that of JavaScript (with the exception of objectarray),
        // it is necessary only have to check for object array and return the JavaScript type otherwise
        if (isArray(value)) {
            return CollectionObjectTypeHandler.TYPE;
        }
        if (isNull(value)) {
            return NullTypeHandler.TYPE;
        }
        if (isUndefined(value)) {
            return UndefinedTypeHandler.TYPE;
        }
        return typeof value;
    }

    /**
     * Attempts to derrive the type from the element. If element.type is configured
     *
     * @param {Element} element the element to get the type from
     * @returns {String} the type assigned to the element the type attribute or the type of the value
     * @throws when "element" is not an Element
     */
    getTypeFromElement(element) {
        if (!isElement(element)) {
            throw createError('"element" must be an Element');
        }

        let mapping = TYPE_MAP[(element.type + '').toLowerCase()];

        if (!!mapping) {
            return mapping;
        }
        return this.getTypeFromValue(element.value);
    }

}
