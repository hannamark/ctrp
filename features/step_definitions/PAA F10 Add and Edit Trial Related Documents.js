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
    var getMemCrntUsrNm = '';
    var trialDocHdrs = new Array("File Name", "Document Type", "Document Subtype", "Date Added", "Added By", "Edit", "Delete");
    var getExpectedDate = '';
    var getReplacedFile = 'testSampleDocTest_Replace.docx';
    var getTestUploadFileA = 'testSampleDocTestAFile.docx';
    var getTestUploadFileB = 'testSampleDocTestBFile.docx';
    var getIRBUploadFile = 'testSampleDocFile_IRB.docx';
    var getProtocolUploadFile = 'testSampleDocFile_Protocol.docx';
    var getChangeMemoUploadFile = 'testSampleDocFile_ChangeMemo.docx';
    var getNonSupportedUploadFile = 'testSampleDocFile_invalidExt.log';

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
        //helper.verifyElementDisplayed(trialDoc.trialDocBrowse, true);
        //helper.verifyElementDisplayed(trialDoc.trialDocAddButton, true);
        //helper.verifyElementDisplayed(trialDoc.trialDocSave, true);
        //helper.verifyElementDisplayed(trialDoc.trialDocReset, true);
        trialDoc.trialTable.isDisplayed().then(function(condition) {
            if (condition){
                console.log("Condition: "+condition);
                trialDoc.findDocumentAndClickWhereDeleteExists();
                trialDoc.clickSave();
            }
        });
        browser.sleep(2500).then(callback);
    });

    this.When(/^I select add a document$/, function (callback) {
        randomDocSelection = '';
        var randomDoc = '';
        var randNmbr = Math.floor(Math.random()*(1-8+1)+9).toString();
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
        } else if(randNmbr === '6'){
            randomDoc = 'testSampleDocTestFile.docx';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '7'){
            randomDoc = 'testSampleDocTestAFile.docx';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '8'){
            randomDoc = 'testSampleDocTestBFile.docx';
            randomDocSelection = ''+randomDoc+'';
            console.log("Current Selected File Name:["+randomDocSelection+"]");
        } else if(randNmbr === '9'){
            randomDoc = 'testSampleDocTestCFile.docx';
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
            randomDocTyp = ''+tblOptionC+'';
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
            randomDocTyp = ''+tblOptionI+'';
            randomDocTypSelection = ''+randomDocTyp+'';
            console.log("Document Type:["+randomDocTypSelection+"]");
        } else if(randNb === '8'){
            randomDocTyp = ''+tblOptionC+'';
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
        //Handalling Required Document Type Upload
        trialDoc.trialRelatedFileUpload('PA', '1', 'testSampleDocFile_IRB.docx');
        trialDoc.selectADocument(selectOptionIRB);
        trialDoc.clickAddButton();
        trialDoc.trialRelatedFileUpload('PA', '1', 'testSampleDocFile_Protocol.docx');
        trialDoc.selectADocument(selectOptionProtocolDoc);
        trialDoc.clickAddButton();
        getExpectedDate = trialDoc.getCurrentDate();
        console.log("getExpectedDate: "+getExpectedDate);
        trialDoc.findDocumentAndVerifyDateAdded(randomDocSelection, getExpectedDate);
        element(by.binding('headerView.username')).getText().then(function(userNameValue){
            var crntUsrNm = userNameValue;
            function getUsrNm(){
                return crntUsrNm;
            };
            getMemCrntUsrNm = getUsrNm();
            console.log('Current User Name : ' + getMemCrntUsrNm);
        });
        browser.sleep(25).then(callback);
    });

    this.Then(/^the users name that added the document will be listed with the document$/, function (callback) {
        var getCurrentUserName = getMemCrntUsrNm;
        console.log("getCurrentUserName: "+getCurrentUserName);
        trialDoc.findDocumentAndVerifyUserAdded(randomDocSelection, getCurrentUserName);
        trialDoc.clickSave();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the document will be ordered by date with the newest document first$/, function (callback) {
        trialDoc.verifyTrialDocTblHeaders(trialDocHdrs[0], trialDocHdrs[1], trialDocHdrs[2], trialDocHdrs[3], trialDocHdrs[4], trialDocHdrs[5], trialDocHdrs[6]);
        trialDoc.findDocumentAndVerifyFileName(randomDocSelection);
        trialDoc.findDocumentAndVerifyDocumentType(randomDocSelection, randomDocTypSelection);
        if (randomDocTypSelection === selectOptionOther){
            trialDoc.findDocumentAndVerifyDocumentSubType(randomDocSelection, 'Test Subtype');
        }
        trialDoc.findDocumentAndVerifyDateAdded(randomDocSelection, getExpectedDate);
        trialDoc.findDocumentAndVerifyUserAdded(randomDocSelection, getMemCrntUsrNm);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #2 I can Edit(revise) the file name for a Trial Related Document
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     When I select add a document
     And have browsed and selected file to attach
     And have selected the Document type from the list of:
     |- Please select a document type ...|
     |Change Memo Document|
     |Complete Sheet|
     |IRB Approval|
     |Informed Consent|
     |List of Participating Sites|
     |Other|
     |Protocol Document|
     |Protocol Highlighted Document|
     |TSR|
     And have entered a Description of the Document when the document type is Other
     Then the Trial Related Document will be associated with the trail
     And the date the document was will be listed with the document
     And the users name that added the document will be listed with the document
     When I select Edit a Trial Related Document
     And have browsed and selected a new file to attach
     And have entered a Description of the Document when the document type is Other
     Then the Trial Related edited Document will be associated with the trail
     And the date the document was will be listed with the document
     And the users name that added the document will be listed with the document
     And the prior file will be annotated as Revised
     */

    this.When(/^I select Edit a Trial Related Document$/, function (callback) {
        console.log('Current Document to Edit : ' + randomDocSelection);
        trialDoc.findDocumentAndClickEdit(randomDocSelection);
        browser.sleep(2500).then(callback);
    });

    this.When(/^have browsed and selected a new file to attach$/, function (callback) {
        trialDoc.trialRelatedFileUpload('PA', '1', getReplacedFile);
        trialDoc.clickUpdate();
        browser.sleep(250).then(callback);
    });

    this.Then(/^the Trial Related edited Document will be associated with the trail$/, function (callback) {
        trialDoc.findDocumentAndVerifyFileName(getReplacedFile);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the prior file will be annotated as Revised$/, function (callback) {

        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #3 I can Delete Trial Related Documents
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     And I select one or more documents to delete
     And enter a comment for why the document is deleted
     Then the Trial Related Document will not be visible on the Trial Related Documents screen
     And the file will be annotated as Deleted
     */

    this.Given(/^I select one or more documents to delete$/, function (callback) {
        trialDoc.trialTable.isDisplayed().then(function(condition) {
            if (condition){
                console.log("Condition: "+condition);
                trialDoc.findDocumentAndClickWhereDeleteExists();
                trialDoc.clickSave();
            }
        });
        browser.sleep(2500).then(callback);
    });

    this.Given(/^enter a comment for why the document is deleted$/, function (callback) {
        console.log("- enter a comment for why the document is deleted - dev team need to develop comment feature (it's not developed yet as 03252016)");
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Trial Related Document will not be visible on the Trial Related Documents screen$/, function (callback) {
        trialDoc.findDocumentDoesNotExists(randomDocSelection);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the file will be annotated as Deleted$/, function (callback) {
        console.log("- the file will be annotated as Deleted - dev team need to develop comment feature (it's not developed yet as 03252016)");
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #4 Save Trial Related Documents
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     When select save documents
     Then the information entered or edited on the Trial Related Documents screen will be saved to the trial record
     */

    this.When(/^select save documents$/, function (callback) {
        trialDoc.trialRelatedFileUpload('PA', '1', getTestUploadFileA);
        trialDoc.selectADocument(selectOptionComplete);
        trialDoc.clickAddButton();
        trialDoc.trialRelatedFileUpload('PA', '1', getIRBUploadFile);
        trialDoc.selectADocument(selectOptionIRB);
        trialDoc.clickAddButton();
        trialDoc.trialRelatedFileUpload('PA', '1', getProtocolUploadFile);
        trialDoc.selectADocument(selectOptionProtocolDoc);
        trialDoc.clickAddButton();
        element(by.binding('headerView.username')).getText().then(function(userNameValue){
            var crntUsrNm = userNameValue;
            function getUsrNm(){
                return crntUsrNm;
            };
            getMemCrntUsrNm = getUsrNm();
            console.log('Current User Name : ' + getMemCrntUsrNm);
        });
        trialDoc.clickSave();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the information entered or edited on the Trial Related Documents screen will be saved to the trial record$/, function (callback) {
        trialDoc.verifyTrialDocTblHeaders(trialDocHdrs[0], trialDocHdrs[1], trialDocHdrs[2], trialDocHdrs[3], trialDocHdrs[4], trialDocHdrs[5]);
        trialDoc.findDocumentAndVerifyFileName(getTestUploadFileA);
        trialDoc.findDocumentAndVerifyDocumentType(getTestUploadFileA, selectOptionComplete);
        getExpectedDate = trialDoc.getCurrentDate();
        console.log("getExpectedDate: "+getExpectedDate);
        trialDoc.findDocumentAndVerifyDateAdded(getTestUploadFileA, getExpectedDate);
        var getCurrentUserName = getMemCrntUsrNm;
        console.log("getCurrentUserName: "+getCurrentUserName);
        trialDoc.findDocumentAndVerifyUserAdded(getTestUploadFileA, getCurrentUserName);
        trialDoc.findDocumentAndVerifyDateAdded(getTestUploadFileA, getExpectedDate);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #6 Cancel Regulatory Information
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Register Trial Related Documents screen
     When I select Reset documents
     Then the information entered or edited on the Trial Related Documents screen will not be saved to the trial record
     And the Trial Related Document screen will be refreshed with the existing data
     */

    this.When(/^I select Reset documents$/, function (callback) {
        trialDoc.trialRelatedFileUpload('PA', '1', getIRBUploadFile);
        trialDoc.selectADocument(selectOptionIRB);
        trialDoc.clickAddButton();
        trialDoc.trialRelatedFileUpload('PA', '1', getProtocolUploadFile);
        trialDoc.selectADocument(selectOptionProtocolDoc);
        trialDoc.clickAddButton();
        trialDoc.clickSave();
        helper.wait_for(2500);
        trialDoc.trialRelatedFileUpload('PA', '1', getTestUploadFileB);
        trialDoc.selectADocument(selectOptionComplete);
        trialDoc.clickAddButton();
        trialDoc.clickReset();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the information entered or edited on the Trial Related Documents screen will not be saved to the trial record$/, function (callback) {
        trialDoc.findDocumentDoesNotExists(getTestUploadFileB);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the Trial Related Document screen will be refreshed with the existing data$/, function (callback) {
        trialDoc.findDocumentAndVerifyFileName(getIRBUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getProtocolUploadFile);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #7 I can Not Delete the Protocol, IRB Approval Documents and Change Memo Documents
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     When I select Delete one or more documents
     And have selected a document with a type of :
     |Protocol Document|
     |IRB Approval|
     |Change Memo Document|
     Then the system will display a Error message that the Protocol Document and or IRB Approval Document cannot be deleted
     */

    this.When(/^I select Delete one or more documents$/, function (callback) {
        trialDoc.clickBackToSearchResultsButton();
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDB);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDB);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialRelatedDocument();
        trialCollaborators.waitForElement(trialDoc.trialDocSelectADocList, "Trial Related Documents - Select a Document - Drop down");
        helper.verifyElementDisplayed(trialDoc.trialDocBrowse, true);
        helper.verifyElementDisplayed(trialDoc.trialDocAddButton, true);
        helper.verifyElementDisplayed(trialDoc.trialDocSave, true);
        helper.verifyElementDisplayed(trialDoc.trialDocReset, true);
        trialDoc.trialTable.isDisplayed().then(function(condition) {
            if (condition){
                console.log("Condition: "+condition);
                trialDoc.findDocumentAndClickWhereDeleteExists();
                trialDoc.clickSave();
            }
        });
        trialDoc.trialRelatedFileUpload('PA', '1', getIRBUploadFile);
        trialDoc.selectADocument(selectOptionIRB);
        trialDoc.clickAddButton();
        trialDoc.trialRelatedFileUpload('PA', '1', getProtocolUploadFile);
        trialDoc.selectADocument(selectOptionProtocolDoc);
        trialDoc.clickAddButton();
        trialDoc.trialRelatedFileUpload('PA', '1', getChangeMemoUploadFile);
        trialDoc.selectADocument(selectOptionChangeMemo);
        trialDoc.clickAddButton();
        trialDoc.clickSave();
        browser.sleep(2500).then(callback);
    });

    this.When(/^have selected a document with a type of :$/, function (table, callback) {
        var strVal = '';
        selectDcoumentTableVal = table.raw();
        strVal = selectDcoumentTableVal.toString().replace(/,/g, "\n", -1);
        console.log('Select Document Type value(s) in the data table:[' + strVal +']');
        trialDoc.trialDocSelectADocList.getText().then(function(items) {
            console.log('Trial Document Type value(s) in the list object:['+ items +']');
            //expect(items.toString().split("\n")).to.eql(strVal.toString().split("\n"));
        });
        var tableDataSplt = strVal.toString().split("\n");
        tblOptionA = tableDataSplt[0];
        tblOptionB = tableDataSplt[1];
        tblOptionC = tableDataSplt[2];
        console.log('tblOptionA:[' + tblOptionA +']');
        console.log('tblOptionB:[' + tblOptionB +']');
        console.log('tblOptionC:[' + tblOptionC +']');
        //trialDoc.findDocumentAndVerifyDocumentType(getIRBUploadFile, tblOptionB);
        //trialDoc.findDocumentAndVerifyDocumentType(getProtocolUploadFile, tblOptionA);
        //trialDoc.findDocumentAndVerifyDocumentType(getChangeMemoUploadFile, tblOptionC);
        trialDoc.trialTable.isDisplayed().then(function(condition) {
            if (condition){
                console.log("Condition: "+condition);
                trialDoc.findDocumentAndClickWhereDeleteExists();
                trialDoc.clickSave();
            }
        });
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the system will display a Error message that the Protocol Document and or IRB Approval Document cannot be deleted$/, function (callback) {
        trialDoc.findDocumentAndVerifyFileName(getProtocolUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getIRBUploadFile);
        trialDoc.findDocumentAndVerifyFileName(getChangeMemoUploadFile);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #8 Valid Document Formats
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     When I select a document to add
     And the document is not one of the valid extensions listed below
     |Pdf|
     |Doc|
     |docx|
     |docm|
     |Xls|
     |xlsx|
     |xlsm|
     |xlsb|
     |Rtf|
     |Txt|
     Then the system will display a Error message that "The selected document is not a valid document type"
     */

    this.When(/^I select a document to add$/, function (callback) {
        trialDoc.clickBackToSearchResultsButton();
        commonFunctions.verifySearchTrialsPAScreen();
        pageSearchTrail.setSearchTrialProtocolID(leadProtocolIDI);
        pageSearchTrail.clickSearchTrialSearchButton();
        commonFunctions.verifyPASearchResultCount(searchResultCountText);
        commonFunctions.clickLinkText(leadProtocolIDI);
        commonFunctions.adminCheckOut();
        trialDoc.clickAdminDataTrialRelatedDocument();
        trialCollaborators.waitForElement(trialDoc.trialDocSelectADocList, "Trial Related Documents - Select a Document - Drop down");
        helper.verifyElementDisplayed(trialDoc.trialDocBrowse, true);
        helper.verifyElementDisplayed(trialDoc.trialDocAddButton, true);
        helper.verifyElementDisplayed(trialDoc.trialDocSave, true);
        helper.verifyElementDisplayed(trialDoc.trialDocReset, true);
        trialDoc.selectADocument(selectOptionComplete);
        trialDoc.trialRelatedFileUpload('PA', '1', getNonSupportedUploadFile);
        browser.sleep(25).then(callback);
    });

    this.When(/^the document is not one of the valid extensions listed below$/, function (table, callback) {
        var extSplt = getNonSupportedUploadFile.split(".");
        var extSpltVal = extSplt[1];
        var strVal = '';
        selectDcoumentTableVal = table.raw();
        strVal = selectDcoumentTableVal.toString().replace(/,/g, "\n", -1);
        console.log('Select Document Type value(s) in the data table:[' + strVal +']');
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
        tblOptionJ = tableDataSplt[9];
        tblOptionK = tableDataSplt[10];
        expect(tblOptionA).to.not.equal(extSpltVal);
        expect(tblOptionB).to.not.equal(extSpltVal);
        expect(tblOptionC).to.not.equal(extSpltVal);
        expect(tblOptionD).to.not.equal(extSpltVal);
        expect(tblOptionE).to.not.equal(extSpltVal);
        expect(tblOptionF).to.not.equal(extSpltVal);
        expect(tblOptionG).to.not.equal(extSpltVal);
        expect(tblOptionH).to.not.equal(extSpltVal);
        expect(tblOptionI).to.not.equal(extSpltVal);
        expect(tblOptionJ).to.not.equal(extSpltVal);
        expect(tblOptionK).to.not.equal(extSpltVal);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system will display a Error message that "([^"]*)"$/, function (arg1, callback) {
        var bldErrorMsg = "Error: "+arg1+". Allowed file types: pdf,doc,docx,docm,xls,xlsx,xlsm,xlsb,rtf,txt";
        trialDoc.verifyErrorMsg(bldErrorMsg);
        browser.sleep(25).then(callback);
    });

    /*
     Scenario: #9 Protocol and IRB Approval Documents are required
     Given I am logged into the CTRP Protocol Abstraction application
     And I am on the Trial Related Documents screen
     Then the following docuuments will be required
     |Protocol Document|
     |IRB Approval|
     */

    this.Then(/^the following docuuments will be required$/, function (table, callback) {
        trialDoc.clickBackToSearchResultsButton();
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
        trialDoc.trialRelatedFileUpload('PA', '1', getChangeMemoUploadFile);
        trialDoc.selectADocument(selectOptionChangeMemo);
        trialDoc.clickAddButton();
        trialDoc.clickSave();
        var buildRequiredErrorMsg = "Error: Both Protocol Document and IRB Approval Document are required";
        trialDoc.verifyRequiredErrorMsg(buildRequiredErrorMsg);
        browser.sleep(25).then(callback);
    });






};
