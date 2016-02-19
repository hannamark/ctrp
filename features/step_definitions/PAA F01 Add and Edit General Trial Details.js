/**
 * Author: Shamim Ahmed
 * Date: 02/16/2016
 * Feature: PAA F01 Add and Edit General Trial Details
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
//General Trial Details
var abstractionTrialDetails = require('../support/abstractionTrialDetails');
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
    var identifierRnd = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var identifierNmbr = ''+identifierRnd+'';
    var identifierRndA = Math.floor(Math.random()*(99999999-77777777+1)+77777777).toString();
    var identifierNmbrEdited = ''+identifierRndA+'';
    var getBoardName = 'TestBoardName'+moment().format('MMMDoYY hmmss');
    var boardNm = '';
    var orgSearchNameA = 'Boston Medical Center';
    var orgSearchNameB = 'Boston University School Of Public Health';
    var orgSearchNameC = 'National Cancer Institute';
    var buildSelectionOpton = '';
    var indIDENmbrA = 'BBIND13794';
    var indIDENmbrB = 'IND108498';
    var indIDENmbrC = '102902';
    var optionA = 'Identifier Type';
    var optionB = 'Value (Click for editing)';
    var optionC = 'Deletion';
    var optionD = '';
    var optionE = '';
    var optionF = '';
    var optionG = '';
    var optionH = '';
    var optionI = '';
    var identifierSelect = 'Select an identifier';
    var identifierCTDotGov = 'ClinicalTrials.gov Identifier';
    var identifierCTEP = 'CTEP Identifier';
    var identifierDCP = 'DCP Identifier';
    var identifierCCR = 'CCR Identifier';
    var identifierCDR = 'CDR Identifier';
    var identifierDuplicate = 'Duplicate NCI Identifier';
    var identifierObsolete = 'Obsolete ClinicalTrials.gov Identifier';
    var identifierOther = 'Other Identifier';
    var identifierEdit = 'eidt';
    var identifierSave = 'save';
    var identifierCancel = 'cancel';




    /*
     Scenario: #1 I can enter the different Protocol Identifiers for a trial
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     When I can edit the lead organization trial identifier
     And I can optionally enter or edit one or more Other Trial Identifiers
     Then the Protocol Identifier section will be complete
     */

    this.Given(/^I have selected a trial to abstract$/, function (callback) {
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the General Trial Details screen$/, function (callback) {
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolIDD);
        commonFunctions.adminCheckOut();
        trialDetails.clickAdminDataGeneralTrial();
        trialCollaborators.waitForElement(trialDetails.generalTrailAcronym, "General Trail Details - Acronym");
        helper.verifyElementDisplayed(trialDetails.generalTrailAcronym, true);
        helper.verifyElementDisplayed(trialDetails.generalTrailOfficialTitle, true);
        helper.verifyElementDisplayed(trialDetails.generalTrailKeywords, true);
        helper.verifyElementDisplayed(trialDetails.generalTrailIdentifier, true);
        helper.verifyElementDisplayed(trialDetails.generalTrailIdentifierTextBox, true);
        helper.verifyElementDisplayed(trialDetails.generalTrailIdentifierAddButton, true);
        trialDetails.findTrailIdentifierAndClickEdit(identifierCTEP, 'edit',identifierNmbrEdited, 'delete', '', '');
        trialDetails.findTrailIdentifierAndClickEdit(identifierDCP, 'edit',identifierNmbrEdited, 'delete', '', '');
        trialDetails.clickSave();
        helper.wait_for(300);
        trialDetails.clickAdminDataNCISpecificInformation();
        trialDetails.clickAdminDataGeneralTrial();
        browser.sleep(25).then(callback);
    });

    this.When(/^I can edit the lead organization trial identifier$/, function (callback) {
        helper.verifyTableRowText(trialDetails.generalTrailTableTHeadColA, optionA, "Identifier Type");
        helper.verifyTableRowText(trialDetails.generalTrailTableTHeadColB, optionB, "Value (Click for editing)");
        helper.verifyTableRowText(trialDetails.generalTrailTableTHeadColC, optionC, "Deletion");
        trialDetails.selectIdentifier(identifierCTEP);
        trialDetails.setIdentifierTextBox(identifierNmbr);
        trialDetails.clickIdentifierAddButton();
        trialDetails.clickSave();
        helper.wait_for(300);
        trialDetails.findTrailIdentifierAndClickEdit(identifierCTEP, 'edit',identifierNmbrEdited, 'save', 'verify', identifierNmbrEdited);
        trialDetails.clickSave();
        browser.sleep(250).then(callback);
    });

    this.When(/^I can optionally enter or edit one or more Other Trial Identifiers$/, function (callback) {
        trialDetails.selectIdentifier(identifierDCP);
        trialDetails.setIdentifierTextBox(identifierNmbr);
        trialDetails.clickIdentifierAddButton();
        trialDetails.clickSave();
        helper.wait_for(300);
        trialDetails.findTrailIdentifierAndClickEdit(identifierDCP, 'edit',identifierNmbrEdited, 'save', 'verify', identifierNmbrEdited);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Protocol Identifier section will be complete$/, function (callback) {
        trialDetails.clickSave();
        trialDetails.clickAdminDataNCISpecificInformation();
        trialDetails.clickAdminDataGeneralTrial();
        trialDetails.findTrailIdentifierAndClickEdit(identifierCTEP, '', '', '', 'verify', identifierNmbrEdited);
        trialDetails.findTrailIdentifierAndClickEdit(identifierDCP, '', '', '', 'verify', identifierNmbrEdited);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #2 I can enter the Acronym and Official Title for a trial
     Given I have selected a trial to abstract
     And I am on the General Trial Details screen
     When I edit the Official Title for the trial
     And I can optionally enter or edit the Acronym for the trial
     Then the title section will be complete
     */




};
