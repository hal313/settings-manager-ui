import { StringTextTypeHandler } from '../typeHandlers/StringTextTypeHandler.js';
import { BooleanCheckboxTypeHandler } from '../typeHandlers/BooleanCheckboxTypeHandler.js';
import { NumberNumberTypeHandler } from '../typeHandlers/NumberNumberTypeHandler.js';
import { ObjectDefaultTypeHandler } from '../typeHandlers/ObjectDefaultTypeHandler.js';
import { UndefinedTypeHandler } from '../typeHandlers/UndefinedTypeHandler.js';
import { NullTypeHandler } from '../typeHandlers/NullTypeHandler.js';
import { CollectionObjectTypeHandler } from '../typeHandlers/CollectionObjectTypeHandler.js';
import { StringPasswordTypeHandler } from '../typeHandlers/StringPasswordTypeHandler.js';

// TODO: Test

export class SettingsManagerUIConfigurator {};

SettingsManagerUIConfigurator.configure = (settingsManagerUI) => {
    const stringTextTypeHandler = new StringTextTypeHandler();
    const booleanCheckboxTypeHandler = new BooleanCheckboxTypeHandler();
    const numberNumberTypeHandler = new NumberNumberTypeHandler();
    const objectDefaultTypeHandler = new ObjectDefaultTypeHandler();
    const undefinedTypeHandler = new UndefinedTypeHandler();
    const nullTypeHandler = new NullTypeHandler();
    const collectionObjectTypeHandler = new CollectionObjectTypeHandler();
    const stringPasswordTypeHandler = new StringPasswordTypeHandler();


    settingsManagerUI.addTypeHandler(stringTextTypeHandler);
    settingsManagerUI.addTypeHandler(booleanCheckboxTypeHandler);
    settingsManagerUI.addTypeHandler(numberNumberTypeHandler);
    settingsManagerUI.addTypeHandler(objectDefaultTypeHandler);
    settingsManagerUI.addTypeHandler(undefinedTypeHandler);
    settingsManagerUI.addTypeHandler(nullTypeHandler);
    settingsManagerUI.addTypeHandler(collectionObjectTypeHandler);
    settingsManagerUI.addTypeHandler(stringPasswordTypeHandler);


    // Add default handlers
    settingsManagerUI.setDefaultHandler('string', stringTextTypeHandler.getType());
    settingsManagerUI.setDefaultHandler('boolean', booleanCheckboxTypeHandler.getType());
    settingsManagerUI.setDefaultHandler('number', numberNumberTypeHandler.getType());
    settingsManagerUI.setDefaultHandler('object', objectDefaultTypeHandler.getType());
    settingsManagerUI.setDefaultHandler('collection', collectionObjectTypeHandler.getType());
}