/**
 * Created by singhs10 on 9/21/15.
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

    this.Given(/^I know the first name, last name, middle name, with any prefix or suffix, phone or email, and organization affiliation of the Person$/, function (callback) {
        prefix = 'Dr.';
        firstName = 'ShSPerson PR-CU Fname' ;
        middleName = 'ShSPerson PR-CU Mname' ;
        lastName = 'ShSPerson PR-CU Lname' ;
        suffix = 'Jr.';
        phone = '444-555-6666' ;
        email = 's@singh.com';
        setTimeout(callback,2000);
    });

    this.Given(/^I have complete a Search for Person and not found the Person in CTRP$/, function (callback) {
        MenuItemList.clickPeople();
        MenuItemList.clickListPeople();
        Search.setOrgName(firstName + Date.now());
        org4 = SearchOrgName.getAttribute('value');
        Search.clickSearchButton();
        setTimeout(callback,5000);
    });

    this.When(/^I have selected the Add Person function$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the name information of the Person I wish to create$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide either the Phone or email of the Person I wish to create$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I have searched Organizations and selected an affiliated organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should create a Person record that contains a unique PO ID, the person first name, last name, middle name, prefix, suffix, the CTEP ID as Null, the phone and\/or email, and the affiliated organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the organization status should be Pending and the status date should be the current date and time$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the organization status should be Active and the status date should be the current date and time$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should indicate that the person name is a duplicate name and reject the request and require re\-entry of all fields$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


}