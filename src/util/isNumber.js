import { isArray } from './isArray.js';
import { isNull } from './isNull.js';
import { isEmpty } from './isEmpty.js';
import { isBoolean } from './isBoolean.js';

let isNumber = (value) => {
    return ('number' === typeof value && !isNaN(NaN)) || (!isArray(value) && !isBoolean(value) && !isEmpty(value) && !isNull(value) && !isNaN(+value));
};

export {isNumber};