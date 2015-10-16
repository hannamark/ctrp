/**
 * Created by singhs10 on 8/10/15.
 */

var helper = require('../support/helper');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var menuItemList = require('../support/PoCommonBar');
var addOrgPage = require('../support/AddOrganizationPage');
var searchOrgPage = require('../support/ListOfOrganizationsPage');
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var moment = require('moment');

AddPersonPage = function () {

    this.addPersonFirstName = element(by.model('personDetailView.curPerson.fname'));
    this.addPersonSecondName = element(by.model('personDetailView.curPerson.mname'));
    this.addPersonLastName = element(by.model('personDetailView.curPerson.lname'));
    this.addPersonSourceId = element(by.model('personDetailView.curPerson.source_id'));
    this.addPersonSourceStatus = element(by.model('personDetailView.curPerson.source_status_id'));
    this.addPersonPrefix = element(by.model('personDetailView.curPerson.prefix'));
    this.addPersonSuffix = element(by.model('personDetailView.curPerson.suffix'));
    this.addPersonEmail = element(by.model('personDetailView.curPerson.email'));
    this.addPersonPhone = element(by.model('personDetailView.curPerson.phone'));
    this.addPersonSearchAffiliatedOrg = element(by.model('personDetailView.orgsSearchParams.name'));
    this.addPersonAffiliatedOrg = element(by.css('select[ng-model="personDetailView.selectedOrgs"]'));
    this.addPersonSelectAllAffiliatedOrg = element(by.css('button[title="Select all"]'));
    this.addPersonRemoveAllAffiliatedOrg = element(by.css('button[title="Remove all"]'));
    this.personSaveButton = element(by.css('button[type="submit"]')); //element(by.css('input[value="Save"]'));
    this.personResetButton = element(by.css('input[value="Reset"]'));
    this.addPersonHeader = element(by.css('h4[ng-if="personDetailView.curPerson.new"]'));
    this.editPersonHeader = element(by.css('h4[ng-if="!personDetailView.curPerson.new"]'));
    var personLastUpdatedBy = element(by.binding('personDetailView.curPerson.updated_by'));
    var personCreatedBy = element(by.binding('personDetailView.curPerson.created_by'));
    this.loginName = element(by.binding('headerView.username'));

    var personVerifyAddHeader = 'Add Person';
    var personVerifyEditHeader = 'Edit Person';
    var menuItem = new menuItemList();
    var addOrg = new addOrgPage();
    var searchOrg = new searchOrgPage();
    var searchPeople = new listOfPeoplePage();

    var addPerson = new helper();

    this.setAddPersonFirstName = function(personFirstName){
        addPerson.setValue(this.addPersonFirstName,personFirstName,"Add Person by First Name field");
    };

    this.setAddPersonSecondName = function(personSecondName){
        addPerson.setValue(this.addPersonSecondName,personSecondName,"Add Person by Second Name field");
    };

    this.setAddPersonLastName = function(personLastName){
        addPerson.setValue(this.addPersonLastName,personLastName,"Add Person by Last Name field");
    };

    this.setAddPersonSourceId= function(personSourceId){
        addPerson.setValue(this.addPersonSourceId,personSourceId,"Add Person by Source Id field");
    };

    this.selectAddPersonSourceStatus = function(personSourceStatus){
        addPerson.selectValue(this.addPersonSourceStatus,personSourceStatus,"Add Person by Source Status field");
    };

    this.setAddPersonPrefix = function(personPrefix){
        addPerson.setValue(this.addPersonPrefix,personPrefix,"Add Person by Prefix field");
    };

    this.setAddPersonSuffix = function(personSuffix){
        addPerson.setValue(this.addPersonSuffix,personSuffix,"Add Person by Suffix field");
    };

    this.setAddPersonEmail = function(personEmail){
        addPerson.setValue(this.addPersonEmail,personEmail,"Add Person by Email field");
    };

    this.setAddPersonPhone = function(personPhone){
        addPerson.setValue(this.addPersonPhone,personPhone,"Add Person by Phone field");
    };

    this.setAddPersonSearchAffiliatedOrg = function(personSearchAffiliatedOrg){
        addPerson.setValue(this.addPersonSearchAffiliatedOrg,personSearchAffiliatedOrg,"Add Person by Affiliated Search field");
    };

    this.selectAddPersonAffiliatedOrg = function(personAffiliatedOrg){
        addPerson.setValue(this.addPersonAffiliatedOrg, personAffiliatedOrg, "Add Person by Affiliated Org");
    };

    this.clickSelectAllAffiliatedOrg = function(){
        addPerson.clickButton(this.addPersonSelectAllAffiliatedOrg,"Add Person Select All Affiliated Org button");
    };

    this.clickRemoveAllAffiliatedOrg = function(){
        addPerson.clickButton(this.addPersonRemoveAllAffiliatedOrg,"Add Person Remove All Affiliated Org button");
    };


    this.clickSave = function(){
        addPerson.clickButton(this.personSaveButton,"Add Person by Save button");
    };

    this.clickReset = function(){
        addPerson.clickButton(this.personResetButton,"Add Person by Reset button");
    };

    this.getVerifyAddPerFName = function(perFName){
        addPerson.getVerifyValue(this.addPersonFirstName,perFName,"Get Person by first Name field");
    };

    this.getVerifyAddPerMName = function(perMName){
        addPerson.getVerifyValue(this.addPersonSecondName,perMName,"Get Person by Middle Name field");
    };

    this.getVerifyAddPerLName = function(perLName){
        addPerson.getVerifyValue(this.addPersonLastName,perLName,"Get Person by Last Name field");
    };

    this.getVerifyAddPerSourceId = function(sourceId){
        addPerson.getVerifyValue(this.addPersonSourceId,sourceId,"Get Person by Source ID field");
    };

    this.getVerifyAddPerSourceStatus = function(sourceStatus){
        addPerson.getVerifyListValue(this.addPersonSourceStatus,sourceStatus,"Get Person by Source Status field");
    };

    this.getVerifyAddPerPrefix = function(prefix){
        addPerson.getVerifyValue(this.addPersonPrefix,prefix,"Get Person by Address field");
    };

    this.getVerifyAddPerSuffix = function(suffix){
        addPerson.getVerifyValue(this.addPersonSuffix,suffix,"Get Person by Address2 field");
    };

    this.getVerifyAddPerEmail = function(email){
        addPerson.getVerifyValue(this.addPersonEmail,email,"Get Person by Email field");
    };

    this.getVerifyAddPerPhone = function(phone){
        addPerson.getVerifyValue(this.addPersonPhone,phone,"Get Person by Phone field");
    };

    this.verifyPersonAddHeader = function(){
        addPerson.getVerifyheader(this.addPersonHeader,personVerifyAddHeader,"Person by Add header field");
    };

    this.verifyPersonEditHeader = function(){
        addPerson.getVerifyheader(this.editPersonHeader,personVerifyEditHeader,"Person by Edit header field");
    };

    this.personVerifyCreatedNameDate = function() {
        var datenow = moment().format('DD-MMM-YYYY');
        var userLoggedIn = this.loginName.getText();
        userLoggedIn.then(function (value2) {
            var userCreatedDate = value2 + ' (' + datenow + ')';
            console.log('user-date created value is: ' + userCreatedDate);
            (personCreatedBy.getText()).should.eventually.equal(userCreatedDate);
        });
    };

    this.personVerifyLastUpdatedNameDate = function(dateTime) {
     //   var datenow = moment().format('DD-MMM-YYYY');
        var userLoggedIn = this.loginName.getText();
        userLoggedIn.then(function (value2) {
            var userUpdatedDate = value2 + ' (' + dateTime + ')';
            console.log('user-date last updated value is: ' + userUpdatedDate);
            (personLastUpdatedBy.getText()).should.eventually.equal(userUpdatedDate);
        });
    };

    var hasNotNullValue = function(elementFinder) {
        return function() {
            return elementFinder.getAttribute("value").then(function(value) {
                return !!value;  // is not null
            });
        };
    };

    this.personDefaultCreate = function(prefix, fName, mName, lName, suffix, email, phone, affOrgName){
        menuItem.clickPeople();
        menuItem.clickAddPerson();
        this.setAddPersonPrefix(prefix);
        this.setAddPersonFirstName(fName + moment().format('MMMDoYY hmmss'));
        broswer.wait(hasNotNullValue(this.addPersonFirstName),10000);
        per4 = this.addPersonFirstName.getAttribute('value');
        per4.then(function(value4) {
            console.log('Added family name is' + value4);
            element(by.model('personDetailView.curPerson.lname')).sendKeys(lName);
            element(by.css('button[type="submit"]')).click();
           // this.setAddPersonSecondName(mName);
          //  this.setAddPersonLastName(lName);
          //  this.setAddPersonSuffix(suffix);
          //  this.setAddPersonEmail(email);
          //  this.setAddPersonPhone(phone);
            if (affOrgName !== '') {
                addOrg.orgDefaultCreate(affOrgName, '', '', '', '', '', '', '', '', '', '', '');
                org4.then(function (value5) {
                    console.log('search Organization - ' + value5);
                    searchOrg.setOrgName(value5);
                    searchOrg.clickSearchButton();
                    searchOrg.selectOrgModelItem();
                    searchOrg.clickOrgModelConfirm();
                });
                menuItem.clickPeople();
                menuItem.clickListPeople();
                searchPeople.setPersonFirstName(value4);
                searchPeople.clickSearch();
                expect(menuItem.inResults(value4)).to.become('true');
                element(by.linkText(value4)).click();
                searchOrg.clickOrgSearchModel();
            }
        });
      //      searchOrg.clickOrgSearchModel();
      //      org4.then(function(value4){
      //          console.log('search Organization - ' + value4);
      //          searchOrg.setOrgName(value4);
      //          searchOrg.clickSearchButton();
      //          searchOrg.selectOrgModelItem();
      //          searchOrg.clickOrgModelConfirm();
      //      });
      //      this.clickSave();})
        //this.setAddPersonSecondName(mName);
        //this.setAddPersonLastName(lName);
        //this.setAddPersonSuffix(suffix);
        //this.setAddPersonEmail(email);
        //this.setAddPersonPhone(phone);
        //searchOrg.clickOrgSearchModel();
        //org4.then(function(value4){
        //    console.log('search Organization - ' + value4);
        //    searchOrg.setOrgName(value4);
        //    searchOrg.clickSearchButton();
        //    searchOrg.selectOrgModelItem();
        //    searchOrg.clickOrgModelConfirm();
        //});
        this.clickSave();
    };

};
module.exports = AddPersonPage;