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
    var createdPersonDel = '';
    var createdPersonNotDel = '';
    var createdOrgAffiFamily = '';
    var iteraCnt = '';
    var addOrg = new addOrganizationPage();
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

            iteraCnt = iteraCnt + 1;
            var getCrntCnt = iteraCnt + 1;
            console.log('calculating count:'+getCrntCnt+'')
            // Person for to be Delete function validation
            if (getCrntCnt == 11){
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
                    cukePerson.then(function(value) {
                        var pasCreatedDelPerson = ''+value+'';
                        function RetCreatedDelPerson(){
                            return pasCreatedDelPerson;
                        }
                        createdPersonDel = RetCreatedDelPerson();
                        console.log('System created person record ['+createdPersonDel+'] successfully');
                    });
              });
            };
            // Person for Not Delete due to person affiliation with organization
            if (getCrntCnt == 111){
              login.login('ctrpcurator', 'Welcome01');
              login.accept();
              browser.driver.wait(function(){
                    console.log('wait here');
                    return true;
                }, 4000).then(function(){
                  menuItem.clickHomeEnterOrganizations();
                  helper.wait_for(300);
                  login.clickWriteMode();
                  menuItem.clickOrganizations();
                  menuItem.clickAddOrganizations();
                  projectFunctions.createPersonWithAffiliatedOrg(
                      'Mr',//* @param prefix,
                      'TestFAffName',//* @param fName,
                      'TestMName',//* @param mName,
                      'TestLAffName',//* @param lName,
                      'Sr',//* @param suffix,
                      'test@test.com',//* @param email,
                      '240-276-6978',//* @param phone,
                      'Test Org Affi with Person ',//* @param affOrgName,
                      '08-Oct-2015',//* @param affOrgEffectiveDate,
                      '08-Oct-2016'//* @param affOrgExpirationDate
                  );
                  cukePerson.then(function(value) {
                      var pasCreatedNotDelPerson = ''+value+'';
                      function RetCreatedNotDelPerson(){
                            return pasCreatedNotDelPerson;
                      }
                      createdPersonNotDel = RetCreatedNotDelPerson();
                      console.log('System created person record ['+createdPersonNotDel+'] successfully');
                  });
              });
            };
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have searched for a Person Record and found the one I wish to delete$/, function (callback) {
        menuItem.clickPeople();
        menuItem.clickListPeople();
        search.setPersonFirstName(createdPersonDel);
        search.clickSearch();
        helper.wait_for(3000);
        projectFunctions.inPersonSearchResults(createdPersonDel);
        cukePerson.then(function(createdPersonDel) {
            expect(projectFunctions.inPersonSearchResults(createdPersonDel)).to.become('true');
            //expect(projectFunctions.inSearchResults(createdPersonDel)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected the function Delete Person Record$/, function (callback) {
        element(by.linkText(createdPersonDel)).click();
        browser.sleep(1000).then(callback);
    });

    // And I submit my delete request

    this.When(/^there are no occurrences of the Person Record in use in CTRP$/, function (callback) {
        login.logout();
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 4000).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode();
            menuItem.clickPeople();
            menuItem.clickListPeople();
            search.setPersonFirstName(createdPersonDel);
            search.clickSearch();
            helper.wait_for(100);
            browser.sleep(25).then(callback);
        });
    });

    this.Then(/^the system will delete the Person Record$/, function (callback) {
        expect(projectFunctions.inPersonSearchResults(createdPersonDel)).to.become('false');
        browser.sleep(25).then(callback);
    });


    /*
    Scenario: As a PO Curator, I cannot Delete Person Records with Trial Record associations
    Given I know which Person Record I want to delete
    And I am logged in to CTRP PO application
    And I have searched for a Person Record
    And there are occurrences of the Person Record as a Principle Investigator on a trial
    And there are occurrences of the Person Record as a Principle Investigator on a participating site
    Then the Delete operation will fail and the message "This person cannot be deleted" will be displayed
    */

    this.Given(/^I have searched for a Person Record$/, function (callback) {
        menuItem.clickPeople();
        menuItem.clickListPeople();
        search.setPersonFirstName(createdPersonNotDel);
        search.clickSearch();
        helper.wait_for(1000);
        cukePerson.then(function(createdPersonNotDel) {
            expect(projectFunctions.inSearchResults(createdPersonNotDel)).to.become('true');
            //expect(projectFunctions.inPersonSearchResults(createdPersonDel)).to.become('true');
        });
        element(by.linkText(createdPersonNotDel)).click();
        helper.wait_for(900);
        addOrg.clickDelete();
        helper.wait_for(300);
        addOrg.clickDeleteNow();
        helper.wait_for(900);
        browser.sleep(3000).then(callback);
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