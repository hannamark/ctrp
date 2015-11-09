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

    this.Given(/^I know which Person Record I want to delete$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have searched for a Person Record and found the one I wish to delete$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have selected the function Delete Person Record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^there are no occurrences of the Person Record in use in CTRP$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system will delete the Person Record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have searched for a Person Record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^there are occurrences of the Person Record as a Principle Investigator on a trial$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^there are occurrences of the Person Record as a Principle Investigator on a participating site$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Delete operation will fail and the message "([^"]*)" will be displayed$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


}