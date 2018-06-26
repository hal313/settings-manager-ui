(function() {
    'use strict';

    var SettingsManagerUI = require('../../dist/SettingsManagerUI.min'),
        SettingsManagerUIRunner = require('./../util/SettingsManagerUIRunner');

        SettingsManagerUIRunner().runSpecs(SettingsManagerUI);

}());