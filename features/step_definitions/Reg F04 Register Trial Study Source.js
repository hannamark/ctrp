/**
 * Created by singhs10 on 11/12/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var loginPage = require('../support/LoginPage');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');


module.exports = function() {
    var login = new loginPage();
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();

    this.Given(/^I am logged into the CTRP Registration application$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrptrialsubmitter', 'Welcome01');
        login.accept();
        trialMenuItem.clickHomeSearchTrial();
        login.clickWriteMode();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the Register Trial screen$/, function (callback) {
        trialMenuItem.clickTrials();
        trialMenuItem.clickRegisterTrialLink();
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the option to register a trial (.*)$/, function (TrialType, callback) {
        if (TrialType === 'National') {
            trialMenuItem.clickRegisterNationalTrialLink();
        }
        else if (TrialType === 'Externally Peer-Reviewed') {
            trialMenuItem.clickRegisterExternallyPeerReviewedTrialLink();
        }
        else if (TrialType === 'Institutional')   {
            trialMenuItem.clickRegisterInstitutionalTrialLink();
        }
        browser.sleep(25).then(callback);
    });

    this.Then(/^CTRP will display the required registration elements for a complete protocol registration for the selected (.*)$/, function (TrialType, callback) {
            addTrial.getVerifyTrialStudySource(TrialType);
        browser.sleep(25).then(callback);
    });

};
