/**
 * Author: Shamim Ahmed
 * Date: 02/09/2016
 * Feature: PAA F09 Add and Edit Trial Collaborators
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
//Regulatory Information - IND/IDE
var abstractionRegulatoryINDIDE = require('../support/abstractionRegulatoryIND');
//Regulatory Information - Human Subject Safety
var abstractionRegulatoryHuman = require('../support/abstractionRegulatoryHuman');
//Collaborators
var abstractionCollaborators = require('../support/abstractionTrialCollaborators');
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
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
    //var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchTableHeader = '';
    var nciID = 'NCI-2014-00894';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1776';
    var leadProtocolIDA = 'CTRP_01_1777';
    var leadProtocolIDB = 'CTRP_01_1778';
    var leadProtocolIDC = 'CTRP_01_17'+randNmbr;
    var leadProtocolIDD = 'CTRP_01_1781';
    var searchResultCountText = 'Trial Search Results';
    var indIDEAssociatedQueVal = '';
    var indTypVal = 'IND';
    var ideTypVal = 'IDE';
    var aprvlNumberRnd = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var boardApprovNmbr = '';
    var getBoardName = 'TestBoardName'+moment().format('MMMDoYY hmmss');
    var boardNm = '';
    var orgSearchNameA = 'Boston Medical Center';
    var orgSearchNameB = 'Boston University School Of Public Health';
    var orgSearchNameC = 'National Cancer Institute';
    var buildSelectionOpton = '';
    var indIDENmbrA = 'BBIND13794';
    var indIDENmbrB = 'IND108498';
    var indIDENmbrC = '102902';
    var boardApprovalStatusCrntVal = '';
    var boardApprovalStatusSelect = 'Select a status';
    var boardApprovalStatusPending = 'Submitted, pending';
    var boardApprovalStatusApproved = 'Submitted, approved';
    var boardApprovalStatusExempt = 'Submitted, exempt';
    var boardApprovalStatusDenied = 'Submitted, denied';
    var boardApprovalStatusNotRequired = 'Submission not required';
    var optionA = '';
    var optionB = '';
    var optionC = '';
    var optionD = '';
    var optionE = '';
    var optionF = '';
    var optionG = '';
    var optionH = '';
    var optionI = '';
    var affiOrg = 'Affiliated Organization';
    var requiredMsgApproval = 'Board approval number is required';
    var requiredMsgAffiliation = 'Board affiliation is required';
    var requiredMsgName = 'Board name is required';


    /*
     Scenario: #1 I can add a Collaborators to a Trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Collaborators screen
     And I have selected organization look-up at the Trial Collaborators screen
     When a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, Org, IRB) are displayed
     Then I can select an organization from the list of organization
     And the selected organization will be associated to the trail as a Trial Collaborator
     And the system will list
     |CTRP Organization ID|
     |Collaborator Name|
     And the organizations will be displyed orderd assending alphanumeric by Collaborator Name
     */

    this.Given(/^I am on the Trial Collaborators screen$/, function (callback) {
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolIDD);
        commonFunctions.adminCheckOut();
        trialCollaborators.clickAdminDataCollaborators();
        trialCollaborators.waitForElement(trialCollaborators.collaboratorsAddButton, "Collaborators Add Button");
        helper.verifyElementDisplayed(trialCollaborators.collaboratorsAddButton, true);
        helper.verifyElementDisplayed(trialCollaborators.collaboratorsDeleteButton, true);
        helper.verifyElementDisplayed(trialCollaborators.collaboratorsTableListTHead, true);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected organization look\-up at the Trial Collaborators screen$/, function (callback) {
        trialCollaborators.clickAddCollaboratorButton();
        organizationSearch.clickSearchOrganization();
        browser.sleep(25).then(callback);
    });

    this.When(/^a list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial \(sponsor, Lead, Org, IRB\) are displayed$/, function (callback) {
        searchOrg.setOrgName(orgSearchNameB);
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^I can select an organization from the list of organization$/, function (callback) {
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        trialCollaborators.clickSave();
        browser.sleep(250).then(callback);
    });

    this.Then(/^the selected organization will be associated to the trail as a Trial Collaborator$/, function (callback) {
        trialCollaborators.findOrgOnTheTableList(orgSearchNameB);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system will list$/, function (table, callback) {
        var strVal = '';
        collaboratorsOptions = table.raw();
        strVal = collaboratorsOptions.toString().replace(/,/g, "\n", -1);
        console.log('List of collaborators Table Headers:[' + strVal +']');
        var tableDataSplt = strVal.toString().split("\n");
        optionA = tableDataSplt[0];
        optionB = tableDataSplt[1];
        optionC = tableDataSplt[2];
        helper.verifyTableRowText(trialCollaborators.collaboratorsTableTHeadColA, optionA, "PO ID");
        helper.verifyTableRowText(trialCollaborators.collaboratorsTableTHeadColB, optionB, "Name");
        helper.verifyTableRowText(trialCollaborators.collaboratorsTableTHeadColC, optionC, "Deletion");
        browser.sleep(25).then(callback);
    });

    this.Then(/^the organizations will be displyed orderd assending alphanumeric by Collaborator Name$/, function (callback) {
        trialCollaborators.selectAllOrg();
        trialCollaborators.clickDeleteCollaborator();
        helper.wait_for(300);
        trialCollaborators.clickAddCollaboratorButton();
        organizationSearch.clickSearchOrganization();
        searchOrg.setOrgName(orgSearchNameC);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        trialCollaborators.clickSave();
        organizationSearch.clickSearchOrganization();
        searchOrg.setOrgName(orgSearchNameB);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        trialCollaborators.clickSave();
        helper.wait_for(300);
        trialCollaborators.clickAdminDataGeneralTrial();
        trialCollaborators.clickAdminDataCollaborators();
        helper.verifyTableRowText(trialCollaborators.collaboratorsTableTBodyRowAColB, orgSearchNameB, "Verifying assending alphanumeric by Collaborator Name");
        helper.verifyTableRowText(trialCollaborators.collaboratorsTableTBodyRowBColB, orgSearchNameC, "Verifying assending alphanumeric by Collaborator Name");
        browser.sleep(25).then(callback);
    });








};