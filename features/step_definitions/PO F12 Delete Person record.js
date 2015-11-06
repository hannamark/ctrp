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
var orgPage = require('../support/ListOfOrganizationsPage');
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var personPage = require('../support/AddPersonPage');
var menuItemList = require('../support/PoCommonBar');
var addOrganizationPage = require('../support/AddOrganizationPage');
var mainSelectItemPage = require('../support/CommonSelectList.js');
var projectFunctionsPage= require('../support/projectMethods');
var helperMethods = require('../support/helper');
var helper = require('../support/helper');
var moment = require('moment');
var selectList = require('../support/CommonSelectList');


module.exports = function() {
    var helper = new helperMethods();
    var createdOrgNonAffi = '';
    var createdOrgAffiPerson = '';
    var createdOrgAffiFamily = '';
    var iteraCnt = '';
    var login = new loginPage();
    var menuItem = new menuItemList();
    var search = new listOfPeoplePage();
    var person = new personPage();
    var searchOrg = new orgPage();
    var selectItem =new selectList();
    var projectFunctions = new projectFunctionsPage();
    var sourceStatus = 'Pending';
    var phoneEditTo = '422-522-6622';
    var emailEditTo = 'ssingh@cukeEdited.test';
    var prefixEditTo = 'Mr Edited';
    var middleNameEditTo = 'Shia Edited';
    var lastNameEditTo = 'Singh Edited';
    var suffixEditTo = 'Kt Edited';
    var orgEffectiveDate = '08-Oct-2015';
    var orgExpirationDate = '25-Oct-2020';

    /*
    Scenario: As a PO Curator, I can Delete a Person record with no Trial Record associations
    Given I know which Person Record I want to delete
    And I am logged in to CTRP PO application
    And I have searched for a Person Record and found the one I wish to delete
    When I have selected the function Delete Person Record
    And I submit my delete request
    And there are no occurrences of the Person Record in use in CTRP
    Then the system will delete the Person Record
    */

    this.Given(/^I know which Person Record I want to delete$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 4000).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            projectFunctions.createPerson(
                'Mr',//* @param prefix
                'TestFName',//* @param fName
                'TestMName',//* @param mName
                'TestLName',//* @param lName
                'Sr',//* @param suffix
                'ahmeds6@nih.gov',//* @param email
                '240-276-6978'//* @param phone
            );
        });
        browser.sleep(25).then(callback);
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