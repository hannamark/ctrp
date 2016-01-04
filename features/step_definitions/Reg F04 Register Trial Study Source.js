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
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');


module.exports = function() {
    var login = new loginPage();
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var commonFunctions = new abstractionCommonMethods();

    this.Given(/^I am logged into the CTRP Registration application$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
        trialMenuItem.clickHomeSearchTrial();
        login.clickWriteMode('On');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the option to register a trial (.*)$/, function (trialType, callback) {
        typeOfTrial = trialType;
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
        trialMenuItem.clickHomeSearchTrial();
        login.clickWriteMode('On');
        projectFunctionsRegistry.selectTrials(trialType);
        browser.sleep(25).then(callback);
    });

    this.Then(/^I am on the Register Trial screen$/, function (callback) {
        trialMenuItem.verifyRegisterTrial();
        browser.sleep(25).then(callback);
    });


    this.Given(/^CTRP will display the required registration elements for a complete protocol registration for the selected (.*)$/, function (trialType, callback) {
        console.log(trialType);
        addTrial.getVerifyTrialStudySource(trialType);
        browser.sleep(25).then(callback);
    });


};
