import { isDefinedOrNotEmpty } from './isDefinedOrNotEmpty';

let createError = (message) => {
    return new Error(isDefinedOrNotEmpty(message) ? message : 'Unknown error');
};

export {createError};