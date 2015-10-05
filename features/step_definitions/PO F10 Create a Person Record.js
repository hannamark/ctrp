/**
 * Created by singhs10 on 9/21/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var ListOfPeoplePage = require('../support/ListOfPeoplePage');
var MenuItem = require('../support/PoCommonBar');
var PersonPage = require('../support/AddPersonPage');
var OrgPage = require('../support/ListOfOrganizationsPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var moment = require('moment');


module.exports = function() {
    var menuItemList = new MenuItem();
    var search = new ListOfPeoplePage();
    var person = new PersonPage();
    var searchOrg = new OrgPage();
    var selectItem =new selectList();
    var searchPersonName = element(by.model('searchParams.fname'));
    var firstName = 'ShSPerson PR-CU Fname ' ;
    var sourceStatus_Pending = 'Pending';
    var sourceStatus_Active = 'Active';

    this.Given(/^I know the first name, last name, middle name, with any prefix or suffix, phone or email, and organization affiliation of the Person$/, function (callback) {
        prefix = 'Dr.';
        middleName = 'ShSPerson PR-CU Mname' ;
        lastName = 'ShSPerson PR-CU Lname' ;
        suffix = 'Jr.';
        phone_verify = '444-555-6666' ;
        email_verify = 'test_cuke@PR.com';
        callback();
    });

    this.Given(/^I have complete a Search for Person and not found the Person in CTRP$/, function (callback) {
        menuItemList.clickPeople();
        menuItemList.clickListPeople();
        search.setPersonFirstName(firstName + moment().format('MMMDoYY hmmss'));
        per4 = searchPersonName.getAttribute('value');
        search.clickSearch();
        expect(menuItemList.inResults(per4)).to.become('false');
        browser.sleep(250).then(callback);
    });

    this.When(/^I have selected the Add Person function$/, function (callback) {
        menuItemList.clickPeople();
        menuItemList.clickAddPerson();
        browser.sleep(250).then(callback);
    });

    this.When(/^I provide the name information of the Person I wish to create$/, function (callback) {
        person.setAddPersonPrefix(prefix);
        per4.then(function(value1){console.log('Add first Name' + value1); person.setAddPersonFirstName(value1);});
        person.setAddPersonSecondName(middleName);
        person.setAddPersonLastName(lastName);
        person.setAddPersonSuffix(suffix);
        browser.sleep(250).then(callback);
    });

    this.Given(/^I provide either the Phone (.*) or email (.*) of the Person I wish to create$/, function (Phone, Email, callback) {
        person.setAddPersonEmail(Email);
        person.setAddPersonPhone(Phone);
        browser.sleep(250).then(callback);
    });


    this.When(/^I have searched Organizations and selected an affiliated organization$/, function (callback) {
        searchOrg.clickOrgSearchModel();
        browser.getAllWindowHandles().then(function(handles){
            browser.switchTo().window(handles[0]).then(function(){
                searchOrg.setOrgName('Boston University School Of Public Health');
                searchOrg.clickSearchButton();
                searchOrg.selectOrgModelItem();
                searchOrg.clickOrgModelConfirm();
                person.setPersonAffiliatedOrgEffectiveDate('September 09, 2015');
            //    person.clickSave();
            });
        });
        browser.sleep(250).then(callback);
    });

    this.When(/^I submit my create request for Person$/, function (callback) {
        person.clickSave();
        browser.sleep(250).then(callback);
    });

    this.Then(/^the system should create a Person record that contains a unique PO ID, the person first name, last name, middle name, prefix, suffix, the CTEP ID as Null, the phone (.*) and\/or email (.*), and the affiliated organization$/, function (Phone, Email, callback) {
        menuItemList.clickPeople();
      //  element(by.linkText('search Persons')).click();
          menuItemList.clickListPeople();
        per4.then(function(value2)
        {console.log('search person - ' + value2);
            search.setPersonFirstName(value2);
           selectItem.selectSourceContext('All Contexts');
            search.clickSearch();
            expect(menuItemList.inResults(value2)).to.become('true');
            element(by.linkText(value2)).click();
            person.getVerifyAddPerFName(value2);
            person.getVerifyAddPerLName(lastName);
            person.getVerifyAddPerEmail(Email);
            person.getVerifyAddPerPhone(Phone);
            person.getVerifyAddPerPrefix(prefix);
            person.getVerifyAddPerSuffix(suffix);
            person.getVerifyAddPerSourceId('');
        });
        browser.sleep(250).then(callback);
    });

    this.Then(/^the Person status should be Pending and the status date should be the current date and time$/, function (callback) {
        person.getVerifyAddPerSourceStatus(sourceStatus_Pending);
        person.personVerifyCreatedNameDate();
        browser.sleep(250).then(callback);
    });

    this.Then(/^the Person status should be Active and the status date should be the current date and time$/, function (callback) {
    //    person.getVerifyAddPerSourceStatus(sourceStatus_Active);
    //    person.personVerifyCreatedNameDate();
    //    browser.sleep(250).then(callback);
        callback.pending();
    });

    this.Then(/^the system should indicate that the person name is a duplicate name and reject the request and require re\-entry of all fields$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I provide either the Phone or email of the Person I wish to create$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

}