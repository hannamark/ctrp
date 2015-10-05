/**
 * Author: Shamim Ahmed
 * Date: 09/30/2015
 * Feature: PO F5 Delete Organization
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var LoginPage = require('../support/LoginPage');
var ListOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var MenuItem = require('../support/PoCommonBar');
var AddOrganization = require('../support/AddOrganizationPage');
var main_SelectItem = require('../support/CommonSelectList.js');

module.exports = function() {
    var MenuItemList = new MenuItem();
    var Search = new ListOfOrganizationPage();
    var Organization = new AddOrganization();
    var Organization_to_search = 'Coastal Carolina Radiation Oncology*';
    var Organization_to_edit = 'Coastal Carolina Radiation Oncology';
    var Organization_edit_to = 'Coastal Carolina Radiation Oncology PR cuke';
    var SelectItem = new main_SelectItem();
    var Source_Status = 'Pending';
    var Address_to_edit = '1988 S 16th St';
    var Address_edit_to = '1988 S 16th St PR cuke';
    var Phone_edit_to = '444-5555-666';
    var Email_edit_to = 'test_SS@PR.cuke';
    var City_to_edit = 'Wilmington';
    var City_edit_to = 'Rockville';
    var Country_to_edit = 'United States';
    var Country_edit_to = 'Nepal';
    var State_to_edit = 'North Carolina';
    var State_edit_to = 'Bagmati';
    var Postal_edit_to = '20008';


    this.Given(/^I know which organization I want to delete$/, function (callback) {
        browser.sleep(300).then(callback);
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
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the organization is referenced as a lead organization on a trial or participating site on a trial or Person record Affiliated Organization or CTRP User Affiliated Organization or part of a Family Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Delete function will be disabled$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


}