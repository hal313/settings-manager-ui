/*global jQuery,$:false */
/*global console:false */
/*global TemplateManager:false */

// Build User: 
// Version: 2.0.4
// Build Date: Fri Apr 26 2019 00:58:20 GMT-0400 (EDT)

// TODO: Make a jquery plugin
// TODO: Allow for non-flat options {debug: {enabled: true, only-on-change: true}}
// TODO: In readme, talk about how this can be a declarative solution to options
// TODO: Use an array of validators, not just one
// TODO: Allow types to be specified for each array value
// TODO: Get rid of data-setting-xxx and move to attributes (setting-xxx)
// TODO: Rename member to property (data-setting-object-member and setting-object-member-validate)

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

    var UISettingsManager = function(templateManager) {

        if (!(this instanceof UISettingsManager)) {
            return new UISettingsManager(templateManager);
        }

        var _templateManager = templateManager || new TemplateManager();

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

        // TODO: Make sure that we can get the name of the component from the $uiComponent
        var _onNoMatchingBy$UIComponent = function($uiComponent, value) {
            // console.warn('Could not manipulate setting', $uiComponent.data('setting-name'), value, 'because no matching UI element is present in the DOM');
            console.warn('Could not manipulate setting with value', value, 'because no matching UI element is present in the DOM');
        };


        var _populateString$UIComponent = function($uiComponent, value) {
            if (null !== $uiComponent) {
                $uiComponent.val(value);
            } else {
                _onNoMatchingBy$UIComponent($uiComponent, value);
            }
        };

        var _populateBoolean$UIComponent = function($uiComponent, value) {
            // See if the setting is a checkbox
            if (null !== $uiComponent) {
                if ('checkbox' === $uiComponent[0].type) {
                    $uiComponent.prop('checked', value);
                } else {
                    _populateString$UIComponent($uiComponent, value);
                }
            } else {
                _onNoMatchingBy$UIComponent($uiComponent, value);
            }
        };

        var _populateNumber$UIComponent = function($uiComponent, value) {
            _populateString$UIComponent($uiComponent, parseInt(value));
        };

        var _populateObject$UIComponent = function($uiComponent, value) {
            $uiComponent.find('[data-setting-object-member]').each(function(index, member) {
                var $member = $(member);
                var name = $member.data('setting-object-member');
                var type = $member.data('setting-type') || 'string'; // Default to 'string'
                if ('string' === type) {
                    _populateString$UIComponent($member, value[name]);
                } else if ('number' === type) {
                    _populateNumber$UIComponent($member, value[name]);
                } else if ('boolean' === type || 'bool' === type) {
                    _populateBoolean$UIComponent($member, value[name]);
                } else {
                    // TODO: Try to figure it out (is it a checkbox?)

                    // If we can't figure it out, log an error
                    console.log('Unable to establish type for', name, 'falling back to \'string\'');
                    // If we can't figure it out, take a crack at it
                    _populateString$UIComponent($member, value[name]);
                }
            });
        };

        var _populateObjectArray$UIComponent = function($uiComponent, value) {
            // TODO: Fix the "ordering problem" (possible solutions)
            //  1.) assume that the order is as desired
            //  2.) match based on prop names
            //  3.) have id/index in elements

            var templateName = $uiComponent.data('template-name');
            var template = _templateManager.get(templateName);

            var resolvedContent;
            var $newElement;

            // Populate the DOM
            $.each(value, function(index, item) {
                var resolverMap = [];

                // Build the resolver map
                $.each(item, function(index, property) {
                    resolverMap.push({
                        // Use both "regex" and "pattern" to comply with different versions of TemplateManager
                        regex: index,
                        pattern: index,
                        replacement: property
                    });
                });

                // Resolve the content, using the resolver map
                resolvedContent = template.process(resolverMap);

                // Create a new HTML element from the resolved content
                $newElement = $(resolvedContent);

                // Add the new content into the DOM
                $uiComponent.append($newElement);

                // Set the values of the new element
                _populateObject$UIComponent($newElement, item);
            });

        };


        var _populateStringValueByName = function(name, value) {
            _populateString$UIComponent(_get$UIComponent(name), value);
        };

        var _populateBooleanValueByName = function(name, value) {
            _populateBoolean$UIComponent(_get$UIComponent(name), value);
        };

        var _populateNumberValueByName = function(name, value) {
            _populateNumber$UIComponent(_get$UIComponent(name), value);
        };

        var _populateObjectValueByName = function(name, value) {
            _populateObject$UIComponent(_get$UIComponent(name), value);
        };

        var _populateObjectArrayValueByName = function(name, value) {
            _populateObjectArray$UIComponent(_get$UIComponent(name), value);
        };


        var _getString$UIComponent = function($uiComponent) {
            return $uiComponent.val();
        };

        var _getBoolean$UIComponent = function($uiComponent) {
            if ('checkbox' === $uiComponent[0].type) {
                return $uiComponent.is(':checked');
            } else {
                return 'true' === $uiComponent.val().toLowerCase();
            }
        };

        var _getNumber$UIComponent = function($uiComponnt) {
            return parseInt(_getString$UIComponent($uiComponnt));
        };

        var _getObject$UIComponent = function($uiComponent) {
            var item = {};

            $uiComponent.find('[data-setting-object-member]').each(function(index, member) {
                var $memberContainer = $(member);
                // TODO: Be sure there is only one element (or log a warning message)!
                var name = $memberContainer.data('setting-object-member');
                var validator = $memberContainer.data('setting-object-member-validate');
                var type = $memberContainer.data('setting-type') || 'string';
                var value;

                if (validator) {
                    validator = validator.trim();
                }

                if ('string' === type) {
                    value = _getString$UIComponent($memberContainer);
                } else if ('number' === type) {
                    value = _getNumber$UIComponent($memberContainer);
                } else if ('boolean' === type || 'bool' === type) {
                    value = _getBoolean$UIComponent($memberContainer);
                }

                // If no name is provided, do not add the member to the object
                if (name && 0 !== name.trim().length) {
                    if ('empty(value):ignore' === validator) {
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

        var _getObjectArray$UIComponent = function($uiComponent) {
            var array = [];
            var $objectContainers = $uiComponent.find('[data-setting-object-element]');
            var emptyFieldRegex;
            var emptyFieldName;

            if (!_getObjectArray$UIComponent.regexes) {
                _getObjectArray$UIComponent.regexes = {};
            }

            if (!_getObjectArray$UIComponent.regexes.emptyField) {
                _getObjectArray$UIComponent.regexes[['emptyField']] = new RegExp('empty\\(field\\[.*\\]\\):ignore');
            }

            emptyFieldRegex = _getObjectArray$UIComponent.regexes[['emptyField']];

            $objectContainers.each(function(index, objectContainer) {
                var $objectContainer = jQuery(objectContainer);
                var validator = $objectContainer.data('setting-object-member-validate');
                var item = _getObject$UIComponent($objectContainer);

                if (validator) {
                    validator = validator.trim();
                }

                if ('empty(object):ignore' === validator) {
                    // Add the item to the array (check to see if empty objects are allowed)
                    if (0 !== Object.getOwnPropertyNames(item).length) {
                        array.push(item);
                    }
                } else if(emptyFieldRegex.test(validator)) {
                    // Check to see if the field exists; if so, add the object to the array
                    emptyFieldName = validator.replace('empty(field[', '').replace(']):ignore', '');
                    if (item[emptyFieldName]) {
                        array.push(item);
                    }
                } else {
                    array.push(item);
                }
            });

            return array;
        };



        // Gets user specified settings from the UI and returns a settings object
        var _getValueFrom$UIComponent = function($uiComponent) {
            var name = $uiComponent.data('setting-name');
            var returnValue = $uiComponent.val();

            if ('boolean' === $uiComponent.data('setting-type') || 'bool' === $uiComponent.data('setting-type') || 'checkbox' === $uiComponent[0].type) {
                returnValue = _getBoolean$UIComponent($uiComponent);
            } else if ('number' === $uiComponent.data('setting-type') || 'number' === $uiComponent[0].type) {
                returnValue = _getNumber$UIComponent($uiComponent);
            } else if ('string' === $uiComponent.data('setting-type') || 'text' === $uiComponent[0].type) {
                returnValue = _getString$UIComponent($uiComponent);
            } else if ('object' === $uiComponent.data('setting-type')) {
                returnValue = _getObject$UIComponent($uiComponent);
           } else if ('objectarray' === $uiComponent.data('setting-type')) {
                returnValue = _getObjectArray$UIComponent($uiComponent);
            } else {
                console.warn('Unknown data type for setting', name, returnValue);
                returnValue = $uiComponent.val();
            }

            return returnValue;
        };

        var _putValueByName = function(name, value) {
            if ('boolean' === typeof value) { //
                _populateBooleanValueByName(name, value);
            } else if (jQuery.isArray(value)) {
                _populateObjectArrayValueByName(name, value);
            } else if (jQuery.isNumeric(value)) {
                _populateNumberValueByName(name, value);
            } else if ('string' === typeof value) {
                _populateStringValueByName(name, value);
            } else if ('object' === typeof value) {
                _populateObjectValueByName(name, value);
            } else {
                // This is an error, log it
                console.error('Unknown setting type', name, value, typeof value);
            }
        };

        // This gets the settings FROM THE PAGE
        var _getSettingsFromUI = function() {
            var settings = {};

            jQuery('[data-setting-name]').each(function(index, item) {
                // Get the element
                var $item = jQuery(item);

                // Get the setting name
                var name = $item.data('setting-name');

                // Extract the value from the UI component
                settings[name] = _getValueFrom$UIComponent($item);
            });

            return settings;
        };

        // For each setting, attempt to find a ui component that matches and populate it based on formatting rules
        var _putSettingsIntoUI = function(settings) {
            jQuery.each(settings, function(name, value) {
                _putValueByName(name, value);
            });
        };

        return {
            getSettingsFromUI: _getSettingsFromUI,
            putSettingsIntoUI: _putSettingsIntoUI
        };
    };

    // Place the version as a member in the function
    UISettingsManager.version = '2.0.4';

    return UISettingsManager;

});