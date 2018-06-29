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
// rollup: do we need this? can we use tsc instead?

// TODO: Rename SettingModifier
// TODO: eslint

// TODO: Handlers (object/collection) should not have to rely on attributes being decorated; consider adding something like child-of=<parent-id> and having parent-id be a hash (maybe of flatname)?

// TODO: TypeHandlerManager should allow for regex lookup on type
// TODO: TypeHandlerManger.getTypeFromValue should have configuration for collection type detection
// TODO: ValueDecorator (can be used to set element.value = value on set()/create())
// TODO: collection:object is not nestable because of the searches; figure out how to leverage the object:default lookups
// TODO: If the type changes (collection:object), the settingModifer will use the existing type handler instead of the new type handler. how to handle this?
// collection:object
// TODO: Test complex types (objects with object[array] children)
// TODO: Enable skipped tests
// SettingModifier: setValue() - (getHandler().supportsType() || getHandler().supportsElement()) ? getHandler.setValue(...) : getTypeHandler(getType(element)).setValue(...)
// SettingModifier: add type if not present?
// SettingModifier: use template instead of creator (if specified)
// typeresolver: fully-qualified-name attribute => declared type attribute => inferred type
// typeresolver: [supportsType(type)], [supportsElement(element)]
// templateresolver: template-name attribute => fully-qualified-name attribute => declared type attribute => inferred type
// typeDecoratorManager: getDecoratorFor(Element [not type]), type-decorator attribute => type registry => inferred type

// TODO: Decorator returns same element; cannot create structure. NFS

// TODO: Decorator/handler functions should be try/catch

// TODO: Does applying decorators make getValue break if the decorated element is embedded? Can we disallow decorators to return other elements? CollectionObjectTypeHandler uses 'const valueElement = getChildSettingElements(childElement)[0];' to work around this; should we check for only 1 element? getOnlyChildSettingElement()?


// TODO: Add fallback handler (.*, default to string)? may require matching on type lookup?
// TODO: Handler implementations should type-check value parameter


// TODO: Support object/collection sorters
// TODO: Support value decorators
// TODO: Support sorter/value decorator/element decorator assignment delcaratively


// TODO: Create TypeHandlerManagerConfigurator -> use in tests and for settingsuiconfigurator OR use SettingModifier
// TODO: Should typeHandler.setElement() should set attributes? NO! fix in object/collection classes not type if it exists, maybe even if it doesnt. But certainly name and possibly container?


// TODO: Add "remove" button for elements in playgound (can use a decorator!)
// TODO: Integration test for playground
// TODO: Add hotkeys for set/update buttons in playground
// TODO: Why does the playground page keep flashing? Is it because of imports?
// TODO: Insert string content (html/js/json/css) from files
// TODO: Add CSS editor to playground
// TODO: Tabbed editor for javascript


// TODO: Use template manager
// TODO: Flat mode / Hierarchical mode / add data-setting-manager-flat-name="some.nested.value" to all elements
// TODO: Callbacks for type overrides (pass name/value or element)


// TODO: Get jest plugin working
// TODO: Debug jest in ide
// TODO: Create npm script to run each file for coverage


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
import { SettingModifier } from './util/SettingModifier.js';

// Test
export class SettingsManagerUI {

    constructor() {
        this.settingModifier = new SettingModifier();
    };

    addTypeHandler(typeHandler) {
        this.settingModifier.addTypeHandler(typeHandler);
    };

    addTypeDecorator(type, decoratorFn) {
        this.settingModifier.addTypeDecorators(type, decoratorFn);
    };

    addTypeDecorators(type, decoratorFns) {
        this.settingModifier(type, decoratorFns);
    };

    setDefaultHandler(type, typeHandler) {
        this.settingModifier.setDefaultHandler(type, typeHandler);
    }


    setValueTo(value, target) {
        this.settingModifier.setValue(getOneElement(target), value);
    };

    getValueFrom(target) {
        return this.settingModifier.getValue(getOneElement(target));
    };


    setSettings(settings, target) {
        const element = getOneElement(target);

        // Set the type on the root element if it is not set
        this.settingModifier.decorateAsRoot(element);

        return this.setValueTo(settings, element);
    };

    getSettings(target) {
        return this.getValueFrom(target);
    };

}

// Place the version as a member in the function
SettingsManagerUI.version = '${build.version}';