import { StringTextTypeHandler } from '../typeHandlers/StringTextTypeHandler.js';
import { BooleanCheckboxTypeHandler } from '../typeHandlers/BooleanCheckboxTypeHandler.js';
import { NumberNumberTypeHandler } from '../typeHandlers/NumberNumberTypeHandler.js';
import { ObjectDefaultTypeHandler } from '../typeHandlers/ObjectDefaultTypeHandler.js';
import { UndefinedTypeHandler } from '../typeHandlers/UndefinedTypeHandler.js';
import { NullTypeHandler } from '../typeHandlers/NullTypeHandler.js';

// TODO: Test

export class SettingsManagerUIConfigurator {};

SettingsManagerUIConfigurator.configure = (settingsManagerUI) => {
    let stringTextTypeHandler = new StringTextTypeHandler();
    let booleanCheckboxTypeHandler = new BooleanCheckboxTypeHandler();
    let numberNumberTypeHandler = new NumberNumberTypeHandler();
    let objectDefaultTypeHandler = new ObjectDefaultTypeHandler();
    let undefinedTypeHandler = new UndefinedTypeHandler();
    let nullTypeHandler = new NullTypeHandler();


    settingsManagerUI.addTypeHandler(stringTextTypeHandler);
    settingsManagerUI.addTypeHandler(booleanCheckboxTypeHandler);
    settingsManagerUI.addTypeHandler(numberNumberTypeHandler);
    settingsManagerUI.addTypeHandler(objectDefaultTypeHandler);
    settingsManagerUI.addTypeHandler(undefinedTypeHandler);
    settingsManagerUI.addTypeHandler(nullTypeHandler);


    // Add default handlers
    settingsManagerUI.setDefaultHandler('string', stringTextTypeHandler.getType());
    settingsManagerUI.setDefaultHandler('boolean', booleanCheckboxTypeHandler.getType());
    settingsManagerUI.setDefaultHandler('number', numberNumberTypeHandler.getType());
    settingsManagerUI.setDefaultHandler('object', objectDefaultTypeHandler.getType());
}