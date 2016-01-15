/**
 * Created by singhs10 on 1/14/16.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage= require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');

module.exports = function() {
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();

    /*********************
     * Validation message *
     *********************/
    var FDAIND_IDERequired = 'IND/IDE is required';

    this.Given(/^I am on the Register Trial IND\/IDE Information screen$/, function (callback) {
        callback();
    });

    this.Then(/^the IND\/IDE Information section for the trial registration will not indicate any errors during trial review$/, function (callback) {
        addTrial.clickAddTrialReviewButton();
        addTrial.verifyAddTrialFDAIND_IDEOption('1', true);
        expect(addTrial.addTrialFDAIND_IDETypes.isDisplayed()).to.become(false);
        expect(projectFunctions.verifyWarningMessage(FDAIND_IDERequired)).to.become('false');
        browser.sleep(5000).then(callback);
    });



};