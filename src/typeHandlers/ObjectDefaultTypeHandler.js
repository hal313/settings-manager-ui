import { isDefined } from '../util/isDefined.js';
import { createError } from '../util/createError.js';
import { Constants } from '../Constants.js';
import { getChildSettingElements } from '../util/getChildSettingElements.js';
import { getNameFromElement } from '../util/getNameFromElement.js';

// TODO: Template for adding new child nodes (use a template, if present, for all? (${name}, ${type}, [${value}]))
export class ObjectDefaultTypeHandler {

    constructor() {}

    getType() {
        return 'object:default';
    }

    getValue(element, settingModifier) {
        let childElements = getChildSettingElements(element);
        let valueObject = {};

        // For each child setting, add the name and value touple to the returned settings object
        childElements.forEach((childElement) => {
            // Get the name from the element
            let name = getNameFromElement(childElement);
            // Get the value (which may be a recursive call)
            let value = settingModifier.getValue(childElement);

            // Add the name and value to the value object
            valueObject[name] = value;
        });

        return valueObject;
    }

    setValue(element, settings, settingModifier) {
        // Append the name to the root path
        let childElements = getChildSettingElements(element);
        let childElementNames = childElements.map(getNameFromElement);

        // Remove values from the DOM which do not exist in the value
        childElements.forEach((childElement) => {
            let name = getNameFromElement(childElement);

            // If the DOM has a value which is not in the object,
            if (isDefined(settings)) {
                if (!Object.keys(settings).includes(name)) {
                    childElement.remove();
                }
            }
        });


        // Update values from the values which exist in the DOM
        childElements.forEach((childElement) => {
            let name = getNameFromElement(childElement);

            // If the DOM has a value which is in the settings object
            if (childElementNames.includes(name)) {
                if (isDefined(settings)) {
                    settingModifier.setValue(childElement, settings[name]);
                }
            }
        });


        // Add new child nodes for values which do not exist in the DOM
        if (isDefined(settings)) {
            Object.keys(settings).forEach((name) => {
                let settingValue = settings[name];

                if (!childElementNames.includes(name)) {
                    // Create the element
                    let childElement = settingModifier.createElement(name, settingValue);

                    // Add to the element
                    element.append(childElement);
                }

            });
        }

        element.value = settings;
    }

    createElement(name, value, settingModifier) {
        if (!isDefined(name)) {
            throw createError('The "name" parameter must be specified');
        }

        // Create an element
        const element = document.createElement('div');

        // Set attributes
        element.setAttribute('name', name);
        // Set custom attributes
        element.setAttribute(Constants.ATTRIBUTE_CONTAINER_ELEMENT, '');

        // Set the value
        this.setValue(element, value, settingModifier);

        return element;
    }

};