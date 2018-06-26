import { asArray } from './asArray.js';

export class TypeDecoratorManager {

    // TODO: Write tests
    // TODO: Pass in flat-name during apply
    constructor() {

        let typeDecorators = {};
        /**
         * Adds decorators for a type.
         *
         * @param {String} type the type to add decorators for
         * @param {Function | Function[]} decoratorFns the decorator functions
         */
        this.addTypeDecorators = (type, decoratorFns) => {
            if (!typeDecorators[type]) {
                typeDecorators[type] = [];
            }

            asArray(decoratorFns).forEach((decoratorFn) => {
                typeDecorators[type].push(decoratorFn);
            });
        };

        this.getTypeDecorators = (type) => {
            let decorators = [];

            Object.keys(typeDecorators).forEach((pattern) => {
                if (null !== type.match(pattern)) {
                    decorators = decorators.concat(typeDecorators[pattern]);
                }
            });

            return decorators;
        };

        this.applyTypeDecorators = (type, element) => {
            let decoratedElement = element;
            this.getTypeDecorators(type).forEach((decorate) => {
                // If the decorator does not return an element, return the element which was decorated
                decoratedElement = decorate(decoratedElement) || element;
            });
            return decoratedElement;
        }

    }

};