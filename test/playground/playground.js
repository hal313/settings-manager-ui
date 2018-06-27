import { SettingsManagerUI } from '../../src/SettingsManagerUI.js';
// Required for the decorators (used in the page context)
import { getNameFromElement } from '../../src/util/getNameFromElement.js';

$(() => {
    const EDITOR_THEME = 'ace/theme/monokai';
    const JSON_INDENT = 4;

    // Create the JSON editor
    let jsonEditor = ace.edit('settings-editor', {
        theme: EDITOR_THEME,
        mode: 'ace/mode/json'
    });
    ((session) => {
        session.setValue(JSON.stringify(JSON.parse(session.getValue()), null, JSON_INDENT));
    })(jsonEditor.getSession());

    // Create and configure the JavaScript editor
    let javascriptEditor = ace.edit('javascript-editor', {
        theme: EDITOR_THEME,
        mode: 'ace/mode/javascript'
    });

    // Create and configure the HTML editor
    let htmlEditor = ace.edit('html-editor', {
        theme: EDITOR_THEME,
        mode: 'ace/mode/html'
    });


    // The settings manager UI
    let settingsManagerUI;

    // When the "set" button is clicked
    $('#set-settings-button').click(() => {
        // Get the settings from the editor
        let jsonSettings = JSON.parse(jsonEditor.getSession().getValue());

        // Set the settings in the UI
        //
        // Create a new SettingsManagerUI instance; this is a lazy approach to avoid
        // cleaning up because any modifications added in via client JavaScript
        // would need to be reset
        settingsManagerUI = new SettingsManagerUI();
        // First, run the client code in order to load in any decorators
        eval(`((settingsManagerUI, getSettingsName) => {\n${javascriptEditor.getSession().getValue()}})(settingsManagerUI, ${getNameFromElement})`);
        //
        // Clear out existing elements
        // Empty the settings root; again, this is not strictly necessary, but it precludes
        // cleanup (for example, the SettingsManagerUI will modify existing elements instead)
        // of creating new ones... which is a problem if the client JavaScript changes
        // decorator implementations
        // $('#settings-root').empty();
        $('#html-root').html(htmlEditor.getSession().getValue());
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
        jsonEditor.getSession().setValue(JSON.stringify(newSettings, null, JSON_INDENT));
    });

    // Show the editors
    $('.editor').show();
});
