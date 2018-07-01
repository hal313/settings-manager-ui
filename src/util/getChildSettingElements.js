import { Constants } from '../Constants.js';

let getChildSettingElements = (rootElement) => {
    /*
    Wordology: "decendant" refers to the value elements which are value-based sub-elements, but they are not
    "children" in the DOM sense because there may be non-value-based elements between the root and a value-based
    element. Instead, "decendant" refers to the value-based elements within the root that have no container
    element between the root and the value-based element.

    <div id="root">
        <div>
            <div id="child-of-root-1">
                <div id="container">
                    <div id="child-of-container-1"></div>
                    <div id="child-of-container-2"></div>
                </div>
            </div>
        </div>
        <div id="child-of-root-2"></divid>
    </div>

    In this example, #child-of-root-1 and #child-of-root-2 are siblings and children of #root. Likewise,
    the elements #child-of-container-1 and #child-of-container-2 are siblings, but NOT children of #root.
    */


    // Add a unique class which assists with lookups
    let uniqueClass = 'js-__lookupclass__' + (Math.floor(Math.random() * new Date().getTime()));

    // Select all items under the rootElement which have a data-setting-name attribute
    let allDecendantsValueSelector = '[' + Constants.ATTRIBUTE_NAME + ']';

    // Exclude all elements which are children of either object values or objectarray values
    let excludeSelector = '.' + uniqueClass + ' [' + Constants.ATTRIBUTE_CONTAINER_ELEMENT + '] [' + Constants.ATTRIBUTE_NAME + ']'; //, .' + uniqueClass + ' [' + Constants.ATTRIBUTE_TYPE + '=objectarray] [' + Constants.ATTRIBUTE_NAME + ']';

    // All the decendant value elements
    let allElements;

    // Decedant value elements which are not direct decendant elements
    let excludedElements;

    let childSettingElements = [];

    // Add a uniuqe class identifier in order to help with some queries
    rootElement.classList.add(uniqueClass);

    // Get all the elements
    allElements = rootElement.querySelectorAll(allDecendantsValueSelector);
    // (allElements||[]).forEach((element) => {
    //     console.log(element.type);
    // });
    // Get all the elements to exclude
    excludedElements = Array.prototype.slice.call(rootElement.querySelectorAll(excludeSelector));
    // (excludedElements||[]).forEach((element) => {
    //     console.log(element.type);
    // });

    // Only process elements which are not excluded
    (allElements||[]).forEach((element) => {
        if (!excludedElements.includes(element)) {
            childSettingElements.push(element);
        }
    });

    // Remove the lookup class
    rootElement.classList.remove(uniqueClass);

    return childSettingElements;
};

export {getChildSettingElements};