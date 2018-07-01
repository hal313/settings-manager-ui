import { isArray } from './isArray';
import { isNull } from './isNull';
import { isEmpty } from './isEmpty';
import { isBoolean } from './isBoolean';

let isNumber = (value) => {
    return ('number' === typeof value && !isNaN(NaN)) || (!isArray(value) && !isBoolean(value) && !isEmpty(value) && !isNull(value) && !isNaN(+value));
};

export {isNumber};