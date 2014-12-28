/*global beforeEach,describe,it: true*/
/*global UISettingsManager: true*/

/**
 * @author: jghidiu
 * Date: 2014-12-08
 */

(function() {
    'use strict';

    describe('UISettingsManager', function() {

        var objectSingle = {
            os1_e1: 'os1_e1-V',
            os1_e2: 'os1_e2-V',
            os_b1: true,
            os_b2: false,
            os_n1: 2
        };

        beforeEach(function() {
            this.uiSettingsManager = new UISettingsManager();
        });

        // TODO: Is this needed? before()?
        beforeEach(function(done) {
            // Unclear why this does not work!
            // $(done);
            // $(document).ready(done);
            $(function() {done();});
            // $(document).ready(function(){done();});
        });

        describe('API', function() {

        });

        describe('Get Values From the UI', function() {

            it('should get settings from the UI', function() {
                var settings = this.uiSettingsManager.getSettingsFromUI();
                expect(settings).to.be.a('object');
            });

            // TODO: Check null, empty, etc.

            describe('Data Types', function() {

                var objectArray = [
                    {
                        oa1_e1_m1: 'oa1_e1_m1-V',
                        oa1_e1_m2: 'oa1_e1_m2-V'
                    },
                    {
                        oa1_e2_m1: 'oa1_e2_m1-V',
                        oa1_e2_m2: 'oa1_e2_m2-V'
                    }
                ];

                it('should get the boolean value for a boolean settings', function() {
                    var settings = this.uiSettingsManager.getSettingsFromUI();
                    expect(settings['boolean-single']).to.equal(true);
                });

                it('should get the number value for a number settings', function() {
                    var settings = this.uiSettingsManager.getSettingsFromUI();
                    expect(settings['number-single']).to.equal(1);
                });

                it('should get the string value for a string settings', function() {
                    var settings = this.uiSettingsManager.getSettingsFromUI();
                    expect(settings['string-single']).to.equal('someString');
                });

                it('should get the object value for a single object', function() {
                    var settings = this.uiSettingsManager.getSettingsFromUI();
                    var actual = settings['object-single'];
                    expect(actual).to.deep.equal(objectSingle);
                });

                it('should get the object array for an object array', function() {
                    var settings = this.uiSettingsManager.getSettingsFromUI();
                    expect(settings['object-array-read']).to.deep.equal(objectArray);
                });

            });

        });



        describe('Put Values in the UI', function() {

            var objectArray = [
                {
                    oa1_ex_m1: 'oa1_ex_m1-V',
                    oa1_ex_m2: 'oa1_ex_m2-V'
                },
                {
                    oa1_ex_m1: 'oa1_ex_m1-V',
                    oa1_ex_m2: 'oa1_ex_m2-V'
                }
            ];

            describe('Data Types', function() {

                it('should set a boolean value for a boolean setting', function() {
                    this.uiSettingsManager.putSettingsIntoUI({'boolean-single': true});
                    var settings = this.uiSettingsManager.getSettingsFromUI();
                    expect(settings['boolean-single']).to.equal(true);
                });

                it('should set the number value for a number setting', function() {
                    this.uiSettingsManager.putSettingsIntoUI({'number-single': 1});
                    var settings = this.uiSettingsManager.getSettingsFromUI();
                    expect(settings['number-single']).to.equal(1);
                });

                it('should set a string value for a string setting', function() {
                    this.uiSettingsManager.putSettingsIntoUI({'string-single': 'someString'});
                    var settings = this.uiSettingsManager.getSettingsFromUI();
                    expect(settings['string-single']).to.equal('someString');
                });

                it('should set the correct settings for a single object', function() {
                    this.uiSettingsManager.putSettingsIntoUI({'object-single': objectSingle});
                    var settings = this.uiSettingsManager.getSettingsFromUI();
                    expect(settings['object-single']).to.deep.equal(objectSingle);
                });

// TODO: This test fails on PhantomJS only - not sure why, but it appears to be linked to jQuery modifying the DOM
//            it('should create the correct number of \'element\' DOM elements for object arrays', function() {
//                var uiSettingsManager = this.uiSettingsManager;
//                var $root = $('[data-setting-name=\'object-array-write\']');
//
//                // Be sure that only one root element exists
//                expect($root.length).to.equal(1);
//
//                // Be sure that no 'element' elements are present on the DOM
//                expect($root.find('[data-setting-object-element]').length).to.equal(0);
//
//                // Load the settings into the DOM
//                uiSettingsManager.putSettingsIntoUI({'object-array-write': objectArray});
//
//                // Be sure that there are now two 'element' DOM elements
//                expect($root.find('[data-setting-object-element]').length).to.equal(2);
//            });

                it('should set the correct settings for an object array', function() {
                    // Clear the inputs
                    $('input').val('');

                    // Empty the template additions
                    $('[object-array-write]').empty();

                    var uiSettingsManager = this.uiSettingsManager;
                    var settings;

                    // Load the settings into the DOM
                    uiSettingsManager.putSettingsIntoUI({'object-array-write': objectArray});

                    // Get the settings from the DOM
                    settings = uiSettingsManager.getSettingsFromUI();

                    // Expect that the loaded settings are the same as the set settings
                    expect(settings['object-array-write']).to.deep.equal(objectArray);

                });

            });

        });


        // TODO: Test 'data-setting-object-member-validate="empty(value):ignore"'
        // TODO: Test 'data-setting-object-member-validate="empty(object):ignore"'
        // TODO: Test numeric/string/boolean/undefined on object/objectarray


    });


})();
