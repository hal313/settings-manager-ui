/*global jQuery,$:false */
/*global console:false */

// Build User: jghidiu
// Version: 1.0.17
// Build Date: Sat Dec 27 2014 02:10:34 GMT-0500 (Eastern Standard Time)

// TODO: Make a jquery plugin
// TODO: Allow for non-flat options {debug: {enabled: true, only-on-change: true}}
// TODO: In readme, talk about how this can be a declarative solution to options
// TODO: Use an array of validators, not just one
// TODO: Allow types to be specified for each array value
// TODO: Get rid of data-setting-xxx
// TODO: Rename member to property

(function(root, factory) {
    'use strict';

    // Try to define a console object
    (function(){
        try {
            if (!console && ('undefined' !== typeof window)) {
                // Define the console if it does not exist
                if (!window.console) {
                    window.console = {};
                }

                // Union of Chrome, FF, IE, and Safari console methods
                var consoleFunctions = [
                    'log', 'info', 'warn', 'error', 'debug', 'trace', 'dir', 'group',
                    'groupCollapsed', 'groupEnd', 'time', 'timeEnd', 'profile', 'profileEnd',
                    'dirxml', 'assert', 'count', 'markTimeline', 'timeStamp', 'clear'
                ];
                // Define undefined methods as no-ops to prevent errors
                for (var i = 0; i < consoleFunctions.length; i++) {
                    if (!window.console[consoleFunctions[i]]) {
                        window.console[consoleFunctions[i]] = function() {};
                    }
                }
            }
        } catch(error) {
            // Not much to do if there is no console
        }

    })();

    // Determine the module system (if any)
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else {
        // Node
        if (typeof exports !== 'undefined') {
            module.exports = factory();
        } else {
            // None
            root.UISettingsManager = factory();
        }
    }

})(this, function() {
    'use strict';

    var UISettingsManager = function() {

        var _get$UIComponent = function(name) {
            var $uiComponent = jQuery('[data-setting-name=' + name + ']');
            var elementCount = $uiComponent.length;
            var returnValue = $uiComponent;

            if (0 === elementCount) {
                console.warn('No UI elements found for', name);
                returnValue = null;
            } else if (1 < elementCount) {
                console.warn('Multiple UI elements found for', name);
                returnValue = null;
            }

            return returnValue;
        };
        var _onNoMatching$UIComponent = function(name, value) {
            console.warn('Could not manipulate setting', name, value, 'because no matching UI element is present in the DOM');
        };

        var _populateString$UIComponent = function(name, value) {
            var $uiComponent = _get$UIComponent(name);
            if (null !== $uiComponent) {
                $uiComponent.val(value);
            } else {
                _onNoMatching$UIComponent(name, value);
            }
        };

        var _populateBoolean$UIComponent = function(name, value) {
            // See if the setting is a checkbox
            var $item = _get$UIComponent(name);
            if (null !== $item) {
                if ('checkbox' === $item[0].type) {
                    $item.prop('checked', value);
                } else {
                    _populateString$UIComponent(name, value);
                }
            } else {
                _onNoMatching$UIComponent(name, value);
            }
        };

        var _populateNumeric$UIComponent = function(name, value) {
            _populateString$UIComponent(name, value);
        };

        var _populateObject$UIComponent = function(name, value) {
            // TODO: Take type as a parameter and shell out to the correct _populateXXX$UIComponent() function
            var $objectContainer = _get$UIComponent(name);

            $objectContainer.find('[data-setting-object-member]').each(function(index, member) {
                var $member = $(member);
                var name = $member.data('setting-object-member');

                $member.val(value[name]);
            });
        };

        var _populateObjectArray$UIComponent = function(name, value) {
            // TODO: Take type as a parameter and shell out to the correct _populateXXX$UIComponent() function
            // TODO: Fix the "ordering problem" (possible solutions)
            //  1.) assume that the order is as desired
            //  2.) match based on prop names
            //  3.) have id/index in elements

            var $objectArrayContainer = _get$UIComponent(name);

            $objectArrayContainer.find('[data-setting-object-element]').each(function(index, element) {
                var item = value[index];
                var $element = $(element);

                $element.find('[data-setting-object-member]').each(function(index, member) {
                    var $member = $(member);
                    var name = $member.data('setting-object-member');
                    $member.val(item[name]);
                });
            });
        };

        // For each setting, attempt to find a ui component that matches and populate it based on formatting rules
        var _populateUserSpecifiedSettings = function(settings) {
            jQuery.each(settings, function(name, value) {
                if ('boolean' === typeof value) { //
                    _populateBoolean$UIComponent(name, value);
                } else if (jQuery.isArray(value)) {
                    _populateObjectArray$UIComponent(name, value);
                } else if (jQuery.isNumeric(value)) {
                    _populateNumeric$UIComponent(name, value);
                } else if ('string' === typeof value) {
                    _populateString$UIComponent(name, value);
                } else if ('object' === typeof value) {
                    _populateObject$UIComponent(name, value);
                } else {
                    // This is an error, log it
                    console.error('Unknown setting type', name, value, typeof value);
                }
            });
        };

        var _extractObjectElement = function($objectDescriptorElement) {
            var item = {};

            $objectDescriptorElement.find('[data-setting-object-member]').each(function(index, member) {
                var $memberContainer = $(member);
                var name = $memberContainer.data('setting-object-member');
                var validate = $memberContainer.data('setting-object-member-validate');

                // TODO: Check for only one!
                // var $valueElement = $memberContainer.find('[data-setting-object-member-value]');
                var $valueElement = $memberContainer;
                var value = $valueElement.val();

                // If no name is provided, do not add the member to the object
                if (name && 0 !== name.trim().length) {
                    if ('empty(value):ignore' === validate) {
                        if (value && 0 !== value.trim().length) {
                            item[name] = value;
                        }
                    } else {
                        item[name] = value;
                    }
                }
            });

            return item;
        };

        // Gets user specified settings from the UI and returns a settings object
        var _getFrom$UIComponent = function($uiComponent) {
            // TODO: Break up all the getters as functions
            var name = $uiComponent.data('setting-name');
            var returnValue = $uiComponent.val();

            if ('boolean' === $uiComponent.data('setting-type') || 'bool' === $uiComponent.data('setting-type') || 'checkbox' === $uiComponent[0].type) {
                if ('checkbox' === $uiComponent[0].type) {
                    returnValue = $uiComponent.is(':checked');
                } else {
                    returnValue = 'true' === $uiComponent.val().toLowerCase();
                }
            } else if ('number' === $uiComponent.data('setting-type') || 'number' === $uiComponent[0].type) {
                returnValue = parseInt($uiComponent.val());
            } else if ('string' === $uiComponent.data('setting-type') || 'text' === $uiComponent[0].type) {
                returnValue = $uiComponent.val();
            } else if ('object' === $uiComponent.data('setting-type')) {
                returnValue = _extractObjectElement($uiComponent);
           } else if ('objectarray' === $uiComponent.data('setting-type')) {
                var array = [];
                var $objectContainers = $uiComponent.find('[data-setting-object-element]');

                $objectContainers.each(function(index, objectContainer) {
                    var $objectContainer = jQuery(objectContainer);
                    var validate = $objectContainer.data('setting-object-member-validate');

                    var item = _extractObjectElement($objectContainer);

                    // Add the item to the array (check to see if empty objects are allowed)
                    if ('empty(object):ignore' === validate) {
                        if (0 !== Object.getOwnPropertyNames(item).length) {
                            array.push(item);
                        }
                    } else {
                        array.push(item);
                    }
                });

                returnValue = array;
            } else {
                console.warn('Unknown data type for setting', name, returnValue);
                returnValue = $uiComponent.val();
            }

            return returnValue;
        };

        // This gets the settings FROM THE PAGE
        var _getUserSpecifiedSettings = function() {
            var settings = {};

            jQuery('[data-setting-name]').each(function(index, item) {
                // Get the element
                var $item = jQuery(item);

                // Get the setting name
                var name = $item.data('setting-name');

                // Extract the value from the UI component
                var value = _getFrom$UIComponent($item);
                settings[name] = value;
            });

            return settings;
        };

        return {
            // TODO: Rename this!
            getUserSpecifiedSettings: _getUserSpecifiedSettings,
            populateUserSpecifiedSettings: _populateUserSpecifiedSettings
        };
    };

    // Place the version as a member in the function
    // TODO: Uncomment once build resolvers are enabled
    // UISettingsManager.version = '1.0.17';

    return UISettingsManager;

});