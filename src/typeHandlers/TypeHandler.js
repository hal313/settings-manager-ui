import { createError } from '../util/createError.js';

export class TypeHandler {

    constructor() {}

    getType() {
        createError('getType() is not defined on this instance');
    }

    getValue(/*element*/) {
        createError('getValue(element) is not defined on this instance');
    }

    setValue(/*element , value*/) {
        createError('setValue(element , value) is not defined on this instance');
    }

    createElement(/*name , value */) {
        createError('createElement(name , value) is not defined on this instance');
    }

}