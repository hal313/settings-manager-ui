import { isDefinedAndNotEmpty } from '../util/isDefinedAndNotEmpty.js';
import { createError } from '../util/createError.js';
import { Constants } from '../Constants.js';
import { isObjectArray } from '../util/isObjectArray.js';
import { getChildSettingElements } from '../util/getChildSettingElements.js';
import { getNameFromElement } from '../util/getNameFromElement.js';
import { getOneElement } from '../util/getOneElement.js';
import { getAllElements } from '../util/getAllElements.js';
import { isDefined } from '../util/isDefined.js';
import { SettingModifier } from '../util/SettingModifier.js';

const ATTRIBUTE_INDEX = 'data-setting-index';
const ATTRIBUTE_COLLECTION_VALUE_CONTAINER = 'data-setting-value-container';


/**
 * Gets the index from an element.
 *
 * @param {Element} element the element to get the index from
 * @returns {Number} the index assigned to the element, based on the attribute
 * @throws when the index is not present
 */
const getIndexFrom = (element) => {
    let index = element.getAttribute(ATTRIBUTE_INDEX);
    if (isDefined(index)) {
        return +index;
    }
    throw createError(`element does not have an index assigned via ${ATTRIBUTE_INDEX} "${element.outerHTML}"`);
};

/**
 * Gets an array item container element by index.
 *
 * @param {Element} rootElement the element to get the array item container element from
 * @param {Number} index the index of the array item container element to get
 * @returns {Element} the element marked as having the specified index
 */
const getArrayItemContainerElementByIndex = (rootElement, index) => {
    return getOneElement(`[${ATTRIBUTE_INDEX}="${index}"]`, rootElement);
};

/**
 * Gets an array item container element by index.
 *
 * @param {Element} rootElement the element to get the array item container element from
 * @param {Number} index the index of the array item container element to get
 * @returns {Element[]} the elements marked as having the specified index
 */
const getArrayItemContainersElementByIndex = (rootElement, index) => {
    return getAllElements(`[${ATTRIBUTE_INDEX}="${index}"]`, rootElement);
};

/**
 * Gets an array item container element
 *
 * @param {Element} rootElement the root element
 * @returns {Element[]} all elements which are root containers
 */
const getArrayItemContainerElements = (rootElement) => {
    return getAllElements(`[${ATTRIBUTE_COLLECTION_VALUE_CONTAINER}]`, rootElement);

}

/**
 * Creates an slement which is suitable for residing in a DOM and represents the array element value.
 *
 * @param {*} value the value to create an element for
 * @param {Number} index the index of the item
 * @param {SettingModifier} settingModifier the SettingModifer to assist
 * @returns {Element} the created element
 */
const createArrayItemContainerElement = (value, index, settingModifier) => {
    const name = `name_${index}`;
    const element = settingModifier.createElement(name, value, settingModifier);
    element.setAttribute(ATTRIBUTE_INDEX, index);
    element.setAttribute(ATTRIBUTE_COLLECTION_VALUE_CONTAINER, '');
    return element;
};

export class CollectionObjectTypeHandler {

    constructor() {}

    getType() {
        return 'collection:object';
    }

    getValue(element, settingModifier) {
        let childElements = getChildSettingElements(element);
        let valueArray = [];

        // For each child setting, add the name and value touple to the returned settings object
        childElements.forEach((childElement) => {
            // The value object represented by this child
            const valueObject = {};

            // The element may be
            const valueElement = getChildSettingElements(childElement)[0];
            // Get the name from the element
            const name = getNameFromElement(valueElement);
            // Get the value (which may be a recursive call)
            const value = settingModifier.getValue(valueElement);

            // Add the name and value to the value object
            valueObject[name] = value;

            // Push the object
            valueArray.push(valueObject);
        });

        return valueArray;
    }

    setValue(element, settings, settingModifier) {
        // TODO: Is this necessary?
        element.setAttribute(Constants.ATTRIBUTE_CONTAINER_ELEMENT, '');

        // Get the container elements?
        let arrayItemContainerElements = getArrayItemContainerElements(element);

        // Remove values from the DOM which do not exist in the value
        arrayItemContainerElements.forEach((arrayItemContainerElement) => {
            let index = getIndexFrom(arrayItemContainerElement);

            // If the index of the element is more than the length if the settings, remove it
            // because that means the new settings array is shorter than the existing DOM array
            if ((index + 1) > settings.length) {
                arrayItemContainerElement.remove();
            }
        });


        // TODO: Merge dom and settings so they stay in order based on index
        // Go through the settings array; if the nth element is in the dom, set the value; otherwise, append it at the end
        settings.forEach((setting, index) => {
            let arrayItemContainerElements = getArrayItemContainersElementByIndex(element, index);

            switch (arrayItemContainerElements.length) {
                case 0:
                    // Add a new DOM element
                    element.appendChild(createArrayItemContainerElement(setting, index, settingModifier));
                    break;
                case 1:
                    // Update an existing DOM element
                    let arrayItemContainerElement = getArrayItemContainerElementByIndex(element, index);
                    settingModifier.setValue(arrayItemContainerElement, setting);
                    break;
                default:
                    throw createError(`Duplicate elements in setting "${getNameFromElement(element)}"`);
            }
        });

        element.value = settings;
    }

    createElement(name, value, settingModifier) {
        if (!isDefinedAndNotEmpty(name)) {
            throw createError('The "name" parameter must be specified');
        }
        if (!isObjectArray(value)) {
            throw createError('The "value" parameter must be an array');
        }

        // Create the root element
        const rootElement = document.createElement('div');

        // Set the value
        rootElement.value = value;

        // Set attributes
        rootElement.setAttribute('name', name);
        rootElement.setAttribute(Constants.ATTRIBUTE_NAME, name);
        rootElement.setAttribute(Constants.ATTRIBUTE_CONTAINER_ELEMENT, '');
        rootElement.setAttribute(Constants.ATTRIBUTE_TYPE, this.getType());

        // Set the value
        this.setValue(rootElement, value, settingModifier);

        return rootElement;
    }

};
