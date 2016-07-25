/**
 * Author: Shamim Ahmed
 * Date: 07/05/2016
 * Feature: PAS F04 Outcome Measures.Feature
 *
 * Note: In the PAA search screen it has dependency on the seeded data
 */

//Common dependencies
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require ('moment');

//Required dependencies
//Login dependencies
var loginPage = require('../support/LoginPage');
//helper methods
var helperMethods = require('../support/helper');
//Project Related methods dependencies
var projectFunctionMethods= require('../support/projectMethods');
//Menu bar dependencies
var abstractionPageMenu = require('../support/abstractionCommonBar');
//Abstraction search page dependencies
var abstractionTrialSearchPage = require('../support/abstractionSearchTrialPage');
//Abstraction common dependencies
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
//Abstraction NCI Specific Information
var abstractionNCISpecific = require('../support/abstractionNCISpecificInfo');
//List of Organization
var OrgPage = require('../support/ListOfOrganizationsPage');
//Organization Search
var orgSearch = require('../support/abstractionOrganizationSearch');
//Person Search
var searchPeoplePage = require('../support/ListOfPeoplePage');
//Regulatory Information - IND/IDE
var abstractionRegulatoryINDIDE = require('../support/abstractionRegulatoryIND');
//Regulatory Information - Human Subject Safety
var abstractionRegulatoryHuman = require('../support/abstractionRegulatoryHuman');
//General Trial Details
var abstractionTrialDetails = require('../support/abstractionTrialDetails');
//Trial Related Document
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
//Left Navigation
var abstractionLeftNavigationMenus = require('../support/abstractionLeftNav');
//Scientific trial description
var scientificTrialDesc = require('../support/scientificTrialDesc');
//Scientific Outcome Measures
var scientificOutcome = require('../support/scientificOutcomeMeasures');
//
var projectFunctionsPage= require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');


module.exports = function() {

    var commonFunctions = new abstractionCommonMethods();
    var leftNav = new abstractionLeftNavigationMenus();
    var outcome = new scientificOutcome();
    var leadProtocolID = 'CTRP_01_1789';
    var leadProtocolIDA = 'CTRP_01_1777';
    var optionA = '';
    var optionB = '';
    var optionC = '';
    var optionD = '';
    var pageTtitle = 'List of Outcome Measures';
    var pageTtitleA = 'Outcome Measure Details';
    var outTitle = 'Test Outcome Measure Title';
    var timeFrame ='Test Time Frame';
    var description = 'Test Description Outcome Measure Details';

    /*
     Scenario: #1 I can add Outcome Measures for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Outcome Measures screen
     And I have Selected Add Button
     And Add/Edit Outcome Measure screen displays
     And I have selected a value for Outcome Measure Type
     |- Please select a  outcome-measure type...|
     |Primary|
     |Secondary|
     |Other Pre-specified|
     And I have entered a value for Title
     And I have entered a value for Time Frame
     And I have entered a value for Description
     And I have selected a value for Safety Issue
     |Safety Issue|
     |Yes|
     |No|
     When I select Save
     Then the Outcome Measure for the trial will be associated with the trial
     And <Created Message> displays
     |Created Message|
     |Record created|
     And the Outcome Measures table will display Outcomes Measures values
     |Outcome Measure Type  |
     |Title  |
     |Time Frame  |
     |Description  |
     |Safety Issue  |
     |Edit  |
     |Copy  |
     |Delete  |
     And I can add another Outcome Measure
     */

    this.Given(/^I am on the Outcome Measures screen$/, function (callback) {
        leftNav.clickScientificOutcome();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.deleteAllOutcomeList('yes');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have Selected Add Button$/, function (callback) {
        outcome.clickAddOutcomeMeasure();
        browser.sleep(25).then(callback);
    });

    this.Given(/^Add\/Edit Outcome Measure screen displays$/, function (callback) {
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected a value for Outcome Measure Type$/, function (table, callback) {
        var outcomeType = table.raw();
        optionType = outcomeType.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + optionType +']');
        var optionTypeSplt = optionType.toString().split("\n");
        optionA = optionTypeSplt[1];
        optionC = optionTypeSplt[0];
        outcome.selectOutcomeMeasureType(optionA);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered a value for Title$/, function (callback) {
        outcome.setTitleTxt(outTitle);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered a value for Time Frame$/, function (callback) {
        outcome.setTimeFrameTxt(timeFrame);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered a value for Description$/, function (callback) {
        outcome.setDescriptionTxt(description);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected a value for Safety Issue$/, function (table, callback) {
        var outcomeSafety = table.raw();
        optionSafety = outcomeSafety.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + optionSafety +']');
        var optionSafetySplt = optionSafety.toString().split("\n");
        optionB = optionSafetySplt[1];
        optionD = optionSafetySplt[0];
        outcome.selectSafetyIssue(optionB);
        browser.sleep(25).then(callback);
    });

    this.When(/^select Save$/, function (callback) {
        outcome.clickSaveOutcome();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Outcome Measure for the trial will be associated with the trial$/, function (callback) {
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionA, 'verify', outTitle, timeFrame, description, optionB);
        browser.sleep(25).then(callback);
    });

    this.Then(/^created message displays$/, function (table, callback) {
        console.log('Toster Message Validation Out of Scope in Protractor');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Outcome Measures table will display Outcomes Measures values$/, function (table, callback) {
        outcome.verifyOutcomeMeasureTHead();
        browser.sleep(25).then(callback);
    });

    this.Then(/^I can add another Outcome Measure$/, function (callback) {
        outcome.clickAddOutcomeMeasure();
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        outcome.selectOutcomeMeasureType(optionC);
        outcome.setTitleTxt(outTitle +' Add Another Test');
        outcome.setTimeFrameTxt(timeFrame +' Add Another Test');
        outcome.setDescriptionTxt(description +' Add Another Test');
        outcome.selectSafetyIssue(optionD);
        outcome.clickSaveOutcome();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionC, 'verify', outTitle+' Add Another Test', timeFrame+' Add Another Test', description+' Add Another Test', optionD);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #2 I can edit Outcome Measures for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Outcome Measures screen
     And I have Selected Edit on an existing Outcome Measure
     And I have entered or edited a value for Outcome Measure Type
     |Outcome Measure Type|
     |Primary|
     |Secondary|
     |Other Pre-specified|
     And I have edited a value for Title
     And I have edited a value for Time Frame
     And I have entered or edited a value for Description
     And I have selected another value for Safety Issue
     |Safety Issue|
     |Yes|
     |No|
     When I have selected Save Then the Outcome Measure for the trial will be associated with the trial
     And the message Record Updated displays
     */

    this.Given(/^I have Selected Edit on an existing Outcome Measure$/, function (callback) {
        outcome.clickAddOutcomeMeasure();
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        optionC = 'Secondary';
        outcome.selectOutcomeMeasureType(optionC);
        outcome.setTitleTxt(outTitle +' Add Another Test');
        outcome.setTimeFrameTxt(timeFrame +' Add Another Test');
        outcome.setDescriptionTxt(description +' Add Another Test');
        optionD = 'Yes';
        outcome.selectSafetyIssue(optionD);
        outcome.clickSaveOutcome();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionC, 'verify', outTitle+' Add Another Test', timeFrame+' Add Another Test', description+' Add Another Test', optionD);
        outcome.findOutcomeToVerifyEditCopyDelete(optionC, 'edit', outTitle+' Add Another Test', timeFrame+' Add Another Test', description+' Add Another Test', optionD);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered or edited a value for Outcome Measure Type$/, function (table, callback) {
        var outcomeType = table.raw();
        optionType = outcomeType.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + optionType +']');
        var optionTypeSplt = optionType.toString().split("\n");
        optionA = optionTypeSplt[1];
        optionC = optionTypeSplt[0];
        outcome.selectOutcomeMeasureType(optionA);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have edited a value for Title$/, function (callback) {
        outcome.setTitleTxt(outTitle+' Edit Test');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have edited a value for Time Frame$/, function (callback) {
        outcome.setTimeFrameTxt(timeFrame+' Edit Test');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered or edited a value for Description$/, function (callback) {
        outcome.setDescriptionTxt(description+' Edit Test');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected another value for Safety Issue$/, function (table, callback) {
        var outcomeSafety = table.raw();
        optionSafety = outcomeSafety.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + optionSafety +']');
        var optionSafetySplt = optionSafety.toString().split("\n");
        optionB = optionSafetySplt[1];
        optionD = optionSafetySplt[2];
        outcome.selectSafetyIssue(optionD);
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected Save Then the Outcome Measure for the trial will be associated with the trial$/, function (callback) {
        outcome.clickSaveOutcome();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionA, 'verify', outTitle+' Edit Test', timeFrame+' Edit Test', description+' Edit Test', optionD);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario Outline: #3 Add/Edit Outcome Measure rules
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Outcome Measures screen
     And I have not entered an <AddEditMeasureFieldType>
     When I haved clicked on the save Button
     Then The <FieldError> will be displayed

     Examples:
     |AddEditMeasureFieldType   |FieldError  |
     |Outcome Measure Type      |Outcome Measure Type is Required|
     |Title                     |Title is Required|
     |Time Frame                |Time Frame is Required|
     |Safety Issue              |Safety Issue is Required|
     */

    this.Given(/^I have not entered an (.*)$/, function (AddEditMeasureFieldType, callback) {
        outcome.clickAddOutcomeMeasure();
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        optionC = 'Secondary';
        outcome.selectOutcomeMeasureType(optionC);
        outcome.setTitleTxt(outTitle +' Required Test');
        outcome.setTimeFrameTxt(timeFrame +' Required Test');
        outcome.setDescriptionTxt(description +' Not Required Test');
        optionD = 'Yes';
        outcome.selectSafetyIssue(optionD);
        outcome.clickSaveOutcome();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionC, 'verify', outTitle+' Required Test', timeFrame+' Required Test', description+' Not Required Test', optionD);
        outcome.findOutcomeToVerifyEditCopyDelete(optionC, 'edit', outTitle+' Required Test', timeFrame+' Required Test', description+' Not Required Test', optionD);
        if (AddEditMeasureFieldType === 'Outcome Measure Type'){
            optionC = '- Please select a outcome-measure type...';
            outcome.selectOutcomeMeasureType(optionC);
        } else if(AddEditMeasureFieldType === 'Title'){
            outcome.setTitleTxt(' ');
        } else if(AddEditMeasureFieldType === 'Time Frame'){
            outcome.setTimeFrameTxt(' ');
        } else if(AddEditMeasureFieldType === 'Safety Issue'){
            optionD = '- Please select a safety issue type...';
            outcome.selectSafetyIssue(optionD);
        }
        browser.sleep(25).then(callback);
    });

    this.When(/^I haved clicked on the save Button$/, function (callback) {
        outcome.clickSaveOutcome();
        browser.sleep(25).then(callback);
    });

    this.Then(/^The (.*) will be displayed$/, function (FieldError, callback) {
        if (FieldError === 'Outcome Measure Type is Required'){
            commonFunctions.verifyTxtByIndex(outcome.requiredMsg, FieldError, '0', 'Verifying Outcome Measure Type is Required');
        } else if(FieldError === 'Title is Required'){
            commonFunctions.verifyTxtByIndex(outcome.requiredMsg, FieldError, '0', 'Verifying Title is Required');
        } else if(FieldError === 'Time Frame is Required'){
            commonFunctions.verifyTxtByIndex(outcome.requiredMsg, FieldError, '0', 'Verifying Time Frame is Required');
        } else if(FieldError === 'Safety Issue is Required'){
            commonFunctions.verifyTxtByIndex(outcome.requiredMsg, FieldError, '0', 'Verifying Safety Issue is Required');
        }
        commonFunctions.alertMsgOK();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario:  #4  Reorder Outcome Measures
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Outcome Measures screen
     And I am viewing the Outcome Measures table
     When I click on a record
     And drag it to a new sequence location in the table
     Then the order of the outcome measures changes
     */

    this.Given(/^I am viewing the Outcome Measures list$/, function (callback) {
        outcome.clickAddOutcomeMeasure();
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        optionC = 'Secondary';
        outcome.selectOutcomeMeasureType(optionC);
        outcome.setTitleTxt(outTitle +' Reorder Test A');
        outcome.setTimeFrameTxt(timeFrame +' Reorder Test A');
        outcome.setDescriptionTxt(description +' Reorder Test A');
        optionD = 'Yes';
        outcome.selectSafetyIssue(optionD);
        outcome.clickSaveOutcome();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionC, 'verify', outTitle+' Reorder Test A', timeFrame+' Reorder Test A', description+' Reorder Test A', optionD);
        outcome.clickAddOutcomeMeasure();
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        optionA = 'Primary';
        outcome.selectOutcomeMeasureType(optionA);
        outcome.setTitleTxt(outTitle +' Reorder Test B');
        outcome.setTimeFrameTxt(timeFrame +' Reorder Test B');
        outcome.setDescriptionTxt(description +' Reorder Test B');
        optionB = 'No';
        outcome.selectSafetyIssue(optionB);
        outcome.clickSaveOutcome();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionA, 'verify', outTitle+' Reorder Test B', timeFrame+' Reorder Test B', description+' Reorder Test B', optionB);
        browser.sleep(25).then(callback);
    });

    this.When(/^I click on a record to reorder the list$/, function (callback) {

        browser.sleep(25).then(callback);
    });

    this.When(/^drag it to a new sequence location in the list$/, function (callback) {
        outcome.reorderRowByDragAndDrop();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the order of the outcome measures list changes$/, function (callback) {
        vfoptionC = 'Secondary';
        vfoptionD = 'Yes';
        vfoptionA = 'Primary';
        vfoptionB = 'No';
        outcome.verifyDragAndDrop('1', vfoptionA, outTitle+' Reorder Test B', timeFrame+' Reorder Test B', description+' Reorder Test B', vfoptionB);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario:  #5  Copy Outcome Measures
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Outcome Measures screen
     And I am viewing the Outcome Measures list
     When I click on a record
     And click on copy
     Then the Add/Edit Outcome Measure screen displays
     And I can edit all fields
     When I click Save
     Then the new Outcome Measure for the trial will be associated with the trial
     And the new outcome Measure is displayed on the outcome measure list
     And no changes have been made on the original outcome measure
     */

    this.Given(/^I am viewing the Outcome Measures list to copy outcome measures$/, function (callback) {
        outcome.clickAddOutcomeMeasure();
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        optionC = 'Secondary';
        outcome.selectOutcomeMeasureType(optionC);
        outcome.setTitleTxt(outTitle +' Copy Test A');
        outcome.setTimeFrameTxt(timeFrame +' Copy Test A');
        outcome.setDescriptionTxt(description +' Copy Test A');
        optionD = 'Yes';
        outcome.selectSafetyIssue(optionD);
        outcome.clickSaveOutcome();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionC, 'verify', outTitle+' Copy Test A', timeFrame+' Copy Test A', description+' Copy Test A', optionD);
        browser.sleep(25).then(callback);
    });

    this.When(/^I click on a record$/, function (callback) {

        browser.sleep(25).then(callback);
    });

    this.When(/^click on copy$/, function (callback) {
        outcome.findOutcomeToVerifyEditCopyDelete(optionC, 'copy', outTitle+' Copy Test A', timeFrame+' Copy Test A', description+' Copy Test A', optionD);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Add\/Edit Outcome Measure screen displays$/, function (callback) {
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        browser.sleep(25).then(callback);
    });

    this.Then(/^I can edit all fields$/, function (callback) {
        optionA = 'Primary';
        outcome.selectOutcomeMeasureType(optionA);
        outcome.setTitleTxt(outTitle +' Copy Test B');
        outcome.setTimeFrameTxt(timeFrame +' Copy Test B');
        outcome.setDescriptionTxt(description +' Copy Test B');
        optionB = 'No';
        outcome.selectSafetyIssue(optionB);
        browser.sleep(25).then(callback);
    });

    this.When(/^I click Save$/, function (callback) {
        outcome.clickSaveOutcome();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the new Outcome Measure for the trial will be associated with the trial$/, function (callback) {
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the new outcome Measure is displayed on the outcome measure list$/, function (callback) {
        outcome.findOutcomeToVerifyEditCopyDelete(optionA, 'verify', outTitle+' Copy Test B', timeFrame+' Copy Test B', description+' Copy Test B', optionB);
        browser.sleep(25).then(callback);
    });

    this.Then(/^no changes have been made on the original outcome measure$/, function (callback) {
        outcome.findOutcomeToVerifyEditCopyDelete(optionC, 'verify', outTitle+' Copy Test A', timeFrame+' Copy Test A', description+' Copy Test A', optionD);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario:  #6 I can reset Outcome Measures for a Trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Outcome Measures screen
     When I select Add
     And I am on the Add/Edit Outcome Measures screen
     And I have entered values
     When I have selected Reset at the Outcome Measures screen
     Then the information entered on the Outcome Measures screen will not be saved to the trial record
     And the screen will be refreshed with the data since the last save at the Outcome Measures screen
     */

    this.When(/^I select Add$/, function (callback) {
        outcome.clickAddOutcomeMeasure();
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        optionC = 'Secondary';
        outcome.selectOutcomeMeasureType(optionC);
        outcome.setTitleTxt(outTitle +' Reset Test A');
        outcome.setTimeFrameTxt(timeFrame +' Reset Test A');
        outcome.setDescriptionTxt(description +' Reset Test A');
        optionD = 'Yes';
        outcome.selectSafetyIssue(optionD);
        outcome.clickSaveOutcome();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionC, 'verify', outTitle+' Reset Test A', timeFrame+' Reset Test A', description+' Reset Test A', optionD);
        outcome.clickAddOutcomeMeasure();
        browser.sleep(25).then(callback);
    });

    this.When(/^I am on the Add\/Edit Outcome Measures screen$/, function (callback) {
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        browser.sleep(25).then(callback);
    });

    this.When(/^I have entered values$/, function (callback) {
        optionA = 'Primary';
        outcome.selectOutcomeMeasureType(optionA);
        outcome.setTitleTxt(outTitle +' Reset Test B');
        outcome.setTimeFrameTxt(timeFrame +' Reset Test B');
        outcome.setDescriptionTxt(description +' Reset Test B');
        optionB = 'No';
        outcome.selectSafetyIssue(optionB);
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected Reset at the Outcome Measures screen$/, function (callback) {
        outcome.clickResetOutcome();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the information entered on the Outcome Measures screen will not be saved to the trial record$/, function (callback) {
        outcome.clickBackToOutcomeMeasuresList();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionC, 'verify', outTitle+' Reset Test A', timeFrame+' Reset Test A', description+' Reset Test A', optionD);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the screen will be refreshed with the data since the last save at the Outcome Measures screen$/, function (callback) {
        outcome.findOutcomeToVerifyEditCopyDelete(optionA, 'notexists', outTitle+' Reset Test B', timeFrame+' Reset Test B', description+' Reset Test B', optionB);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario:  #7 I can delete Outcome Measure for a Trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Outcome Measures screen
     When I have selected the delete check box for an outcome measure
     Then the information entered or edited on the Outcome Measures screen will not be saved to the trial record
     And the screen will be refreshed with the data since the last save the list of outcome measures screen
     When I have selected Select All
     Then the delete checkbox for all Outcome Measure is checked
     When I select Delete
     Then the information for the Outcome Measures will be deleted
     And the Outcome Measures will not be saved to the trial record
     */

    this.When(/^I have selected the delete check box for an outcome measure$/, function (callback) {
        outcome.clickAddOutcomeMeasure();
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        optionC = 'Secondary';
        outcome.selectOutcomeMeasureType(optionC);
        outcome.setTitleTxt(outTitle +' Delete Test A');
        outcome.setTimeFrameTxt(timeFrame +' Delete Test A');
        outcome.setDescriptionTxt(description +' Delete Test A');
        optionD = 'Yes';
        outcome.selectSafetyIssue(optionD);
        outcome.clickSaveOutcome();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionC, 'verify', outTitle+' Delete Test A', timeFrame+' Delete Test A', description+' Delete Test A', optionD);
        outcome.clickAddOutcomeMeasure();
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        optionA = 'Primary';
        outcome.selectOutcomeMeasureType(optionA);
        outcome.setTitleTxt(outTitle +' Delete Test B');
        outcome.setTimeFrameTxt(timeFrame +' Delete Test B');
        outcome.setDescriptionTxt(description +' Delete Test B');
        optionB = 'No';
        outcome.selectSafetyIssue(optionB);
        outcome.clickSaveOutcome();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionA, 'verify', outTitle+' Delete Test B', timeFrame+' Delete Test B', description+' Delete Test B', optionB);
        outcome.findOutcomeToVerifyEditCopyDelete(optionA, 'delete', outTitle+' Delete Test B', timeFrame+' Delete Test B', description+' Delete Test B', optionB);
        outcome.clickDeleteSelectedOutcome('yes');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the information entered or edited on the Outcome Measures screen will not be saved to the trial record$/, function (callback) {
        outcome.findOutcomeToVerifyEditCopyDelete(optionA, 'notexists', outTitle+' Delete Test B', timeFrame+' Delete Test B', description+' Delete Test B', optionB);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the screen will be refreshed with the data since the last save the list of outcome measures screen$/, function (callback) {
        outcome.clickAddOutcomeMeasure();
        leftNav.waitForElement(outcome.outcomePageTitleDetails, 'Waiting for page title element');
        outcome.checkOutcomePageTitle(pageTtitleA, 'details');
        optionA = 'Primary';
        outcome.selectOutcomeMeasureType(optionA);
        outcome.setTitleTxt(outTitle +' Delete Test C');
        outcome.setTimeFrameTxt(timeFrame +' Delete Test C');
        outcome.setDescriptionTxt(description +' Delete Test C');
        optionB = 'No';
        outcome.selectSafetyIssue(optionB);
        outcome.clickSaveOutcome();
        outcome.checkOutcomePageTitle(pageTtitle, 'list');
        outcome.findOutcomeToVerifyEditCopyDelete(optionA, 'verify', outTitle+' Delete Test C', timeFrame+' Delete Test C', description+' Delete Test C', optionB);
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected Select All$/, function (callback) {
        //utilized following method to select all
        browser.sleep(25).then(callback);
    });

    this.Then(/^the delete checkbox for all Outcome Measure is checked$/, function (callback) {
        //utilized following method to select all and checked
        browser.sleep(25).then(callback);
    });

    this.When(/^I select Delete$/, function (callback) {
        outcome.deleteAllOutcomeList('yes');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the information for the Outcome Measures will be deleted$/, function (callback) {
        outcome.verifyDeleteAllOutcomeList();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Outcome Measures will not be saved to the trial record$/, function (callback) {
        //verified the list of table does not exits on the previous steps
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #8  Title field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Outcome Measures screen
     When I am entering into Title
     Then information text appears below the title field to display the number of characters available to enter into the field.
     |255 characters left|
     When 255 characters have been entered at the title field
     Then no additional text can be entered at the title field
     */

    this.When(/^I am entering into Title$/, function (callback) {
        outcome.clickAddOutcomeMeasure();
        //Test Outcome Measure Title Characters left Test
        outcome.setTitleTxt(outTitle +' Characters left Test');
        browser.sleep(25).then(callback);
    });

    this.Then(/^information text appears below the title field to display the number of characters available to enter into the field\.$/, function (table, callback) {
        titleCharLftA = '208 characters left';
        commonFunctions.verifyTxtByIndex(outcome.characterLeftLbl, titleCharLftA, '0', 'Verifying Title field Character left message');
        browser.sleep(25).then(callback);
    });

    this.When(/^(\d+) characters have been entered at the title field$/, function (arg1, callback) {
        var v = Array(parseInt(arg1)).join('N');
        console.log('v: '+v);
        outTitle = v + 'N';
        outcome.setTitleTxt(outTitle);
        browser.sleep(25).then(callback);
    });

    this.Then(/^no additional text can be entered at the title field$/, function (callback) {
        titleCharLftA = '0 characters left';
        commonFunctions.verifyTxtByIndex(outcome.characterLeftLbl, titleCharLftA, '0', 'Verifying Title field Character left message');
        commonFunctions.alertMsgOK();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #9  Time Frame field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Outcome Measures screen
     When I am entering into Time Frame field
     Then information text appears below the Time Frame field to display the number of characters available to enter into the field.
     |254 characters left|
     When 254 characters have been entered at the time frame field
     Then no additional text can be entered at the time frame field
     */

    this.When(/^I am entering into Time Frame field$/, function (callback) {
        outcome.clickAddOutcomeMeasure();
        //Test Time Frame Characters left Test
        outcome.setTimeFrameTxt(timeFrame +' Characters left Test');
        browser.sleep(25).then(callback);
    });

    this.Then(/^information text appears below the Time Frame field to display the number of characters available to enter into the field\.$/, function (table, callback) {
        titleCharLftB = '219 characters left';
        commonFunctions.verifyTxtByIndex(outcome.characterLeftLbl, titleCharLftB, '1', 'Verifying Time Frame field Character left message');
        browser.sleep(25).then(callback);
    });

    this.When(/^(\d+) characters have been entered at the time frame field$/, function (arg1, callback) {
        var t = Array(parseInt(arg1)).join('N');
        console.log('t: '+t);
        timeFrame = t + 'N';
        outcome.setTimeFrameTxt(timeFrame);
        browser.sleep(25).then(callback);
    });

    this.Then(/^no additional text can be entered at the time frame field$/, function (callback) {
        timeCharLftA = '0 characters left';
        commonFunctions.verifyTxtByIndex(outcome.characterLeftLbl, timeCharLftA, '1', 'Verifying Time Frame field Character left message');
        commonFunctions.alertMsgOK();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario:  #10 Description field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Outcome Measures screen
     When I am entering into Description
     Then information text appears below the Detailed Description field to display the number of characters available to enter into the field.
     |1000 characters left|
     When 1000 characters have been entered at the description field
     Then no additional text can be entered at the description field
     */

    this.When(/^I am entering into Description$/, function (callback) {
        outcome.clickAddOutcomeMeasure();
        //Test Description Outcome Measure Details Characters left Test
        outcome.setDescriptionTxt(description+' Characters left Test');
        browser.sleep(25).then(callback);
    });

    this.Then(/^information text appears below the Detailed Description field to display the number of characters available to enter into the field\.$/, function (table, callback) {
        descCharLftB = '939 characters left';
        commonFunctions.verifyTxtByIndex(outcome.characterLeftLbl, descCharLftB, '2', 'Verifying Description field Character left message');
        browser.sleep(25).then(callback);
    });

    this.When(/^(\d+) characters have been entered at the description field$/, function (arg1, callback) {
        var d = Array(parseInt(arg1)).join('N');
        console.log('d: '+d);
        description = d + 'N';
        outcome.setDescriptionTxt(description);
        browser.sleep(25).then(callback);
    });

    this.Then(/^no additional text can be entered at the description field$/, function (callback) {
        descCharLftA = '0 characters left';
        commonFunctions.verifyTxtByIndex(outcome.characterLeftLbl, descCharLftA, '2', 'Verifying Description field Character left message');
        commonFunctions.alertMsgOK();
        browser.sleep(25).then(callback);
    });

};
