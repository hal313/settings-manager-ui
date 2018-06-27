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
// [string|boolean|number|object]arrays
// rollup

// TODO: getTypeFromValue should have configuration for collection type detection
// collection:object
// TODO: If the type changes (collection:object), the settingModifer will use the existing type handler instead of the new type handler. how to handle this?
// TODO: collection:object is not nestable because of the searches; figure out how to leverage the object:default lookups
// TODO: Consider adding [data-setting-value] to values?
// TODO: Test complex types (objects with object[array] children)
// TODO: Enable skipped tests


// TODO: Does applying decorators make getValue break if the decorated element is embedded? Can we disallow decorators to return other elements? CollectionObjectTypeHandler uses 'const valueElement = getChildSettingElements(childElement)[0];' to work around this; should we check for only 1 element? getOnlyChildSettingElement()?
// TODO: Apply flat-object-name during population
// TODO: Pass type, name, value, flatName through to decorators


// TODO: Add fallback handler (.*, default to string)? may require matching on type lookup?
// TODO: Handlers should type-check value parameter


// TODO: Support object/collection sorters
// TODO: Support value decorators
// TODO: Support sorter/value decorator/element decorator assignment delcaratively


// TODO: Create TypeHandlerManagerConfigurator -> use in tests and for settingsuiconfigurator
// TODO: Should typeHandler.setElement() should set attributes? NO! fix in object/collection classes not type if it exists, maybe even if it doesnt. But certainly name and possibly container?


// TODO: Add "remove" button for elements in playgound (can use a decorator!)
// TODO: Add hotkeys for set/update buttons in playground
// TODO: Why does the playground page keep flashing? Is it because of imports?


// TODO: Use template manager
// TODO: Flat mode / Hierarchical mode / add data-setting-manager-flat-name="some.nested.value" to all elements
// TODO: Callbacks for type overrides (pass name/value or element)


// TODO: Get jest plugin working
// TODO: Debug jest in ide


// TODO: Fix gruntfile/move to gulp/add clean target?


// TODO: Build CLI - use JSDOM(htmlstring) to help?
// TODO: Code examples for grunt/gulp tasks


// TODO: Support ng style conversions (someName === some-name)


// TODO: Can the xxxTypeHandler objects be singletons?
// TODO: Might be possible to optimize (less iteration? combine both childElements.forEach loops?) (object/collection handlers)
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