import { Constants } from '../Constants.js';

let getNameFromElement = (element) => {
    return element.getAttribute(Constants.ATTRIBUTE_NAME);
};

export {getNameFromElement};