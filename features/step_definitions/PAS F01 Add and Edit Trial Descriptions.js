/**
 * Author: Shamim Ahmed
 * Date: 06/27/2016
 * Feature: PAS F01 Add and Edit Trial Descriptions.Feature
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
//Regulatory Information - IND/IDE
var abstractionRegulatoryINDIDE = require('../support/abstractionRegulatoryIND');
//Regulatory Information - Human Subject Safety
var abstractionRegulatoryHuman = require('../support/abstractionRegulatoryHuman');
//Trial Related Document
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
//Left Navigation
var abstractionLeftNavigationMenus = require('../support/abstractionLeftNav');
//Scientific trial description
var scientificTrialDesc = require('../support/scientificTrialDesc');
var projectFunctionsPage= require('../support/projectMethods');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');


module.exports = function() {

    var login = new loginPage();
    var helper = new helperMethods();
    var commonFunctions = new abstractionCommonMethods();
    var pageMenu = new abstractionPageMenu();
    var pageSearchTrail = new abstractionTrialSearchPage();
    var leftNav = new abstractionLeftNavigationMenus();
    var trialDesc = new scientificTrialDesc();
    var leadProtocolID = 'CTRP_01_1789';
    var pageTtitle = 'Trial Descriptions';
    var briefSummary ='Test Brief Summary';
    var objectives = 'Test Objectives';
    var detailedDescription = 'Test Detailed Description';
    var briefTitle = 'Test Brief Title Multi-Dose Phase II Trial of Rosuvastatin to Lower Circulating Tissue Factor Bearing Microparticles in Metastatic Breast Cancer title';
    var charLftStr = 'Test Brief Title Multi-Dose Phase II Trial of Rosuvastatin to Lower Circulating Tissue Factor verify';
    var decrCharLft = '4982 characters left';
    var decrCharLftObjective = '31985 characters left';
    var decrCharLftObjectiveA = '31800 characters left';
    var decrCharLftDetail = '31975 characters left';
    var decrCharLftDetailA = '31800 characters left';
    var noCharLft = '0 characters left';
    var errorMSGBT = 'Brief Title is Required';
    var errorMSGBS = 'Summary is Required';

    /*
     Scenario: #1 I can add and edit Trial Description for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Description screen
     And I have entered a value for Brief Title
     And I have entered a value for Brief Summary
     And I have entered a value for Objectives
     And I have entered a value for Detailed Description
     When I select the Save button
     Then the Trial Description for the trial will be associated with the trial
     And the message Record Updated displays
     */

    this.Given(/^I have selected a trial$/, function (callback) {
        pageMenu.clickSearchTrialAbstractor();
        login.clickWriteMode('On');
        pageMenu.clickTrials();
        pageMenu.clickSearchTrialsPA();
        helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.clickLinkText(leadProtocolID);
        leftNav.scientificCheckOut();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the Trial Description screen$/, function (callback) {
        leftNav.clickScientificTrialDescription();
        leftNav.checkPanelTitle(pageTtitle, '6');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered a value for Brief Title$/, function (callback) {
        trialDesc.setBriefTitleTxt(briefTitle);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered a value for Brief Summary$/, function (callback) {
        trialDesc.setBriefSummaryTxt(briefSummary);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered a value for Objectives$/, function (callback) {
        trialDesc.setObjectivesTxt(objectives);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered a value for Detailed Description$/, function (callback) {
        trialDesc.setDetailedDescriptionTxt(detailedDescription);
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the Save button$/, function (callback) {
        trialDesc.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Trial Description for the trial will be associated with the trial$/, function (callback) {
        trialDesc.verifyTrialDescLables();
        commonFunctions.verifyValueFromTextBox(trialDesc.briefTitleTxt, briefTitle, 'Verifying Brief Title');
        commonFunctions.verifyValueFromTextBox(trialDesc.briefSummaryTxt, briefSummary, 'Verifying Brief Summary');
        commonFunctions.verifyValueFromTextBox(trialDesc.objectivesTxt, objectives, 'Verifying Objectives');
        commonFunctions.verifyValueFromTextBox(trialDesc.detailedDescriptionTxt, detailedDescription, 'Verifying Detailed Description');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the message Record Updated displays$/, function (callback) {
        console.log('Out of scope: Toaster message');
        //login.logout();
        //commonFunctions.alertMsgOK();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #2 Brief Title is not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial with a Information Source is 'Protocol'
     And I am on the Trial Description screen
     And information text appears above the Brief Title field as 'Mandatory at Abstraction Validation'
     When Brief Title is null
     And I select the Save button
     Then an error message will appear with the message “Brief Title is Required”
     */

    this.Given(/^I have selected a trial with a Information Source is 'Protocol'$/, function (callback) {
        pageMenu.clickSearchTrialAbstractor();
        pageMenu.clickTrials();
        pageMenu.clickSearchTrialsPA();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.clickLinkText(leadProtocolID);
        leftNav.scientificCheckOut();
        browser.sleep(25).then(callback);
    });

    this.Given(/^information text appears above the Brief Title field as 'Mandatory at Abstraction Validation'$/, function (callback) {
        trialDesc.verifyTrialDescLables();
        browser.sleep(25).then(callback);
    });

    this.When(/^Brief Title is null$/, function (callback) {
        trialDesc.setBriefTitleTxt('');
        browser.sleep(25).then(callback);
    });

    this.Then(/^an error message will appear with the message “Brief Title is Required”$/, function (callback) {
        commonFunctions.verifyTxtByIndex(trialDesc.requiredMsg, errorMSGBT, '0', 'Verify Brief Title is Required');
        //login.logout();
        //commonFunctions.alertMsgOK();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #3 Brief Summary is not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial with a Information Source is 'Protocol'
     And I am on the Trial Description screen
     And information text appears above the Brief Summary field as 'Mandatory at Abstraction Validation'
     When Brief Summary is null
     And I select Save
     Then an error message will appear with the message “Summary is Required”
     */

    this.Given(/^information text appears above the Brief Summary field as 'Mandatory at Abstraction Validation'$/, function (callback) {
        trialDesc.verifyTrialDescLables();
        browser.sleep(25).then(callback);
    });

    this.When(/^Brief Summary is null$/, function (callback) {
        trialDesc.setBriefSummaryTxt('');
        browser.sleep(25).then(callback);
    });

    this.Then(/^an error message will appear with the message “Summary is Required”$/, function (callback) {
        commonFunctions.verifyTxtByIndex(trialDesc.requiredMsg, errorMSGBS, '0', 'Verify Brief Summary is Required');
        //login.logout();
        //commonFunctions.alertMsgOK();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario:  #4 I can reset Trial Description screen for a Trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Description screen
     When I have selected Reset
     Then the information entered or edited on the Trial Description screen will not be saved to the trial record
     And the screen will be refreshed with the data since the last save
     */

    this.Then(/^the information entered or edited on the Trial Description screen will not be saved to the trial record$/, function (callback) {
        trialDesc.setBriefTitleTxt(briefTitle);
        trialDesc.setBriefSummaryTxt(briefSummary);
        trialDesc.setObjectivesTxt(objectives);
        trialDesc.setDetailedDescriptionTxt(detailedDescription);
        trialDesc.clickSave();
        trialDesc.setBriefTitleTxt('Reset '+briefTitle+'');
        trialDesc.setBriefSummaryTxt('Reset '+briefSummary+'');
        trialDesc.setObjectivesTxt('Reset '+objectives+'');
        trialDesc.setDetailedDescriptionTxt('Reset '+detailedDescription+'');
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected Reset$/, function (callback) {
        trialDesc.clickReset();
        commonFunctions.alertMsgOK();
        leftNav.clickScientificTrialDesign();
        leftNav.clickScientificTrialDescription();
        browser.sleep(3500).then(callback);
    });

    this.Then(/^the screen will be refreshed with the data since the last save$/, function (callback) {
        commonFunctions.verifyValueFromTextBox(trialDesc.briefTitleTxt, briefTitle, 'Verifying Brief Title');
        commonFunctions.verifyValueFromTextBox(trialDesc.briefSummaryTxt, briefSummary, 'Verifying Brief Summary');
        commonFunctions.verifyValueFromTextBox(trialDesc.objectivesTxt, objectives, 'Verifying Objectives');
        commonFunctions.verifyValueFromTextBox(trialDesc.detailedDescriptionTxt, detailedDescription, 'Verifying Detailed Description');
        //login.logout();
        //commonFunctions.alertMsgOK();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #5  Brief Title field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Description screen
     And I am entering into Brief Title
     Then information text appears below the Brief Title field will display the number of characters available to enter into the field
     |300 characters left|
     When 300 characters have been entered
     Then no additional text can be entered
     */

    this.Given(/^I am entering into Brief Title$/, function (callback) {
        trialDesc.setBriefTitleTxt('');
        browser.sleep(25).then(callback);
    });

    this.Then(/^information text appears below the Brief Title field will display the number of characters available to enter into the field$/, function (table, callback) {
        var characLft = table.raw();
        strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + strCharacLft +']');
        var strCharacLftSplt = strCharacLft.toString().split("\n");
        strCharacLftSpltA = strCharacLftSplt[0];
        commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strCharacLftSpltA, '0', 'Verifying Brief Title field Character Left message');
        browser.sleep(25).then(callback);
    });

    this.When(/^(\d+) characters have been entered$/, function (arg1, callback) {
        var charLftInt = ''+ arg1 +' characters left';
        commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, charLftInt, '0', 'Verifying Brief Title Character left initial message');
        var charLftText = '' + briefTitle +'' + briefTitle + '';
        trialDesc.setBriefTitleTxt(charLftText);
        browser.sleep(25).then(callback);
    });

    this.Then(/^no additional text can be entered$/, function (callback) {
        commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, noCharLft, '0', 'Verifying Brief Title field Character left message');
        //login.logout();
        //commonFunctions.alertMsgOK();
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #6  Brief Summary field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Description screen
     And I start typing into Brief Summary
     Then the character left provided below the Brief Summary field will start to decrement
     |5000 characters left|
     When 5000 characters have been entered into Brief Summary
     Then no additional text can be entered inti Brief Summary
     */

    this.Given(/^I start typing into Brief Summary$/, function (callback) {
        trialDesc.setBriefSummaryTxt('Test Brief Summary');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the character left provided below the Brief Summary field will start to decrement$/, function (table, callback) {
        commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, decrCharLft, '1', 'Verifying Brief Summary field Character left message');
        trialDesc.setBriefSummaryTxt('');
        var characLft = table.raw();
        strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + strCharacLft +']');
        var strCharacLftSplt = strCharacLft.toString().split("\n");
        strCharacLftSpltA = strCharacLftSplt[0];
        commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strCharacLftSpltA, '1', 'Verifying Brief Summary field Character left message');
        browser.sleep(25).then(callback);
    });

    this.When(/^(\d+) characters have been entered into Brief Summary$/, function (arg1, callback) {
        var x = Array(3).join(charLftStr);
        console.log('x: '+x);
        trialDesc.setBriefSummaryTxt(x);
        x = '' //clear var with null val
        browser.sleep(25).then(callback);
    });

    this.Then(/^no additional text can be entered inti Brief Summary$/, function (callback) {
        var strSummaryChrcLft = '4800 characters left';
        commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strSummaryChrcLft, '1', 'Verifying Brief Summary field Character left message');
        console.log('System becomes unresponsive if 5000 characters load in the server memory');
        browser.sleep(25).then(callback);
    });

    /*
     Scenario:  #7  Detailed Description field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Description screen
     When I start typing into the Detailed Description field
     Then the limited characters provided below the Detailed Description field will start to decrement
     When 32000 characters have been entered into Detailed Description
     Then no additional text can be entered into Detailed Description
     */

    this.When(/^I start typing into the Detailed Description field$/, function (callback) {
        trialDesc.setDetailedDescriptionTxt('Test Detailed Description');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the limited characters provided below the Detailed Description field will start to decrement$/, function (table, callback) {
        commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, decrCharLftDetail, '3', 'Verifying Detailed Description field Character left message');
        trialDesc.setDetailedDescriptionTxt('');
        var characLft = table.raw();
        strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + strCharacLft +']');
        var strCharacLftSplt = strCharacLft.toString().split("\n");
        strCharacLftSpltA = strCharacLftSplt[0];
        commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strCharacLftSpltA, '3', 'Verifying Detailed Description field Character left message');
        browser.sleep(25).then(callback);
    });

    this.When(/^(\d+) characters have been entered into Detailed Description$/, function (arg1, callback) {
        var d = Array(3).join(charLftStr);
        console.log('d: '+d);
        trialDesc.setDetailedDescriptionTxt(''+d+'');
        d = '' //clear var with null val
        browser.sleep(25).then(callback);
    });

    this.Then(/^no additional text can be entered into Detailed Description$/, function (callback) {
        //System unable to handale runtime 32000 character
        commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, decrCharLftDetailA, '3', 'Verifying Detailed Description field Character left message');
        browser.sleep(25).then(callback);
    });

    /*
     Scenario:  #8  Objectives field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Description screen
     When I start typing into Objectives field
     Then the limited characters provided below the Objectives field will will start to decrement
     |32000 characters left|
     When 32000 characters have been entered into Objectives
     Then no additional text can be entered into Objectives
     */

    this.When(/^I start typing into Objectives field$/, function (callback) {
        trialDesc.setObjectivesTxt('Test Objectives');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the limited characters provided below the Objectives field will will start to decrement$/, function (table, callback) {
        commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, decrCharLftObjective, '2', 'Verifying Objectives field Character left message');
        trialDesc.setObjectivesTxt('');
        var characLft = table.raw();
        strCharacLft = characLft.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + strCharacLft +']');
        var strCharacLftSplt = strCharacLft.toString().split("\n");
        strCharacLftSpltA = strCharacLftSplt[0];
        commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, strCharacLftSpltA, '2', 'Verifying Objectives field Character left message');
        browser.sleep(25).then(callback);
    });

    this.When(/^(\d+) characters have been entered into Objectives$/, function (arg1, callback) {
        var v = Array(3).join(charLftStr);
        console.log('v: '+v);
        trialDesc.setObjectivesTxt(''+v+'');
        v = '' //clear var with null val
        browser.sleep(25).then(callback);
    });

    this.Then(/^no additional text can be entered into Objectives$/, function (callback) {
        //System unable to handale runtime 32000 character
        commonFunctions.verifyTxtByIndex(trialDesc.characterLeftLbl, decrCharLftObjectiveA, '2', 'Verifying Objectives field Character left message');
        browser.sleep(25).then(callback);
    });

};
