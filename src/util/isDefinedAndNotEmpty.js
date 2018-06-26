import { isDefined } from './isDefined.js';
import { isArray } from './isArray.js';
import { isEmpty } from './isEmpty.js';

let isDefinedAndNotEmpty = (value) => {
    return isDefined(value) && (isArray(value) || !isEmpty(value));
};

export {isDefinedAndNotEmpty};