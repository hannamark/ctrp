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
//Collaborators
var abstractionCollaborators = require('../support/abstractionTrialCollaborators');
//General Trial Details
var abstractionTrialDetails = require('../support/abstractionTrialDetails');
//Regulatory Information - FDAAA
var abstractionRegulatoryInfoFDAA = require('../support/abstractionRegulatoryInfo');
//Trial Related Document
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
//Participating Site
var abstractionParticipatingSite = require('../support/abstractionParticipating');
//Trial Status
var abstractionTrialStatus = require('../support/abstractionTrailStatuses');
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

    var login = new loginPage();
    var helper = new helperMethods();
    var projectFunctions = new projectFunctionMethods();
    var commonFunctions = new abstractionCommonMethods();
    var pageMenu = new abstractionPageMenu();
    var pageSearchTrail = new abstractionTrialSearchPage();
    var nciSpecific = new abstractionNCISpecific();
    var indIDE = new abstractionRegulatoryINDIDE();
    var humanSafety = new abstractionRegulatoryHuman();
    var trialCollaborators = new abstractionCollaborators();
    var trialDetails = new abstractionTrialDetails();
    var fdaaa = new abstractionRegulatoryInfoFDAA();
    var trialDoc = new abstractionTrialRelatedDocument();
    var participatingSite = new abstractionParticipatingSite();
    var trialStatus = new abstractionTrialStatus();
    var leftNav = new abstractionLeftNavigationMenus();
    var trialDesc = new scientificTrialDesc();
    var outcome = new scientificOutcome();
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchPeople = new searchPeoplePage();
    var searchTableHeader = '';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
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
    var lngTitle = 'Test Title Multi-Dose Phase II Trial of Rosuvastatin to Lower Circulating Tissue Factor Bearing Microparticles in Metastatic Breast Cancer title';
    var charLftStr = 'Test Brief Title Multi-Dose Phase II Trial of Rosuvastatin to Lower Circulating Tissue Factor verify';
    var decrCharLft = '4982 characters left';
    var decrCharLftObjective = '31985 characters left';
    var decrCharLftObjectiveA = '27000 characters left';
    var decrCharLftDetail = '31975 characters left';
    var decrCharLftDetailA = '27000 characters left';
    var noCharLft = '0 characters left';
    var errorMSGBT = 'Brief Title is Required';
    var errorMSGBS = 'Summary is Required';

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
            optionC = '- Please select a  outcome-measure type...';
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
            commonFunctions.verifyTxtByIndex(outcome.requiredMsg, 'Outcome Measure Type is Required', '0', 'Verifying Outcome Measure Type is Required');
        } else if(FieldError === 'Title is Required'){

        } else if(FieldError === 'Time Frame is Required'){

        } else if(FieldError === 'Safety Issue is Required'){

        }
        browser.sleep(25).then(callback);
    });




};
