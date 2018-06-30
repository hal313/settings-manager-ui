import { asArray } from './asArray.js';

export class TypeDecoratorManager {

    constructor() {
        this.typeDecorators = {};
    }

    /**
     * Adds decorators for a type.
     *
     * @param {String} type the type to add decorators for
     * @param {Function | Function[]} decoratorFns the decorator functions
     */
    addTypeDecorators(type, decoratorFns) {
        if (!this.typeDecorators[type]) {
            this.typeDecorators[type] = [];
        }

        asArray(decoratorFns).forEach((decoratorFn) => {
            this.typeDecorators[type].push(decoratorFn);
        });
    };

    /**
     * Gets the type decorator functions registered for the specified type.
     *
     * @param {String} type the type to get the decorators for
     * @return {Function[]} the decorator functions registered for the type
     */
    getTypeDecorators(type) {
        let decorators = [];

        Object.keys(this.typeDecorators).forEach((pattern) => {
            if (null !== type.match(pattern)) {
                decorators = decorators.concat(this.typeDecorators[pattern]);
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
    applyTypeDecorators(type, element, name, value) {
        this.getTypeDecorators(type).forEach((decorate) => {
            decorate(element, type, name, value);
        });
        return element;
    }

};