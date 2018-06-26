import { SettingsManagerUI } from '../../src/SettingsManagerUI.js';
// Required for the decorators (used in the page context)
import { getNameFromElement } from '../../src/util/getNameFromElement.js';

$(() => {
    // Create the JSON editor
    let editor = new JSONEditor(document.getElementById('settings-editor'), {mode: 'code'});
    // Set the JSON
    editor.set({
        'Name': {
            'First': 'Joe',
            'Last': 'Smith'
        },
        'Human': true,
        // 'Array': [1, 2, 3],
        'Age': 23,

        'Nickname': 'the sideshow'
    });


    // Create and configure the JavaScript editor
    let jsEditor = ace.edit('code-editor', {
        theme: 'ace/theme/monokai',
        mode: 'ace/mode/javascript'
    });


    // The settings manager UI
    let settingsManagerUI;

    // When the "set" button is clicked
    $('#set-settings-button').click(() => {
        // Get the settings from the editor
        let jsonSettings = editor.get();

        // Set the settings in the UI
        //
        // Create a new SettingsManagerUI instance; this is a lazy approach to avoid
        // cleaning up because any modifications added in via client JavaScript
        // would need to be reset
        settingsManagerUI = new SettingsManagerUI();
        // First, run the client code in order to load in any decorators
        eval(`((settingsManagerUI, getSettingsName) => {\n${jsEditor.getSession().getValue()}})(settingsManagerUI, ${getNameFromElement})`);
        //
        // Clear out existing elements
        // Empty the settings root; again, this is not strictly necessary, but it precludes
        // cleanup (for example, the SettingsManagerUI will modify existing elements instead)
        // of creating new ones... which is a problem if the client JavaScript changes
        // decorator implementations
        $('#settings-root').empty();
        //
        // Set the settings
        // Be sure to catch any errors
        try {
            settingsManagerUI.setSettings(jsonSettings, '#settings-root');
            // Show the "update" button if it is not already visible
            $('#update-settings-button, #results-row').show();
        } catch (error) {
            window.alert('An error occurred while setting the settings. Look in the JavaScript console for more information.');
            throw error;
        }
    });

    // When the "update" button is clicked
    $('#update-settings-button').click(() => {
        let newSettings = settingsManagerUI.getSettings('#settings-root');
        editor.set(newSettings);
    });

});
