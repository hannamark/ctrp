/**
 * Author: singhs10
 * Date: 12/08/2015
 * Feature: Reg F13 Register Trial Documents
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage= require('../support/projectMethods');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
var helperFunctions = require('../support/helper');
var moment = require('moment');


module.exports = function() {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var helper = new helperFunctions();

    var testSampleDocFile = 'testSampleDocFile.docx';
    var testSampleDocFile_IRB = 'testSampleDocFile_IRB.docx';
    var testSampleEXCELFile = 'testSampleEXCELFile.xlsx';
    var testSamplePDFFile = 'testSamplePDFFile.pdf';
    var testSampleRichTextFile = 'testSampleRichTextFile.rtf';

    /*
     Scenario Outline: #1 I can attach Trial Related Documents to a trial registration
     Given I have selected the option to register a trial <TrialType>
     And I am on the Register Trial Related Documents screen
     When I have selected a file to attach as the Protocol Document
     And I have selected a file to attach as the IRB Approval
     And I have selected a file to attach as the list of Participating Sites
     And I have selected a file to attach as the Informed Consent Document
     And I have selected one or more files to attach as Other file and entered the description of the file
     Then the Register Trial Related Document for the trial registration will not indicate an errors during Trial Review

     Examples:
     |TrialType                |
     |National                 |
     |Externally Peer-Reviewed |
     |Institutional            |
     */

    this.Given(/^I am on the Register Trial Related Documents screen$/, function (callback) {
        addTrial.setAddTrialLeadProtocolIdentifier('trialDocUpload ' +  typeOfTrial + moment().format('MMMDoYY h m'));
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected a file to attach as the Protocol Document$/, function (callback) {
              trialDoc.trialRelatedFileUpload('reg', '1', testSampleDocFile);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected a file to attach as the IRB Approval$/, function (callback) {
        trialDoc.trialRelatedFileUpload('reg', '2', testSampleDocFile_IRB);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected a file to attach as the list of Participating Sites$/, function (callback) {
        trialDoc.trialRelatedFileUpload('reg', '3', testSampleEXCELFile);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected a file to attach as the Informed Consent Document$/, function (callback) {
        trialDoc.trialRelatedFileUpload('reg', '4', testSamplePDFFile);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected one or more files to attach as Other file and entered the description of the file$/, function (callback) {
        trialDoc.trialRelatedFileUpload('reg', '5', testSampleRichTextFile);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Register Trial Related Document for the trial registration will not indicate an errors during Trial Review$/, function (callback) {
        addTrial.clickAddTrialSaveDraftButton();
        browser.wait(function () {
            return element(by.linkText(testSampleDocFile)).isPresent().then(function (state) {
                if (state === true) {
                    return element(by.linkText(testSampleDocFile)).isDisplayed().then(function (state2) {
                        return state2 === true;
                    });
                } else {
                    return false;
                }
            });
        }, 10000, "Save draft page with Uploaded documents did not appear");
        browser.sleep(25).then(callback);
    });


};
