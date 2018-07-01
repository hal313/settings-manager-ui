import { createError } from './createError.js';
import { isArray } from './isArray.js';
import { isNull } from './isNull.js';
import { isUndefined } from './isUndefined.js';

export class TypeHandlerManager {

    constructor() {
        this.typeMap = {};
        this.defaultsMap = {};
        this.overridesMap = {};
    }

    /**
     * Adds a type handler to the registry. The TypeHandler must have the following functions:
     * getType(): String                    - Returns a string representation of the type this handler can handle
     * getValue(Element): *                 - Gets the value from the Element
     * setValue(Element, *): void           - Sets the value of the Element
     * createElement(name, value): Element  - Creates an Element instance which represents the name and value
     *
     * @param {Object} type the name of the type
     * @param {Function} [getFn] a function which takes an Element and returns the value for that element
     * @param {Function} [setFn] a function which takes an Element and a value in order to set the value in the element
     * @param {Function} [createFn] a function which takes a name and an optional value and returns an Element or String with the initial value
     */
    addTypeHandler(type) {
        this.typeMap[type.getType()] = type;
    }

    /**
     * Registeres a handler for default types. When a type is requested and not found, the defaults are consulted. This allows
     * clients to indicate generic type handlers. For instance, if there is no handler for "string", but the "string:text"
     * handler was registered for "string" via a call to `setDefaultHandler('string', 'string:text');` then the "string:text"
     * resolver will be used when a resolver of type "string" is required.
     *
     * @param {String} type the type to handle
     * @param {String} handlingType the type which should handle <i>type</i>
     */
    setDefaultHandler(type, handlingType) {
        this.defaultsMap[type] = handlingType;
    }

    /**
     * Gets the handler for the type. The defaults map is consulted when the type is unknown.
     *
     * @param {String} type the type to get the handler for
     * @return {Object} the handler for the type
     * @throws when no handler is found for the type
     */
    getTypeHandler(type) {
        // Try the type map first
        if (!!this.typeMap[type]) {
            return this.typeMap[type];
        }

        // Next, try the defaults map
        if (!!this.defaultsMap[type]) {
            return this.typeMap[this.defaultsMap[type]];
        }

        // Throw an error
        throw createError(`Unknown type "${type}"`);
    }

    setTypeOverride(name, type) {
        this.overridesMap[name] = type;
    }

    /**
     * Gets a handler for the setting. The name is looked
     * up in the overrides table; if the name is not found,
     * then the type handler for the inferred value type is
     * returned.
     *
     * @param {String} name the setting name
     * @param {*} value the value
     * @returns {Object} a handler for the setting
     */
    inferTypeHandler(name, value) {
        if (!!this.overridesMap[name]) {
            this.getTypeHandler(this.overridesMap[name]);
        }
        return this.getTypeHandler(this.getTypeFromValue(value));
    }

    getTypeFromValue(value) {
        // Because this module's internal types mirror that of JavaScript (with the exception of objectarray),
        // it is necessary only have to check for object array and return the JavaScript type otherwise
        if (isArray(value)) {
            return 'collection:object';
        };
        if (isNull(value)) {
            return 'null';
        }
        if (isUndefined(value)) {
            return 'undefined';
        }
        return typeof value;
    }

};