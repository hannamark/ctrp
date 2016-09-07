/**
 * Author: Shamim Ahmed
 * Date: 07/25/2016
 * Feature: PAS F04 Associated Trial.Feature
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
//Scientific Associated Trial
var scientificAssociatedTrial = require('../support/scientificAssociatedTrials');
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
    var associated = new scientificAssociatedTrial();
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchPeople = new searchPeoplePage();
    var searchTableHeader = '';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1789';
    var leadProtocolIDA = 'CTRP_01_1781';
    var leadProtocolIDB = 'CTRP_01_1797';
    var nctIDA = 'NCT00334282';
    var nctIDB = 'NCT02348710';
    var nciIDA = 'NCI-2015-01997';
    var nciIDB = 'NCI-2011-02309';
    var nciIDNotFound = 'NCI-2016-NOTFOUND';
    var nciIDRejected = 'NCI-2017-01010';
    var optionA = '';
    var optionB = '';
    var pageTitle = 'List of Associated Trials';
    var pageTitleA = 'Associated Trial Details';
    var identifierTypeA = 'NCI';
    var identifierTypeB = 'NCT';
    var trialTypeA = 'Interventional';
    var officialTitleA = 'A Randomised, Double-blind, Placebo Controlled, Multi-center Phase III Study to Evaluate the Efficacy and Safety of Pazopanib (GW786034) Compared to Placebo in Patients With Locally Advanced and/or Metastatic Renal Cell Carcinoma';


    /*
     Scenario: #1 I can add an Associated Trial for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Associated Trials screen
     When  I have selected the Add button
     Then I am on the Add Associated Trial screen
     And I must select <IdentifierType>
     |IdentifierType  |
     |NCI              |
     |NCT              |
     And I must enter the Trial Identifier
     When I click the Look Up Trial button
     Then the Requested Trial is retrieved
     |Identifier type  |Retrieved from         |
     |NCI              |CTRP                   |
     |NCT              |ClinicalTrials.gov     |
     And the Clinical Research Category populates
     And the Official Title populates
     When I have clicked the Save button
     Then the associated study displays on the Associated Trials screen
     And the Message Record Created displays
     And the Associated Trial will be associated with the trial
     */

    this.Given(/^I am on the Associated Trials screen$/, function (callback) {
        leftNav.clickScientificAssociatedTrials();
        associated.checkAssociatedTrialPageTitle(pageTitle, 'list');
        associated.deleteAllAssociatedTrialList('yes');
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected the Add button$/, function (callback) {
        associated.clickAddAssociatedTrial();
        browser.sleep(25).then(callback);
    });

    this.Then(/^I am on the Add Associated Trial screen$/, function (callback) {
        associated.checkAssociatedTrialPageTitle(pageTitleA, 'details');
        browser.sleep(25).then(callback);
    });

    this.Then(/^I must select (.*)$/, function (IdentifierType, table, callback) {
        var idenType = table.raw();
        optionType = idenType.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + idenType +']');
        var optionTypeSplt = optionType.toString().split("\n");
        optionA = optionTypeSplt[1];
        optionB = optionTypeSplt[2];
        associated.selectIdentifierType(optionA);
        browser.sleep(25).then(callback);
    });

    this.Then(/^I must enter the Trial Identifier$/, function (callback) {
        associated.setTrialIdentifierTxt(nciIDA);
        browser.sleep(25).then(callback);
    });

    this.When(/^I click the Look Up Trial button$/, function (callback) {
        associated.clickLookupTrial();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the Requested Trial is retrieved from the respective system \(CTRP for NCI and ClinicalTrials\.gov for NCT\)$/, function (callback) {

        browser.sleep(25).then(callback);
    });

    this.Then(/^the Clinical Research Category populates$/, function (callback) {
        associated.verifyResearchCategoryLookup(trialTypeA);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Official Title populates$/, function (callback) {
        associated.verifyOfficialTitleLookup(officialTitleA);
        browser.sleep(25).then(callback);
    });

    this.When(/^I have clicked the Save button$/, function (callback) {
        associated.clickSaveAssociated();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the associated study displays on the Associated Trials screen$/, function (callback) {
        associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'verify', optionA, trialTypeA, officialTitleA);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Message Record Created displays$/, function (callback) {
        console.log('Popup successful message verification is out of scope');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Associated Trial will be associated with the trial$/, function (callback) {
        associated.verifyAssociatedListTableTHead();
        browser.sleep(25).then(callback);
    });

    this.Then(/^I can select the (.*) and the trial is (.*) displayed$/, function (IdentifierIdentifier, Retrievedfrom, table, callback) {
        associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'link', optionA, trialTypeA, officialTitleA);
        associated.verifyViewAssociatedTrialNCI(leadProtocolIDA, nciIDA, nctIDA, '', '');
        associated.clickViewCloseBtn();
        browser.sleep(25).then(callback);
    });

    /*

     Scenario: #2   corresponding Associated Trial records will be created for both associated trials
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Associated Trials screen
     When  I have selected the Add button
     Then I am on the Add Associated Trial screen
     And the added Associated Trial is a CTRP study
     When the Associated Trial is displayed on the Associated Trials screen
     Then the <AssociatedTrialFields> on the Associated Trials screen of the Associated Trial study are added

     Scenario Outline: #2   corresponding Associated Trial records will be created for both associated trials
     Given the added Associated Trial is a CTRP study
     When the Associated Trial is displayed on the Associated Trials screen
     Then the <AssociatedTrialFields> on the Associated Trials screen of the Associated Trial study are added

     |AssociatedTrialFields        |
     |Identifier Type              |
     |Trial Identifier             |
     |Clinical Research Category   |
     |Official Title               |
     */

    this.Given(/^I am on the Add Associated Trials screen$/, function (callback) {
        pageMenu.clickSearchTrialAbstractor();
        pageMenu.clickTrials();
        pageMenu.clickSearchTrialsPA();
        helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolID);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.clickLinkText(leadProtocolID);
        leftNav.scientificCheckOut();
        leftNav.clickScientificAssociatedTrials();
        associated.checkAssociatedTrialPageTitle(pageTitle, 'list');
        associated.deleteAllAssociatedTrialList('yes');
        associated.clickAddAssociatedTrial();
        browser.sleep(25).then(callback);
    });

    this.Given(/^the added Associated Trial is a CTRP study$/, function (callback) {

        browser.sleep(25).then(callback);
    });

    this.When(/^the Associated Trial is displayed on the Associated Trials screen$/, function (callback) {
        associated.selectIdentifierType(identifierTypeA);
        associated.setTrialIdentifierTxt(nciIDA);
        associated.clickLookupTrial();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the (.*) on the Associated Trials screen of the Associated Trial study are added$/, function (AssociatedTrialFields, table, callback) {
        var AssociatedTrialFields = table.raw();
        optionFields = AssociatedTrialFields.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + AssociatedTrialFields +']');
        var optionTypeSplt = optionFields.toString().split("\n");
        optionFieldsA = optionTypeSplt[1];
        optionFieldsB = optionTypeSplt[2];
        optionFieldsC = optionTypeSplt[3];
        optionFieldsD = optionTypeSplt[4];
        helper.getVerifyLabel(associated.identifierTypeLstLbl, optionFieldsA, 'Verify Identifier Type field');
        helper.getVerifyLabel(associated.trialIdentifierTxtLbl, optionFieldsB, 'Verify Trial Identifier field');
        helper.getVerifyLabel(associated.researchCategoryVwLbl, optionFieldsC, 'Verify Research Category field');
        helper.getVerifyLabel(associated.officialTitleVwLbl, optionFieldsD, 'Verify Official Title field');
        associated.clickSaveAssociated();
        associated.verifyAssociatedListTableTHead();
        associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'verify', identifierTypeA, trialTypeA, officialTitleA);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #3 Associated Trial is not found
     Given I am on the Add Associated Trials screen
     And  I have selected Identifier Type
     And I have entered the Trial Identifier
     And I have selected the Look Up Trial button
     When trial identifer is not found
     Then the message 'Trial is not found' displays
     */

    this.Given(/^I have selected Identifier Type$/, function (callback) {
        associated.selectIdentifierType(identifierTypeA);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered the Trial Identifier$/, function (callback) {
        associated.setTrialIdentifierTxt(nciIDNotFound);
        browser.sleep(250).then(callback);
    });

    this.Given(/^I have selected the Look Up Trial button$/, function (callback) {
        associated.clickLookupTrial();
        browser.sleep(25).then(callback);
    });

    this.When(/^trial identifer is not found$/, function (callback) {

        browser.sleep(25).then(callback);
    });

    this.Then(/^the message 'Trial is not found' displays$/, function (callback) {
        msgNotFound = 'Trial is not found';
        commonFunctions.verifyTxtByIndex(associated.notFoundMsg, msgNotFound, '0', 'Verify Trial is not found message');
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #3a Associated Trial is not rejected
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Add Associated Trials screen
     And I have selected Identifier Type of NCI
     And I have entered the rejected Trial Identifier
     And I have selected the Look Up Trial button
     And the trial does not have a last active submission
     Then the message 'Trial is not found' displays
     */

    this.Given(/^I have selected Identifier Type of NCI$/, function (callback) {
        associated.selectIdentifierType(identifierTypeA);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have entered the rejected Trial Identifier$/, function (callback) {
        associated.setTrialIdentifierTxt(nciIDRejected);
        browser.sleep(25).then(callback);
    });

    this.Given(/^the trial does not have a last active submission$/, function (callback) {
        pageMenu.clickSearchTrialAbstractor();
        pageMenu.clickTrials();
        pageMenu.clickSearchTrialsPA();
        helper.alertDialog('OK', 'Are you sure you want to leave this page? You may have unsaved changes.');
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(nciIDRejected);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.clickLinkText(nciIDRejected);
        checkLastActiveSubmission = 'Last Submitter:';
        associated.verifyTrialOverview('9', checkLastActiveSubmission);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario:  #4 Trial Identifier information not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Add Associated Trials screen
     And the Trial Identifier is Null
     When I click on 'Look Up Trial' button
     Then an error message will appear "Trial Identifier is Required”
     */

    this.Given(/^the Trial Identifier is Null$/, function (callback) {
        associated.setTrialIdentifierTxt('');
        browser.sleep(25).then(callback);
    });

    this.When(/^I click on 'Look Up Trial' button$/, function (callback) {
        associated.clickLookupTrial();
        browser.sleep(25).then(callback);
    });

    this.Then(/^an error message will appear "Trial Identifier is Required”$/, function (callback) {
        errorMSGTI = 'Trial Identifier is Required';
        commonFunctions.verifyTxtByIndex(associated.requiredMsg, errorMSGTI, '0', 'Verify Trial Identifier is Required');
        browser.sleep(25).then(callback);
    });

    /*
     Scenario:  #5 Identifier Type not null
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Add Associated Trials screen
     And the Identifier Type is Null
     When I click on 'Look Up Trial' button
     Then an error message will appear "Identifier Type is Required”
     */

    this.Given(/^the Identifier Type is Null$/, function (callback) {
        var idenTypNull = '-- Please select a trial identifier type...';
        associated.selectIdentifierType(idenTypNull);
        browser.sleep(25).then(callback);
    });

    this.Then(/^an error message will appear "Identifier Type is Required”$/, function (callback) {
        errorMSGIT = 'Identifier Type is Required';
        commonFunctions.verifyTxtByIndex(associated.requiredMsg, errorMSGIT, '0', 'Verify Identifier Type is Required');
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #6 Deleted Associated Trials
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Associated Trials screen
     And I have checked the Delete box for an Associated Trial
     And I have selected the delete check box for another Associated Trial
     When I have clicked on Delete button
     Then the message displays 'click OK to remove selected Associated Trial(s) from the study. Click Cancel to abort'
     When I have clicked on the cancel button
     Then the Associated Trial(s) is not removed
     And no message displays
     And I have clicked on OK
     Then the Associated Trial will be removed from the trial
     When I have clicked the Select All button
     Then the Delete check box is checked for all entries
     When I have clicked on Delete button
     Then the message displays 'Click OK to remove selected Associated Trial(s) from the study. Click Cancel to abort'
     When I have clicked on the cancel button
     Then the Associated Trial is not removed
     And no message displays
     When I click on the OK button
     Then the Associated Trial(s) is removed from the trial record
     And the message ‘Record(s) deleted’ displays
     */

    this.Given(/^I have checked the Delete box for an Associated Trial$/, function (callback) {
        associated.clickAddAssociatedTrial();
        associated.selectIdentifierType(identifierTypeA);
        associated.setTrialIdentifierTxt(nciIDA);
        associated.clickLookupTrial();
        associated.clickSaveAssociated();
        associated.clickAddAssociatedTrial();
        associated.selectIdentifierType(identifierTypeA);
        associated.setTrialIdentifierTxt(nciIDB);
        associated.clickLookupTrial();
        associated.clickSaveAssociated();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the delete check box for another Associated Trial$/, function (callback) {
        associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'delete', identifierTypeA, trialTypeA, officialTitleA);
        browser.sleep(25).then(callback);
    });

    this.When(/^I have clicked on Delete button$/, function (callback) {

        browser.sleep(25).then(callback);
    });

    this.Then(/^the message displays 'click OK to remove selected Associated Trial\(s\) from the study\. Click Cancel to abort'$/, function (callback) {

        browser.sleep(25).then(callback);
    });

    this.When(/^I have clicked on the cancel button$/, function (callback) {
        associated.clickDeleteSelectedAssocaited('cancel');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Associated Trial\(s\) is not removed$/, function (callback) {
        associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'verify', identifierTypeA, trialTypeA, officialTitleA);
        browser.sleep(25).then(callback);
    });

    this.Then(/^no message displays$/, function (callback) {

        browser.sleep(25).then(callback);
    });

    this.Then(/^I have clicked on OK$/, function (callback) {
        associated.clickDeleteSelectedAssocaited('yes');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Associated Trial will be removed from the trial$/, function (callback) {
        associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'notexists', identifierTypeA, trialTypeA, officialTitleA);
        browser.sleep(25).then(callback);
    });

    this.When(/^I have clicked the Select All button$/, function (callback) {
        associated.clickAddAssociatedTrial();
        associated.selectIdentifierType(identifierTypeA);
        associated.setTrialIdentifierTxt(nciIDA);
        associated.clickLookupTrial();
        associated.clickSaveAssociated();
        associated.selectAllAssociatedTrial();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Delete check box is checked for all entries$/, function (callback) {

        browser.sleep(25).then(callback);
    });

    this.When(/^I have clicked on Delete button for all entries$/, function (callback) {
        //associated.clickDeleteButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the message displays 'Click OK to remove selected Associated Trial\(s\) from the study\. Click Cancel to abort'$/, function (callback) {

        browser.sleep(25).then(callback);
    });

    this.Then(/^the Associated Trial is not removed$/, function (callback) {
        associated.findAssociatedTrialToVerifyEditCopyDelete(nciIDA, 'verify', identifierTypeA, trialTypeA, officialTitleA);
        associated.selectAllAssociatedTrial();
        browser.sleep(25).then(callback);
    });

    this.When(/^I click on the OK button$/, function (callback) {
        associated.deleteAllAssociatedTrialList('yes');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Associated Trial\(s\) is removed from the trial record$/, function (callback) {
        associated.verifyDeleteAllAssociatedTrialList();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the message ‘Record\(s\) deleted’ displays$/, function (callback) {

        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #7 Reset Add Associated Trial for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Add Associated Trials screen
     And I have entered Identifier Type and Trial Identifier
     And I have selected 'Look Up Trial' button
     And Clinical Research Category and Official Title have populated
     When I select the Reset button
     Then the information on the Add Associated Trial screen will not be saved to the trial record
     And the Associated Trials screen displays
     */

    this.Given(/^I have entered Identifier Type and Trial Identifier$/, function (callback) {
        associated.selectIdentifierType(identifierTypeA);
        associated.setTrialIdentifierTxt(nciIDA);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected 'Look Up Trial' button$/, function (callback) {
        associated.clickLookupTrial();
        browser.sleep(25).then(callback);
    });

    this.Given(/^Clinical Research Category and Official Title have populated$/, function (callback) {
        associated.verifyResearchCategoryLookup(trialTypeA);
        associated.verifyOfficialTitleLookup(officialTitleA);
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the Reset button$/, function (callback) {
        associated.clickResetAssociated();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the information on the Add Associated Trial screen will not be saved to the trial record$/, function (callback) {
        associated.clickBackToAssociatedTrialList();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Associated Trials screen displays$/, function (callback) {
        associated.verifyDeleteAllAssociatedTrialList();
        browser.sleep(25).then(callback);
    });


};
