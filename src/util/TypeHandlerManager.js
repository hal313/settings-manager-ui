import { createError } from './createError.js';
import { TypeResolver } from './TypeResolver.js';
import { TypeHandler } from '../typeHandlers/TypeHandler.js';
import { isDefinedAndNotEmpty } from './isDefinedAndNotEmpty.js';
import { isDefined } from './isDefined.js';
import { isEmpty } from './isEmpty.js';
import { isString } from './isString.js';
import { isNullOrUndefined } from 'util';

const TYPE_RESOLVER = new TypeResolver();
export class TypeHandlerManager {

    constructor() {
        // this.typeMap = {};
        // this.defaultsMap = {};
        this.overridesMap = {};
        this.handlers = {};
        this.nameMap = {};
    }

    /**
     * Adds a type handler to the registry. The TypeHandler must have the following functions:
     * getType(): String                    - Returns a string representation of the type this handler can handle
     * getValue(Element): *                 - Gets the value from the Element
     * setValue(Element, *): void           - Sets the value of the Element
     * createElement(name, value): Element  - Creates an Element instance which represents the name and value
     *
     * @param {TypeHandler} typeHandler the type handler
     * @param {String} [name] optional name to use
     */
    addTypeHandler(typeHandler, name) {
        if (!(typeHandler instanceof TypeHandler)) {
            throw createError('"typeHandler" must be an instance of TypeHandler');
        }

        let type = typeHandler.getType();
        if (!!this.handlers[type]) {
            throw createError(`Handler of type ${type} already exists.`);
        }

        // Add the handler
        this.handlers[type] = typeHandler;
        // Add the name, if present
        if (isDefined(name)) {
            if (!isString(name)) {
                throw createError(`${name} must be a string`);
            }
            if (isEmpty(name)) {
                throw createError(`${name} must not be empty`);
            }

            let existing = this.nameMap[name];
            if (!isNullOrUndefined(existing)) {
                throw createError(`${name} already exists as a named handler`);
            }

            this.nameMap[name] = type;
        }
    }

    // /**
    //  * Registeres a handler for default types. When a type is requested and not found, the defaults are consulted. This allows
    //  * clients to indicate generic type handlers. For instance, if there is no handler for "string", but the "string:text"
    //  * handler was registered for "string" via a call to `setDefaultHandler('string', 'string:text');` then the "string:text"
    //  * resolver will be used when a resolver of type "string" is required.
    //  *
    //  * @param {String} type the type to handle
    //  * @param {String} handlingType the type which should handle <i>type</i>
    //  */
    // setDefaultHandler(type, handlingType) {
    //     this.defaultsMap[type] = handlingType;
    // }

    /**
     * Gets the handler for the type. The defaults map is consulted when the type is unknown.
     *
     * @param {String} type the type to get the handler for
     * @return {Object} the handler for the type
     * @throws when no handler is found for the type
     */
    getTypeHandlerByType(type) {
        // Check the overrides map first
        let resolvedType = type;

        while (!!this.overridesMap[resolvedType]) {
            resolvedType = this.overridesMap[resolvedType];
        }

        let match = this.handlers[resolvedType];

        if (!!match) {
            return match;
        }

        // Throw an error
        throw createError(`Unknown type "${type}"${type !== resolvedType?' (mapped to ' + resolvedType + ')':''}`);
    }

    getTypeHandlerByName(name) {
        if (!isString(name)) {
            throw createError('"name" must be a string');
        }
        if (isEmpty(name)) {
            throw createError('"name" must not be empty');
        }

        let type = this.nameMap[name];

        if (!isDefinedAndNotEmpty(type)) {
            throw createError(`Could not find type handler named ${type}`);
        }

        return this.getTypeHandlerByType(type);
    }

    hasTypeHandlerByName(name) {
        return isDefinedAndNotEmpty(this.nameMap[name]);
    }

    setTypeOverride(alias, type) {
        this.overridesMap[alias] = type;
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
            this.getTypeHandlerByType(this.overridesMap[name]);
        }
        return this.getTypeHandlerByType(TYPE_RESOLVER.getTypeFromValue(value));
    }

}