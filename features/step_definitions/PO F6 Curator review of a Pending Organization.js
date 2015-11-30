/**
 * Author: Shamim Ahmed
 * Date: 10/06/2015
 * Feature: PO F6 Curator review of a Pending Organization
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

    this.Given(/^I am logged in to the CTRP PO application$/, function (callback) {

        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I am on the CTRP PO Curator Review screen$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select Display Pending Organizations$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^a list of all Organizations in CTRP with a Pending Status should be displayed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I can sort the list by PO ID, Organization Name, Organization Address, Creator Name, and Creation Date$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have select a Pending Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I can search for possible duplicate organizations by CTEP ID, Organization Name, and Organization address$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select a Pending Organization and a possible Duplicate Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^all occurrences in CTRP where the Pending Organization and the possible Duplicate Organization are Lead Organizations will be displayed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^all occurrences in CTRP where the Pending Organization and the possible Duplicate Organization are Sponsor Organizations will be displayed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^all occurrences in CTRP where the Pending Organization and the possible Duplicate Organization are Participating Sites will be displayed$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have completed review of a Pending Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select Activate Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Organization�s status will be Active$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the Organization will be available for use in CTRP$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I am logged in to the CTRP PO Application$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have identified two organizations that are duplicates$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one of the organizations to be retained$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one of the organizations to be nullified$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^all references in CTRP to the nullified organization as Lead Organization will reference the retained organization as Lead Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^all references in CTRP to the nullified organization as Sponsor will reference the retained organization as Sponsor$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^all references in CTRP to the nullified organization as Participating Site will reference the retained organization as Participating Site$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^all accrual submitted in CTRP on the nullified organization as a Participating Site will be transferred to the retained organization as a Participating Site$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^all persons affiliated with the nullified organization will be affiliated with the retained organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the name of the Nullified organization will be listed as an alias on the retained organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^if both organizations had CTEP IDs only the retained organization CTEP ID will be associated with the retained organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the status of the organization to be nullified will be "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select one of the organizations to be nullified that has an active CTEP ID$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^a warning will be displayed "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the nullification process will be terminated$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });



};