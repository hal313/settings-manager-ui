import { isEmpty } from './isEmpty.js';

let asBoolean = (value) => {
    if (('' + value).trim().toLowerCase() === 'false' || isEmpty(value)) {
        return false;
    }

    return !!value;
}

export {asBoolean};