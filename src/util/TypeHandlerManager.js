import { isString } from './isString.js';
import { getTypeFromValue } from './getTypeFromValue.js';
import { createError } from './createError.js';

export class TypeHandlerManager {

    // TODO: Write tests
    // TODO: Test default handlers
    // TODO: Test overrides


    constructor() {
        let typeMap = {};
        /**
         *
         * @param {Object|String} type the name of the type
         * @param {Function} [getFn] a function which takes an Element and returns the value for that element
         * @param {Function} [setFn] a function which takes an Element and a value in order to set the value in the element
         * @param {Function} [createFn] a function which takes a name and an optional value and returns an Element or String with the initial value
         */
        this.addTypeHandler = (type, getFn, setFn, createFn) => {
            // TODO: Sanity checking for params
            // TODO: Ducktype type/kit
            // If separate arguments
            if (isString(type)) {
                typeMap[type] = {
                    getType: () => type,
                    getValue: getFn,
                    setValue: setFn,
                    createElement: createFn
                };
            } else {
                typeMap[type.getType()] = type;
            }
        };


        let defaultsMap = {};
        this.setDefaultHandler = (type, handlingType) => {
            // TODO: Be sure that the handler exists as a type
            defaultsMap[type] = handlingType;
        };

        /**
         * Gets the handler for the type. The defaults map is consulted when the type is unknown.
         *
         * @param {String} type the type to get the handler for
         * @return {Object} the handler for the type
         * @throws when no handler is found for the type
         */
        this.getTypeHandler = (type) => {
            // Try the type map first
            if (!!typeMap[type]) {
                return typeMap[type];
            }

            // Next, try the defaults map
            if (!!defaultsMap[type]) {
                return typeMap[defaultsMap[type]];
            }

            // Throw an error
            throw createError(`Unknown type "${type}"`);
        };

        let overridesMap = {};
        this.setTypeOverride = (name, type) => {
            overridesMap[name] = type;
        };

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
        this.inferTypeHandler = (name, value) => {
            if (!!overridesMap[name]) {
                this.getTypeHandler(overridesMap[name]);
            }
            return this.getTypeHandler(getTypeFromValue(value));
        };
    }

};