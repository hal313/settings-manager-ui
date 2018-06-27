// TODO: Test
import { isElement } from './isElement.js';

let getAllElements = (target, rootElement) => {
    if (isElement(target)) {
        return target;
    }

    return (rootElement||document.body).querySelectorAll(target) || [];
};

export {getAllElements};