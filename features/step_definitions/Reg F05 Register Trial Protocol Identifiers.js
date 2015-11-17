/**
 * Created by singhs10 on 11/16/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var listOfPeoplePage = require('../support/ListOfPeoplePage');
var menuItemList = require('../support/PoCommonBar');
var personPage = require('../support/AddPersonPage');
var helper = require('../support/helper');
var moment = require('moment');
var loginPage = require('../support/LoginPage');
var projectFunctionsPage= require('../support/projectMethods');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');


module.exports = function() {
    var login = new loginPage();
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var menuItem = new menuItemList();
    var search = new listOfPeoplePage();
    var person = new personPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var orgEffectiveDate = '19-Oct-2015';
    var orgExpirationDate = '19-Oct-2020';

    this.Given(/^I am logged into the CTRP Registration application$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrptrialsubmitter', 'Welcome01');
        login.accept();
        trialMenuItem.clickHomeSearchTrial();
        login.clickWriteMode();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the Register Trial screen$/, function (callback) {
        trialMenuItem.clickTrials();
        trialMenuItem.clickRegisterTrialLink();
        browser.sleep(25).then(callback);
    });



    this.Then(/^CTRP will display the required registration elements for a complete protocol registration for the selected (.*)$/, function (TrialType, callback) {
        addTrial.getVerifyTrialStudySource(TrialType);
        browser.sleep(25).then(callback);
    });


    this.Given(/^I have selected the option to register a trial (.*)$/, function (trialType, callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrptrialsubmitter', 'Welcome01');
        login.accept();
        trialMenuItem.clickHomeSearchTrial();
        login.clickWriteMode();
        if (trialType === 'National') {
            trialMenuItem.clickRegisterNationalTrialLink();
        }
        else if (trialType === 'Externally Peer-Reviewed') {
            trialMenuItem.clickRegisterExternallyPeerReviewedTrialLink();
        }
        else if (trialType === 'Institutional')   {
            trialMenuItem.clickRegisterInstitutionalTrialLink();
        }
        browser.sleep(25).then(callback);
    });

    this.When(/^I have entered the lead organization trial identifier$/, function (callback) {
        addTrial.setAddTrialLeadProtocolIdentifier('shiLeadProtocolIdentifier');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered more than one Other Trial Identifiers and identified the Other Trial Identifier Types:$/, function (table, callback) {
        data = table.raw();
        console.log('value of table' + data);
        for (var i = 0; i < data.length; i++){
            console.log('value of i' + i);
            console.log('value of data field  :  ' + data[i]);
            element(by.model('trialDetailView.protocol_id_origin_id')).element(by.cssContainingText('option', data[i])).click();
            element(by.model('trialDetailView.protocol_id')).sendKeys('test45');
            element(by.css('button[ng-click="trialDetailView.addOtherId()"]')).click();
            projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('CTEP','test45');
                        //data[i].field.then(function(value){
            //    console.log('value of data field  :  ' + value);
            //});
                        //var el = element(by.cssContainingText('#my-form a', data[i].field));
            //el.click().then(function(){
            //    var fieldEl = el.element(by.xpath("../.."))
            //        .element(by.css('textarea'));
            //    fieldEl.sendKeys(data[i].content);
         //   });
        }
   // };
        browser.sleep(10000).then(callback);
    });

    this.Then(/^the Register Trial Protocol Identifiers section will not indicate any errors during Trial Review$/, function (callback) {
    //    projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier(data,)
        browser.sleep(25).then(callback);
    });


    this.Given(/^I am on the Register Trial Protocol Identifiers screen$/, function (callback) {
        trialMenuItem.verifyRegisterTrial();
        browser.sleep(25).then(callback);
    });

    this.When(/^I have not entered the lead organization trial identifier$/, function (callback) {
       callback();
    });

    this.Given(/^I have optionally entered the clinicaltrials\.gov trial identifier$/, function (callback) {
        callback();
    });

    this.Given(/^I have optionally entered one or more Other Trial Identifiers$/, function (callback) {
        callback();
    });

    this.When(/^I click on the Review Trial button$/, function (callback) {
        addTrial.clickAddTrialReviewButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the TRegister Trial Protocol Identifiers section will indicate an error "([^"]*)"$/, function (arg1, callback) {
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true').and.notify(callback);
    });

};
