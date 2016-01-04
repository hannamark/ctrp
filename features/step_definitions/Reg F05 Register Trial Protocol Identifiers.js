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
var helperFunctions = require('../support/helper');
var helper = new helperFunctions();


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
            addTrial.setAddTrialProtocolID('NCT65478912');
            addTrial.clickAddTrialAddProtocolButton();
        }
        browser.sleep(25).then(callback);
    });


    this.Then(/^the Register Trial Protocol Identifiers section will not indicate any errors during Trial Review$/, function (callback) {
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('ClinicalTrials.gov Identifier', 'NCT65478912');
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('Obsolete ClinicalTrials.gov Identifier', 'NCT65478912');
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('Other Identifier', 'NCT65478912');
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
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true');
        browser.sleep(25).then(callback);
    });


    this.Given(/^I should be allowed to enter only one "([^"]*)"$/, function (arg1, callback) {

        /* Add a Unique Clinical.gov id **/
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', arg1)).click();
        addTrial.setAddTrialProtocolID('NCT98745632');
        addTrial.clickAddTrialAddProtocolButton();

        /* Add a second Clinical.gov id **/
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', arg1)).click();
        addTrial.setAddTrialProtocolID('NCT98745222');
        addTrial.clickAddTrialAddProtocolButton();

        /*Verify second clinical.gov id is not allowed **/
        expect(projectFunctionsRegistry.verifyTrialValidationMessage('ClinicalTrials.gov Identifier already exists')).to.become('true');
      //  helper.alertDialog('accept', 'ClinicalTrials.gov Identifier already exists' );
        projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifier('ClinicalTrials.gov Identifier', 'NCT98745632');

        /*Verify first clinical.gov id is added and second is not added **/
        expect(projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifierTable('NCT98745222')).to.become('false');
        expect(projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifierTable('NCT98745632')).to.become('true');
        browser.sleep(25).then(callback);

    });


    this.Given(/^I should be allowed to enter more than one "([^"]*)" with unique IDs$/, function (arg1, callback) {
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', arg1)).click();
        addTrial.setAddTrialProtocolID('NCT55556666');
        addTrial.clickAddTrialAddProtocolButton();
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', arg1)).click();
        addTrial.setAddTrialProtocolID('NCT44442222');
        addTrial.clickAddTrialAddProtocolButton();
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', arg1)).click();
        addTrial.setAddTrialProtocolID('NCT55556666');
        addTrial.clickAddTrialAddProtocolButton();
       // helper.alertDialog('accept', arg1 + ' NCT55556666 already exists' );
        expect(projectFunctionsRegistry.verifyTrialValidationMessage(arg1 + ' NCT55556666 already exists')).to.become('true');
        expect(projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifierTable('NCT55556666')).to.become('true');
        expect(projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifierTable('NCT44442222')).to.become('true');
        browser.sleep(25).then(callback);
    });


    this.Given(/^I should check for valid "([^"]*)" format as NCT followed by (\d+) numeric characters (.*)$/, function (arg1, arg2, NCT00000000, callback) {
        /**** Check for 7 characters *****/
        addTrial.clickAddTrialResetButton();
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', arg1)).click();
        addTrial.setAddTrialProtocolID('NCT2222556');
        addTrial.clickAddTrialAddProtocolButton();
        expect(projectFunctionsRegistry.verifyTrialValidationMessage('The format must be "NCT" followed by 8 numeric characters')).to.become('true');
       // helper.alertDialog('accept', 'The format must be "NCT" followed by 8 numeric characters');
        expect(projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifierTable('NCT2222556')).to.become('false');

        /**** Check for 8 characters without NCT *****/
        addTrial.clickAddTrialResetButton();
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', arg1)).click();
        addTrial.setAddTrialProtocolID('LLT2222556');
        addTrial.clickAddTrialAddProtocolButton();
        expect(projectFunctionsRegistry.verifyTrialValidationMessage('The format must be "NCT" followed by 8 numeric characters')).to.become('true');
        expect(projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifierTable('LLT2222556')).to.become('false');

        /**** Check for 8 characters with just numbers *****/
        addTrial.clickAddTrialResetButton();
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', arg1)).click();
        addTrial.setAddTrialProtocolID('12322225568');
        addTrial.clickAddTrialAddProtocolButton();
        expect(projectFunctionsRegistry.verifyTrialValidationMessage('The format must be "NCT" followed by 8 numeric characters')).to.become('true');
        expect(projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifierTable('12322225568')).to.become('false');

        /**** Check for 8 characters with just characters *****/
        addTrial.clickAddTrialResetButton();
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', arg1)).click();
        addTrial.setAddTrialProtocolID('NCTAQWERTYU');
        addTrial.clickAddTrialAddProtocolButton();
        expect(projectFunctionsRegistry.verifyTrialValidationMessage('The format must be "NCT" followed by 8 numeric characters')).to.become('true');
        expect(projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifierTable('NCTAQWERTYU')).to.become('false');

        /**** Check for 9 characters *****/
        addTrial.clickAddTrialResetButton();
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', arg1)).click();
        addTrial.setAddTrialProtocolID('NCT222255699');
        addTrial.clickAddTrialAddProtocolButton();
        expect(projectFunctionsRegistry.verifyTrialValidationMessage('The format must be "NCT" followed by 8 numeric characters')).to.become('true');
        expect(projectFunctionsRegistry.verifyAddTrialOtherTrialIdentifierTable('NCT222255699')).to.become('false');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Register Trial Protocol Identifiers section will indicate zero errors$/, function (callback) {
        callback();
    });


};
