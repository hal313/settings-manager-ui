import { isElement } from './isElement';
import { isString } from 'util';
import { createError } from './createError';
import { isDefinedOrNotEmpty } from './isDefinedOrNotEmpty';

let asElement = (element) => {
    if (isElement(element)) {
        return element;
    }
    if (isString(element) && isDefinedOrNotEmpty(element)) {
        // https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
        let template = document.createElement('template');
        let html = element.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }
    throw createError(`element must be an element or string, but was "${typeof element}"`);
};

export {asElement};