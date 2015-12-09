/**
 * Author: Shamim Ahmed
 * Date: 12/08/2015
 * Feature: Reg F13 Register Trial Documents
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

    /*
     Scenario Outline: #1 I can attach Trial Related Documents to a trial registration
     Given I have selected the option to register a trial <TrialType>
     And I am on the Register Trial Related Documents screen
     When I have selected a file to attach as the Protocol Document
     And I have selected a file to attach as the IRB Approval
     And I have selected a file to attach as the list of Participating Sites
     And I have selected a file to attach as the Informed Consent Document
     And I have selected one or more files to attach as Other file and entered the description of the file
     Then the Register Trial Related Document for the trial registration will not indicate an errors during Trial Review

     Examples:
     |TrialType                |
     |National                 |
     |Externally Peer-Reviewed |
     |Institutional            |
     */

    this.Given(/^I am on the Register Trial Related Documents screen$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have selected a file to attach as the Protocol Document$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have selected a file to attach as the IRB Approval$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have selected a file to attach as the list of Participating Sites$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have selected a file to attach as the Informed Consent Document$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have selected one or more files to attach as Other file and entered the description of the file$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Register Trial Related Document for the trial registration will not indicate an errors during Trial Review$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have not attached a file as the Protocol Document$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have not attached a file as the IRB Approval$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^Trial Related Documents section will indicate an error$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^And I have indicated if the Informed Consent is included with the Protocol Document as Yes or No$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I must have selected a file to attach as the Informed Consent Document if Interventional and Informed Consent not included in Protocol Document\)$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Trial Related Documents section will not indicate any errors during Trial Review$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have selected a file to attach (.*) as a trial document$/, function (FileType, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^The Trial Related Documents section will not indicate any errors during Trial Review$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });




};
