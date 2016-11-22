/**
 * Author: Shamim Ahmed
 * Date: 09/30/2015
 * Feature: PO F5 Delete Organization
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var loginPage = require('../support/LoginPage');
var listOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var menuItemList = require('../support/PoCommonBar');
var addOrganizationPage = require('../support/AddOrganizationPage');
var mainSelectItemPage = require('../support/CommonSelectList.js');
var projectFunctionsPage= require('../support/projectMethods');
var helperMethods = require('../support/helper');
var moment = require('moment');

module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var addOrg = new addOrganizationPage();
    var searchOrg = new listOfOrganizationPage();
    var selectItem =new mainSelectItemPage;
    var projectFunctions = new projectFunctionsPage();
    var helper = new helperMethods();
    var createdOrgNonAffi = '';
    var createdOrgAffiPerson = '';
    var createdOrgAffiFamily = '';
    var iteraCnt = '';
    var sourceStatus = 'Pending';
    var addressEdited = '9605 Medical Center Drive';
    var address2Edited = '1988 S 16th add2 Edited';
    var phoneEdited = '240-276-6978';
    var emailEdited = 'test@test.com';
    var cityEdited = 'Wilmington Edited';
    var countryEdited = 'Nepal';
    var stateEdited = 'Bagmati';
    var stateEditedforUS = 'Maryland';
    var postalEdited = '20008';

    this.When(/^I select Display Pending Person Records$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^a list of all Person Records in CTRP with a Pending Status should be displayed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I can sort the list by PO Person ID, Person Name, Phone Number, Email Address, Affiliated Organization, Creator Name, and Creation Date$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have selected a Pending Person Record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I can search for possible duplicate Person Records by CTEP ID, Person Name, Phone Number, Email Address, and Affiliated Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select a Pending Person Record and a possible Duplicate Person Record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select the compare option$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^all occurrences in CTRP where the Pending Person Record and the possible Duplicate Person Record are Principal Investigator on a trial will be displayed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^all occurrences in CTRP where the Pending Person Record and the possible Duplicate Person Record are Principal Investigator on a participating site will be displayed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^all occurrences in CTRP where the Pending Person Record and the possible Duplicate Person Record are Responsible Party will be displayed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have completed review of a Pending Person Record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select Activate Person Record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Person Record�s status will be Active$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Person Record will be available for use in CTRP$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have identified two Person Records in the CTRP Context that are duplicates$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one of the Person Records to be retained$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select the other Person Record to be nullified$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^the Person Record to be nullified does not have an Active Status$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^all references in CTRP to the nullified Person Record will reference the retained Person Record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^any unique Person Organization Affiliations on the nullified Person Record will be added to the retained Person Record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the status of the Person Record to be nullified will be "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have identified two Person Records that are duplicates$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one of the Person Records to be nullified that has an active CTEP Person ID$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


}