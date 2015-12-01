/**
 * Created by singhs10 on 11/28/15.
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

    this.Given(/^I am on the Register Trial Details screen$/, function (callback) {
        addTrial.getVerifyTrialDetailsSection();
        browser.sleep(25).then(callback);
    });

    this.When(/^I have entered the trial's title$/, function (callback) {
        addTrial.setAddTrialOfficialTitle('shiTrialOfficialTitle');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the trial phase types:$/, function (table, callback) {
        trialPhase = table.raw();
        console.log('value of table' + trialPhase);
        addTrial.addTrialPhaseList.getText().then(function(value) {
            console.log(value);
            expect(value).to.eql(trialPhase.toString().split(","));
        });
        addTrial.selectAddTrialPhase('I');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the "([^"]*)" if the study is a pilot study or left the option"([^"]*)" as the default$/, function (arg1, arg2, callback) {
        expect(addTrial.addTrialPilotOption.get(0).isSelected()).to.eventually.equal(true);
        addTrial.selectAddTrialPilotOption('1');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the appropriate Research Category Types:$/, function (table, callback) {
        trialResearchCategory = table.raw();
        console.log('value of table' + trialResearchCategory);
        addTrial.addTrialResearchCategoryList.getText().then(function(value) {
            console.log(value);
            expect(value).to.eql(trialResearchCategory.toString().split(","));
        });
        addTrial.selectAddTrialResearchCategory('Observational');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the Trial's Primary Purpose Type:$/, function (table, callback) {
        trialPrimaryPurpose = table.raw();
        console.log('value of table' + trialPrimaryPurpose);
        addTrial.addTrialPrimaryPurposeList.getText().then(function(value) {
            console.log(value);
            expect(value).to.eql(trialPrimaryPurpose.toString().split(","));
        });
        addTrial.selectAddTrialPrimaryPurpose('Diagnostic');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the Trial's Secondary Purpose Type:$/, function (table, callback) {
        trialSecondaryPurpose = table.raw();
        console.log('value of table' + trialSecondaryPurpose);
        addTrial.addTrialSecondaryPurposeList.getText().then(function(value) {
            console.log(value);
            expect(value).to.eql(trialSecondaryPurpose.toString().split(","));
        });
        addTrial.selectAddTrialSecondaryPurpose('Ancillary-Correlative');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selceted the Trial's Accrual Disease Terminology Type:$/, function (table, callback) {
        trialAccrualDisease = table.raw();
        console.log('value of table' + trialAccrualDisease);
        addTrial.addTrialAccrualDiseaseTerminologyList.getText().then(function(value) {
            console.log(value);
            expect(value).to.eql(trialAccrualDisease.toString().split(","));
        });
        addTrial.selectAddTrialAccrualDiseaseTerminology('ICD10');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Trial Details section will be complete$/, function (callback) {
        addTrial.getVerifyAddTrialOfficialTitle('shiTrialOfficialTitle');
        addTrial.getVerifyAddTrialPhase('I');
        addTrial.getVerifyAddTrialPilotOption('1');
        addTrial.getVerifyAddTrialResearchCategory('Observational');
        addTrial.getVerifyAddTrialPrimaryPurpose('Diagnostic');
        addTrial.getVerifyAddTrialSecondaryPurpose('Ancillary-Correlative');
        addTrial.getVerifyAddTrialAccrualDiseaseTerminology('ICD10');
        browser.sleep(25).then(callback);
    });

    this.When(/^I have not entered The official Title$/, function (callback) {
        addTrial.getVerifyAddTrialOfficialTitle('');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have not entered the trial Phase type$/, function (callback) {
        addTrial.getVerifyAddTrialPhase('-Select a Phase-');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have not entered the Research Category type$/, function (callback) {
        addTrial.getVerifyAddTrialResearchCategory('-Select a Research Category-');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have not entered the trial Primary Purpose$/, function (callback) {
        addTrial.getVerifyAddTrialPrimaryPurpose('-Select a Primary Purpose-');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have not entered the Accrual Disease Terminology type$/, function (callback) {
        addTrial.getVerifyAddTrialAccrualDiseaseTerminology('-Select an Accrual Disease Terminology-');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Trial Details field (.*) section will indicate an error (.*)$/, function (FieldType, error, table, callback) {
        addTrial.clickAddTrialReviewButton();
        errorTable = table.hashes();
        for (var i = 0; i < errorTable.length; i++) {
            //console.log('value of i' + i);
            //console.log('value of data field  :  ' + errorTable[i]);
            //console.log(errorTable[i]);
            //console.log('new line');
            //console.log(errorTable[i].FieldType);
            //console.log('new2 line');
            //console.log(errorTable[i].error);
            expect(projectFunctions.verifyWarningMessage(errorTable[i].error)).to.become('true');
        }
        browser.sleep(25).then(callback);
    });


};

//element.all(by.css('#phase')).element(by.css('option')).getText()
//by.css('option[label="0"]')
//
//element(by.css('#research_category')).all(by.css('option[label]')).getText()
//element(by.css('#phase')).all(by.css('option[label]')).getText()