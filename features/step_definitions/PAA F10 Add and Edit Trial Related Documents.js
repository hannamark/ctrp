/**
 * Author: Shamim Ahmed
 * Date: 03/22/2016
 * Feature: PAA F10 Add and Edit Trial Related Documents
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
    var selectOptionSelect = '- Please select a document type ...';
    var selectOptionChangeMemo = 'Change Memo Document';
    var selectOptionComplete = 'Complete Sheet';
    var selectOptionIRB = 'IRB Approval';
    var selectOptionInformed = 'Informed Consent';
    var selectOptionListOfParti = 'List of Participating Sites';
    var selectOptionOther = 'Other';
    var selectOptionProtocolDoc = 'Protocol Document';
    var selectOptionProtocolHigh = 'Protocol Highlighted Document';
    var selectOptionTSR = 'TSR';
    var randomDocSelection = '';
    var randomDocTypSelection = '';

    /*
     Scenario: #1 I can add Trial Related Documents
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     When I select add a document
     And have browsed and selected file to attach
     And have selected the Document type from the list of:
     |Protocol Document|
     |IRB Approval Document|
     |Informed Consent Document|
     |Participating Sites|
     |Protocol Highlighted Document|
     |TSR|
     |Complete Sheet|
     |Change Memo|
     |Other|
     And have entered a Description of the Document when the document type is Other
     Then the Trial Related Document will be associated with the trail
     And the date the document was will be listed with the document
     And the users name that added the document will be listed with the document
     And the document will be ordered by date with the newest document first
     */

    this.Given(/^I am on the Trial Related Documents screen$/, function (callback) {
        pageMenu.homeSearchTrials.click();
        login.clickWriteMode('On');
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDD);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDD);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialRelatedDocument();
        trialCollaborators.waitForElement(trialDoc.trialDocSelectADocList, "Trial Related Documents - Select a Document - Drop down");
        helper.verifyElementDisplayed(trialDoc.trialDocBrowse, true);
        helper.verifyElementDisplayed(trialDoc.trialDocAddButton, true);
        helper.verifyElementDisplayed(trialDoc.trialDocSave, true);
        helper.verifyElementDisplayed(trialDoc.trialDocReset, true);
        browser.sleep(25).then(callback);
    });

    this.When(/^I select add a document$/, function (callback) {
        randomDocSelection = '';
        var randomDoc = '';
        var randNmbr = Math.floor(Math.random()*(1-4+1)+4).toString();
        console.log("Random NM: "+randNmbr);
        if (randNmbr === '1'){
            randomDoc = 'testSampleEXCELFile.xlsx';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '2'){
            randomDoc = 'testSampleDocFile1997_2004v.doc';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '3'){
            randomDoc = 'testSampleDocFile.docx';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '4'){
            randomDoc = 'testSamplePDFFile.pdf';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '5'){
            randomDoc = 'testSampleRichTextFile.rtf';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        }
        browser.sleep(25).then(callback);
    });

    this.When(/^have browsed and selected file to attach$/, function (callback) {
        trialDoc.trialRelatedFileUpload('PA', '1', randomDocSelection);
        browser.sleep(25).then(callback);
    });

    this.When(/^have selected the Document type from the list of:$/, function (table, callback) {
        var strVal = '';
        selectDcoumentTableVal = table.raw();
        strVal = selectDcoumentTableVal.toString().replace(/,/g, "\n", -1);
        console.log('Select Document Type value(s) in the data table:[' + strVal +']');
        trialDoc.trialDocSelectADocList.getText().then(function(items) {
            console.log('Trial Document Type value(s) in the list object:['+ items +']');
            expect(items.toString().split("\n")).to.eql(strVal.toString().split("\n"));
        });
        var tableDataSplt = strVal.toString().split("\n");
        tblOptionA = tableDataSplt[0];
        tblOptionB = tableDataSplt[1];
        tblOptionC = tableDataSplt[2];
        tblOptionD = tableDataSplt[3];
        tblOptionE = tableDataSplt[4];
        tblOptionF = tableDataSplt[5];
        tblOptionG = tableDataSplt[6];
        tblOptionH = tableDataSplt[7];
        tblOptionI = tableDataSplt[8];
        randomDocTypSelection = '';
        var randomDocTyp = '';
        var randNb = Math.floor(Math.random()*(1-8+1)+9).toString();
        console.log("Random NM: "+randNb);
        if (randNb === '1'){
            randomDocTyp = ''+tblOptionA+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '2'){
            randomDocTyp = ''+tblOptionB+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '3'){
            randomDocTyp = ''+tblOptionC+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '4'){
            randomDocTyp = ''+tblOptionD+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '5'){
            randomDocTyp = ''+tblOptionE+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '6'){
            randomDocTyp = ''+tblOptionF+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '7'){
            randomDocTyp = ''+tblOptionG+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '8'){
            randomDocTyp = ''+tblOptionH+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '9'){
            randomDocTyp = ''+tblOptionI+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        }
        trialDoc.selectADocument(randomDocTypSelection);
        browser.sleep(25).then(callback);
    });

    this.When(/^have entered a Description of the Document when the document type is Other$/, function (callback) {
        if (randomDocTypSelection === selectOptionOther){
            trialDoc.setSubType('Test Subtype');
        }
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Trial Related Document will be associated with the trail$/, function (callback) {
        trialDoc.clickAddButton();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the date the document was will be listed with the document$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the users name that added the document will be listed with the document$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the document will be ordered by date with the newest document first$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });








};
