/**
 * Created by singhs10 on 8/27/15.
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

module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var addOrg = new addOrganizationPage();
    var searchOrg = new listOfOrganizationPage();
    var selectItem =new mainSelectItemPage;
    var projectFunctions = new projectFunctionsPage();
 //   var Organization_to_search = 'Coastal Carolina Radiation Oncology*';
 //   var Organization_to_edit = 'Coastal Carolina Radiation Oncology';
 //   var Organization_edit_to = 'Coastal Carolina Radiation Oncology PR cuke';
  //  var Source_Status = 'Pending';
  //  var Address_to_edit = '1988 S 16th St';
    var addressEdited = '1988 S 16th Edited';
    var phoneEdited = '444-5555-666';
    var emailEdited = 'test_SS@PR.cuke';
    var cityEdited = 'Wilmington Edited';
   // var City_edit_to = 'Rockville';
  //  var Country_to_edit = 'United States';
    var countryEdited = 'Nepal';
    var stateEdited = 'Seti';
    var postalEdited = '20008';


    this.Given(/^I know which organization I want to edit$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        browser.driver.wait(function(){
            console.log('wait here');
            return true;
        }, 4000).then(function(){
                menuItem.clickRole('CURATOR');
            projectFunctions.createOrganization('shiOrg','alias','add1','add2','United States','Florida','avenue','24567','s@s.com','222-4444-555','444-6666-555');
            });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have searched for an organization and found the one I wish to edit$/, function (callback) {
        cukeOrganization.then(function(value){
            menuItem.clickOrganizations();
            menuItem.clickListOrganizations();
            searchOrg.setOrgName(value);
            searchOrg.clickSearchButton();
            expect(projectFunctions.inSearchResults(value)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the function Edit Organization$/, function (callback) {
        cukeOrganization.then(function(value){
            element(by.linkText(value)).click();
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the edit organization information screen$/, function (callback) {
        addOrg.getVerifyEditHeader();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I change the name of the organization I wish to edit$/, function (callback) {
        cukeOrganization.then(function(value){addOrg.setAddOrgName(value + 'Edited'); });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I set the organization status to either Pending or Active$/, function (callback) {
        callback();
    });

    this.Given(/^I submit my edit request$/, function (callback) {
        addOrg.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the organization name in the organization record to the new name$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        cukeOrganization.then(function(value){
            searchOrg.setOrgName(value + 'Edited');
            searchOrg.clickSearchButton();
            expect(projectFunctions.inSearchResults(value + 'Edited')).to.become('true');
            element(by.linkText(value + 'Edited')).click();
            addOrg.getVerifyAddOrgName(value + 'Edited');
        });
        browser.sleep(25).then(callback);
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
