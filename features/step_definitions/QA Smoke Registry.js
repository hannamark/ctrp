/**
 * Created by singhs10 on 7/15/16.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage = require('../support/projectMethods');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
var helperFunctions = require('../support/helper');
var moment = require('moment');
var searchTrialPage = require('../support/searchTrialPage');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
var loginPage = require('../support/LoginPage');
var importTrialPage = require('../support/registerImportTrialPage');
var menuItemList = require('../support/PoCommonBar');
var databaseConnection = require('../support/databaseConnection');
var Q = require('q');
var assert = require('assert');
var participatingSitePage = require('../support/registerAddParticipatingSite');
var searchOrgPage = require('../support/ListOfOrganizationsPage');
var searchPeoplePage = require('../support/ListOfPeoplePage');
var addPeoplePage = require('../support/AddPersonPage');
var searchFamilyPage = require('../support/ListOfFamiliesPage');
var addFamilyPage = require('../support/AddFamilyPage');
var selectValuePage = require('../support/CommonSelectList');


module.exports = function () {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var helper = new helperFunctions();
    var searchTrial = new searchTrialPage();
    var commonFunctions = new abstractionCommonMethods();
    var login = new loginPage();
    var importTrial = new importTrialPage();
    var menuItem = new menuItemList();
    var dbConnect = new databaseConnection();
    var participatingSite = new participatingSitePage();
    var searchOrg = new searchOrgPage();
    var searchPeople = new searchPeoplePage();
    var addPeople = new addPeoplePage();
    var searchFamily = new searchFamilyPage();
    var addFamily = new addFamilyPage();
    var selectValue = new selectValuePage();

    var getDBConnection = '';

    var protocolDoc = 'testSampleDocFile.docx';
    var IRBDoc = 'testSampleXlsFile.xls';

   


    this.Given(/^I am logged in to CTRP Registry application with User "([^"]*)"$/, function (arg1, callback) {
        loggedInUser = arg1;
        commonFunctions.onPrepareLoginTest(arg1);
        browser.driver.wait(function () {
            console.log('wait here');
            return true;
        }, 40).then(function () {
            trialMenuItem.clickHomeSearchTrial();
            login.clickWriteMode('On');
        });
        browser.sleep(25).then(callback);
    });


    this.Given(/^I want to create a Trial with Study Source (.*)$/, function (trialType, callback) {
        trialType1 = trialType;
        browser.sleep(25).then(callback);
    });

    this.Given(/^Lead Organization Trial Identifier: (.*), Other Clinical Trial ID:  (.*), Other Obsolete Clinical Trial ID: (.*), Other Identifier: (.*)$/, function (leadOrgIdentifier, otherClinicalTrialID, otherObsoleteClinicalTrialID, otherIdentifier, callback) {
        leadOrgIdentifier1 = leadOrgIdentifier + moment().format('hmmss');
        otherClinicalTrialID1 = otherClinicalTrialID;
        otherObsoleteClinicalTrialID1 = otherObsoleteClinicalTrialID;
        otherIdentifier1 = otherIdentifier;
        browser.sleep(25).then(callback);
    });

    this.Given(/^Official Title: (.*), Phase: (.*), Pilot: (.*), Research Category: (.*), Primary Purpose: (.*), Secondary Purpose (.*), Accrual Disease Terminology: (.*)$/, function (officialTitle, phase, pilotOption, researchCategory, primaryPurpose, secondaryPurpose, accrualDisease, callback) {
        officialTitle1 = officialTitle;
        phase1 = phase;
        pilotOption1 = pilotOption;
        researchCategory1 = researchCategory;
        primaryPurpose1 = primaryPurpose;
        secondaryPurpose1 = secondaryPurpose;
        accrualDisease1 = accrualDisease;
        browser.sleep(25).then(callback);
    });

    this.Given(/^Lead Organization: (.*) Principal Investigator: (.*) Sponsor: (.*) Data Table Funding Source: (.*) Program code: (.*)$/, function (leadOrg, principalInv, sponsorOrg, dataTableOrg, programCode, callback) {
        leadOrg1 = leadOrg;
        console.log('LEad org: ' + leadOrg1);
        console.log('LEad org: ' + leadOrg);
        principalInv1 = principalInv;
        console.log('Principal Investigator: '+principalInv1);
        console.log('Principal Investigator: '+principalInv);
        sponsorOrg1 = sponsorOrg;
        console.log('sponsor Org : '+ sponsorOrg1);
        console.log('sponsor Org : '+ sponsorOrg);
        dataTableOrg1 = dataTableOrg;
        console.log('Data Table Org : '+ dataTableOrg1);
        console.log('Data Table Org : '+ dataTableOrg);
        programCode1 = programCode;
        browser.sleep(25).then(callback);
    });

    this.Given(/^NCI Grant: (.*), Funding Mechanism: (.*), Institute Code: (.*), Serial Number: (.*), NCI Division: (.*)$/, function (grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode, callback) {
        grantOption1 = grantOption;
        grantFundingMechanism1 = grantFundingMechanism;
        grantInstituteCode1 = grantInstituteCode;
        grantSerialNumber1 = grantSerialNumber;
        grantNCIDivisionCode1 = grantNCIDivisionCode;
        browser.sleep(25).then(callback);
    });

    this.Given(/^Trial status: (.*), Comment: (.*), Why Study Stopped: (.*)$/, function (trialStatus, trialComment, trialWhyStudyStopped, callback) {
        trialStatus1 = trialStatus;
             trialComment1 = trialComment;
             trialWhyStudyStopped1 = trialWhyStudyStopped;
        browser.sleep(25).then(callback);
    });

    this.Given(/^IND IDE info: (.*),IND IDE Type: (.*),IND IDE Number: (.*), IND IDE Grantor: (.*), IND IDE Holder: (.*), IND IDE Institution: (.*)$/, function (INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution, callback) {
        INDIDEOption1 = INDIDEOption;
        INDIDEType1 = INDIDEType;
        INDIDENumber1 = INDIDENumber;
        INDIDEGrantor1 = INDIDEGrantor;
        INDIDEHolder1 = INDIDEHolder;
        INDIDEInstitution1 = INDIDEInstitution;
        browser.sleep(25).then(callback);
    });

    this.Given(/^Responsible party: (.*), Trial Oversight Country: (.*), Trial Oversight Organization: (.*), FDA Regulated Indicator: (.*), section Indicator: (.*), data Monitoring Indicator: (.*)$/, function (responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator, callback) {
        responsibleParty1 = responsibleParty;
        console.log('responsibleParty');
        console.log(responsibleParty);
        trialOversightCountry1 = trialOversightCountry;
        console.log('trialOversightCountry');
        console.log(trialOversightCountry);
        trialOversightOrg1 = trialOversightOrg;
        console.log('trialOversightOrg');
        console.log(trialOversightOrg);
        FDARegulatedIndicator1 = FDARegulatedIndicator;
        section801Indicator1 = section801Indicator;
        dataMonitoringIndicator1 = dataMonitoringIndicator;
        browser.sleep(25).then(callback);
    });

    this.Given(/^Protocol Document: (.*), IRB Approval: (.*), List of Participating Sites: (.*), Informed Consent Document: (.*), Other: (.*)$/, function (protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc, callback) {
        protocolDoc1 = protocolDoc;
        IRBDoc1 = IRBDoc;
        participatingSiteDoc1 = participatingSiteDoc;
        informedConsentDoc1 = informedConsentDoc;
        otherDoc1 = otherDoc;
        browser.sleep(25).then(callback);
    });

    this.Then(/^I should be either able to Submit Trial OR Save as Draft (.*)$/, function (saveDraftOrSubmitTrial, callback) {
        saveDraftOrSubmitTrial1 = saveDraftOrSubmitTrial;
        projectFunctionsRegistry.createNewTrial(loggedInUser, trialType1, leadOrgIdentifier1, otherClinicalTrialID1, otherObsoleteClinicalTrialID1, otherIdentifier1, officialTitle1, phase1, pilotOption1, researchCategory1, primaryPurpose1, secondaryPurpose1, accrualDisease1, leadOrg1, principalInv1, sponsorOrg1, dataTableOrg1, programCode1, grantOption1, grantFundingMechanism1, grantInstituteCode1, grantSerialNumber1, grantNCIDivisionCode1, trialStatus1, trialComment1, trialWhyStudyStopped1, INDIDEOption1, INDIDEType1, INDIDENumber1, INDIDEGrantor1, INDIDEHolder1, INDIDEInstitution1, responsibleParty1, trialOversightCountry1, trialOversightOrg1, FDARegulatedIndicator1, section801Indicator1, dataMonitoringIndicator1, protocolDoc1, IRBDoc1, participatingSiteDoc1, informedConsentDoc1, otherDoc1, saveDraftOrSubmitTrial1 );
        browser.sleep(25).then(callback);
    });



    this.When(/^I go to Search Trial page$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.Then(/^I should be able to search with the created Trial Lead Org Identifier$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.Given(/^I click on the Trial from Search page$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.Then(/^It should display Trial with above Trial parameters$/, function (callback) {
        browser.sleep(25).then(callback);
    });





};