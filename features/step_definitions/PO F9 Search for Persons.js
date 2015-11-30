/**
 * Created by singhs10 on 9/17/15.
 **/

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var menuItemList = require('../support/PoCommonBar');
var personPage = require('../support/AddPersonPage');
var orgPage = require('../support/ListOfOrganizationsPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var moment = require('moment');
var loginPage = require('../support/LoginPage');
var projectFunctionsPage= require('../support/projectMethods');


module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var searchPerson = new listOfPeoplePage();
    var addPerson = new personPage();
    var searchOrg = new orgPage();
    var selectItem =new selectList();
    var projectFunctions = new projectFunctionsPage();

    this.Given(/^I know multiple parameters of the person I wish to search for$/, function (table, callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        login.accept();
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 4000).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            menuItem.clickPeople();
            menuItem.clickListPeople();
            searchPerson.setPersonFirstName('shiFName' + moment().format('MMMDoYY h'));
            per4 = searchPerson.personFirstName.getAttribute('value');
            searchPerson.clickSearch();
            return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function(state) {
                if(state === true) {
                    console.log('Person exists');
                    per4.then(function(value){
                        element(by.linkText(value)).click();
                        perSourceId = addPerson.addPersonSourceId.getText();
                        cukeOrganization = addPerson.addPersonAffiliatedOrgName.getText();
                    });
                }
                else {
                    projectFunctions.createOrganization('shiPerOrgAff','als1','add1','add2','United States','Texas','city56','20980','shiPerson@mail.com','240-7809-855','490332');
                    browser.driver.wait(function() {
                        console.log('wait here');
                        return true;
                    }, 4000).then(function() {
                        menuItem.clickPeople();
                        menuItem.clickAddPerson();
                        addPerson.setAddPersonPrefix('prefix');
                        per4.then(function (value1) {
                            console.log('Add first Name' + value1);
                            addPerson.setAddPersonFirstName(value1);
                        });
                        addPerson.setAddPersonSecondName('Rauniyar');
                        addPerson.setAddPersonLastName('shiLName');
                        addPerson.setAddPersonSuffix('suffix');
                        addPerson.setAddPersonEmail('shiPercuke@pr.com');
                        addPerson.setAddPersonPhone('420-567-8906');
                        searchOrg.clickOrgSearchModel();
                        cukeOrganization.then(function (value) {
                            searchOrg.setOrgName(value);
                            searchOrg.clickSearchButton();
                            searchOrg.selectOrgModelItem();
                            searchOrg.clickOrgModelConfirm();
                        });
                        addPerson.clickSave();
                        perSourceId = addPerson.addPersonSourceId.getText();
                    });
                }
            });
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the search persons screen$/, function (callback) {
        menuItem.clickPeople();
        menuItem.clickListPeople();
        browser.sleep(25).then(callback);
    });

    this.When(/^I want to search with first name (.*)$/, function (firstName, callback) {
        if(firstName === 'shiFName' ) {
            per4.then(function (value) {
                searchPerson.setPersonFirstName(value);
            });
        }
        else if (firstName !== '') {
                searchPerson.setPersonFirstName(firstName);
            }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with last name (.*)$/, function (lastName, callback) {
        if (lastName !== '') {
            searchPerson.setPersonLastName(lastName);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with Person affiliated organization (.*)$/, function (PersonAffiliatedOrganization, callback) {
        if(PersonAffiliatedOrganization === 'shiPerOrgAff' ) {
            cukeOrganization.then(function (value) {
                searchPerson.setPersonOrgAffiliation(value);
            });
        }
        else if (PersonAffiliatedOrganization !== '') {
                searchPerson.setPersonOrgAffiliation(PersonAffiliatedOrganization);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with Source Context (.*)$/, function (SourceContext, callback) {
        selectItem.selectSourceContext(SourceContext);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with Source ID (.*)$/, function (SourceID, callback) {
        if(SourceID === '65000000') {
            perSourceId.then(function (value) {
                console.log('Person Source ID is:' + value);
                searchPerson.setPersonSourceId(value);
            });
        }
        else if (SourceID !== '') {
            searchPerson.setPersonSourceId(SourceID);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with Source Status (.*)$/, function (SourceStatus, callback) {
        selectItem.selectSourceStatus(SourceStatus);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with Person email (.*)$/, function (PersonEmail, callback) {
        if (PersonEmail !== '') {
            searchPerson.setPersonEmail(PersonEmail);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search with Person phone number (.*)$/, function (PersonPhoneNumber, callback) {
        if (PersonPhoneNumber !== '') {
            searchPerson.setPersonPhone(PersonPhoneNumber);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search for Person Records last updated by (.*) and (.*)$/, function (StartDate, EndDate, callback) {
        updatedDate = moment().format('DD-MMM-YYYY');
        if(StartDate === 'today' && EndDate === 'today' ) {
            searchPerson.setPersonLastUpdatedStartDate(updatedDate);
            searchPerson.setPersonLastUpdatedEndDate(updatedDate);
        }
        else {
            searchPerson.setPersonLastUpdatedStartDate('');
            searchPerson.setPersonLastUpdatedEndDate('');
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I want to search for Person records last updated by (.*)$/, function (Username, callback) {
        if (Username !== '') {
            searchPerson.setPersonUpdatedBy(Username);
        }
        browser.sleep(25).then(callback);
    });

    this.Given(/^I submit my search request for Person Search$/, function (callback) {
        searchPerson.clickSearch();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the search results (.*) should display the following sorted by Last Name:$/, function (result, table, callback) {
        //searchPerson.personFirstName.getAttribute('value').then(function(personFirstName){
        //    console.log('personFirstName here is:' + personFirstName);
        //    searchPerson.personSourceContext.$('option:checked').getText().then(function(personSourceContext){
        //        console.log('personSourceContext here is:' + personSourceContext);
        //        searchPerson.personSourceStatus.$('option:checked').getText().then(function(personSourceStatus){
        //            console.log('personSourceStatus here is:' + personSourceStatus);
                    searchPerson.personOrgAffiliation.getAttribute('value').then(function(personOrgAffiliation){
                        console.log('personOrgAffiliation here is:' + personOrgAffiliation);
        //                searchPerson.personSourceId.getAttribute('value').then(function(personSourceId){
        //                    console.log('personSourceId here is:' + personSourceId);
        //                    searchPerson.personLastName.getAttribute('value').then(function(personLastName){
        //                        console.log('personLastName here is:' + personLastName);
        //                        searchPerson.personEmail.getAttribute('value').then(function(personEmail){
        //                            console.log('personEmail here is:' + personEmail);
        //                            searchPerson.personPhone.getAttribute('value').then(function(personPhone){
        //                                console.log('personPhone here is:' + personPhone);
        //                                    searchPerson.personUpdateBy.getAttribute('value').then(function(personUpdateBy){
        //                                        console.log('personUpdateBy here is:' + personUpdateBy);
                                                searchPerson.personLastUpdatedStartDate.getAttribute('value').then(function(personLastUpdatedStartDate){
                                                    console.log('personLastUpdatedStartDate here is:' + personLastUpdatedStartDate);
                                                        searchPerson.personLastUpdatedEndDate.getAttribute('value').then(function(personLastUpdatedEndDate) {
                                                            console.log('personLastUpdatedEndDate here is:' + personLastUpdatedEndDate);
                                                                   if (personLastUpdatedStartDate === '' && personLastUpdatedEndDate === '') {
                                                                       expect(projectFunctions.inSearchResults('CTRP')).to.become('true').and.notify(callback);
                                                                    }
                                                                   else if (personOrgAffiliation !== '') {
                                                                       cukeOrganization.then(function (value) {
                                                                           console.log('Org affiliation search in result : ' + value);
                                                                           expect(projectFunctions.inSearchResults(value)).to.become('true').and.notify(callback);
                                                                       });
                                                                   }
                                                                   else {
        //                                                                console.log('in the else statement');
                                                                          expect(projectFunctions.inSearchResults('Active')).to.become('true').and.notify(callback);
                                                                    }
                                                        });
       //                                             });
       //                                         });
       //                             });
       //                         });
       //                     });
       //                 });
       //             });
       //         });
           });
       });
       });
       //

};