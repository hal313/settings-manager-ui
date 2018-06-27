import { isString } from './isString.js';

let isEmpty = (value) => {
    return !!(isString(value) && '' === value.trim());
};

export {isEmpty};