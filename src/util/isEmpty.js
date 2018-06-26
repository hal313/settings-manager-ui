import { isString } from 'util';

let isEmpty = (value) => {
    return isString(value) && '' === value.trim();
};

export {isEmpty};