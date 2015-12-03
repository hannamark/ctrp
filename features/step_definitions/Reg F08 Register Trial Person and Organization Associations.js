/**
 * Created by singhs10 on 12/3/15.
 */
/**
 * Created by singhs10 on 11/28/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage= require('../support/projectMethods');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');


module.exports = function() {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();

    this.Given(/^I am on the Register Trial Lead Organization\/Principal Investigator screen$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have performed a Lead Organization look\-up in Search Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have selected an Organization as the trial's Lead Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have performed a person look\-up in Search persons$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have selected a person as the trial's Principal Investigator$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Register Lead Organization\/Principal Investigator section will not indicate any errors during Trial Review$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


};
