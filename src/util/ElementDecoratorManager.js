import { isRegExp } from './isRegExp.js';
import { isString } from './isString.js';
import { isFunction } from './isFunction.js';
import { createError } from './createError.js';
import { isObject } from './isObject.js';
import { isDefined } from './isDefined.js';
import { isEmpty } from './isEmpty.js';
import { isElement } from './isElement.js';
import { Constants } from '../Constants.js';
import { isDefinedAndNotEmpty } from './isDefinedAndNotEmpty.js';
import { TypeResolver } from './TypeResolver.js';

export class ElementDecoratorManager {

    constructor() {
        this.elementDecorators = [];
    }

    /**
     * Adds a decorator for a type.
     *
     * @param {String|RegExp|Function} matcher the type to add decorator for
     * @param {Object} elementDecorator the element decorator instance
     * @param {String} [name] the name for the element decorator, required when declaratively applying decorators
     */
    addElementDecorator(matcher, elementDecorator, name) {
        if (!isString(matcher) && !isRegExp(matcher) && !isFunction(matcher)) {
            throw createError('"type" must be a String, RegExp or Function');
        }
        if (!isObject(elementDecorator)) {
            throw createError('"elementDecorator" must be an ElementDecorator');
        }
        if (isDefined(name) && !isString(name)) {
            throw createError('"name" must be a String');
        }
        if (isDefined(name) && isEmpty(name)) {
            throw createError('"name" must not be empty');
        }


        // The "normalized" matcher - this will be a function which uses a RegExp to test
        let normalizedMatcher;

        if (isString(matcher)) {
            // Case: string
            normalizedMatcher = (elementType) => {
                return new RegExp(matcher).test(elementType);
            };
        } else if (isRegExp(matcher)) {
            // Case: regex
            normalizedMatcher = (elementType) => {
                return matcher.test(elementType);
            };
        } else {
            // Case: function
            normalizedMatcher = matcher;
        }

        this.elementDecorators.push({
            matcher: normalizedMatcher,
            decorator: elementDecorator,
            name: name
        });
    }

    /**
     * Gets the element decorator functions registered for the specified type.
     *
     * @param {String|RegExp|Function} type the type to get the decorators for
     * @return {Object} the ElementDecorator instances registered for the type
     */
    getElementDecoratorsByType(type) {
        if (!isString(type)) {
            throw createError('"type" must be a String');
        }
        if (isEmpty(type)) {
            throw createError('"type" must not be empty');
        }

        let decorators = [];

        this.elementDecorators.forEach((decoratorDescriptor) => {
            if (!!decoratorDescriptor.matcher(type)) {
                decorators.push(decoratorDescriptor.decorator);
            }
        });

        return decorators;
    }

    /**
     * Gets the decorators for an element. The array will be the
     *
     * @param {Element} element the element to get decorators for
     * @returns {Object[]} element decorators for the element
     * @throws when the element is not an Element
     */
    getElementDecoratorsByElement(element) {
        if (!isElement(element)) {
            throw createError('"element" must be an Element');
        }

        let decorators = [];

        // Get by name
        let decoratorNamesString = element.getAttribute(ElementDecoratorManager.ATTRIBUTE_DECORATOR);
        if (isDefinedAndNotEmpty(decoratorNamesString)) {
            decoratorNamesString
                .split(',')
                .map((name) => name.trim(name))
                .forEach((name) => {
                    this.getElementDecoratorsByName(name).forEach((decorator) => decorators.push(decorator));
                });
        }

        return decorators;
    }

    /**
     * Gets element decorators by name.
     *
     * @param {String} name the name to get the element decorators for
     * @returns {Object[]} matching element decorators
     * @throws when a parameter is the wrong type
     */
    getElementDecoratorsByName(name) {
        if (!isString(name)) {
            throw createError('"name" must be a String');
        }
        if (isEmpty(name)) {
            throw createError('"name" must not be empty');
        }

        return this.elementDecorators
            .filter((descriptor) => descriptor.name === name)
            .map((descriptor) => descriptor.decorator);
    }

    /**
     * Applies element decorators in this order:
     *  -named decorators which match the attribute on the element; in the order they are specified
     *  -type decorators which match the element
     *
     * @param {String} type the type to get the decorators for
     * @param {Element} element the element to operate on
     * @param {String} name the name of the value
     * @param {*} value the value assigned to the element
     * @throws when a parameter is the wrong type
     */
    applyElementDecorators(type, element, name, value) {
        if (!isString(type)) {
            throw createError('"type" must be a String');
        }
        if (!isElement(element)) {
            throw createError('"element" must be an Element');
        }
        if (!isString(name)) {
            throw createError('"name" must be a string');
        }
        if (isEmpty(name)) {
            throw createError('"name" must not be empty');
        }

        // The decorators to apply
        //
        // Get the decorators for the element (from the attributes)
        let decorators = this.getElementDecoratorsByElement(element);
        //
        //
        // Get decorators by type (the decorators which match on type)
        this.getElementDecoratorsByType(new TypeResolver().getTypeFromElement(element)).forEach((decorator) => {
            // Avoid duplicate items
            if (!decorators.includes(decorator)) {
                decorators.push(decorator);
            }
        });

        // Apply the decorators
        decorators.forEach((elementDecorator) => {
            elementDecorator.decorate(element, type, name, value);
        });

        // Return the element
        return element;
    }

}
ElementDecoratorManager.ATTRIBUTE_DECORATOR = `${Constants.ATTRIBUTE_PREFIX}-decorators`;