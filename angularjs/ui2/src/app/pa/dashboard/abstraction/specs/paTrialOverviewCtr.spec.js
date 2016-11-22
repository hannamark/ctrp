//unit test for dashboard
describe('ctrp.app.pa.dashboard', function() {
    var controller;
    var trialDetailObj = null;

    beforeEach(function() {
        bard.appModule('ctrp.app.pa.dashboard');
        bard.inject(this, '$controller', '$log', '$q', '$rootScope', 'PATrialService');
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
