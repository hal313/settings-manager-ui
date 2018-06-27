import { isObject } from './isObject.js';

let isObjectArray = (value) => {
    return !!(Array.isArray(value) && value.length && value.every(isObject));
};

export {isObjectArray};