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
// rollup => tsc|babel



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

    addElementDecorator(type, elementDecorator) {
        this.settingModifier.addElementDecorator(type, elementDecorator);
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