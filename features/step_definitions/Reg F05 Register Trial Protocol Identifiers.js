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
var helperPage = require('../support/helper');
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
    var helper = new helperPage();



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
            addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', data[i])).click();
            addTrial.setAddTrialProtocolID('test45');
            addTrial.clickAddTrialAddProtocolButton();
        }
        browser.sleep(250).then(callback);
    });

    this.Then(/^the Register Trial Protocol Identifiers section will not indicate any errors during Trial Review$/, function (callback) {
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('ClinicalTrials.gov Identifier', 'test45');
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('CTEP Identifier', 'test45');
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('DCP Identifier', 'test45');
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('CCR Identifier', 'test45');
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('Duplicate NCI Identifier', 'test45');
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('Obsolete ClinicalTrials.gov Identifier', 'test45');
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('Other Identifier', 'test45');
        browser.sleep(250).then(callback);
    });


    this.Given(/^I am on the Register Trial Protocol Identifiers screen$/, function (callback) {
        trialMenuItem.verifyRegisterTrial();
        browser.sleep(25).then(callback);
    });

    this.When(/^I have not entered the lead organization trial identifier$/, function (callback) {
       callback();
    });

    this.When(/^I click on the Review Trial button$/, function (callback) {
        addTrial.clickAddTrialReviewButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Register Trial Protocol Identifiers section will indicate an error "([^"]*)"$/, function (arg1, callback) {
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true').and.notify(callback);
    });


    this.Then(/^I should not be allowed to enter Duplicate Identifiers of the same type$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I should not be allowed to enter the "([^"]*)" with duplicate Protocol ID$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

};
