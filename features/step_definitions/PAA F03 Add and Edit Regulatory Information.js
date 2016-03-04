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
    var oversightCountryA = 'United States';
    var oversightCountryB = 'Canada';
    var oversightCountryC = 'Bangladesh';
    var oversightCountryAOrg = 'Federal Government';
    var oversightCountryBOrg = 'Canadian Institutes of Health Research';
    var oversightCountryCOrg = 'Bangladesh Medical Research Council';
    var verifyWaningMsgA = 'Please enter the Investigator';



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
        helper.getVerifyListValue(fdaaa.regulatoryInfoResponsiblePartyList, optionB, "Responsible Party - Selected Value verification");
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
        //fdaaa.clickAdminDataGeneralTrial();
        //fdaaa.clickAdminDataRegulatoryInfoFDA();
        //helper.wait_for(2500);
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
        browser.sleep(250).then(callback);
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
        searchOrg.setOrgName(orgSearchNameB);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        fdaaa.clickSave();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the selected organization will be the Affiliation of the Investigator for the trial$/, function (callback) {
        //helper.wait_for(1000);
        //fdaaa.clickAdminDataGeneralTrial();
        //fdaaa.clickAdminDataRegulatoryInfoFDA();
        //fdaaa.selectResponsibleParty(reponsblPartyOptionPrincipal);
        trialDetails.verifyTextFieldValue(fdaaa.regulatoryInfoInvestigatorAffiliation, orgSearchNameB, "Verifying Investigator Affiliation Orgznization Name");
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #5 I can add and edit Regulatory Information for a Regulated Trial
     Given I have selected a trial to abstract the Regulatory Information FDAAA
     And I am on the Trial Regulatory Information screen
     When I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
     And I have selected one or more Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
     And the FDA Regulated Intervention Indicator will be defaulted to the "N/A" setting
     And the Section 801 Indicator will be defaulted to the "N/A" setting
     And the Data Monitoring Committee Appointed Indicator will be defaulted to the "N/A" setting
     And I can select "yes", "No", "NA" FDA Regulated Intervention Indicator
     And I can select "Yes", "No", "NA" for Section 801 Indicator
     And I can select "Yes", "No", "NA" for Data Monitoring Committee Appointed Indicator
     Then the required Regulatory Information for the trial will be associated with the trial
     */

    /*
     Scenario: #5 I can add and edit Regulatory Information for a Regulated Trial
     Given I have selected a trial to abstract the Regulatory Information FDAAA
     And I am on the Trial Regulatory Information screen
     When I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
     And I have selected one or more Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
     And I can select "yes", "No", "NA" FDA Regulated Intervention Indicator
     And I can select "Yes", "No", "NA" for Section 801 Indicator
     And I can select "Yes", "No", "NA" for Data Monitoring Committee Appointed Indicator
     Then the required Regulatory Information for the trial will be associated with the trial
     */


    this.When(/^I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries$/, function (callback) {
        fdaaa.selectResponsibleParty(reponsblPartyOptionPrincipal);
        trialDetails.clickSearchOrgButtonByIndex('0');
        searchOrg.setOrgName('*');
        searchOrg.clickSearchButton();
        searchOrg.setOrgName(orgSearchNameB);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        //Trail Oversight Authority
        fdaaa.selectAuthorityCountry(oversightCountryA);
        fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryB);
        fdaaa.selectAuthorityOrganization(oversightCountryBOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryC);
        fdaaa.selectAuthorityOrganization(oversightCountryCOrg);
        fdaaa.clickAuthorityAddButton();
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected one or more Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country$/, function (callback) {
        fdaaa.selectAuthorityCountry(oversightCountryA);
        fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.verifyAuthorityErrMsg(oversightCountryA+' '+oversightCountryAOrg+' already exists');
        browser.sleep(25).then(callback);
    });

    this.When(/^I can select "([^"]*)", "([^"]*)", "([^"]*)" FDA Regulated Intervention Indicator$/, function (arg1, arg2, arg3, callback) {
        yesVal = 'Yes';
        noVal = 'No';
        naVal = 'NA';
        if (yesVal === arg1){
            addTrial.selectAddTrialFDARegulatedInterventionIndicator('1');
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '1', true);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '0', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '2', false);
        }
        if (yesVal === arg2){
            addTrial.selectAddTrialFDARegulatedInterventionIndicator('0');
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '1', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '0', true);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '2', false);
        }
        if (yesVal === arg3){
            addTrial.selectAddTrialFDARegulatedInterventionIndicator('2');
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '1', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '0', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '2', true);
        }
        browser.sleep(25).then(callback);
    });

    this.When(/^I can select "([^"]*)", "([^"]*)", "([^"]*)" for Section (\d+) Indicator$/, function (arg1, arg2, arg3, arg4, callback) {
        yesVal = 'Yes';
        noVal = 'No';
        naVal = 'NA';
        if (yesVal === arg1){
            addTrial.selectAddTrialSection801Indicator('1');
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '1', true);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '0', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '2', false);
        }
        if (yesVal === arg2){
            addTrial.selectAddTrialSection801Indicator('0');
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '1', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '0', true);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '2', false);
        }
        if (yesVal === arg3){
            addTrial.selectAddTrialSection801Indicator('2');
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '1', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '0', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '2', true);
        }
        browser.sleep(25).then(callback);
    });

    this.When(/^I can select "([^"]*)", "([^"]*)", "([^"]*)" for Data Monitoring Committee Appointed Indicator$/, function (arg1, arg2, arg3, callback) {
        yesVal = 'Yes';
        noVal = 'No';
        naVal = 'NA';
        if (yesVal === arg1){
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('1');
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '1', true);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '0', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '2', false);
        }
        if (yesVal === arg2){
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('0');
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '1', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '0', true);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '2', false);
        }
        if (yesVal === arg3){
            addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('2');
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '1', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '0', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '2', true);
        }
        addTrial.selectAddTrialFDARegulatedInterventionIndicator('1');
        addTrial.selectAddTrialSection801Indicator('1');
        addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('2');
        fdaaa.clickSave();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the required Regulatory Information for the trial will be associated with the trial$/, function (callback) {
        fdaaa.clickAdminDataGeneralTrial();
        fdaaa.clickAdminDataRegulatoryInfoFDA();
        trialCollaborators.waitForElement(fdaaa.regulatoryInfoResponsiblePartyList, "Regulatory Information – FDAAA  - Responsible Party Drop down");
        helper.verifyElementDisplayed(fdaaa.regulatoryInfoAuthorityCountry, true);
        helper.verifyElementDisplayed(fdaaa.regulatoryInfoAuthorityOrg, true);
        helper.wait_for(3000);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '1', true);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '1', true);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '2', true);
        browser.sleep(25).then(callback);
    });


    /*
     Scenario: #6 I can add and edit Regulatory Information for a non-Regulated Trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Register Trial Regulatory Information screen
     When I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
     And I have selected one or more of the Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
     And I have selected "No" for FDA Regulated Intervention Indicator
     And I have selected "Yes", "No", "N/A" for Data Monitoring Committee Appointed Indicator
     Then the required Regulatory Information for the trial will be associated with the trial
     And the Section 801 Indicator will be set to "No"
     */

    this.When(/^I have selected one or more Trial Oversight Authority Country from a list of all the Trial Oversight Authority Countries$/, function (callback) {
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
        fdaaa.selectResponsibleParty(reponsblPartyOptionPrincipal);
        trialDetails.clickSearchOrgButtonByIndex('0');
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
        helper.wait_for(250);
        fdaaa.selectAuthorityCountry(oversightCountryA);
        fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryB);
        fdaaa.selectAuthorityOrganization(oversightCountryBOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryC);
        fdaaa.selectAuthorityOrganization(oversightCountryCOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryA);
        fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.verifyAuthorityErrMsg(oversightCountryA+' '+oversightCountryAOrg+' already exists');
        fdaaa.clickSave();
        //fdaaa.clickAdminDataGeneralTrial();
        //fdaaa.clickAdminDataRegulatoryInfoFDA();
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected one or more of the Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country$/, function (callback) {
        //fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryA, oversightCountryAOrg, 'delete', '');
        //fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryB, oversightCountryBOrg, 'delete', '');
        //fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryC, oversightCountryCOrg, 'delete', '');
        //fdaaa.clickSave();
        //helper.wait_for(2500);
        //fdaaa.clickAdminDataGeneralTrial();
        //fdaaa.clickAdminDataRegulatoryInfoFDA();
        //fdaaa.selectAuthorityCountry(oversightCountryA);
        //fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        //fdaaa.clickSave();
        //helper.wait_for(250);
        //fdaaa.clickAdminDataGeneralTrial();
        //fdaaa.clickAdminDataRegulatoryInfoFDA();
        browser.sleep(250).then(callback);
    });

    this.Then(/^the required Regulatory Information for the trial will be associated$/, function (callback) {
        addTrial.selectAddTrialSection801Indicator('0');
        expect(addTrial.addTrialSection801Indicator.get(0).isEnabled()).to.become(true);
        fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryA, oversightCountryAOrg, '', 'verify');
        fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryB, oversightCountryBOrg, '', 'verify');
        fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryC, oversightCountryCOrg, '', 'verify');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Section (\d+) Indicator will be associated as "([^"]*)"$/, function (arg1, arg2, callback) {
        getArg1 = 'No';
        getArg2 = 'Yes';
        if (arg2 === getArg1){
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '0', true);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '1', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '2', false);
        } else if(arg2 === getArg2){
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '0', false);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '1', true);
            commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '2', false);
        };
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #7 I can add and edit Regulatory Information for a Regulated Trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information screen
     When I have selected one or more Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
     And I have selected one or more Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
     And I have selected "Yes" for FDA Regulated Intervention Indicator
     Then I have the option to select "Yes", "No" for Section 801 Indicator
     */

    this.When(/^I have selected one or more Trial Oversight Authority Country from the list of all Trial Oversight Authority Countries$/, function (callback) {
        fdaaa.selectAuthorityCountry(oversightCountryA);
        fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryB);
        fdaaa.selectAuthorityOrganization(oversightCountryBOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryC);
        fdaaa.selectAuthorityOrganization(oversightCountryCOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryA);
        fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.verifyAuthorityErrMsg(oversightCountryA+' '+oversightCountryAOrg+' already exists');
        fdaaa.clickSave();
        browser.sleep(250).then(callback);
    });

    this.When(/^I have selected one or more Trial Oversight Authority Organization Names from the list based on the selected Trial Oversight Authority Country$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected FDA Regulated Intervention Indicator as "([^"]*)"$/, function (arg1, callback) {
        if (arg1 === 'No') {
            addTrial.selectAddTrialFDARegulatedInterventionIndicator('0');
        }
        else if (arg1 === 'Yes') {
            addTrial.selectAddTrialFDARegulatedInterventionIndicator('1');
        };
        browser.sleep(25).then(callback);
    });

    this.Then(/^I have the option to select "([^"]*)", "([^"]*)" for Section (\d+) Indicator$/, function (arg1, arg2, arg3, callback) {
        console.log('Section '+arg3+' Indicator:'+arg1+' or '+arg2);
        var getArg1Val = 'No';
        var getArg2Val = 'Yes';
        if (getArg1Val === arg1){
            addTrial.selectAddTrialSection801Indicator('0');
            fdaaa.clickSave();
            expect(addTrial.addTrialSection801Indicator.get(0).isEnabled()).to.become(true);
            addTrial.verifyAddTrialSection801Indicator('0', true);
            expect(addTrial.addTrialSection801Indicator.get(1).isEnabled()).to.become(false);
            addTrial.verifyAddTrialSection801Indicator('1', false);
            expect(addTrial.addTrialSection801Indicator.get(2).isEnabled()).to.become(false);
            addTrial.verifyAddTrialSection801Indicator('2', false);
        };
        if (getArg2Val === arg2){
            addTrial.selectAddTrialSection801Indicator('1');
            fdaaa.clickSave();
            expect(addTrial.addTrialSection801Indicator.get(0).isEnabled()).to.become(false);
            addTrial.verifyAddTrialSection801Indicator('0', false);
            expect(addTrial.addTrialSection801Indicator.get(1).isEnabled()).to.become(true);
            addTrial.verifyAddTrialSection801Indicator('1', true);
            expect(addTrial.addTrialSection801Indicator.get(2).isEnabled()).to.become(false);
            addTrial.verifyAddTrialSection801Indicator('2', false);
        };
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #8 Save Regulatory Information
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Register Trial Regulatory Information screen
     When select save at the Regulatory Information FDAAA screen
     Then the information entered or edited on the Regulatory Information screen will be saved to the trial record
     */

    this.When(/^select save at the Regulatory Information FDAAA screen$/, function (callback) {
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
        //Responsible Party
        fdaaa.selectResponsibleParty(reponsblPartyOptionPrincipal);
        trialDetails.clickSearchOrgButtonByIndex('0');
        searchOrg.setOrgName('*');
        searchOrg.clickSearchButton();
        searchOrg.setOrgName(orgSearchNameB);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        //Trail Oversight Authority
        fdaaa.selectAuthorityCountry(oversightCountryA);
        fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryB);
        fdaaa.selectAuthorityOrganization(oversightCountryBOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryC);
        fdaaa.selectAuthorityOrganization(oversightCountryCOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryA);
        fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.verifyAuthorityErrMsg(oversightCountryA+' '+oversightCountryAOrg+' already exists');
        //Indicators
        addTrial.selectAddTrialFDARegulatedInterventionIndicator('1');
        addTrial.selectAddTrialSection801Indicator('0');
        addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('1');
        fdaaa.clickSave();
        browser.sleep(3000).then(callback);
    });

    this.Then(/^the information entered or edited on the Regulatory Information screen will be saved to the trial record$/, function (callback) {
        trialCollaborators.waitForElement(fdaaa.regulatoryInfoResponsiblePartyList, "Regulatory Information – FDAAA  - Responsible Party Drop down");
        helper.verifyElementDisplayed(fdaaa.regulatoryInfoAuthorityCountry, true);
        helper.verifyElementDisplayed(fdaaa.regulatoryInfoAuthorityOrg, true);
        //Verification
        //Responsible Party
        helper.getVerifyListValue(fdaaa.regulatoryInfoResponsiblePartyList, reponsblPartyOptionPrincipal, "Responsible Party - Selected Value verification");
        trialDetails.verifyTextFieldValue(fdaaa.regulatoryInfoInvestigatorAffiliation, orgSearchNameB, "Verifying Investigator Affiliation Orgznization Name");
        //Trail Oversight Authority
        fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryA, oversightCountryAOrg, '', 'verify');
        fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryB, oversightCountryBOrg, '', 'verify');
        fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryC, oversightCountryCOrg, '', 'verify');
        //Indicators
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '1', true);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '0', true);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '1', true);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '0', false);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '1', false);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '0', false);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '2', false);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '2', false);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '2', false);
        browser.sleep(250).then(callback);
    });

    /*
     Scenario: #9 Cancel Regulatory Information
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Register Trial Regulatory Information screen
     When I select Reset at the Regulatory Information FDAAA screen
     Then the information entered or edited on the Regulatory Information screen will not be saved to the trial record
     And the screen will be refreshed with the existing Regulatory Information FDAAA data
     */

    this.When(/^I select Reset at the Regulatory Information FDAAA screen$/, function (callback) {
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
        //Responsible Party
        fdaaa.selectResponsibleParty(reponsblPartyOptionPrincipal);
        trialDetails.clickSearchOrgButtonByIndex('0');
        searchOrg.setOrgName('*');
        searchOrg.clickSearchButton();
        searchOrg.setOrgName(orgSearchNameA);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        //Trail Oversight Authority
        fdaaa.selectAuthorityCountry(oversightCountryA);
        fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryB);
        fdaaa.selectAuthorityOrganization(oversightCountryBOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryC);
        fdaaa.selectAuthorityOrganization(oversightCountryCOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryA);
        fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.verifyAuthorityErrMsg(oversightCountryA+' '+oversightCountryAOrg+' already exists');
        //Indicators
        addTrial.selectAddTrialFDARegulatedInterventionIndicator('1');
        addTrial.selectAddTrialSection801Indicator('0');
        addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('1');
        fdaaa.clickSave();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the information entered or edited on the Regulatory Information screen will not be saved to the trial record$/, function (callback) {
        trialDetails.clickSearchOrgButtonByIndex('0');
        searchOrg.setOrgName('*');
        searchOrg.clickSearchButton();
        searchOrg.setOrgName(orgSearchNameB);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryA, oversightCountryAOrg, 'delete', '');
        fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryB, oversightCountryBOrg, 'delete', '');
        fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryC, oversightCountryCOrg, 'delete', '');
        addTrial.selectAddTrialFDARegulatedInterventionIndicator('0');
        addTrial.selectAddTrialSection801Indicator('1');
        addTrial.selectAddTrialDataMonitoringCommitteeAppointedIndicator('0');
        fdaaa.clickReset();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the screen will be refreshed with the existing Regulatory Information FDAAA data$/, function (callback) {
        fdaaa.clickAdminDataGeneralTrial();
        fdaaa.clickAdminDataRegulatoryInfoFDA();
        trialCollaborators.waitForElement(fdaaa.regulatoryInfoResponsiblePartyList, "Regulatory Information – FDAAA  - Responsible Party Drop down");
        helper.verifyElementDisplayed(fdaaa.regulatoryInfoAuthorityCountry, true);
        helper.verifyElementDisplayed(fdaaa.regulatoryInfoAuthorityOrg, true);
        helper.wait_for(3000);
        //Verification
        //Responsible Party
        helper.getVerifyListValue(fdaaa.regulatoryInfoResponsiblePartyList, reponsblPartyOptionPrincipal, "Responsible Party - Selected Value verification");
        trialDetails.verifyTextFieldValue(fdaaa.regulatoryInfoInvestigatorAffiliation, orgSearchNameA, "Verifying Investigator Affiliation Orgznization Name");
        //Trail Oversight Authority
        fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryA, oversightCountryAOrg, '', 'verify');
        fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryB, oversightCountryBOrg, '', 'verify');
        fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryC, oversightCountryCOrg, '', 'verify');
        //Indicators
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '1', true);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '0', true);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '1', true);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '0', false);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '1', false);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '0', false);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorFDA, '2', false);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicator801, '2', false);
        commonFunctions.verifyIndicator(fdaaa.regulatoryInfoIndicatorData, '2', false);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #10 Investigator is not null
     Given I have selected a trial to abstract
     And I am on the Trial Regulatory Information screen
     And the Responsible Party Type is �Sponsor Investigator�
     And the Investigator is Null
     When I select save to verify warning message
     Then a warning message will appear �Please enter the Investigator�
     */

    this.Given(/^the Responsible Party Type is �Sponsor Investigator�$/, function (callback) {
        fdaaa.selectResponsibleParty(reponsblPartyOptionSponsorInv);
        browser.sleep(25).then(callback);
    });

    this.Given(/^the Investigator is Null$/, function (callback) {
        trialDetails.clickSearchPersonsButtonByIndex('0');
        searchOrg.clickExactSearch('true');
        searchPeople.setPersonFirstName(personFNmB);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        browser.sleep(25).then(callback);
    });

    this.When(/^I select save to verify warning message$/, function (callback) {
        fdaaa.clickSave();
        browser.sleep(25).then(callback);
    });

    this.Then(/^a warning message will appear �Please enter the Investigator�$/, function (callback) {
        var getWaningMsg = 'Please enter the Investigator';
        console.log('Investigator field warning message ['+getWaningMsg+'] can not be verified since it is a readonly field');
        var buildInvestigatorValue = ''+personLNmB+', '+personFNmB+'';
        trialDetails.verifyTextFieldValue(fdaaa.regulatoryInfoInvestigator, buildInvestigatorValue, "Verifying Investigator Person Name");
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #11 Investigator Title is not null
     Given I have selected a trial to abstract
     And I am on the Trial Regulatory Information screen
     And the Responsible Party Type is �Sponsor Investigator�
     And the Investigator Title is Null
     When I select save to verify warning message
     Then a warning message will appear �Please enter the Investigator Title�
     */

    this.Given(/^the Investigator Title is Null$/, function (callback) {
        fdaaa.setInvestigatorTitle('');
        browser.sleep(25).then(callback);
    });

    this.Then(/^a warning message will appear �Please enter the Investigator Title�$/, function (callback) {
        var verifyWarningMessage = 'Investigator Title is required'
        helper.getVerifyRequired(fdaaa.regulatoryInfoResponsiblePartyInvesWaning, verifyWarningMessage, "Investigator Title - Required Message Verification");
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #12 Investigator Affiliation is not null
     Given I have selected a trial to abstract
     And I am on the Trial Regulatory Information screen
     And the Responsible Party Type is �Principal Investigator�
     And the Investigator Affiliation is Null
     When I select save to verify warning message
     Then a warning message will appear �Please enter the Investigator Affiliation�
     */

    this.Given(/^the Responsible Party Type is �Principal Investigator�$/, function (callback) {
        fdaaa.selectResponsibleParty(reponsblPartyOptionPrincipal);
        browser.sleep(25).then(callback);
    });

    this.Given(/^the Investigator Affiliation is Null$/, function (callback) {
        trialDetails.clickSearchOrgButtonByIndex('0');
        searchOrg.setOrgName('*');
        searchOrg.clickSearchButton();
        searchOrg.setOrgName(orgSearchNameC);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        browser.sleep(25).then(callback);
    });

    this.Then(/^a warning message will appear �Please enter the Investigator Affiliation�$/, function (callback) {
        var getWaningMsg = 'Please enter the Investigator Affiliation';
        console.log('Investigator Affilliation field warning message ['+getWaningMsg+'] can not be verified since it is a readonly field and cannot be null');
        helper.getVerifyListValue(fdaaa.regulatoryInfoResponsiblePartyList, reponsblPartyOptionPrincipal, "Responsible Party - Selected Value verification");
        trialDetails.verifyTextFieldValue(fdaaa.regulatoryInfoInvestigatorAffiliation, orgSearchNameC, "Verifying Investigator Affiliation Orgznization Name");
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #13 "Upload from NCI CTRP" Note
     Given I have selected a trial to abstract
     And I am on the Trial Regulatory Information screen
     Then the label should be displayed below the Trial Regulatory Information section header
     |The information in this section is REQUIRED to enable "Upload from NCI CTRP" in ClinicalTrials.gov:|
     And ClinicalTrials.gov it a link to
     |https://clinicaltrials.gov/|
     */

    this.Then(/^the label should be displayed below the Trial Regulatory Information section header$/, function (table, callback) {
        var strVal = '';
        txtOptions = table.raw();
        strVal = txtOptions.toString();
        helper.getVerifyRequired(fdaaa.fdaaaTitle, strVal, "Message Verification");
        browser.sleep(25).then(callback);
    });

    this.Then(/^ClinicalTrials\.gov it a link to$/, function (table, callback) {
        var strValLink = '';
        linkOptions = table.raw();
        strValLink = linkOptions.toString();
        var tableDataSplt = strValLink.toString().split("//");
        optionA = tableDataSplt[0];
        optionB = tableDataSplt[1].toLowerCase();
        console.log(optionB);
        getHref = fdaaa.fdaaaTitle.getAttribute('href');
        getHref.then(function(value){
            //expect(value).to.eql(optionB.toString());
        });
        //expect(fdaaa.fdaaaTitle.getAttribute('href').toEqual(optionB));
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #14 Can not have a duplicate trial Oversight Authority Country and Trial Oversight Authority Organization
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information screen
     And I have selected a Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries
     And I have selected a Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country
     When I select a Trial Oversight Authority Country and Trial Oversight Authority Organization that has already been associated with this trial
     Then a warning message will appear �The Trial Oversight Authority Country and Trial Oversight Authority Organization has already been selected.�
     */

    this.Given(/^I have selected a Trial Oversight Authority Country from a list of all Trial Oversight Authority Countries$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected a Trial Oversight Authority Organization Names from a list based on the selected Trial Oversight Authority Country$/, function (callback) {
        fdaaa.selectAuthorityCountry(oversightCountryA);
        fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryB);
        fdaaa.selectAuthorityOrganization(oversightCountryBOrg);
        fdaaa.clickAuthorityAddButton();
        fdaaa.selectAuthorityCountry(oversightCountryC);
        fdaaa.selectAuthorityOrganization(oversightCountryCOrg);
        fdaaa.clickAuthorityAddButton();
        browser.sleep(25).then(callback);
    });

    this.When(/^I select a Trial Oversight Authority Country and Trial Oversight Authority Organization that has already been associated with this trial$/, function (callback) {
        fdaaa.selectAuthorityCountry(oversightCountryA);
        fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
        fdaaa.clickAuthorityAddButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^a warning message will appear �The Trial Oversight Authority Country and Trial Oversight Authority Organization has already been selected\.�$/, function (callback) {
        fdaaa.verifyAuthorityErrMsg(oversightCountryA+' '+oversightCountryAOrg+' already exists');
        browser.sleep(25).then(callback);
    });

    /*
     Scenario Outline: #15 Warning for null fields on the Trial Regulatory Information screen
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Regulatory Information screen
     And any of the following fields <fields> are null
     When I select save to verify warning message
     Then the following Warning messages <Warning message> will appear and the information associated with the trial will be associated with the trial

     Examples:
     |fields                              |Warning message               |
     |Responsible Party Type              |Responsible Party Types required for Upload to ClinicalTrials.gov|
     |Trial Oversight Authority Country   |Trial Oversight Authority Country is required for Upload to ClinicalTrials.gov|
     |Trial Oversight Authority           |Trial Oversight Authority is required for Upload to ClinicalTrials.gov|
     |FDA Regulated Intervention Indicator|FDA Regulated Intervention Indicator is required for Upload to ClinicalTrials.gov|
     |Section 801 Indicator               |Section 801 Indicator is required for Upload to ClinicalTrials.gov|
     */

    this.Given(/^any of the following fields (.*) are null$/, function (fields, callback) {
        if (fields === 'Responsible Party Type'){
            fdaaa.selectResponsibleParty(reponsblPartyOptionSelect);
        };
        if (fields === 'Trial Oversight Authority Country'){
            fdaaa.selectAuthorityCountry(oversightCountryA);
            fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
            fdaaa.clickAuthorityAddButton();
            fdaaa.selectAuthorityCountry(oversightCountryB);
            fdaaa.selectAuthorityOrganization(oversightCountryBOrg);
            fdaaa.clickAuthorityAddButton();
            fdaaa.selectAuthorityCountry(oversightCountryC);
            fdaaa.selectAuthorityOrganization(oversightCountryCOrg);
            fdaaa.clickAuthorityAddButton();
            fdaaa.selectAuthorityCountry(oversightCountryA);
            fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
            fdaaa.clickAuthorityAddButton();
            fdaaa.verifyAuthorityErrMsg(oversightCountryA+' '+oversightCountryAOrg+' already exists');
            fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryA, oversightCountryAOrg, 'delete', '');
            fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryB, oversightCountryBOrg, 'delete', '');
            fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryC, oversightCountryCOrg, 'delete', '');
        };
        if (fields === 'Trial Oversight Authority'){
            fdaaa.selectAuthorityCountry(oversightCountryA);
            fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
            fdaaa.clickAuthorityAddButton();
            fdaaa.selectAuthorityCountry(oversightCountryB);
            fdaaa.selectAuthorityOrganization(oversightCountryBOrg);
            fdaaa.clickAuthorityAddButton();
            fdaaa.selectAuthorityCountry(oversightCountryC);
            fdaaa.selectAuthorityOrganization(oversightCountryCOrg);
            fdaaa.clickAuthorityAddButton();
            fdaaa.selectAuthorityCountry(oversightCountryA);
            fdaaa.selectAuthorityOrganization(oversightCountryAOrg);
            fdaaa.clickAuthorityAddButton();
            fdaaa.verifyAuthorityErrMsg(oversightCountryA+' '+oversightCountryAOrg+' already exists');
            fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryA, oversightCountryAOrg, 'delete', '');
            fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryB, oversightCountryBOrg, 'delete', '');
            fdaaa.findTrailAuthorityAndDeleteOrVerify(oversightCountryC, oversightCountryCOrg, 'delete', '');
        };

        browser.sleep(25).then(callback);
    });

    this.Then(/^the following Warning messages (.*) will appear and the information associated with the trial will be associated with the trial$/, function (WarningMessage, callback) {
        //Need to add Wanrning Message
        console.log('Warning Message: '+WarningMessage);
        browser.sleep(25).then(callback);
    });







};
