import { isEmpty } from './isEmpty';

let asBoolean = (value) => {
    if (('' + value).trim().toLowerCase() === 'false' || isEmpty(value)) {
        return false;
    }

    return !!value;
}

export {asBoolean};