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
var moment = require('moment');

module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var addOrg = new addOrganizationPage();
    var searchOrg = new listOfOrganizationPage();
    var selectItem =new mainSelectItemPage;
    var projectFunctions = new projectFunctionsPage();
    var sourceStatus = 'Pending';
    var addressEdited = '1988 S 16th Edited';
    var address2Edited = '1988 S 16th add2 Edited';
    var phoneEdited = '444-5555-666';
    var emailEdited = 'test_SS@PR.cuke';
    var cityEdited = 'Wilmington Edited';
    var countryEdited = 'Nepal';
    var stateEdited = 'Bagmati';
    var stateEditedforUS = 'Maryland';
    var postalEdited = '20008';


    /*
     Given I know which organization I want to delete
     And I am logged in to CTRP PO application
     And I have searched for an organization and found the one I wish to delete
     When I have selected the function Delete Organization
     And I submit my delete request
     And the organization is not referenced as a lead organization on a trial
     And the organization is not referenced as a participating site on a trial
     And the organization is not referenced as a Person record Affiliated Organization
     And the organization is not referenced as a CTRP User Affiliated Organization
     And the organization is not part of a Family Organization
     Then the system will delete the organization record
     */


    this.Given(/^I know which organization I want to delete$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
            menuItem.clickWriteMode();
            projectFunctions.createOrganization('shiOrg','alias','add1','add2','United States','Florida','avenue','24567','s@s.com','222-4444-555','444-6666-555');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have searched for an organization and found the one I wish to delete$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(Organization_to_search);
        Search.clickSearchButton();
        browser.sleep(250).then(callback);
    });

    this.When(/^I have selected the function Delete Organization$/, function (callback) {
        element(by.linkText(Organization_to_edit)).click();
        browser.sleep(250).then(callback);
    });

    this.When(/^I submit my delete request$/, function (callback) {
        Organization.clickDelete();
        browser.sleep(5000).then(callback);
    });

    this.When(/^the organization is not referenced as a lead organization on a trial$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^the organization is not referenced as a participating site on a trial$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^the organization is not referenced as a Person record Affiliated Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^the organization is not referenced as a CTRP User Affiliated Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^the organization is not part of a Family Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system will delete the organization record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have searched for an organization$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(Organization_to_search);
        Search.clickSearchButton();
        browser.sleep(250).then(callback);
    });

    this.Given(/^the organization is referenced as a lead organization on a trial or participating site on a trial or Person record Affiliated Organization or CTRP User Affiliated Organization or part of a Family Organization$/, function (callback) {
        // need to add organization affiliation verification
        browser.sleep(300).then(callback);
    });

    this.Then(/^the Delete function will be disabled$/, function (callback) {
        // need to add delete button is disabled
        browser.sleep(300).then(callback);
    });



}