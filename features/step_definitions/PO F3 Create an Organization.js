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
var SelectItem1 = require('../support/CommonSelectList');

module.exports = function() {
    var MenuItemList = new MenuItem();
    var Search = new ListOfOrganizationPage();
    var Organization = new AddOrganization();
    var SelectItem = new SelectItem1();
    var organization_search_create = 'ShSOrg PR-CU';
    var address1 = '9605 Medical Center Drive, Suite 370';
    var country = 'Nepal';//'United States';
    var state = 'Bagmati';//'Maryland';
    var city = 'Rockville';
    var postal_code = '21046';
    var email = 'protractor_cucumbertest@nih.gov';
    var phone = '444-555-6666';
    var fax = '222-444-7777';
    var sourceStatus_Pending = 'Pending';
    var sourceStatus_Active = 'Active';
    var duplicate_org_name = 'Ochsner Baptist Medical Center';
    var sourceContext = '1'; // '1' selects CTRP
    var sourceID = 'CT 007';
    var SearchOrgName = element(by.model('searchParams.name'));


    this.Given(/^I am have selected the Add Organization function$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickAddOrganizations();
        setTimeout(callback,5000);
    });



    this.Given(/^I have completed a Search for Organization$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setPersonFirstName(organization_search_create + Date.now());
        person4 = SearchOrgName.getAttribute('value');
        Search.clickSearchButton();
        setTimeout(callback,5000);
    });

    this.Given(/^I know the information for the organization I wish to create$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickAddOrganizations();
        setTimeout(callback,2000);
    });

    this.When(/^I provide the full name of the organization$/, function (callback) {
        org4.then(function(value1){console.log('Add Org' + value1); Organization.setAddOrgName(value1);});
        setTimeout(callback,2000);
    });

    this.When(/^I provide the address of the organization$/, function (callback) {
        Organization.setAddAddress(address1);
        setTimeout(callback,2000);
    });

    this.When(/^I select the country of the organization$/, function (callback) {
        SelectItem.selectCountry(country);
        setTimeout(callback,2000);
    });

    this.When(/^I select the state or province of the organization based on the country$/, function (callback) {
        SelectItem.selectState(state);
        setTimeout(callback,2000);
    });

    this.When(/^I provide the city of the organization$/, function (callback) {
        Organization.setAddCity(city);
        setTimeout(callback,2000);
    });

    this.When(/^I provide the zip code of the organization if the country is "([^"]*)"$/, function (arg1, callback) {
        Organization.setAddPostalCode(postal_code);
        setTimeout(callback,2000);
    });

    this.When(/^I provide either the Phone or email of the organization$/, function (callback) {
        Organization.setAddPhone(phone);
        setTimeout(callback,2000);
    });

    this.When(/^I optionally provide the Fax number of the organization$/, function (callback) {
        setTimeout(callback,2000);
    });

    this.Given(/^I submit my create request$/, function (callback) {
        Organization.clickSave();
        setTimeout(callback,2000);
    });

    this.Then(/^the system should create an organization record that contains:$/, function (table, callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        org4.then(function(value2)
        {console.log('Search org - ' + value2);
            Search.setOrgName(value2);
            Search.clickSearchButton();
            expect(Search.inResults(value2)).to.become(true);
            element(by.linkText(value2)).click();
            Organization.getVerifyAddOrgName(value2);
        });
     //   Organization.getVerifyAddAddress(address1);
     //   Organization.getVerifyAddCountry(country);
        setTimeout(callback,5000);
    });

    this.Then(/^the organization status should be Pending$/, function (callback) {
        Organization.getVerifyAddSourceStatus(sourceStatus_Pending);
        setTimeout(callback,2000);
    });


    this.Given(/^I know the information for the CTEP organization I wish to create$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickAddOrganizations();
        SelectItem.selectSourceContext(sourceContext);
        setTimeout(callback,2000);
    });

    this.When(/^I provide the CTEP Organization ID$/, function (callback) {
        Organization.setAddSourceId(sourceID);
        setTimeout(callback,2000);
    });

    this.Given(/^I have complete a Search for Organization$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(organization_search_create + Date.now());
        org4 = SearchOrgName.getAttribute('value');
        Search.clickSearchButton();
        setTimeout(callback,5000);
    });

    this.Then(/^the organization status should be Active$/, function (callback) {
        callback.pending();
      //  Organization.getVerifyAddSourceStatus(sourceStatus_Active).and.notify(callback);
      //  setTimeout(callback,5000);
    });

    this.Given(/^I know the name of the organization I wish to create$/, function (callback) {
        setTimeout(callback,2000);
    });

    this.Given(/^I provide the full name of the organization I wish to create$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickAddOrganizations();
        setTimeout(callback,2000);
    });

    this.Given(/^the name is a the same as an existing organization or the alias of an existing organization$/, function (callback) {
        Organization.setAddOrgName(duplicate_org_name);
        setTimeout(callback,2000);
    });

    this.Given(/^I provide the city of the organization I wish to create$/, function (callback) {
        Organization.setAddCity(city);
        setTimeout(callback,2000);
    });

    this.Given(/^I provide the state of the organization I wish to create$/, function (callback) {
        SelectItem.selectState(state);
        setTimeout(callback,2000);
    });

    this.Given(/^I provide the country of the organization I wish to create$/, function (callback) {
        SelectItem.selectCountry(country);
        setTimeout(callback,2000);
    });

    this.Given(/^I provide the zip code of the organization I wish to create$/, function (callback) {
        Organization.setAddPostalCode(postal_code);
        setTimeout(callback,2000);
    });

    this.Given(/^I provide either the Phone or email of the organization I wish to create$/, function (callback) {
        Organization.setAddEmail(email);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should indicate that the organization is a duplicate name and reject the request and require re\-entry of all fields$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });



}

