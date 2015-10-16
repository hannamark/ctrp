/**
 * Created by singhs10 on 9/29/15.
 */

/**
 * Created by singhs10 on 9/21/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var menuItem = require('../support/PoCommonBar');
var personPage = require('../support/AddPersonPage');
var orgPage = require('../support/ListOfOrganizationsPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var moment = require('moment');
var loginPage = require('../support/LoginPage');


module.exports = function() {
    var login = new loginPage();
    var menuItemList = new menuItem();
    var search = new listOfPeoplePage();
    var person = new personPage();
    var searchOrg = new orgPage();
    var selectItem =new selectList();
    var sourceStatus = 'Pending';
    var phoneEditTo = '422-522-6622';
    var emailEditTo = 'ssingh@cuke.test';



    this.Given(/^I know which Person record I want to edit$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        menuItemList.clickRole('CURATOR');
        person.personDefaultCreate('','SSCukePerson','','PRlName','','singh@test.com','444-555-6666');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have searched for a Person record and found the one I wish to edit$/, function (callback) {
        menuItemList.clickPeople();
        menuItemList.clickListPeople();
        per4.then(function(value1){console.log('set first Name' + value1); search.setPersonFirstName(value1);
        search.clickSearch();
        expect(menuItemList.inResults(value1)).to.become('true');
            element(by.linkText(value1)).click();});
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the function Edit Person$/, function (callback) {
        callback();
    });

    this.Given(/^I am on the edit Person information screen$/, function (callback) {
      person.verifyPersonEditHeader();
        browser.sleep(25).then(callback);
    });

    this.When(/^I change the name of the Person I wish to edit$/, function (callback) {
        per4.then(function(value1){
            console.log('first Name' + value1);
            person.setAddPersonFirstName(value1 + 'Edited');
        });
        browser.sleep(25).then(callback);
    });


    this.When(/^I set the Person status to either Pending or Active$/, function (callback) {
        selectItem.selectSourceStatus(sourceStatus);
        browser.sleep(25).then(callback);
    });

    this.When(/^I submit my edit request for Person$/, function (callback) {
        person.clickSave();
        dateTimeNow = moment().format('DD-MMM-YYYY HH:mm');
        console.log('Date time when Save is : ' + dateTimeNow);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the Person name in the Person record to the new name$/, function (callback) {
        per4.then(function(value1){console.log('set first Name' + value1); search.setPersonFirstName(value1 + 'Edited');
            search.clickSearch();
            expect(menuItemList.inResults(value1 + 'Edited')).to.become('true');
            element(by.linkText(value1 + 'Edited')).click();
            person.getVerifyAddPerFName(value1 + 'Edited');});
      //  person.personVerifyLastUpdatedNameDate(dateTimeNow);
        browser.sleep(25).then(callback);
    });

    this.Then(/^my name should be listed as last update with the current date and time for Person$/, function (callback) {
        person.personVerifyLastUpdatedNameDate(dateTimeNow);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the person status should be Pending or Active as indicated$/, function (callback) {
        person.getVerifyAddPerSourceStatus(sourceStatus);
        browser.sleep(25).then(callback);
    });


    this.When(/^I change the phone number of the Person I wish to edit$/, function (callback) {
            person.setAddPersonPhone(phoneEditTo);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the phone number in the Person record to the new phone number$/, function (callback) {
        per4.then(function(value1){
            console.log('set first Name' + value1);
            search.setPersonFirstName(value1);
            search.setPersonPhone(phoneEditTo);
            search.clickSearch();
            expect(menuItemList.inResults(value1)).to.become('true');
            element(by.linkText(value1)).click();
            person.getVerifyAddPerFName(value1);
            person.getVerifyAddPerPhone(phoneEditTo);
        });
       // person.personVerifyLastUpdatedNameDate(dateTimeNow);
        browser.sleep(25).then(callback);
    });


    this.When(/^I change the email of the Person I wish to edit$/, function (callback) {
        person.setAddPersonEmail(emailEditTo);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should change the email address in the Person record to the new email address$/, function (callback) {
        per4.then(function(value1){
            console.log('set first Name' + value1);
            search.setPersonFirstName(value1);
            search.setPersonEmail(emailEditTo);
            search.clickSearch();
            expect(menuItemList.inResults(value1)).to.become('true');
            expect(menuItemList.inResults(emailEditTo)).to.become('true');
            element(by.linkText(value1)).click();
            person.getVerifyAddPerFName(value1);
            person.getVerifyAddPerEmail(emailEditTo);
        });
        // person.personVerifyLastUpdatedNameDate(dateTimeNow);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I select an Affiliated Organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I change the status of the Affiliated Organization I wish to edit$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should change the status of the Affiliated Organization in the Person Record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have have performed a search of organizations and selected an organization$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select an organization to affiliate with the Person record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should add the Affiliated Organization in the Person Record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the current Affiliated Organization status should be Active and the Status Date should be the current date and time$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I have searched for a Person and found the one I wish to edit$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I change multiple parameters of the Person I wish to edit$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should change all the updated parameters in the Person record$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

}
