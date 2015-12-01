/**
 * Created by singhs10 on 11/16/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage= require('../support/projectMethods');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');


module.exports = function() {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();

    this.When(/^I have entered the lead organization trial identifier$/, function (callback) {
        addTrial.setAddTrialLeadProtocolIdentifier('shiLeadProtocolIdentifier');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I can enter more than one Protocol ID Origin Type:$/, function (table, callback) {
        data = table.raw();
        console.log('value of table' + data);
        addTrial.addTrialProtocolIDOriginList.getText().then(function(value) {
            console.log(value);
            expect(value).to.eql(data.toString().split(","));
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have to specify every selected Protocol ID Origin's Protocol ID$/, function (callback) {
        for (var i = 0; i < data.length; i++){
            console.log('value of i' + i);
            console.log('value of data field  :  ' + data[i]);
            addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', data[i])).click();
            addTrial.setAddTrialProtocolID('test45');
            addTrial.clickAddTrialAddProtocolButton();
        }
        browser.sleep(25).then(callback);
    });


    this.Then(/^the Register Trial Protocol Identifiers section will not indicate any errors during Trial Review$/, function (callback) {
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('ClinicalTrials.gov Identifier', 'test45');
     //   projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('CTEP Identifier', 'test45');
      //  projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('DCP Identifier', 'test45');
      //  projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('CCR Identifier', 'test45');
      //  projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('Duplicate NCI Identifier', 'test45');
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('Obsolete ClinicalTrials.gov Identifier', 'test45');
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('Other Identifier', 'test45');
        browser.sleep(25).then(callback);
    });


    this.Given(/^I am on the Register Trial Protocol Identifiers screen$/, function (callback) {
        trialMenuItem.verifyRegisterTrial();
        addTrial.getVerifyTrialIdentifiersSection();
        browser.sleep(25).then(callback);
    });

    this.When(/^I have not entered the lead organization trial identifier$/, function (callback) {
        addTrial.getVerifyAddTrialLeadProtocolIdentifier('');
        browser.sleep(25).then(callback);
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
