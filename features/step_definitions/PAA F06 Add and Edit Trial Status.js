/**
 * Author: Shamim Ahmed
 * Date: 05/10/2016
 * Feature: PAA F06 Add and Edit Trial Status.Feature
 *
 * Note: In the PAA search screen it has dependency on the seed data
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
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
    //var regDate = new regTrialDate();
    //var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchPeople = new searchPeoplePage();
    var searchTableHeader = '';
    var nciID = 'NCI-2014-00894';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1776';
    var leadProtocolIDA = 'CTRP_01_1777';
    var leadProtocolIDB = 'CTRP_01_1778';
    var leadProtocolIDC = 'CTRP_01_17'+randNmbr;
    var leadProtocolIDD = 'CTRP_01_1781';
    var leadProtocolIDE = 'CTRP_01_1782';
    var searchResultCountText = 'Trial Search Results';
    var identifierRnd = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var identifierNmbr = ''+identifierRnd+'';
    var identifierRndA = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var identifierNmbrEdited = ''+identifierRndA+'';
    var getBoardName = 'TestBoardName'+moment().format('MMMDoYY hmmss');
    var orgSearchNameA = 'Boston Medical Center';
    var orgSearchNameB = 'Boston University School Of Public Health';
    var orgSearchNameC = 'National Cancer Institute';
    var orgSearchNameD = 'ZZZ test org for test accounts';
    var personFNmA = 'Alessandra';
    var personLNmA = 'Ferrajol';
    var personFNmB = 'Kristi';
    var personLNmB = 'Graves';
    var personFNmC = 'Diane';
    var personLNmC = 'Roulston';
    var optionA = '';
    var optionB = '';
    var optionC = '';
    var optionD = '';
    var optionE = '';
    var optionF = '';
    var optionG = '';
    var optionH = '';
    var optionI = '';
    var tblOptionA = '';
    var tblOptionB = '';
    var tblOptionC = '';
    var tblOptionD = '';
    var tblOptionE = '';
    var tblOptionF = '';
    var tblOptionG = '';
    var tblOptionH = '';
    var tblOptionI = '';
    var tblOptionJ = '';
    var tblOptionK = '';
    var currentDate = '';
    var futureDate = '';
    var futureDateTwoMonth = '';
    var pastDate = '';
    var replacePastDate = '';
    var replacePrimaryDate = '';
    var replaceCompletionDate = '';
    var hlodReasonA = '';

    /*
     Scenario: #1 I can enter a trial status and trial status date for a trial
     */
    this.Given(/^I am on the Trial Status Screen$/, function (callback) {
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolID);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialStatus();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected a trial$/, function (callback) {
        trialCollaborators.waitForElement(trialStatus.statuesesStatusDate , "Trial Status Screen");
        browser.sleep(25).then(callback);
    });


    this.Given(/^I have selected a trial status from the list of:$/, function (table, callback) {
        tableValues = table.raw();
        var strVal = '';
        strVal = tableValues.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + strVal +']');
        var tableDataSplt = strVal.toString().split("\n");
        tblOptionB = tableDataSplt[1];
        trialStatus.selectStatus(tblOptionB);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered or selected a Current Trial Status Date$/, function (callback) {
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplit = currentDate.toString().split("-");
        crtnDateDay = dateSplit[0];
        crntDateMonth = dateSplit[1];
        crntDateYear = dateSplit[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.clickAddTrialStatus();
        trialStatus.verifyTrialStatusTblHdr();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered or selected a Trial Start Date$/, function (callback) {
        pastDate = trialDoc.getPastDate();
        console.log('future date: '+futureDate);
        var dateSplit = pastDate.toString().split("-");
        pstDateDay = dateSplit[0];
        pstDateMonth = dateSplit[1];
        pstDateYear = dateSplit[2];
        trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the Trial Start Date Type of "([^"]*)" , "([^"]*)"$/, function (arg1, arg2, callback) {
        console.log('Trial Start Date Type selected as: '+arg1);
        //Selected the Date type on the previous step
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered or selected a Primary Completion Date$/, function (callback) {
        futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
        console.log('Next two month ahead future date: '+futureDateTwoMonth);
        var dateSplit = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplit[0];
        futrDateMonth = dateSplit[1];
        futrDateYear = dateSplit[2];
        trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the Primary Completion Date Type of "([^"]*)" , "([^"]*)", "([^"]*)"$/, function (arg1, arg2, arg3, callback) {
        console.log('Primary Completion Date Type selected as: '+arg2);
        //Selected the Date type on the previous step
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered or selected a Completion Date$/, function (callback) {
        var dateSplit = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplit[0];
        futrDateMonth = dateSplit[1];
        futrDateYear = dateSplit[2];
        trialStatus.setCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the Completion Date Type of "([^"]*)" , "([^"]*)"$/, function (arg1, arg2, callback) {
        console.log('Completion Date Type selected as: '+arg2);
        //Selected the Date type on the previous step
        replacePastDate = trialDoc.replaceMonth(pastDate);
        replacePrimaryDate = trialDoc.replaceMonth(futureDateTwoMonth);
        replaceCompletionDate = trialDoc.replaceMonth(futureDateTwoMonth);
        trialStatus.verifyTrialDates ('all', replacePastDate, 'Actual', replacePrimaryDate, 'Anticipated', replaceCompletionDate, 'Anticipated');
        browser.sleep(25).then(callback);
    });

    this.Given(/^have entered or edited the Trial On Hold Reason Comments when the trial status is:$/, function (table, callback) {
        //To edit trial status utilizing trial status from (I have selected a trial status from the list of)steps
        trialStatus.findTrialStatusVerfEdtDel(tblOptionB, 'edit', '');
        var holdReasonTableValues = table.raw();
        var strValHoldReason = '';
        strValHoldReason = holdReasonTableValues.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + strValHoldReason +']');
        var hldRsnTableDataSplt = strValHoldReason.toString().split("\n");
        hlodReasonA = hldRsnTableDataSplt[0];
        hlodReasonB = hldRsnTableDataSplt[1];
        hlodReasonC = hldRsnTableDataSplt[2];
        hlodReasonD = hldRsnTableDataSplt[3];
        /* Table Reference
         |Administratively Complete|
         |Withdrawn|
         |Temporarily Closed to Accrual|
         |Temporarily Closed to Accrual and Intervention|
         */
        trialStatus.selectStatus(hlodReasonA);
        trialStatus.setStatusComment('Status Comment due to: '+ hlodReasonA + '');
        trialStatus.setWhyStudyStopped('Why Study Stopped: '+ hlodReasonA + '');
        trialStatus.clickEditTrialStatusConfirm();
        trialStatus.findTrialStatusVerfEdtDel(hlodReasonA, 'verify', '');
        browser.sleep(2500).then(callback);
    });

    this.Given(/^have entered or edited the Trial Status Comments$/, function (callback) {
        trialStatus.setTrialComments('Trial Status Comment '+currentDate+'');
        browser.sleep(25).then(callback);
    });

    this.Given(/^have entered or edited the Additional Comments$/, function (callback) {
        trialStatus.setTrialComments('Trial Status Comment '+futureDate+'');
        browser.sleep(25).then(callback);
    });

    this.When(/^I select Save$/, function (callback) {
        trialStatus.clickSave();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the trial status and dates will be checked against validation rules and associated with the trial$/, function (callback) {
        trialStatus.verifyTrialDates ('all', replacePastDate, 'Actual', replacePrimaryDate, 'Anticipated', replaceCompletionDate, 'Anticipated');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the trial status and date will be displayed as trial status history with any errors or warnings from the Trial Status Transition Rules$/, function (callback) {
        var expectedErrWarnings = 'ERROR: Invalid Transition';
        trialStatus.findTrialStatusVerfEdtDel(hlodReasonA, 'verifyErrors', expectedErrWarnings);
        browser.sleep(25).then(callback);
    });






};
