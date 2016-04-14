/**
 * Author: Shamim Ahmed
 * Date: 04/01/2016
 * Feature: PAA F08 Add and Edit Trial Participating Sites.Feature
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
    var leadProtocolIDE = 'CTRP_01_1782';
    var leadProtocolIDF = 'CTRP_01_1783';
    var leadProtocolIDG = 'CTRP_01_1784';
    var leadProtocolIDH = 'CTRP_01_1785';
    var leadProtocolIDI = 'CTRP_01_1786';
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
    var tblOptionADup = '';
    var tblOptionBDup = '';
    var tblOptionCDup = '';
    var tblOptionDDup = '';
    var tblOptionEDup = '';

    /*
     Scenario Outline: #1 I can add one or more a participating sites for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Participating Site Page
     And I have selected an organization <Organization name> with the Organization look up
     And I have entered or edited the Local Trial Identifier <Local Trial Identifier>
     And I have selected one or more Site Recruitment Status <Site Recruitment Status>
     And I have selected one or more Site Recruitment status date <Site Recruitment Status Date>
     And I have entered Site Recruitment status comments <Site Recruitment status comments>
     And I have entered the program code <Site Specific Program Code>
     And I have entered a Target Accrual Number <Target Accrual Number>
     And I have selected one or more Investigators <Site Principal Investigator> for each Participating Site with the person look up
     And I have selected the role for each investigator <Site Principal Investigator Role>
     |Principal Investigator|
     |Sub Investigator|
     And I have selected the �Set as Site Contact" for an investigator when the investigator is the Participating site contact
     And I have edited the phone number for the investigator contact <Phone>
     And I have edited the phone number extension <Ext> for the investigator contact
     And I have edited the contact e-mail for the contact <e-mail address>
     And I have selected the �Set as Site Contact" for a central contact <Central Contact> when the central contact for the participating site is generic
     And I have added or edited the contact phone number for the contact <Phone>
     And I have added or edited the contact phone number extension <Ext> for the contact
     And I have added or edited the contact e-mail for the contact <e-mail address>
     Then the participating site information will be associated with the trial
     And the organization address information <Org City> and <Org State> and <Org Country> and <Org zip code> will be associated with the trial
     And the system will display the list of participating sites ordered assending alphanumeric by participationg site name
     Examples:
     |Organization name|Org City|Org State|Org Country|Org zip code|Local Trial Identifier|Site Recruitment Status|Site Recruitment Status Date|Site Recruitment status comments|Site Specific Program Code|Target Accrual Number|Site Principal Investigator|Site Principal Investigator Role|Central Contact      |Phone         |Ext |e-mail address|
     |Mayo             |New York|NY       |USA        |10101       |123                   |Approved               |30-Sep-2015                 |Free Text                       |48                        |100                  |Jane Doe                   |Principal Investigator          |Jane Doe             |212-123-4567  |1111|jane@mayo.com |
     */



    /*
     Scenario Outline: #2 I can edit a participating site for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Participating Site Page
     And I have selected the Participating site <Organization name>
     And I have entered or edited the Local Trial Identifier <Local Trial Identifier>
     And I have selected one or more Site Recruitment Status <Site Recruitment Status>
     And I have selected one or more Site Recruitment status date <Site Recruitment Status Date>
     And I have entered Site Recruitment status comments <Site Recruitment status comments>
     And I have entered or edited the program code <Site Specific Program Code>
     And I have entered or edited the Target Accrual Number <Target Accrual Number>
     And I have selected one or more Investigators <Site Principal Investigator> for each Participating Site with the person look up
     And I have selected the role for each investigator <Site Principal Investigator Role>
     |Principal Investigator|
     |Sub Investigator|
     And I have selected the �Set as Site Contact" for an investigator when the investigator is the Participating site contact
     And I have edited the phone number for the investigator contact <Phone>
     And I have edited the phone number extension <Ext> for the investigator contact
     And I have edited the contact e-mail for the contact <e-mail address>
     And I have selected the �Set as Site Contact" for a central contact <Central Contact> when the central contact for the participating site is generic
     And I have added or edited the contact phone number for the contact <Phone #>
     And I have added or edited the contact phone number extension <Ext> for the contact
     And I have added or edited the contact e-mail for the contact <e-mail address>
     Then the participating site information will be associated with the trial
     And the organization address information <Org City> and <Org State> and <Org Country> and <Org zip code> will be associated with the trial
     And the system will display the list of participating sites ordered assending alphanumeric by participationg site name
     */

    /*
     Scenario: #3 Delete participating site information for a trial
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Participating Site Page
     And I select one or more participating sites
     When select delete participationg sites
     Then the Participating Site will be removed from the trial record
     */



};
