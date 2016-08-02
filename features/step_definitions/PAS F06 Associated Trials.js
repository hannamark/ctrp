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
    var leadProtocolIDA = 'CTRP_01_1777';
    var nctIDA = 'NCT00334282';
    var nctIDB = 'NCT02348710';
    var nciIDA = '';
    var nciIDB = '';
    var optionA = '';
    var optionB = '';
    var optionC = '';
    var optionD = '';
    var pageTtitle = 'List of Associated Trials';
    var pageTtitleA = 'Associated Trial Details';
    var identifierTypeA = 'NCI';
    var identifierTypeB = 'NCT';
    var trialTypeA = '';
    var trialTypeB = 'Interventional';
    var officialTitleA = '';
    var officialTitleB = 'A Randomised, Double-blind, Placebo Controlled, Multi-center Phase III Study to Evaluate the Efficacy and Safety of Pazopanib (GW786034) Compared to Placebo in Patients With Locally Advanced and/or Metastatic Renal Cell Carcinoma';
    var errorMSGITypeRequired = 'Identifier Type is Required';
    var errorMSGTIdentifierRequired = 'Trial Identifier is Required';
    var errorMSGAlreadyExists = 'Error: Trial association already exists';

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
        associated.checkAssociatedTrialPageTitle(pageTtitle, 'list');
        associated.deleteAllAssociatedTrialList('yes');
        browser.sleep(25).then(callback);
    });

    this.When(/^I have selected the Add button$/, function (callback) {
        associated.clickAddAssociatedTrial();
        browser.sleep(25).then(callback);
    });

    this.Then(/^I am on the Add Associated Trial screen$/, function (callback) {
        associated.checkAssociatedTrialPageTitle(pageTtitleA, 'details');
        browser.sleep(25).then(callback);
    });

    this.Then(/^I must select (.*)$/, function (IdentifierType, table, callback) {
        var idenType = table.raw();
        optionType = idenType.toString().replace(/,/g, "\n", -1);
        console.log('Value(s) in the data table:[' + idenType +']');
        var optionTypeSplt = optionType.toString().split("\n");
        optionA = optionTypeSplt[1];
        optionB = optionTypeSplt[2];
        associated.selectIdentifierType(optionB);
        browser.sleep(25).then(callback);
    });

    this.Then(/^I must enter the Trial Identifier$/, function (callback) {
        associated.setTrialIdentifierTxt(nctIDA);
        browser.sleep(25).then(callback);
    });

    this.When(/^I click the Look Up Trial button$/, function (callback) {
        associated.clickLookupTrial();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the Requested Trial is retrieved$/, function (table, callback) {
        console.log('******************* Need clarification for this step **********************');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Clinical Research Category populates$/, function (callback) {
        associated.verifyResearchCategoryLookup(trialTypeB);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Official Title populates$/, function (callback) {
        associated.verifyOfficialTitleLookup(officialTitleB);
        browser.sleep(25).then(callback);
    });

    this.When(/^I have clicked the Save button$/, function (callback) {
        associated.clickSaveAssociated();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the associated study displays on the Associated Trials screen$/, function (callback) {
        associated.findAssociatedTrialToVerifyEditCopyDelete(nctIDA, 'verify', optionB, trialTypeB, officialTitleB);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Message Record Created displays$/, function (callback) {
        console.log('Popup successful message verification is out of scope');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Associated Trial will be associated with the trial$/, function (callback) {

        browser.sleep(25).then(callback);
    });


};
