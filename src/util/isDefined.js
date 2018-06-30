import { isUndefined } from './isUndefined';
import { isNull } from './isNull';

let isDefined = (value) => {
    return !isUndefined(value) && !isNull(value);
};

export {isDefined};