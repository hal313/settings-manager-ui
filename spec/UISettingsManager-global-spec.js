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

    describe('Lifecycle', function() {

        it('UISettingsManager should exist as a global', function () {
            expect(UISettingsManager).to.be.a('function');
        });

        it('should see jQuery', function() {
            expect($).to.be.a('function');
        });

    });

})();
