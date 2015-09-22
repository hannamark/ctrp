/**
 * Created by singhs10 on 8/27/15.
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


    this.Given(/^I know which organization I want to edit$/, function (callback) {
        setTimeout(callback,2000);
    });

    this.Given(/^I have searched for an organization and found the one I wish to edit$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(Organization_to_search);
        Search.clickSearchButton();
        browser.sleep(5000).then(callback);
    });

    this.Given(/^I have selected the function Edit Organization$/, function (callback) {
    //    expect(Search.inResults(Organization_to_edit)).to.become(true);
        element(by.linkText(Organization_to_edit)).click();
        setTimeout(callback,2000);
    });

    this.Given(/^I am on the edit organization information screen$/, function (callback) {
        Organization.getVerifyEditHeader();
        setTimeout(callback,2000);
    });

    this.Given(/^I change the name of the organization I wish to edit$/, function (callback) {
     //   element(by.model('orgDetailView.curOrg.name')).clear();
     //   element(by.model('orgDetailView.curOrg.name')).sendKeys('abc');
        Organization.setAddOrgName(Organization_edit_to);
        setTimeout(callback,2000);
    });

    this.Given(/^I set the organization status to either Pending or Active$/, function (callback) {
        SelectItem.selectSourceStatus(Source_Status);
        setTimeout(callback,2000);
    });

    this.Given(/^I submit my edit request$/, function (callback) {
        Organization.clickSave();
        setTimeout(callback,2000);
    });

    this.Then(/^the system should change the organization name in the organization record to the new name$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(Organization_edit_to);
        Search.clickSearchButton();
        expect(Search.inResults(Organization_edit_to)).to.become(true);
        element(by.linkText(Organization_edit_to)).click().then(function(){Organization.setAddOrgName(Organization_to_edit);Organization.clickSave();});
      //  Organization.getVerifyAddOrgName(Organization_edit_to);
      //  Organization.setAddOrgName(Organization_to_edit);
     //   Organization.clickSave();
        setTimeout(callback,4000);
    });

    this.Then(/^my name should be listed as last update with the current date and time$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the organization status should be Pending or Active as indicated$/, function (callback) {
        Organization.getVerifyAddSourceStatus(Source_Status);
        setTimeout(callback,2000);
    });

    this.Given(/^I change the address of the organization I wish to edit$/, function (callback) {
        Organization.setAddAddress(Address_edit_to);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should change the organization address in the organization record to the new address$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(Organization_to_search);
        Search.clickSearchButton();
        expect(Search.inResults(Organization_to_edit)).to.become(true);
        element(by.linkText(Organization_to_edit)).click().then(function(){Organization.getVerifyAddAddress(Address_edit_to);});
        setTimeout(callback,4000);
    });

    this.Given(/^I change the phone number of the organization I wish to edit$/, function (callback) {
        Organization.setAddPhone(Phone_edit_to);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should change the organization phone number in the organization record to the new phone number$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(Organization_to_search);
        Search.clickSearchButton();
        expect(Search.inResults(Organization_to_edit)).to.become(true);
        element(by.linkText(Organization_to_edit)).click();
        Organization.getVerifyAddPhone(Phone_edit_to);
        setTimeout(callback,4000);
    });

    this.Given(/^I change the email of the organization I wish to edit$/, function (callback) {
        Organization.setAddEmail(Email_edit_to);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should change the organization email in the organization record to the new email$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(Organization_to_search);
        Search.clickSearchButton();
        expect(Search.inResults(Organization_to_edit)).to.become(true);
        element(by.linkText(Organization_to_edit)).click();
        Organization.getVerifyAddEmail(Email_edit_to);
        setTimeout(callback,4000);
    });

    this.Given(/^I change the city of the organization I wish to edit$/, function (callback) {
        Organization.setAddCity(City_edit_to);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should change the city in the organization record to the new city$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(Organization_to_search);
        Search.clickSearchButton();
        expect(Search.inResults(Organization_to_edit)).to.become(true);
        element(by.linkText(Organization_to_edit)).click();
        Organization.getVerifyAddCity(City_edit_to);
        setTimeout(callback,4000);
    });

    this.Given(/^I change the state of the organization I wish to edit$/, function (callback) {
        SelectItem.selectCountry(Country_edit_to);
        SelectItem.selectState(State_edit_to);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should change the state in the organization record to the new state$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(Organization_to_search);
        Search.clickSearchButton();
        expect(Search.inResults(Organization_to_edit)).to.become(true);
        element(by.linkText(Organization_to_edit)).click();
        Organization.getVerifyAddState(State_edit_to);
        setTimeout(callback,4000);
    });

    this.Given(/^I change the country of the organization I wish to edit$/, function (callback) {
        SelectItem.selectCountry(Country_edit_to);
        SelectItem.selectState(State_edit_to);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should change the country in the organization record to the new country$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(Organization_to_search);
        Search.clickSearchButton();
        expect(Search.inResults(Organization_to_edit)).to.become(true);
        element(by.linkText(Organization_to_edit)).click();
        Organization.getVerifyAddCountry(Country_edit_to);
        setTimeout(callback,4000);
    });

    this.Given(/^I change the zip code of the organization I wish to edit$/, function (callback) {
        Organization.setAddPostalCode(Postal_edit_to);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should change the zip code in the organization record to the new zip code$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(Organization_to_search);
        Search.clickSearchButton();
        expect(Search.inResults(Organization_to_edit)).to.become(true);
        element(by.linkText(Organization_to_edit)).click();
        Organization.getVerifyAddPostalCode(Postal_edit_to);
        setTimeout(callback,4000);
    });

    this.Given(/^I change multiple parameters of the organization I wish to edit$/, function (callback) {
        Organization.setAddOrgName(Organization_to_edit);
        Organization.setAddAddress(Address_to_edit);
        Organization.setAddCity(City_to_edit);
        SelectItem.selectCountry(Country_to_edit);
        SelectItem.selectState(State_to_edit);
        setTimeout(callback,4000);
    });

    this.Then(/^the system should change all the parameters in the organization record$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        Search.setOrgName(Organization_to_search);
        Search.clickSearchButton();
        expect(Search.inResults(Organization_to_edit)).to.become(true);
        element(by.linkText(Organization_to_edit)).click();
        Organization.getVerifyAddOrgName(Organization_to_edit);
        Organization.getVerifyAddAddress(Address_to_edit);
        Organization.getVerifyAddCity(City_to_edit);
        Organization.getVerifyAddCountry(Country_to_edit);
        Organization.getVerifyAddState(State_to_edit);
        setTimeout(callback,4000);
    });

}
