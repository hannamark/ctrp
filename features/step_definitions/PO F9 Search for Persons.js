/**
 * Created by singhs10 on 9/17/15.
 */
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var LoginPage = require('../support/LoginPage');
var ListOfPeoplePage = require('../support/ListOfPeoplePage');
var MenuItem = require('../support/PoCommonBar');


module.exports = function() {
    var Login = new LoginPage();
    var MenuItemList = new MenuItem();
    var Search = new ListOfPeoplePage();

    this.Given(/^I know the name of the person I wish to search for$/, function (callback) {
        fName = 'Daniel';
        lName = 'Jonson';
        callback();
      //  setTimeout(callback,2000);
    });

    this.Given(/^I have selected the option to search for a person$/, function (callback) {
        MenuItemList.clickPeople();
        MenuItemList.clickListPeople();
      //  setTimeout(callback,2000);
        browser.sleep(250).then(callback);
    });

    this.When(/^I provide the full or partial first name of the person I wish to search for$/, function (callback) {
        Search.setPersonFirstName(fName);
        browser.sleep(250).then(callback);
      //  Search.setPersonFirstName(fName).then(function(){callback();});
     //   setTimeout(callback,2000);
    });

    this.When(/^I submit my search request for Person Search$/, function (callback) {
        Search.clickSearch();
        browser.sleep(250).then(callback);
    });

    this.Then(/^the system should display all persons that contain the first name$/, function (callback) {
        expect(MenuItemList.inResults(fName)).to.become('true').then(function(){callback();});
    });

    this.Then(/^the search results should display:$/, function (table, callback) {
        expect(MenuItemList.inResultsHeader('CTRP ID')).to.become('true');
        expect(MenuItemList.inResultsHeader('Source ID')).to.become('true');
        expect(MenuItemList.inResultsHeader('First')).to.become('true');
        expect(MenuItemList.inResultsHeader('Last')).to.become('true');
        expect(MenuItemList.inResultsHeader('Middle')).to.become('true');
        expect(MenuItemList.inResultsHeader('Email')).to.become('true');
        expect(MenuItemList.inResultsHeader('Phone')).to.become('true');
        expect(MenuItemList.inResultsHeader('Affiliated Orgs')).to.become('true');
        expect(MenuItemList.inResultsHeader('Source Status')).to.become('true');
        browser.sleep(250).then(callback);
    });

    this.When(/^I provide the full or partial last name of the person I wish to search for$/, function (callback) {
        Search.setPersonLastName(lName);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should display all persons that contain the last name$/, function (callback) {
        expect(MenuItemList.inResults(lName)).to.become('true').then(function(){callback();});
    });

    this.Given(/^I know the CTEP ID of the person I wish to search for$/, function (callback) {
        CTEPID = '35504';
        setTimeout(callback,2000);
    });

    this.When(/^I provide the CTEP Person ID of the person I wish to search for$/, function (callback) {
        Search.setPersonSourceId(CTEPID);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should display all persons that contain the CTEP Person ID$/, function (callback) {
        expect(MenuItemList.inResults(CTEPID)).to.become('true').then(function(){callback();});
    });

    this.Given(/^I know the PO Person ID of the person I wish to search for$/, function (callback) {
        CTRPID = '2026171';
        setTimeout(callback,2000);
    });

    this.When(/^I provide the PO Person ID of the person I wish to search for$/, function (callback) {
        Search.setPersonPoId(CTRPID);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should display all persons that contain the PO Person ID$/, function (callback) {
        expect(MenuItemList.inResults(CTRPID)).to.become('true').then(function(){callback();});
    });

    this.Given(/^I know the email of the person I am searching$/, function (callback) {
        email = 'depner@mdanderson.org';
        setTimeout(callback,2000);
    });

    this.When(/^I provide the email of the person I wish to search for$/, function (callback) {
        Search.setPersonEmail(email);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should display all persons that have that email address$/, function (callback) {
        expect(MenuItemList.inResults(email)).to.become('true').then(function(){callback();});
    });

    this.Given(/^I know the phone number of the person$/, function (callback) {
        phone = '713-792-3245';
        setTimeout(callback,2000);
    });

    this.Given(/^I have selected the option to search for an person$/, function (callback) {
        MenuItemList.clickPeople();
        MenuItemList.clickListPeople();
        setTimeout(callback,2000);
    });

    this.When(/^I provide the full or partial phone number of the person I wish to search for$/, function (callback) {
        Search.setPersonPhone(phone);
        setTimeout(callback,2000);
    });

    this.Then(/^the system should display all persons with matching phone number$/, function (callback) {
        expect(MenuItemList.inResults(phone)).to.become('true').then(function(){callback();});
    });

    this.Given(/^I know the name of the organization I want to use in the search$/, function (callback) {
        aff_Org = 'Coastal Carolina Radiation Oncology';
        setTimeout(callback,2000);
    });

    this.Given(/^I have performed an organization search$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select an organization for the affiliated organization search$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all persons who are affiliated with the selected organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know multiple parameters of the person I wish to search for$/, function (callback) {
        setTimeout(callback,2000);
    });

    this.Given(/^I am on the search persons screen$/, function (callback) {
        MenuItemList.clickPeople();
        MenuItemList.clickListPeople();
        setTimeout(callback,2000);
    });

    this.When(/^I want to search with first name (.*)$/, function (firstName, callback) {
        Search.setPersonFirstName(firstName);
        setTimeout(callback,2000);
    });

    this.Given(/^I want to search with last name (.*)$/, function (lastName, callback) {
        Search.setPersonLastName(lastName);
        setTimeout(callback,2000);
    });

    this.Given(/^I want to search with PO Person ID (.*)$/, function (POPersonID, callback) {
        Search.setPersonPoId(POPersonID);
        setTimeout(callback,2000);
    });

    this.Given(/^I want to search with CTEP Person ID (.*)$/, function (CTEPPersonID, callback) {
        Search.setPersonSourceId(CTEPPersonID);
        setTimeout(callback,2000);
    });

    this.Given(/^I want to search with Person email (.*)$/, function (PersonEmail, callback) {
        Search.setPersonEmail(PersonEmail);
        setTimeout(callback,2000);
    });

    this.Given(/^I want to search with Person phone number (.*)$/, function (PersonPhoneNumber, callback) {
        Search.setPersonPhone(PersonPhoneNumber);
        setTimeout(callback,2000);
    });

    this.Given(/^I want to search with Person affiliated organization (.*)$/, function (PersonAffiliatedOrganization, callback) {
        callback.pending();
    });

    this.Then(/^in the search result for first name (.*), last name (.*), PO Person ID (.*), CTEP Person ID (.*), Person email (.*), and Person affiliated organization (.*) it shall return result (.*)$/, function (firstName, lastName, POPersonID, CTEPPersonID, PersonEmail, PersonAffiliatedOrganization, result, callback) {
        expect(MenuItemList.inResults(firstName)).to.become(result);
        expect(MenuItemList.inResults(lastName)).to.become(result);
        expect(MenuItemList.inResults(POPersonID)).to.become(result);
        expect(MenuItemList.inResults(CTEPPersonID)).to.become(result);
        expect(MenuItemList.inResults(PersonEmail)).to.become(result);
        expect(MenuItemList.inResults(PersonAffiliatedOrganization)).to.become(result);
        setTimeout(callback,5000);
    });

    this.When(/^I provide the curator date of the person I wish to search for$/, function (callback) {
        aff_Org = 'Coastal Carolina Radiation Oncology';
        setTimeout(callback,2000);
    });

    this.Then(/^the system should display all persons that contain the curator date$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the curator name of the person I wish to search for$/, function (callback) {
        aff_Org = 'Coastal Carolina Radiation Oncology';
        setTimeout(callback,2000);
    });

    this.Then(/^the system should display all persons that contain the curator name$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


}