/**
 * Author: Shamim Ahmed
 * Date: 02/20/2016
 * Feature: PAA F03 Add and Edit Regulatory Information
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
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
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
    var orgSearchNameD = 'ZZZ test org for test accounts';
    var personFNmA = 'Alessandra';
    var personLNmA = 'Ferrajol';
    var personFNmB = 'Kristi';
    var personLNmB = 'Graves';
    var personFNmC = 'Diane';
    var personLNmC = 'Roulston';
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
    var reponsblPartyOptionSelect = '-Select a Responsible Party-';
    var reponsblPartyOptionSponsor = 'Sponsor';
    var reponsblPartyOptionPrincipal = 'Principal Investigator';
    var reponsblPartyOptionSponsorInv = 'Sponsor-Investigator';
    var investigatorTitle = 'Principal Investigator';
    var investigatorTitleEdit = 'Edit Principal Investigator';


    /*
     Scenario: #1 I can define the Responsible Party Type as either the Sponsor, Principal Investigator, or Sponsor-Investigator
     Given I have selected a trial to abstract the Regulatory Information FDAAA
     And I am on the Trial Regulatory Information screen
     When I select the Responsible Party Type from a list of options as:
     |Sponsor|
     |Principal Investigator|
     |Sponsor-Investigator|
     Then the selected value will be recorded as the Responsible Party Type
     */

    this.Given(/^I have selected a trial to abstract the Regulatory Information FDAAA$/, function (callback) {
        commonFunctions.onPrepareLoginTest('ctrpabstractor');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the Trial Regulatory Information screen$/, function (callback) {
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickGridFirstLink(1,1);
        commonFunctions.clickLinkText(leadProtocolIDD);
        commonFunctions.adminCheckOut();
        fdaaa.clickAdminDataRegulatoryInfoFDA();
        trialCollaborators.waitForElement(fdaaa.regulatoryInfoResponsiblePartyList, "Regulatory Information – FDAAA  - Responsible Party Drop down");
        helper.verifyElementDisplayed(fdaaa.regulatoryInfoAuthorityCountry, true);
        helper.verifyElementDisplayed(fdaaa.regulatoryInfoAuthorityOrg, true);
        //helper.verifyElementDisplayed(fdaaa.regulatoryInfoIndicatorFDA, true);
        //helper.verifyElementDisplayed(fdaaa.regulatoryInfoIndicator801, true);
        //helper.verifyElementDisplayed(fdaaa.regulatoryInfoIndicatorData, true);
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the Responsible Party Type from a list of options as:$/, function (table, callback) {
        var strVal = '';
        responsiblePartyOptions = table.raw();
        strVal = responsiblePartyOptions.toString().replace(/,/g, "\n", -1);
        console.log('Responsible Party value(s) in the data table:[' + strVal +']');
        fdaaa.regulatoryInfoResponsiblePartyList.getText().then(function(items) {
            console.log('BResponsible Party value(s) in the list object:['+ items +']');
            expect(items.toString().split("\n")).to.eql(strVal.toString().split("\n"));
        });
        var tableDataSplt = strVal.toString().split("\n");
        optionA = tableDataSplt[0];
        optionB = tableDataSplt[1];
        optionC = tableDataSplt[2];
        optionD = tableDataSplt[3];
        fdaaa.selectResponsibleParty(optionB);
        fdaaa.clickSave();
        browser.sleep(250).then(callback);
    });

    this.Then(/^the selected value will be recorded as the Responsible Party Type$/, function (callback) {
        fdaaa.clickAdminDataGeneralTrial();
        fdaaa.clickAdminDataRegulatoryInfoFDA();
        helper.getVerifyListValue(fdaaa.regulatoryInfoResponsiblePartyList, optionB, "Responsible Party - Selected Value verification")
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #2 I can select an Investigator when the Responsible Party is the Sponsor-Investigator
     Given I have selected a trial to abstract the Regulatory Information FDAAA
     And I am on the Trial Regulatory Information screen
     When the Responsible Party Type is Sponsor-Investigator
     And I have performed a person search
     And I have selected a person as the Investigator
     Then the person selected will be recorded as the Investigator for the Sponsor-Investigator Responsible Party
     And the Sponsor Organization will be recorded as the Investigator�s Affiliation Organization
     */

    this.When(/^the Responsible Party Type is Sponsor\-Investigator$/, function (callback) {
        fdaaa.selectResponsibleParty(reponsblPartyOptionSponsorInv);
        browser.sleep(25).then(callback);
    });

    this.When(/^I have performed a person search$/, function (callback) {
        trialDetails.clickSearchPersonsButtonByIndex('0');
        searchOrg.clickExactSearch('true');
        searchPeople.setPersonFirstName(personFNmB);
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected a person as the Investigator$/, function (callback) {
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        fdaaa.clickSave();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the person selected will be recorded as the Investigator for the Sponsor\-Investigator Responsible Party$/, function (callback) {
        fdaaa.clickAdminDataGeneralTrial();
        fdaaa.clickAdminDataRegulatoryInfoFDA();
        helper.wait_for(2500);
        var buildInvestigatorValue = ''+personLNmB+', '+personFNmB+'';
        trialDetails.verifyTextFieldValue(fdaaa.regulatoryInfoInvestigator, buildInvestigatorValue, "Verifying Investigator Person Name");
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Sponsor Organization will be recorded as the Investigator�s Affiliation Organization$/, function (callback) {
        fdaaa.regulatoryInfoInvestigatorAffiliation.getAttribute('value').then(function(value){
            console.log('Sponsor: '+value);
            fdaaa.selectResponsibleParty(reponsblPartyOptionSponsor);
            helper.wait_for(2500);
            trialDetails.verifyTextFieldValue(fdaaa.regulatoryInfoSponsor, value, "Verifying Investigator Affiliation with Sponsor Name");
            fdaaa.selectResponsibleParty(reponsblPartyOptionSponsorInv);
        });
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #3 I can define the Investigator�s Title
     Given I have selected a trial to abstract the Regulatory Information FDAAA
     And I am on the Trial Regulatory Information screen
     When I enter the Title for the Investigator (Field will be prefilled with �Principal Investigator�)
     Then the selected value will be recorded as the Responsible Party Type with the Principal Investigator title
     */

    this.When(/^I enter the Title for the Investigator \(Field will be prefilled with �Principal Investigator�\)$/, function (callback) {
        fdaaa.selectResponsibleParty(reponsblPartyOptionPrincipal);
        fdaaa.setInvestigatorTitle(investigatorTitle);
        fdaaa.clickSave();
        fdaaa.clickAdminDataGeneralTrial();
        fdaaa.clickAdminDataRegulatoryInfoFDA();
        fdaaa.selectResponsibleParty(reponsblPartyOptionPrincipal);
        fdaaa.setInvestigatorTitle(investigatorTitleEdit);
        fdaaa.clickSave();
        browser.sleep(250).then(callback);
    });

    this.Then(/^the selected value will be recorded as the Responsible Party Type with the Principal Investigator title$/, function (callback) {
        fdaaa.clickAdminDataGeneralTrial();
        fdaaa.clickAdminDataRegulatoryInfoFDA();
        fdaaa.selectResponsibleParty(reponsblPartyOptionPrincipal);
        trialDetails.verifyTextFieldValue(fdaaa.regulatoryInfoInvestigatorTitle, investigatorTitleEdit, "Verifying Investigator Title");
        fdaaa.setInvestigatorTitle(investigatorTitle);
        fdaaa.clickSave();
        fdaaa.clickAdminDataGeneralTrial();
        fdaaa.clickAdminDataRegulatoryInfoFDA();
        fdaaa.selectResponsibleParty(reponsblPartyOptionPrincipal);
        trialDetails.verifyTextFieldValue(fdaaa.regulatoryInfoInvestigatorTitle, investigatorTitle, "Verifying Investigator Title");
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #4 I can associate an organization as an Affiliation of the Investigator
     Given I have selected a trial to abstract the Regulatory Information FDAAA
     And I am on the Trial Regulatory Information screen
     And I have selected an organization as an Affiliation of the Investigator (defaulted to Sponsor Organization)
     And the Responsible Party Type is Principal Investigator
     And I have selected organization look-up at the Responsible Party section
     When list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial (sponsor, Lead, IRB) are displayed
     Then the selected organization will be the Affiliation of the Investigator for the trial
     */

    this.Given(/^I have selected an organization as an Affiliation of the Investigator \(defaulted to Sponsor Organization\)$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.Given(/^the Responsible Party Type is Principal Investigator$/, function (callback) {
        fdaaa.selectResponsibleParty(reponsblPartyOptionPrincipal);
        browser.sleep(250).then(callback);
    });

    this.Given(/^I have selected organization look\-up at the Responsible Party section$/, function (callback) {
        trialDetails.clickSearchOrgButtonByIndex('0');
        browser.sleep(25).then(callback);
    });

    this.When(/^list of unique organizations including my organization, the organizations in my family and the organizations associated with this trial \(sponsor, Lead, IRB\) are displayed$/, function (callback) {
        searchOrg.setOrgName('*');
        searchOrg.clickSearchButton();
        searchOrg.setOrgName(orgSearchNameA);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        fdaaa.clickSave();
        fdaaa.clickAdminDataGeneralTrial();
        fdaaa.clickAdminDataRegulatoryInfoFDA();
        trialDetails.clickSearchOrgButtonByIndex('0');
        searchOrg.setOrgName(orgSearchNameC);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        helper.wait_for(250);
        fdaaa.clickSave();
        browser.sleep(250).then(callback);
    });

    this.Then(/^the selected organization will be the Affiliation of the Investigator for the trial$/, function (callback) {
        fdaaa.clickAdminDataGeneralTrial();
        fdaaa.clickAdminDataRegulatoryInfoFDA();
        fdaaa.selectResponsibleParty(reponsblPartyOptionPrincipal);
        trialDetails.verifyTextFieldValue(fdaaa.regulatoryInfoInvestigatorAffiliation, orgSearchNameC, "Verifying Investigator Affiliation Orgznization Name");
        browser.sleep(25).then(callback);
    });





};
