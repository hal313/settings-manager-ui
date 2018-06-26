// TODO: Test
import { Constants } from '../Constants.js';

let getTypeFromElement = (element) => {
    return element.getAttribute(Constants.ATTRIBUTE_TYPE);
};

export {getTypeFromElement};