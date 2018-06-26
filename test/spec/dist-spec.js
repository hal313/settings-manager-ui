(function() {
    'use strict';

    var SettingsManagerUI = require('../../dist/SettingsManagerUI'),
        SettingsManagerUIRunner = require('./../util/SettingsManagerRunner');

        SettingsManagerUIRunner().runSpecs(SettingsManagerUI);

}());