import { asArray } from './asArray.js';

export class ElementDecoratorManager {

    constructor() {
        this.elementDecorators = {};
    }

    /**
     * Adds a decorator for a type.
     *
     * @param {String} type the type to add decorator for
     * @param {Object} elementDecorator the element decorator instance
     */
    addElementDecorator(type, elementDecorator) {
        this.elementDecorators[type] = this.elementDecorators[type] || [];
        this.elementDecorators[type].push(elementDecorator);
    };

    /**
     * Gets the element decorator functions registered for the specified type.
     *
     * @param {String} type the type to get the decorators for
     * @return {Function[]} the decorator functions registered for the type
     */
    getElementDecorators(type) {
        let decorators = [];

        Object.keys(this.elementDecorators).forEach((pattern) => {
            if (null !== type.match(pattern)) {
                decorators = decorators.concat(this.elementDecorators[pattern]);
            }
        });

        return decorators;
    };

    /**
     *
     * @param {String} type the type to get the decorators for
     * @param {Element} element the element to operate on
     * @param {String} name the name of the value
     * @param {*} value the value assigned to the element
     */
    applyElementDecorators(type, element, name, value) {
        this.getElementDecorators(type).reverse().forEach((elementDecorator) => {
            elementDecorator.decorate(element, type, name, value);
        });
        return element;
    }

};