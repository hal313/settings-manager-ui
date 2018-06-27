import { isArray } from './isArray.js';

let getTypeFromValue = (value) => {
    // Because this module's internal types mirror that of JavaScript (with the exception of objectarray),
    // it is necessary only have to check for object array and return the JavaScript type otherwise
    return isArray(value) ? 'collection:object' : typeof value;
};

export {getTypeFromValue};