/* global document */

// Build User: ${build.user}
// Version: ${build.version}
// Build Date: ${build.date}


// NOTE: Run specific test:               npx jest --color --testRegex '.*ObjectDefaultTypeHandler.spec.*' --watch --collectCoverage false
// NOTE: Run specific test with coverage: npx jest --color --testRegex '.*ObjectDefaultTypeHandler.spec.*' --collectCoverageFrom='**/*ObjectDefaultTypeHandler*' --watch --coverage true
// npx rollup src/SettingsManagerUI.js --file dist/test.js --format iife --name "Bund" --globals 'template-manager:TemplateManager'
// npx rollup src/SettingsManagerUI.js --file dist/test.js --format iife --name "Bund" --globals 'template-manager:TemplateManager' ## watch?
// npx rollup src/SettingsManagerUI.js --file dist/test.js --format umd --name "SettingsManagerUI" --globals 'template-manager:TemplateManager'
// tsc -p jsconfig.json --outDir build

// NEXT:
// string:password, objectarrays, [string|boolean|number|object]arrays
// rollup

// TODO: Replace all toThrow => toThrowError()

// TODO: Apply flat-object-name during population
// TODO: Pass type, name, value, flatName through to decorators

// TODO: Add remove button for elements in test/html
// TODO: Add hotkeys for set/update buttons in test/html
// TODO: Why does the test/html page keep flashing?

// TODO: Add fallback handler (.*, default to string)? may require matching on type lookup?
// TODO: Handlers should type-check value parameter
// TODO: Get jest plugin working
// TODO: Debug jest in ide

// TODO: npm script for running specific test: npx jest --color --testRegex '.*ObjectDefaultTypeHandler.spec.*' --collectCoverageFrom='**/*ObjectDefaultTypeHandler*'  --watch --coverage true

// TODO: Fix gruntfile/move to gulp/add clean target?

// TODO: Callbacks for type overrides (pass name/value or element)
// Kit lookup should be wildcard

// TODO: Build CLI - use JSDOM(htmlstring) to help?
// TODO: Code examples for grunt/gulp tasks


// TODO: Use template manager
// TODO: Flat mode / Hierarchical mode / add data-setting-manager-flat-name="some.nested.value" to all elements

// TODO: Support object key sorters
// TODO: Support value processors

// TODO: Support ng style conversions (someName === some-name)

// TODO: Check common error throwing
// TODO: Can the xxxTypeHandler objects be singletons?

// TODO: Test complex types (objects with object[array] children)
// TODO: debug flag
// TODO: jsdoc
// TODO: README
// TODO: How to handle when putSettingsIntoUI() is called and some settings dont exist in the DOM? We should track this, right? Keep a copy of settings and merge with UI on getSettingsFromUI?
// TODO: Add updateSettingsIntoElement(settings, element) => Update existing settings only by changing value/checked/etc

// TODO: Support renderer running the processChain on values at render time
// TODO: Support renderer template resolver maps
// TODO: Should populateObjectElement() use own properties? or all? or a selector to decide which properties to use?
// TODO: Figure out a way to not need uniqueClass on lookups (getObjectValueFromElement())
// TODO: Different template managers for arrayobject, renderer, other templates (map of templatemanagers?)
// TODO: Support a way to use custom renderers/templates/resolvers for renders
// TODO: Type override map (in case numbers are stored as strings, for example)
// TODO: Extensible renderer functionality (use external renderer, based on type/value/name)
// TODO: Primitive array types (string, number, boolean)?
// TODO: constants for types (string, number, boolean, object, objectarray)
// TODO: Ignore read/ignore write processors?
// TODO: Add support for processors at the object level (apply to all members; how to support ordering if a sub-element has processors, too? pre/post?)
// TODO: Reorg constants
// TODO: What if populateXXX with a non-boolean is passed to a checkbox?
// TODO: Make a jquery plugin
// TODO: Allow for non-flat options {debug: {enabled: true, only-on-change: true}}
// TODO: In readme, talk about how this can be a declarative solution to options
// TODO: Allow types to be specified for each array value
// TODO: Get rid of data-setting-xxx and move to attributes (setting-xxx)
// TODO: Consider having the configurator pull in descriptors from JSON and load them (note: this might be challenging because of the need to dynamically import paths and import statements can be top level only)

import { getOneElement } from './util/getOneElement.js';
import { TypeDecoratorManager } from './util/TypeDecoratorManager.js';
import { TypeHandlerManager } from './util/TypeHandlerManager.js';
import { SettingsManagerUIConfigurator } from './util/SettingsManagerUIConfigurator.js';
import { SettingModifier } from './util/SettingModifier.js';


// OK, so this will suck with a lot of instances because they wont be garbage collected :(
const privates = {};
const getPrivate = (instance, name) => {
    if (!privates[instance]) {
        privates[instance] = {};
    }
    return privates[instance][name];
};
const setPrivate = (instance, name, value) => {
    if (!privates[instance]) {
        privates[instance] = {};
    }
    privates[instance][name] = value;
};

export class SettingsManagerUI {

    constructor() {

        let typeHandlerManager = new TypeHandlerManager();
        let typeDecoratorManager = new TypeDecoratorManager();
        let settingModifier = new SettingModifier(typeHandlerManager, typeDecoratorManager);

        setPrivate(this, 'typeHandlerManager', typeHandlerManager);
        setPrivate(this, 'typeDecoratorManager', typeDecoratorManager);
        setPrivate(this, 'settingModifier', settingModifier);

        // Configure this instance
        SettingsManagerUIConfigurator.configure(this);
    };

    addTypeHandler(typeHandler) {
        getPrivate(this, 'typeHandlerManager').addTypeHandler(typeHandler);
    };

    addTypeDecorator(type, decoratorFn) {
        getPrivate(this, 'typeDecoratorManager').addTypeDecorators(type, decoratorFn);
    };

    addTypeDecorators(type, decoratorFns) {
        this.addTypeDecorator(type, decoratorFns);
    };

    setDefaultHandler(type, typeHandler) {
        getPrivate(this, 'typeHandlerManager').setDefaultHandler(type, typeHandler);
    }

    setValueTo(value, target) {
        getPrivate(this, 'settingModifier').setValue(getOneElement(target), value);
    };

    getValueFrom(target) {
        return getPrivate(this, 'settingModifier').getValue(getOneElement(target));
    };

    setSettings(settings, target) {
        return this.setValueTo(settings, target);
    };

    getSettings(target) {
        return this.getValueFrom(target);
    };

}

// Place the version as a member in the function
SettingsManagerUI.version = '${build.version}';












































        // // Default templates for rendering
        // let templateManager = new TemplateManager();
        // templateManager.add('render.string',      '<input data-setting-name="${name}" data-setting-type="string"     type="text"     value="${value}" />');
        // templateManager.add('render.boolean',     '<input data-setting-name="${name}" data-setting-type="string"     type="checkbox" ${checked}/> ${name}');
        // templateManager.add('render.number',      '<input data-setting-name="${name}" data-setting-type="number"     type="number"   value="${value}"/>');
        // templateManager.add('render.object',      '<div   data-setting-name="${name}" data-setting-type="object">${value}</div>');
        // templateManager.add('render.objectarray', '<div   data-setting-name="${name}" data-setting-type="objectarray">${value}</div>');
        // templateManager.add('render.objectarray.objectelement', '<div data-setting-container>${value}</div>');

        // // TODO: Array processors
        // // TODO: Object sorters?
        // // var sortersMap = {
        // //     sort: function sort(array, name) {
        // //         return array.sort();
        // //     }
        // // };
        // var templateResolversMap = {};

        // // No need to filter - consumer can do that
        // var valueProcessorsMap = {
        //     uppercase: {
        //         // Used when reading from the UI
        //         get: function get(value, name) {
        //             return (!!value && 'string' === typeof value) ? value.toUpperCase() : value;
        //         },
        //         // Used when writing to the UI
        //         set: function set(value, name) {
        //             return (!!value && 'string' === typeof value) ? value.toUpperCase() : value;
        //         }
        //     },
        //     lowercase: {
        //         // Used when reading from the UI
        //         get: function get(value, name) {
        //             return (!!value && 'string' === typeof value) ? value.toLowerCase() : value;
        //         },
        //         // Used when writing to the UI
        //         set: function set(value, name) {
        //             return (!!value && 'string' === typeof value) ? value.toLowerCase() : value;
        //         }
        //     }
        // };

        // ////////////////////////////////////////////////////////////////////////
        // // Helper Methods
        // ////////////////////////////////////////////////////////////////////////
        // var getNameFromElement = function getNameFromElement(element) {
        //     return element.getAttribute(constants.nameAttribute);
        // };
        // var getTypeFromElement = function getTypeFromElement(element) {
        //     return element.getAttribute(Constants.ATTRIBUTE_TYPE);
        // };
        // var getProcessorsFromElement = function getProcessorsFromElement(element) {
        //     var elementProcessors = [],
        //         processorNames = element.getAttribute(constants.ATTRIBUTE_PROCESSORS);

        //         if (isDefined(processorNames)) {
        //             processorNames.split(',').forEach(function onProcessor(processorName) {
        //                 var processor = valueProcessorsMap[new String(processorName).trim()];
        //                 if (isDefined(processor)) {
        //                     elementProcessors.push(processor);
        //                 } else {
        //                     console.warn('unknown processor', processorName);
        //                 }
        //             });
        //         }

        //     return elementProcessors;
        // };

        // var getElementByName = function getElementByName(name, rootElement) {
        //     return getOneElement('[' + Constants.ATTRIBUTE_NAME + '=' + name + ']', rootElement);
        // };
        // this.generateSettingsMarkup = (settings) => {
        //     let content = '';

        //     for (let name in settings) {
        //         content += renderValue(name, settings[name]);
        //     }

        //     return content;
        // };
        // var getRenderResolverMap = function getRenderResolverMap(name, value) {
        //     // TODO: Update when TemplateManager is updated (no need to use complex resolvers)
        //     return [
        //         {regex: 'name', replacement: name},
        //         {regex: 'value', replacement: value}
        //     ];
        // };
        // /**
        //  * Adds markup to the DOM.
        //  *
        //  * @param {String} markup the markup to add
        //  * @param {String|Element} target the CSS selector or Element to add the markup
        //  */
        // var addToDom = function addToDom(markup, target) {
        //     getElementFrom(target).innerHTML = markup;
        // };


        // ////////////////////////////////////////////////////////////////////////
        // // Processors & sorters
        // ////////////////////////////////////////////////////////////////////////
        // var processChain = function processChain(processors, fn, value, name) {
        //     var result = value;

        //     processors.forEach(function onProcess(processor) {
        //         result = processor[fn](result, name);
        //     });

        //     return result;
        // };


        // ////////////////////////////////////////////////////////////////////////
        // // Populators
        // ////////////////////////////////////////////////////////////////////////
        // //
        // var populateStringElement = function populateStringElement(element, value) {
        //     element.value = value;
        // };
        // var populateBooleanElement = function populateBooleanElement(element, value) {
        //     var normalizedValue = !!value;

        //     // See if the setting is a checkbox
        //     if ('checkbox' === element.type) {
        //         element.checked = normalizedValue;
        //     } else {
        //         populateStringElement(element, normalizedValue);
        //     }
        // };
        // var populateNumberElement = function populateNumberElement(element, value) {
        //     var normalizedValue = Number.parseFloat(value);
        //     // Technically there is no difference between number and text
        //     element.value = normalizedValue;
        // };
        // /**
        //  *
        //  * @param {Element} rootElement the top-level element which holds the object members
        //  * @param {Object} valueObject the value object
        //  */
        // var populateObjectElement = function populateObjectElement(rootElement, valueObject) {
        //     Object.keys(valueObject).forEach(function onProperty(name) {
        //         var value = valueObject[name];

        //         // Ignore functions
        //         if (!isFunction(value)) {
        //             // Iterate through all object member elements
        //             rootElement.querySelectorAll('[' + constants.nameAttribute + '=' + name + ']').forEach(function onElement(element) {
        //                 populateElement(element, value);
        //             });
        //         }
        //     });

        // };
        // var populateObjectArrayElement = function populateObjectArrayElement(element, valueObjects) {
        //     // Get the template
        //     var templateName = element.getAttribute(constants.ATTRIBUTE_TEMPLATE_NAME);

        //     // TODO: Can we simplify this?
        //     if (isDefined(templateName)) {
        //         // Populate with a template; use any optional resolver map
        //         addToDom(templateManager.get(templateName).process(templateResolversMap[templateName]), element);

        //         // Iterate through each value touple in the values object
        //         valueObjects.forEach(function onValueObject(valueObject) {
        //             populateObjectElement(element, valueObject);
        //         });
        //     } else {
        //         // Manually populate
        //         //
        //         // Get an array of top-level elements; each top level element corresponds to an element in the array
        //         var elements = element.querySelectorAll('[' + constants.ATTRIBUTE_OBJECT_ELEMENT + ']');

        //         // For each value ("values" is an array of objects)
        //         valueObjects.forEach(function onValueObject(valueObject, index) {
        //             // The element is the element within the elements array whose index is the same as the valueObject
        //             // Elements[index] might not be defined; this can happen if the array has an object added to it after it has been rendered
        //             if (!elements[index]) {
        //                 console.warn('attempt to populate array index', index, 'failed; perhaps the array has more elements than the DOM (this is common when settings are added and updateSettingsIntoElement() is invoked)');
        //             } else {
        //                 populateObjectElement(elements[index], valueObject);
        //             }
        //         });
        //     }

        // };
        // var populateElement = function populateElement(element, value) {
        //     var processors = getProcessorsFromElement(element),
        //         name = getNameFromElement(element),
        //         processedValue = processChain(processors, 'set', value, name),
        //         type = getTypeFromElement(element);

        //     switch(type) {
        //         case 'string':
        //             populateStringElement(element, processedValue);
        //             break;
        //         case 'number':
        //             populateNumberElement(element, processedValue);
        //             break;
        //         case 'boolean':
        //             populateBooleanElement(element, processedValue);
        //             break;
        //         case 'object':
        //             populateObjectElement(element, processedValue);
        //             break;
        //         case 'objectarray':
        //             populateObjectArrayElement(element, processedValue);
        //             break;
        //         default:
        //             // If we can't figure it out, log a warning
        //             console.warn('Unable to establish type for', name, 'falling back to \'string\'');

        //             // If we can't figure it out, take a crack at it
        //             populateStringElement(element, processedValue);
        //     }
        // };


        // ////////////////////////////////////////////////////////////////////////
        // // Updaters
        // ////////////////////////////////////////////////////////////////////////
        // //
        // var updateStringElement = function updateStringElement(element, name, value) {
        //     populateStringElement(element, value);
        // };
        // var updateNumberElement = function updateStringupdupdateNumberElementateNumberElementElement(element, name, value) {
        //     populateNumberElement(element, value);
        // };
        // var updateBooleanElement = function updateBooleanElement(element, name, value) {
        //     populateBooleanElement(element, value);
        // };
        // var updateObjectElement = function updateObjectElement(element, name, value) {
        //     populateObjectElement(element, value);
        // };
        // var updateObjectArrayElement = function updateObjectArrayElement(element, name, value) {
        //     populateObjectArrayElement(element, value);
        // };

        // var updateSettingIntoElement = function updateSettingIntoElement(element, name, value) {
        //     var processors = getProcessorsFromElement(element),
        //         processedValue = processChain(processors, 'set', value);

        //     switch(getTypeFromValue(value)) {
        //         case 'string':
        //             return updateStringElement(element, name, processedValue);
        //         case 'number':
        //             return updateNumberElement(element, name, processedValue);
        //         case 'boolean':
        //             return updateBooleanElement(element, name, processedValue);
        //         case 'object':
        //             return updateObjectElement(element, name, processedValue);
        //         case 'objectarray':
        //             return updateObjectArrayElement(element, name, processedValue);
        //         default:
        //             // If we can't figure it out, log a warning
        //             console.warn('Unable to establish type for', name, 'falling back to \'string\'');

        //             // If we can't figure it out, take a crack at it
        //             return updateStringElement(element, name, processedValue);
        //     }
        // };


        // ////////////////////////////////////////////////////////////////////////
        // // Parsers
        // ////////////////////////////////////////////////////////////////////////
        // //
        // var getStringValueFromElement = function getStringValueFromElement(element) {
        //     return element.value;
        // };
        // var getBooleanValueFromElement = function getBooleanValueFromElement(element) {
        //     if ('checkbox' === element.type) {
        //         return !!element.checked;
        //     } else {
        //         return 'true' === element.value ? (element.value || '').toString().toLowerCase() : null;
        //     }
        // };
        // var getNumberValueFromElement = function getNumberValueFromElement(element) {
        //     return Number.parseFloat(getStringValueFromElement(element));
        // };
        // var getObjectValueFromElement = function getObjectValueFromElement(rootElement) {
        //     var valueObject = {},
        //         // Add a unique class which assists with lookups
        //         uniqueClass = 'js-__lookupclass__' + (Math.floor(Math.random() * new Date().getTime())),
        //         // Select all items under the rootElement which have a data-setting-name attribute
        //         allSelector = '[' + constants.nameAttribute + ']',
        //         // Exclude all elements which are children of either object values or objectarray values
        //         excludeSelector = '.' + uniqueClass + ' [' + constants.typeAttribute + '=object] [' + constants.nameAttribute + '], .' + uniqueClass + ' [' + constants.typeAttribute + '=objectarray] [' + constants.nameAttribute + ']',
        //         // Get all the elements
        //         allElements,
        //         excludedObjects;

        //     // Add a uniuqe class identifier in order to help with some queries
        //     rootElement.classList.add(uniqueClass);

        //     // Get all the elements
        //     allElements = rootElement.querySelectorAll(allSelector);
        //     // Get all the elements to exclude
        //     excludedObjects = Array.prototype.slice.call(rootElement.querySelectorAll(excludeSelector));

        //     // Only process elements which are not excluded
        //     allElements.forEach(function onElement(element) {
        //         if (!excludedObjects.includes(element)) {
        //             valueObject[element.getAttribute(constants.nameAttribute)] = getValueFromElement(element);
        //         }
        //     });

        //     // Remove the lookup class
        //     rootElement.classList.remove(uniqueClass);

        //     // Return the value object
        //     return valueObject;
        // };
        // var getObjectArrayValueFromElement = function getObjectArrayValueFromElement(rootElement) {
        //     var array = [];
        //     var objectContainers = rootElement.querySelectorAll('[' + constants.ATTRIBUTE_OBJECT_ELEMENT + ']');

        //     objectContainers.forEach(function(objectContainer) {
        //         var objectValue = getObjectValueFromElement(objectContainer);
        //         array.push(objectValue);
        //     });

        //     return array;
        // };
        // // Gets user specified settings from the UI and returns a settings object
        // var getValueFromElement = function getValueFromElement(element) {
        //     var type = getTypeFromElement(element) || element.type,
        //         value;

        //     switch(type) {
        //         case 'string': case 'text':
        //             value = getStringValueFromElement(element);
        //             break;
        //         case 'number':
        //             value = getNumberValueFromElement(element);
        //             break;
        //         case 'boolean': case 'checkbox':
        //             value = getBooleanValueFromElement(element);
        //             break;
        //         case 'object':
        //             value = getObjectValueFromElement(element);
        //             break;
        //         case 'objectarray':
        //             value = getObjectArrayValueFromElement(element);
        //             break;
        //         default:
        //             console.warn('Unknown data type for setting', getNameFromElement(element), value);
        //             value = element.value;
        //     }

        //     return processChain(getProcessorsFromElement(element), 'get', value, name);
        // };


        // ////////////////////////////////////////////////////////////////////////
        // // Settings getter/setter
        // ////////////////////////////////////////////////////////////////////////
        // //
        // // This gets the settings FROM THE PAGE
        // this.getSettingsFromElement = (target) => {
        //     // Get all the settings, starting from the body
        //     return getObjectValueFromElement(getElementFrom(target) || document.body);
        // };
        // this.putSettingsIntoElement = (settings, target) => {
        //     addToDom(this.generateSettingsMarkup(settings), target);
        // };
        // this.updateSettingsIntoElement = (settings, element) => {
        //     let settingElement;

        //     for (let name in settings) {
        //         settingElement = getElementFrom(element).querySelector('[' + constants.nameAttribute + '=' + name + ']');
        //         updateSettingIntoElement(settingElement, name, settings[name]);
        //     }
        // };



        // ////////////////////////////////////////////////////////////////////////
        // // Renderers
        // ////////////////////////////////////////////////////////////////////////
        // //
        // var renderStringElement = function renderStringElement(name, value) {
        //     return templateManager.get('render.string').process(getRenderResolverMap(name, value));
        // };
        // var renderNumberElement = function renderNumberElement(name, value) {
        //     return templateManager.get('render.number').process(getRenderResolverMap(name, value));
        // };
        // var renderBooleanElement = function renderBooleanElement(name, value) {
        //     var resolverMap = getRenderResolverMap(name, value);
        //     // Need to augment the map for the "checked" attribute
        //     resolverMap.push({regex: 'checked', replacement: !!value ? 'checked' : ''});

        //     return templateManager.get('render.boolean').process(resolverMap);
        // };
        // var renderObjectElement = function renderObjectElement(name, value) {
        //     // TODO: Sort value object

        //     var topLevelTemplate = templateManager.get('render.object'),
        //         valuesContent = '';

        //     for (var valueName in value) {
        //         valuesContent += renderValue(valueName, value[valueName]);
        //     }

        //     return topLevelTemplate.process(getRenderResolverMap(name, valuesContent));
        // };
        // var renderObjectArrayElement = function renderObjectArrayElement(name, valuesArray) {
        //     // TODO: Finish implementation
        //     // TODO: Sort value array
        //     var topLevelTemplate = templateManager.get('render.objectarray'),
        //         objectTemplate = templateManager.get('render.objectarray.objectelement'),
        //         arraysContent = '';

        //     valuesArray.forEach(function onValue(valueObject) {
        //         // value is an OBJECT in the array
        //         //
        //         // render all OBJECT values into strings
        //         var valuesContent = '';

        //         for (var valueName in valueObject) {
        //             valuesContent += renderValue(valueName, valueObject[valueName]);
        //         }

        //         arraysContent += objectTemplate.process(getRenderResolverMap(null, valuesContent));
        //     });

        //     return topLevelTemplate.process(getRenderResolverMap(name, arraysContent));
        // };
        // var renderValue = function renderValue(name, value) {
        //     switch(getTypeFromValue(value)) {
        //         case 'string':
        //             return renderStringElement(name, value);
        //         case 'number':
        //             return renderNumberElement(name, value);
        //         case 'boolean':
        //             return renderBooleanElement(name, value);
        //         case 'object':
        //             return renderObjectElement(name, value);
        //         case 'objectarray':
        //             return renderObjectArrayElement(name, value);
        //         default:
        //             // If we can't figure it out, log a warning
        //             console.warn('Unable to establish type for', name, 'falling back to \'string\'');

        //             // If we can't figure it out, take a crack at it
        //             return renderStringElement(name, value);
        //     }
        // };

        // this.addValueProcessor = (name, processor) => {
        //     // Check null/undefined/empty
        //     if (!!valueProcessorsMap[name]) {
        //         console.warn('attemping to add existing processor', name, '; old processor will be overwritten');
        //     }
        //     valueProcessorsMap[name] = processor;
        // };
        // this.addTemplateResolver = (templateName, resolverMap) => {
        //     // Check null/undefined/empty
        //     if (!!templateResolversMap[name]) {
        //         console.warn('attemping to add existing template resolver map', name, '; old resolver map will be overwritten');
        //     }
        //     templateResolversMap[templateName] = resolverMap;
        // };
        // this.addRenderTemplate = (type, template) => {
        //     templateManager.add('render.' + type, template);
        // };
        // this.addObjectArrayTemplate = (name, template) => {
        //     templateManager.add(name, template);
        // };