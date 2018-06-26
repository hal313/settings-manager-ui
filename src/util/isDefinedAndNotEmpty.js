import { isDefined } from './isDefined.js';
import { isArray } from './isArray.js';
import { isEmpty } from './isEmpty.js';

let isDefinedOrNotEmpty = (value) => {
    return isDefined(value) && (isArray(value) || !isEmpty(value));
};

export {isDefinedOrNotEmpty};