import { isArray } from './isArray.js';
import { isDefined } from './isDefined.js';

let isObject = (value) => {
    return !!(isDefined(value) && !isArray(value) && 'object' === typeof value);
};

export {isObject};