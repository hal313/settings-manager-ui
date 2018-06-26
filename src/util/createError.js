import { isDefinedAndNotEmpty } from './isDefinedAndNotEmpty.js';

let createError = (message) => {
    return new Error(isDefinedAndNotEmpty(message) ? message : 'Unknown error');
};

export {createError};