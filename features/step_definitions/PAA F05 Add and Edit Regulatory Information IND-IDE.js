/**
 * Author: Shamim Ahmed
 * Date: 01/08/2015
 * Feature: PAA F05 Add and Edit Regulatory Information IND-IDE
 *
 * Note: In the PAA search screen it has dependency on the seed data
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
    //var FDAIND_IDERequired = 'IND/IDE is required';
    //
    //this.Given(/^I am on the Register Trial IND\/IDE Information screen$/, function (callback) {
    //    callback();
    //});
    //
    //this.Then(/^the IND\/IDE Information section for the trial registration will not indicate any errors during trial review$/, function (callback) {
    //    addTrial.clickAddTrialReviewButton();
    //    addTrial.verifyAddTrialFDAIND_IDEOption('1', true);
    //    expect(addTrial.addTrialFDAIND_IDETypes.isDisplayed()).to.become(false);
    //    expect(projectFunctions.verifyWarningMessage(FDAIND_IDERequired)).to.become('false');
    //    browser.sleep(5000).then(callback);
    //});

    /*

     */

    this.Given(/^I am on the Trial Regulatory Information \(IND\/IDE\) screen$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the IND\/IDE Information section will allow the entry of an IND\/IDE for this trial$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have selected the IND\/IDE Type from a list$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have entered the IND\/IDE number$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have selected the IND\/IDE Grantor from a list based on IND or IDE selected$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have selected the IND\/IDE Holder Type from a list$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have selected the NIH Institution or NCI Division\/Program Code from a list$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the IND\/IDE Information for the trial will be associated with the trial$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have entered the information for an IND or IDE$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I will be able to select "([^"]*)" and enter the information for multiple IND\/IDEs$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have selected the IND or IDE$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I will be able to remove the IND or IDE information for one or more INDs or IDEs$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I am on the Register Trial Regulatory Information \(IND\/IDE\) screen$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the information entered or edited on the Regulatory Information \(IND\/IDE\) screen will be saved to the trial record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select Reset$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the information entered or edited on the Regulatory Information \(IND\/IDE\) screen will not be saved to the trial record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have not selected values the IND\/IDE Type$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have not entered the IND\/IDE number$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have not selected the IND\/IDE Grantor$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have not selected the IND\/IDE Holder Type$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have not selected the NIH Institution or NCI Division\/Program Code when the IND\/IDE Holder Type is$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^selected Save$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system will display a warning that each of values that were not entered must be entered in order to associate the IND\/IDE Information for the trial$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });



};