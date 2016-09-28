/**
 * Author: Shamim Ahmed
 * Date: 08/24/2016
 * Feature: PAS F02 Add and Edit Trial Design.Feature
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
//Scientific Trial Design
var scientificTrialDesign = require('../support/scientificTrialDesign');
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
    var trialDesign = new scientificTrialDesign();
    var searchOrg = new OrgPage();
    var organizationSearch = new orgSearch();
    var addTrial = new addTrialPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var searchPeople = new searchPeoplePage();
    var searchTableHeader = '';
    var randNmbr = Math.floor(Math.random()*(95-77+1)+77);
    var leadProtocolID = 'CTRP_01_1789';
    var pageTtitle = 'Trial Design';
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
    var clinicalResearchCategoryValue = '';
    var clinicalResearchCategoryNewValue = '';
    var optionA = '';
    var optionB = '';
    var optionC = '';
    var optionD = '';

    /*
     Scenario: #1 I can change Clinical research Category for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I have selected a trial
     And I am on the Trial Design screen
     When I view the prefilled Clinical Research Category value
     Then I can select a different value

     |Interventional             |
     |Expanded Access            |
     |Observational              |
     |Ancillary Correlative      |
     */

    this.Given(/^I am on the Trial Design screen$/, function () {
        return browser.sleep(25).then(function() {
            leftNav.clickScientificTrialDesign();
            leftNav.checkPanelTitle(pageTtitle, '6');
        });
    });

    this.When(/^I view the prefilled Clinical Research Category value$/, function () {
        return browser.sleep(25).then(function() {
            trialDesign.researchCategoryLst.$('option:checked').getText().then(function (value) {
                var crntCRCValue = '' + value + '';
                function retCRCVal() {
                    return crntCRCValue;
                }
                clinicalResearchCategoryValue = retCRCVal();
                console.log('System Identified [' + clinicalResearchCategoryValue + '] as the current Clinical Research Category value');
            });
        });
    });

    this.Then(/^I can select a different value$/, function (table) {
        return browser.sleep(25).then(function() {
            var clinicalRCVal = table.raw();
            optionCRCValues = clinicalRCVal.toString().replace(/,/g, "\n", -1);
            console.log('Value(s) in the data table:[' + optionCRCValues +']');
            var optionCRC = optionCRCValues.toString().split("\n");
                optionA = optionCRC[0]; //Interventional
                optionB = optionCRC[1]; //Expanded Access
                optionC = optionCRC[2]; //Observational
                optionD = optionCRC[3]; //Ancillary Correlative

            if (clinicalResearchCategoryValue === optionA) {
                trialDesign.selectClinicalResearchCategory(optionB);
                var pasNewCRCValue = optionB; //Expanded Access
                function retNewCRCValue() {
                    return pasNewCRCValue;
                }
                clinicalResearchCategoryNewValue = retNewCRCValue();
                verifyCurrentCRC(clinicalResearchCategoryNewValue, "Verifying Clinical Research Category Selected Value from the list");
            }

            function verifyCurrentCRC(expectCRC, errorMessage) {
                helper.getVerifyListValue(trialDesign.researchCategoryLst, expectCRC, errorMessage);
            }
        });
    });







};
