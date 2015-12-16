//unit test for dashboard
describe('ctrp.app.pa.dashboard', function() {
    var controller;
    var trialDetailObj = null;

    beforeEach(function() {
        bard.appModule('ctrp.app.pa.dashboard');
        bard.inject('$controller', '$state', '$stateParams', 'PATrialService',
            '$scope', 'TrialService', '$timeout', 'URL_CONFIGS', 'Common', 'MESSAGES');
    });

    beforeEach(function() {

        controller = $controller('paTrialOverviewCtrl');
    });

    describe('TrialOverview controller', function() {
        it('should be created successfully', function() {
            expect(controller).to.be.defined;
        });
    });

});
