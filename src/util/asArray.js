import { isArray } from './isArray.js';
import { isDefined } from './isDefined.js';

let asArray = (value) => {
    if (!isArray(value)) {
        if (isDefined(value)) {
            return [value];
        }
        return [];
    }
    return value;
};

export {asArray};