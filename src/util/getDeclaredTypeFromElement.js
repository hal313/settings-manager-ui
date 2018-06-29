// TODO: Test
import { Constants } from '../Constants.js';

let getDeclaredTypeFromElement = (element) => {
    return element.getAttribute(Constants.ATTRIBUTE_TYPE);
};

export {getDeclaredTypeFromElement};