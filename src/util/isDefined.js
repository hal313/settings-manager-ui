import { isUndefined } from './isUndefined.js';
import { isNull } from './isNull.js';

let isDefined = (value) => {
    return !isUndefined(value) && !isNull(value);
};

export {isDefined};