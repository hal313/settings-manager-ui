/*global beforeEach,describe,it: true*/
/*global UISettingsManager: true*/

/**
 * @author: jghidiu
 * Date: 2014-12-08
 */

(function() {
    'use strict';

    beforeEach(function() {
        this.uiSettingsManager = new UISettingsManager();
    });

    describe('API', function() {

    });


    describe('Get Values From the UI', function() {

        var objectSingle = {
            os1_e1: 'os1_e1-V',
            os1_e2: 'os1_e2-V'
        };

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

        beforeEach(function(done) {
            // Unclear why this does not work!
            // $(done);
            $(function() {
                done();
            });

        });

        it('should get settings from the UI', function() {
            var settings = this.uiSettingsManager.getUserSpecifiedSettings();
            expect(settings).to.be.a('object');
//            console.log('settings', settings);
        });

        // TODO: Check null, empty, etc.

        describe('Data Types', function() {

            it('should get the number value for a boolean settings', function() {
                var settings = this.uiSettingsManager.getUserSpecifiedSettings();
                expect(settings['boolean-single']).to.equal(true);
            });

            it('should get the number value for a number settings', function() {
                var settings = this.uiSettingsManager.getUserSpecifiedSettings();
                expect(settings['number-single']).to.equal(1);
            });

            it('should get the number value for a string settings', function() {
                var settings = this.uiSettingsManager.getUserSpecifiedSettings();
                expect(settings['string-single']).to.equal('someString');
            });

            it('should get the correct settings for a single object', function() {
                var settings = this.uiSettingsManager.getUserSpecifiedSettings();
                expect(settings['object-single']).to.deep.equal(objectSingle);
            });

            it('should get the correct settings for an object array', function() {
                var settings = this.uiSettingsManager.getUserSpecifiedSettings();
                expect(settings['object-array']).to.deep.equal(objectArray);
            });

        });

    });


    // TODO: Put values in!
    describe('Put Values in the UI', function() {

        var objectSingle = {
            os1_e1: 'os1_e1-V',
            os1_e2: 'os1_e2-V'
        };

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

        beforeEach(function(done) {
            // Unclear why this does not work!
            // $(done);
            // $(document).ready(done);
            $(function() {
                $('input').val('');
                done();
            });

        });

        describe('Data Types', function() {

            it('should set a boolean value for a boolean setting', function() {
                this.uiSettingsManager.populateUserSpecifiedSettings({'boolean-single': true});
                var settings = this.uiSettingsManager.getUserSpecifiedSettings();
                expect(settings['boolean-single']).to.equal(true);
            });

            it('should set the number value for a number setting', function() {
                this.uiSettingsManager.populateUserSpecifiedSettings({'number-single': 1});
                var settings = this.uiSettingsManager.getUserSpecifiedSettings();
                expect(settings['number-single']).to.equal(1);
            });

            it('should set a string value for a string setting', function() {
                this.uiSettingsManager.populateUserSpecifiedSettings({'string-single': 'someString'});
                var settings = this.uiSettingsManager.getUserSpecifiedSettings();
                expect(settings['string-single']).to.equal('someString');
            });

            it('should set the correct settings for a single object', function() {
                this.uiSettingsManager.populateUserSpecifiedSettings({'object-single': objectSingle});
                var settings = this.uiSettingsManager.getUserSpecifiedSettings();
                expect(settings['object-single']).to.deep.equal(objectSingle);
            });

            it('should set the correct settings for an object array', function() {
                this.uiSettingsManager.populateUserSpecifiedSettings({'object-array': objectArray});
                var settings = this.uiSettingsManager.getUserSpecifiedSettings();
                expect(settings['object-array']).to.deep.equal(objectArray);
            });

        });

    });


    // TODO: Test 'data-setting-object-member-validate="empty(value):ignore"'
    // TODO: Test 'data-setting-object-member-validate="empty(object):ignore"'

})();
