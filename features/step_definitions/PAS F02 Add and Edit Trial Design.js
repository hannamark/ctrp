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



};
