/**
 * Created by singhs10 on 8/7/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var LoginPage = require('../support/LoginPage');
var ListOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var MenuItem = require('../support/PoCommonBar');
var AddOrganization = require('../support/AddOrganizationPage');

module.exports = function() {
    var MenuItemList = new MenuItem();
    var Search = new ListOfOrganizationPage();
    var Organization = new AddOrganization();

    this.Given(/^I have complete a Search for Organization$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName('ShilpiOrg');
        Search.clickSearchButton();
        setTimeout(callback,10000);
    });

    this.Given(/^I am have selected the Add Organization function$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickAddOrganizations();
        setTimeout(callback,10000);
    });

    this.Given(/^I know the name of the organization I wish to create$/, function (callback) {
        setTimeout(callback,4000);
    });

    this.Given(/^I provide the full name of the organization I wish to create$/, function (callback) {
        Organization.setAddOrgName('ShilpiOrg');
        setTimeout(callback,4000);
    });

    this.Given(/^I provide the city of the organization I wish to create$/, function (callback) {
        Organization.setAddCity('Rockville');
        setTimeout(callback,4000);
    });

    this.Given(/^I provide the state of the organization I wish to create$/, function (callback) {
        Organization.selectAddState('Maryland');
        setTimeout(callback,4000);
    });

    this.Given(/^I provide the country of the organization I wish to create$/, function (callback) {
        Organization.selectAddCountry('United States');
        setTimeout(callback,4000);
    });

    this.Given(/^I provide the zip code of the organization I wish to create$/, function (callback) {
        Organization.setAddPostalCode('21046');
        setTimeout(callback,4000);
    });

    this.Given(/^I provide either the Phone or email of the organization I wish to create$/, function (callback) {
        Organization.setAddPhone('444-555-6666');
        setTimeout(callback,4000);
    });

    this.Given(/^I submit my create request$/, function (callback) {
        Organization.clickSave();
        setTimeout(callback,4000);
    });

    this.Then(/^the system should create an organization record that contains a unique PO ID, the organization name, the CTEP ID as Null, the city, the state, the country, the zip code, my name, and the current date and time$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the organization status should be Pending$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the CTEP ID of the organization I wish to create, which may be null$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the organization status should be Active$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^the name is a the same as an existing organization or the alias of an existing organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should indicate that the organization is a duplicate name and reject the request and require re\-entry of all fields$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });
}

