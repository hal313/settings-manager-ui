// TODO: Test
import { Constants } from '../Constants.js';
import { getTypeFromValue } from './getTypeFromValue.js';

let getTypeFromElement = (element) => {
    return element.getAttribute(Constants.ATTRIBUTE_TYPE);// || getTypeFromValue(element.value);
};

export {getTypeFromElement};