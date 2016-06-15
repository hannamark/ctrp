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
    var hlodReasonC = '';
    var transRlsLink = '';
    var dateRlsLink = '';

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

    /*
     Scenario: #2 I can enter a trial status and invalid trial status date for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Given I have selected trail
     And I have selected a trial status
     And I have entered or selected a Current Trial Status Date
     And I have entered or selected a Trial Start Date
     And I have selected the Trial Start Date Type of "Actual" , "Anticipated"
     And I have entered or selected a Primary Completion Date
     And I have selected the Primary Completion Date Type of "Actual" , "Anticipated", "NA"
     And I have entered or selected a Completion Date
     And I have selected the Completion Date Type of "Actual" , "Anticipated"
     And have entered or edited the Trial Status Comments
     And have entered or edited the Trial On Hold Reason Comments with the trial status is:
     |Administratively Complete|
     |Withdrawn|
     |Temporarily Closed to Accrual|
     |Temporarily Closed to Accrual and Intervention|
     And have entered or edited the any Additional Trial Status Comments
     When I select Save
     Then the trial status and dates will be checked against validation rules and associated with the trial
     And a warning will be displayed for the incorrect status transitions, dates and date types
     */

    this.Given(/^I have selected trail$/, function (callback) {
        trialStatus.clickBackToSearchResults();
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDB);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDB);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialStatus();
        trialCollaborators.waitForElement(trialStatus.statuesesStatusDate , "Trial Status Screen");
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected a trial status$/, function (callback) {
        tblOptionB = 'Temporarily Closed to Accrual and Intervention';
        trialStatus.selectStatus(tblOptionB);
        browser.sleep(25).then(callback);
    });

    this.Given(/^have entered or edited the Trial On Hold Reason Comments with the trial status is:$/, function (table, callback) {
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
        trialStatus.selectStatus(hlodReasonC);
        trialStatus.setStatusComment('Status Comment due to: '+ hlodReasonC + '');
        trialStatus.setWhyStudyStopped('Why Study Stopped: '+ hlodReasonC + '');
        trialStatus.clickEditTrialStatusConfirm();
        trialStatus.findTrialStatusVerfEdtDel(hlodReasonC, 'verify', '');
        browser.sleep(2500).then(callback);
    });

    this.Given(/^have entered or edited the any Additional Trial Status Comments$/, function (callback) {
        trialStatus.setTrialComments('Additional Trial Status Comment '+futureDate+'');
        browser.sleep(25).then(callback);
    });

    this.Then(/^a warning will be displayed for the incorrect status transitions, dates and date types$/, function (callback) {
        var expectedErrWarnings = 'ERROR: Invalid Transition';
        trialStatus.findTrialStatusVerfEdtDel(hlodReasonC, 'verifyErrors', expectedErrWarnings);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #3 Cancel Trial Status
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status screen
     When I select Reset at the trial status screen
     Then the information entered or edited on the Trial Status screen will not be saved to the trial record
     And the screen will be refreshed with the existing data trial status data
     */

    this.Given(/^I am on the Trial Status screen$/, function (callback) {
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDD);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialStatus();
        browser.sleep(25).then(callback);
    });

    this.When(/^I select Reset at the trial status screen$/, function (callback) {
        tblOptionC = 'Temporarily Closed to Accrual';
        trialStatus.selectStatus(tblOptionC);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.clickAddTrialStatus();
        trialStatus.verifyTrialStatusTblHdr();

        pastDate = trialDoc.getPastDate();
        console.log('future date: '+futureDate);
        var dateSplitB = pastDate.toString().split("-");
        pstDateDay = dateSplitB[0];
        pstDateMonth = dateSplitB[1];
        pstDateYear = dateSplitB[2];
        trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');

        futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
        console.log('Next two month ahead future date: '+futureDateTwoMonth);
        var dateSplitC = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplitC[0];
        futrDateMonth = dateSplitC[1];
        futrDateYear = dateSplitC[2];
        trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');

        var dateSplitD = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplitD[0];
        futrDateMonth = dateSplitD[1];
        futrDateYear = dateSplitD[2];
        trialStatus.setCompletionDate(futrDateYear, futrDateMonth, futrDateDay, 'Anticipated');

        trialStatus.clickSave();

        trialStatus.findTrialStatusVerfEdtDel(tblOptionC, 'verify', '');
        tblOptionD = 'Temporarily Closed to Accrual and Intervention';
        trialStatus.selectStatus(tblOptionD);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitE = currentDate.toString().split("-");
        crtnDateDay = dateSplitE[0];
        crntDateMonth = dateSplitE[1];
        crntDateYear = dateSplitE[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.clickAddTrialStatus();
        trialStatus.verifyTrialStatusTblHdr();

        trialStatus.clickReset();

        browser.sleep(2500).then(callback);
    });

    this.Then(/^the information entered or edited on the Trial Status screen will not be saved to the trial record$/, function (callback) {
        trialStatus.findTrialStatusVerfEdtDel(tblOptionD, 'notExists', '');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the screen will be refreshed with the existing data trial status data$/, function (callback) {
        trialStatus.findTrialStatusVerfEdtDel(tblOptionC, 'verify', '');
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #4 PA Trial Status Transition Rules
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And I can view the Trial Status Transition Rules Information text "Please refer to the Trial Status Transition Rules:" displayed in the Trial Statuses section below the Trial Statuses Table
     When I have clicked on the Trial Status Transition Rules text
     And Trial Status Transition Rules is a Web Link "https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Transition+Rules"
     Then the Trial Status Transition Rules user guide page will be displayed
     */

    this.Given(/^I can view the Trial Status Transition Rules Information text "([^"]*)" displayed in the Trial Statuses section below the Trial Statuses Table$/, function (arg1, callback) {
        trialStatus.verifyTransitionRulesRef(arg1, '1');
        browser.sleep(25).then(callback);
    });

    this.When(/^Trial Status Transition Rules is a Web Link "([^"]*)"$/, function (arg1, callback) {
        trialStatus.verifyTransitionRulesRef(arg1, '2');
        transRlsLink = ''+arg1+'';
        browser.sleep(25).then(callback);
    });

    this.When(/^I have clicked on the Trial Status Transition Rules text$/, function (callback) {
        commonFunctions.clickLinkText(transRlsLink);
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the Trial Status Transition Rules user guide page will be displayed$/, function (callback) {
        var wikiPageTitle = 'Trial Status Transition Rules';
        trialStatus.verifyWikiTitle(wikiPageTitle);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #5 PA Trial Status Rules for Start and Completion Dates Rules
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     And I can view the Trial Status Rules for Start and Completion DatesRules Information text "Please refer to the Trial Status Rules for Start and Completion Dates Rules:" displayed in the Trial Dates section
     And the Trial Status Rules for Start and Completion Dates Rules is a Web Link "https://wiki.nci.nih.gov/display/CTRP/Trial+Status+Rules+for+Start+and+Completion+Dates"
     When I have clicked on the Trial Status Rules for Start and Completion Dates text
     Then the Trial Status Rules for Start and Completion Dates Rules user guide page will be displayed
     */

    this.Given(/^I can view the Trial Status Rules for Start and Completion DatesRules Information text "([^"]*)" displayed in the Trial Dates section$/, function (arg1, callback) {
        trialStatus.verifyDatesRulesRef(arg1, '1');
        browser.sleep(25).then(callback);
    });

    this.Given(/^the Trial Status Rules for Start and Completion Dates Rules is a Web Link "([^"]*)"$/, function (arg1, callback) {
        trialStatus.verifyDatesRulesRef(arg1, '2');
        dateRlsLink = ''+arg1+'';
        browser.sleep(25).then(callback);
    });

    this.When(/^I have clicked on the Trial Status Rules for Start and Completion Dates text$/, function (callback) {
        commonFunctions.clickLinkText(dateRlsLink);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Trial Status Rules for Start and Completion Dates Rules user guide page will be displayed$/, function (callback) {
        var wikiPageTitle = 'Trial Status Rules for Start and Completion Dates';
        trialStatus.verifyWikiTitle(wikiPageTitle);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #6 PA Trial Status Comments (Why Study Stopped?)
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Then the information list appears below the Why Study Stopped?
     |Administratively Complete,Withdrawn,Temporarily Closed to Accrual,Temporarily Closed to Accrual and Intervention|
     */

    this.Then(/^the information list appears below the Why Study Stopped\?$/, function (table, callback) {
        var whyStpdTableValues = table.raw();
        var strValHoldReason = '';
        strValHoldReason = whyStpdTableValues.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + strValHoldReason +']');
        var hldRsnTableDataSplt = strValHoldReason.toString().split("\n");
        whyStpA = hldRsnTableDataSplt[0];
        whyStpB = hldRsnTableDataSplt[1];
        whyStpC = hldRsnTableDataSplt[2];
        whyStpD = hldRsnTableDataSplt[3];
        trialStatus.selectStatus(whyStpA);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.setStatusComment('Status Comment due to: '+ whyStpA + '');
        trialStatus.setWhyStudyStopped('Why Study Stopped: '+ whyStpA + '');
        helper.wait_for(300);
        trialStatus.selectStatus(whyStpB);
        trialStatus.setStatusComment('Status Comment due to: '+ whyStpB + '');
        trialStatus.setWhyStudyStopped('Why Study Stopped: '+ whyStpB + '');
        helper.wait_for(300);
        trialStatus.selectStatus(whyStpC);
        trialStatus.setStatusComment('Status Comment due to: '+ whyStpC + '');
        trialStatus.setWhyStudyStopped('Why Study Stopped: '+ whyStpC + '');
        helper.wait_for(300);
        trialStatus.selectStatus(whyStpD);
        trialStatus.setStatusComment('Status Comment due to: '+ whyStpD + '');
        trialStatus.setWhyStudyStopped('Why Study Stopped: '+ whyStpD + '');
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #7 PA Trial Status Comments (Trial Status Values)
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Then the information text appears below for each Trial Status when it is selected:
     |In Review - The trial is in development and waiting for final approval.|
     |Approved - Trial has been approved.|
     |Active - The trial is open for Accrual.|
     |Temporarily Closed to Accrual - Trial is temporarily not accruing.|
     |Temporarily Closed to Accrual and Intervention - Trial has been closed to participant accrual. No participants are receiving treatment/intervention, but participants are still being followed according to the primary objectives of the study.|
     |Closed to Accrual - Trial has been closed to participant accrual. Participants are still receiving treatment/intervention.|
     |Closed to Accrual and Intervention - Trial is temporarily not accruing. Participants are not receiving intervention.|
     |Complete - Trial has been closed to accrual; participants have completed treatment/intervention, and the study has met its primary objectives.|
     |Administratively Complete - Trial has been completed prematurely (for example, due to poor accrual, insufficient drug supply, IND closure, etc.)|
     |Withdrawn - Trial has been withdrawn from development and review.|
     |Available - Currently available for this treatment|
     |No longer available - Was available for this treatment previously but is not currently available and will not be available in the future|
     |Temporarily not available - Not currently available for this treatment, but is expected to be available in the future|
     |Approved for marketing - Treatment has been approved for sale to the public.|
     */

    this.Then(/^the information text appears below for each Trial Status when it is selected:$/, function (table, callback) {
        var statusTxtTableValues = table.raw();
        txtA = statusTxtTableValues[0];
        txtB = statusTxtTableValues[1];
        txtC = statusTxtTableValues[2];
        txtD = statusTxtTableValues[3];
        txtE = statusTxtTableValues[4];
        txtF = statusTxtTableValues[5];
        txtG = statusTxtTableValues[6];
        txtH = statusTxtTableValues[7];
        txtI = statusTxtTableValues[8];
        txtJ = statusTxtTableValues[9];
        var txtAStts = txtA.toString().split(" - ");
        var txtBStts = txtB.toString().split(" - ");
        var txtCStts = txtC.toString().split(" - ");
        var txtDStts = txtD.toString().split(" - ");
        var txtEStts = txtE.toString().split(" - ");
        var txtFStts = txtF.toString().split(" - ");
        var txtGStts = txtG.toString().split(" - ");
        var txtHStts = txtH.toString().split(" - ");
        var txtIStts = txtI.toString().split(" - ");
        var txtJStts = txtJ.toString().split(" - ");
        console.log('txtAStts'+txtAStts[0]);
        var trialStatusPageBody = trialStatus.trialStatusPage;
        trialStatus.selectStatus(txtAStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtAStts[1]);
        trialStatus.selectStatus(txtBStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtBStts[1]);
        trialStatus.selectStatus(txtCStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtCStts[1]);
        trialStatus.selectStatus(txtDStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtDStts[1]);
        trialStatus.selectStatus(txtEStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtEStts[1]);
        trialStatus.selectStatus(txtFStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtFStts[1]);
        trialStatus.selectStatus(txtGStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtGStts[1]);
        trialStatus.selectStatus(txtHStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtHStts[1]);
        trialStatus.selectStatus(txtIStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtIStts[1]);
        trialStatus.selectStatus(txtJStts[0]);
        expect(trialStatusPageBody.getText()).to.eventually.contain(txtJStts[1]);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #8 PA Trial Status Why Study Stopped? field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Then information text appears below the Why Study Stopped? field to display the number of characters available to enter into the field.
     |160 characters left|
     */

    this.Then(/^information text appears below the Why Study Stopped\? field to display the number of characters available to enter into the field\.$/, function (table, callback) {
        var expChaLeft = '132 characters left';
        var actChaLeft = 'Comment characters left test';
        var cmntCharaLftTableValues = table.raw();
        txtA = cmntCharaLftTableValues[0];
        console.log('Comment Total Characters Left Checkpoint: '+txtA);
        tblOptionC = 'Temporarily Closed to Accrual';
        trialStatus.selectStatus(tblOptionC);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.setStatusComment(actChaLeft);
        helper.wait_for(300);
        var commentCharLft = trialStatus.commentCharaLeft;
        expect(commentCharLft.getText()).to.eventually.contain(expChaLeft);
        //trialStatus.setWhyStudyStopped('Why Study Stopped: '+ whyStpA + '');
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #9 PA Trial Status Comments field character count
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Then information text appears below the Comments field to display the number of characters available to enter into the field.
     |160 characters left|
     */

    this.Then(/^information text appears below the Comments field to display the number of characters available to enter into the field\.$/, function (table, callback) {
        var expChaLeft = '122 characters left';
        var actChaLeft = 'Why Study Stopped characters left test';
        var whyCharaLftTableValues = table.raw();
        txtA = whyCharaLftTableValues[0];
        console.log('Why Study Stopped Total Characters Left Checkpoint: '+txtA);
        tblOptionC = 'Temporarily Closed to Accrual';
        trialStatus.selectStatus(tblOptionC);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.setWhyStudyStopped(actChaLeft);
        helper.wait_for(300);
        var commentCharLft = trialStatus.whyStdyCharaLeft;
        expect(commentCharLft.getText()).to.eventually.contain(expChaLeft);
        //trialStatus.setWhyStudyStopped('Why Study Stopped: '+ whyStpA + '');
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #10 I can not enter an invalid trial status for a non-expanded access trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Given I have selected trail
     And the Clinical Research Category is not Expanded Access
     Then the trial status will not be selectable:
     |Available |
     |No longer available|
     |Temporarily not available|
     |Approved for marketing|
     */

    this.Given(/^the Clinical Research Category is not Expanded Access$/, function (callback) {
        console.log('Expanded Access');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the trial status will not be selectable:$/, function (table, callback) {
        var dfltStatus = 'Select a status';
        var statusTableValues = table.raw();
        stsA = statusTableValues[0];
        stsB = statusTableValues[1];
        stsC = statusTableValues[2];
        stsD = statusTableValues[3];
        trialStatus.selectDisableStatus(stsA);
        helper.getVerifyListValue(trialStatus.statuesesStatus, dfltStatus, 'Verifying default value');
        trialStatus.selectDisableStatus(stsB);
        helper.getVerifyListValue(trialStatus.statuesesStatus, dfltStatus, 'Verifying default value');
        trialStatus.selectDisableStatus(stsC);
        helper.getVerifyListValue(trialStatus.statuesesStatus, dfltStatus, 'Verifying default value');
        trialStatus.selectDisableStatus(stsD);
        helper.getVerifyListValue(trialStatus.statuesesStatus, dfltStatus, 'Verifying default value');
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #11 Selection of Primary Completion Date Type "NA" - DCP
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Given I have selected trail
     And I have selected the Primary Completion Date
     And I have selected the Primary Completion Date Type  "NA"
     And the trial does not have a DCP Trial Identifier
     And I select Save
     Then an Error will be displayed "Primary Completion Date Type of NA is only available for DCP Trials"
     */

    this.Given(/^I have selected the Primary Completion Date$/, function (callback) {
        tblOptionC = 'Temporarily Closed to Accrual';
        trialStatus.selectStatus(tblOptionC);
        currentDate = trialDoc.getCrrentDte();
        console.log('current date: '+currentDate);
        var dateSplitA = currentDate.toString().split("-");
        crtnDateDay = dateSplitA[0];
        crntDateMonth = dateSplitA[1];
        crntDateYear = dateSplitA[2];
        trialStatus.setStatusDate(crntDateYear, crntDateMonth, crtnDateDay);
        trialStatus.clickAddTrialStatus();
        trialStatus.verifyTrialStatusTblHdr();
        pastDate = trialDoc.getPastDate();
        console.log('future date: '+futureDate);
        var dateSplitB = pastDate.toString().split("-");
        pstDateDay = dateSplitB[0];
        pstDateMonth = dateSplitB[1];
        pstDateYear = dateSplitB[2];
        trialStatus.setTrialStartDate(pstDateYear, pstDateMonth, pstDateDay, 'Actual');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the Primary Completion Date Type  "([^"]*)"$/, function (arg1, callback) {
        futureDateTwoMonth = trialDoc.getFutureDateNextTwoMonth();
        console.log('Next two month ahead future date: '+futureDateTwoMonth);
        var dateSplitC = futureDateTwoMonth.toString().split("-");
        futrDateDay = dateSplitC[0];
        futrDateMonth = dateSplitC[1];
        futrDateYear = dateSplitC[2];
        trialStatus.setPrimaryCompletionDate(futrDateYear, futrDateMonth, futrDateDay, arg1);
        browser.sleep(25).then(callback);
    });

    this.Given(/^the trial does not have a DCP Trial Identifier$/, function (callback) {
        trialStatus.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^an Error will be displayed "([^"]*)"$/, function (arg1, callback) {
        //var anError = 'Primary Completion Date Type of "NA" is only available for DCP Trials';
        var anError = arg1.toString().replace(/NA/g, '"NA"', -1);
        console.log('anError: '+anError);
        trialStatus.primaryCompletionDateNAErr.getText().then(function(text){
            console.log('text: '+text);
        });
        //helper.getVerifyRequired(trialStatus.primaryCompletionDateNAErr, anError, 'Verifying Primary Completion Date without DCP identifiers')
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #12 Selection of Primary Completion Date Type "NA" - Non Interventional
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Status Screen
     Given I have selected trail
     And I have selected the Primary Completion Date
     And I have selected the Primary Completion Date Type  "NA"
     And the trial is Interventional
     And I select Save
     Then an Error will be displayed "Primary Completion Date Type of NA is only available for Non-Interventional Trials"
     */




};
