(() => {

    var SettingsManagerUI = require('../../src/SettingsManagerUI').SettingsManagerUI,
        SettingsManagerUIRunner = require('./../util/SettingsManagerUIRunner');

        SettingsManagerUIRunner().runSpecs(SettingsManagerUI);

})();