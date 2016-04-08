/**
 * Author: Shamim Ahmed
 * Date: 03/20/2016
 * Page Object: Abstraction Trial Related Documents
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testFileUpload = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testSamples';

var abstractionTrialDoc = function(){

    /*
     * Admin Data
     */

    //General Trial Details
    this.adminDataGeneralTrial = element(by.css('a[ui-sref="main.pa.trialOverview.generalTrialDetails"]'));
    //Regulatory Information - FDAAA
    this.adminDataRegulatoryInfoFDA = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryFda"]'));
    //Regulatory Information - Human Subject Safety
    this.adminDataRegulatoryInfoHumanSfty = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryInfoHumanSafety"]'));
    //Regulatory Information - IND/EDE
    this.adminDataRegulatoryInfoIND = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryInd"]'));
    //Trial Status
    this.adminDataTrialStatus = element(by.css('a[ui-sref="main.pa.trialOverview.paTrialStatus"]'));
    //Trial Funding
    this.adminDataTrialFunding = element(by.css('a[ui-sref="main.pa.trialOverview.funding"]'));
    //Collaborators
    this.adminDataCollaborators = element(by.css('a[ui-sref="main.pa.trialOverview.collaborators"]'));
    //NCI Specific Information
    this.adminDataNciSpecific = element(by.css('a[ui-sref="main.pa.trialOverview.nciInfo"]'));
    //Trial Related Document
    this.adminDataTrialRelatedDocument = element(by.css('a[ui-sref="main.pa.trialOverview.paTrialRelatedDocs"]'));
    //Participating Sites
    this.adminDataTrialParticipatingSite = element(by.css('a[ui-sref="main.pa.trialOverview.participatingSites"]'));


    /*
     * Trial Related Document object(s)
     */
    this.trialDocSelectADocList = element(by.model('trialRelatedDocsView.curDoc.document_type'));
    this.trialDocSelectADocListAll = element.all(by.model('trialRelatedDocsView.curDoc.document_type'));
    this.trialDocBrowse = element(by.model('trialRelatedDocsView.curDoc.file'));
    this.trialDocAddButton = element(by.buttonText('Add')); // by.css('div[ng-hide="trialRelatedDocsView.curDoc.edit"]')
    this.trialDocSubType = element(by.model('trialRelatedDocsView.curDoc.document_subtype'));

    //Save and Reset
    this.trialDocSave = element(by.id('save_btn'));
    this.trialDocReset = element(by.css('button[ng-click="trialRelatedDocsView.resetForm()"]')); //.btn.btn-warning.pull-right

    //page Header
    this.trialDocHeader = element(by.css('h4.panel-title'));

    //Labels Text
    this.trialDocTitle = element(by.css('h4.ng-scope'));


    this.trialTable = element(by.css('.table.table-bordered.table-striped.table-hover'));
    this.trialTableRw = element.all(by.css('.table.table-bordered.table-striped.table-hover tbody tr'));

    this.trialTHeadA = element(by.css('.table.table-bordered.table-striped.table-hover thead th:nth-child(1)'));
    this.trialTHeadB = element(by.css('.table.table-bordered.table-striped.table-hover thead th:nth-child(2)'));
    this.trialTHeadC = element(by.css('.table.table-bordered.table-striped.table-hover thead th:nth-child(3)'));
    this.trialTHeadD = element(by.css('.table.table-bordered.table-striped.table-hover thead th:nth-child(4)'));
    this.trialTHeadE = element(by.css('.table.table-bordered.table-striped.table-hover thead th:nth-child(5)'));
    this.trialTHeadF = element(by.css('.table.table-bordered.table-striped.table-hover thead th:nth-child(6)'));


    this.authorityTable = element.all(by.css('.table.table-bordered.table-striped.table-condensed tbody tr'));
    this.authorityTableHeaderA = element(by.css('.table.table-bordered.table-striped.table-condensed thead tr th:nth-child(01)'));
    this.authorityTableHeaderB = element(by.css('.table.table-bordered.table-striped.table-condensed thead tr th:nth-child(02)'));
    this.tblColARwAExists = element(by.css('.table.table-bordered.table-striped.table-condensed tbody tr:nth-child(01) td:nth-child(01)'));

    var deleteA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(06) label'));
    var deleteB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(06) label'));
    var deleteC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(06) label'));
    var deleteD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(06) label'));
    var deleteE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(06) label'));
    var deleteF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(06) label'));
    var deleteG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(06) label'));
    var deleteH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(06) label'));

    var tblColARwA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(1)'));
    var tblColARwB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(1)'));
    var tblColARwC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(1)'));
    var tblColARwD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(1)'));
    var tblColARwE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(1)'));
    var tblColARwF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(1)'));
    var tblColARwG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(1)'));
    var tblColARwH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(1)'));

    var tblColBRwA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(02)'));
    var tblColBRwB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(02)'));
    var tblColBRwC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(03) td:nth-child(02)'));
    var tblColBRwD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(04) td:nth-child(02)'));
    var tblColBRwE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(05) td:nth-child(02)'));
    var tblColBRwF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(06) td:nth-child(02)'));
    var tblColBRwG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(07) td:nth-child(02)'));
    var tblColBRwH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(08) td:nth-child(02)'));

    var tblColCRwA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(03)'));
    var tblColCRwB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(03)'));
    var tblColCRwC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(03) td:nth-child(03)'));
    var tblColCRwD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(04) td:nth-child(03)'));
    var tblColCRwE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(05) td:nth-child(03)'));
    var tblColCRwF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(06) td:nth-child(03)'));
    var tblColCRwG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(07) td:nth-child(03)'));
    var tblColCRwH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(08) td:nth-child(03)'));

    var tblColDRwA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(04)'));
    var tblColDRwB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(04)'));
    var tblColDRwC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(03) td:nth-child(04)'));
    var tblColDRwD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(04) td:nth-child(04)'));
    var tblColDRwE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(05) td:nth-child(04)'));
    var tblColDRwF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(06) td:nth-child(04)'));
    var tblColDRwG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(07) td:nth-child(04)'));
    var tblColDRwH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(08) td:nth-child(04)'));

    var tblColERwA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(05)'));
    var tblColERwB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(05)'));
    var tblColERwC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(03) td:nth-child(05)'));
    var tblColERwD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(04) td:nth-child(05)'));
    var tblColERwE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(05) td:nth-child(05)'));
    var tblColERwF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(06) td:nth-child(05)'));
    var tblColERwG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(07) td:nth-child(05)'));
    var tblColERwH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(08) td:nth-child(05)'));

    var tblColFRwA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(06)'));
    var tblColFRwB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(06)'));
    var tblColFRwC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(03) td:nth-child(06)'));
    var tblColFRwD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(04) td:nth-child(06)'));
    var tblColFRwE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(05) td:nth-child(06)'));
    var tblColFRwF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(06) td:nth-child(06)'));
    var tblColFRwG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(07) td:nth-child(06)'));
    var tblColFRwH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(08) td:nth-child(06)'));

    //Registry Page object(s)
    this.trailFileUploadProtocol = element(by.model('trialDetailView.protocol_document'));
    this.trailFileUploadIRB = element(by.model('trialDetailView.irb_approval'));
    this.trailFileUploadParticipating = element(by.model('trialDetailView.participating_sites'));
    this.trailFileUploadInformed = element(by.model('trialDetailView.informed_consent'));
    this.trailFileUploadOther = element(by.model('trialDetailView.other_documents[$index]'));
    this.trailFileUploadOtherNext = element(by.css('input[name="other_documents1"]'));


    var helper = new helperFunctions();

    this.selectADocument = function(getDocVal){
        helper.selectValueFromList(this.trialDocSelectADocList, getDocVal,"Please select a document - drop down field selected as:["+getDocVal+"]");
    };

    this.trialRelatedFileUpload = function(regOrPA, browsIndx, getFileName){
        var buildFilePath;
        console.log('Test Sample File(s) Location:['+testFileUpload+']');
        buildFilePath = ''+testFileUpload+'/'+getFileName;
        console.log('Test Sample File(s) Path:['+buildFilePath+']');
        if (regOrPA === 'PA'){
            helper.setUploadedFile(this.trialDocBrowse,buildFilePath, getFileName, "Browse or Choose File:["+buildFilePath+"]");
        } else if(regOrPA === 'reg'){
            if (browsIndx === '1'){
                helper.setUploadedFile(this.trailFileUploadProtocol,buildFilePath, getFileName, "Browse or Choose File:["+buildFilePath+"]");
            } else if(browsIndx === '2'){
                helper.setUploadedFile(this.trailFileUploadIRB,buildFilePath, getFileName, "Browse or Choose File:["+buildFilePath+"]");
            } else if(browsIndx === '3'){
                helper.setUploadedFile(this.trailFileUploadParticipating,buildFilePath, getFileName, "Browse or Choose File:["+buildFilePath+"]");
            } else if(browsIndx === '4'){
                helper.setUploadedFile(this.trailFileUploadInformed,buildFilePath, getFileName, "Browse or Choose File:["+buildFilePath+"]");
            } else if(browsIndx === '5'){
                helper.setUploadedFile(this.trailFileUploadOther,buildFilePath, getFileName, "Browse or Choose File:["+buildFilePath+"]");
            } else if(browsIndx === '6'){
                helper.setUploadedFile(this.trailFileUploadOtherNext,buildFilePath, getFileName, "Browse or Choose File:["+buildFilePath+"]");
            }
        }
    };

    this.setSubType = function(getSubType){
      helper.setValue(this.trialDocSubType, getSubType, "Other - SubType - field");
    };

    this.clickAddButton = function(){
        helper.clickButton(this.trialDocAddButton,"Add - button");
        helper.wait_for(25);
    };

    this.selectAll = function(){
        this.waitForElement(this.collaboratorsTableTBodyRowAColA, "List of Collaborators Table");
        this.collaboratorsTableListAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=1; i<(rows.length+1); i++){
                console.log('i:['+i+']');
                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+i+') td:nth-child(03) input')).click();
            };
        });
    };

    this.findTrialDocAndDeleteOrVerify = function(getAuthoCountryName, getAuthoOrgName, getDeleteConf, getVerify){
        this.waitForRegulatoryInfoElement(this.tblColARwAExists, "Table");
        this.trialTableRw.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=0; i<(rows.length); i++){
                //Row 1
                if (i === 0){
                    console.log('Test 1');
                    getAuthoCntryNm = tblColARwA.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = tblColBRwA.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 1 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteA, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = tblColARwA.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = tblColBRwA.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 2
                if (i === 1){
                    console.log('Test 2');
                    getAuthoCntryNm = tblColARwB.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = tblColBRwB.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 2 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteB, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = tblColARwB.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = tblColBRwB.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 3
                if (i === 2){
                    console.log('Test 3');
                    getAuthoCntryNm = tblColARwC.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = tblColBRwC.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 3 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteC, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = tblColARwC.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = tblColBRwC.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 4
                if (i === 3){
                    console.log('Test 4');
                    getAuthoCntryNm = tblColARwD.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = tblColBRwD.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 4 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteD, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = tblColARwD.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = tblColBRwD.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 5
                if (i === 4){
                    console.log('Test 5');
                    getAuthoCntryNm = tblColARwE.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = tblColBRwE.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 5 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteE, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = tblColARwE.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = tblColBRwE.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 6
                if (i === 5){
                    console.log('Test 6');
                    getAuthoCntryNm = tblColARwF.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = tblColBRwF.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 6 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteF, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = tblColARwF.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = tblColBRwF.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 7
                if (i === 6){
                    console.log('Test 7');
                    getAuthoCntryNm = tblColARwG.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = tblColBRwG.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 7 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteG, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = tblColARwG.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = tblColBRwG.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //Row 8
                if (i === 7){
                    console.log('Test 8');
                    getAuthoCntryNm = tblColARwH.getText('value');
                    getAuthoCntryNm.then(function(Test1){
                        if (Test1 === getAuthoCountryName){
                            getAuthoOrgNm = tblColBRwH.getText('value');
                            getAuthoOrgNm.then(function(Test1Org) {
                                if (Test1Org === getAuthoOrgName) {
                                    console.log('Test 8 org');
                                    if (getDeleteConf === 'delete') {
                                        console.log('Delete Org');
                                        helper.clickButton(deleteH, "Delete Button");
                                    };
                                    if (getVerify === 'verify') {
                                        verifyAuthoCntryNm = tblColARwH.getText('value');
                                        verifyAuthoCntryNm.then(function(actualCountry){
                                            expect(actualCountry.toString()).to.eql(getAuthoCountryName.toString());
                                            console.log('Verify Oversight Authority Country');
                                        });
                                        verifyAuthoOrgNm = tblColBRwH.getText('value');
                                        verifyAuthoOrgNm.then(function(actualOrg) {
                                            expect(actualOrg.toString()).to.eql(getAuthoOrgName.toString());
                                            console.log('Verify Oversight Authority Organization');
                                        });
                                    };
                                };
                            });
                        };
                    });
                };
                //
            };
        });
    };



    //***********************************
    //Admin Data
    //***********************************

    //General Trial Details: Click Left Navigation Link
    this.clickAdminDataGeneralTrial = function(){
        helper.clickButton(this.adminDataGeneralTrial, "General Trial Details Admin Data Button");
    };

    //Regulatory Information - FDAAA: Click Left Navigation Link
    this.clickAdminDataRegulatoryInfoFDA = function(){
        helper.clickButton(this.adminDataRegulatoryInfoFDA, "Regulatory Information - FDAAA Admin Data Button");
    };

    //Regulatory Information - Human Subject Safety : Click Left Navigation Link
    this.clickAdminDataRegulatoryInfoHumanSafety = function(){
        helper.clickButton(this.adminDataRegulatoryInfoHumanSfty, "Regulatory Information - Human Subject Safety Admin Data Button");
    };

    //Regulatory Information - IND/EDE : Click Left Navigation Link
    this.clickAdminDataRegulatoryInfoIND = function(){
        helper.clickButton(this.adminDataRegulatoryInfoIND, "Regulatory Information - IND/EDE Admin Data Button");
    };

    //Trial Status : Click Left Navigation Link
    this.clickAdminDataTrialStatus = function(){
        helper.clickButton(this.adminDataTrialStatus, "Trial Funding Admin Data Button");
    };

    //Trial Funding : Click Left Navigation Link
    this.clickAdminDataTrialFunding = function(){
        helper.clickButton(this.adminDataTrialFunding, "Trial Funding Admin Data Button");
    };

    //Collaborators : Click Left Navigation Link
    this.clickAdminDataCollaborators = function(){
        helper.clickButton(this.adminDataCollaborators, "Collaborators Admin Data Button");
    };

    //NCI Specific Information : Click Left Navigation Link
    this.clickAdminDataNCISpecificInformation = function(){
      helper.clickButton(this.adminDataNciSpecific, "NCI Specific Information Admin Data Button");
    };

    //Trial Related Document : Click Left Navigation Link
    this.clickAdminDataTrialRelatedDocument = function(){
        helper.clickButton(this.adminDataTrialRelatedDocument, "Trial Related Document Admin Data Button");
    };

    //Participating Sites : Click Left Navigation Link
    this.clickAdminDataParticipatingSites = function(){
        helper.clickButton(this.adminDataTrialParticipatingSite, "Participating Sites Admin Data Button");
    };

    //***********************************
    //Regulatory Information – FDAAA Objects(s)
    //***********************************

    //******Responsible Party*******
    this.selectResponsibleParty = function(getResponsiblePartyVal){
        helper.selectValueFromList(this.regulatoryInfoResponsiblePartyList, getResponsiblePartyVal,"Responsible Party - drop down field selected as:["+getResponsiblePartyVal+"]");
    };

    this.setInvestigatorTitle = function(getTitleVal){
        helper.setValue(this.regulatoryInfoInvestigatorTitle,getTitleVal,"Investigator Title - field");
    };


    //******Trial Oversight Authority*******
    this.selectAuthorityCountry = function(getCountryVal){
        helper.selectValueFromList(this.regulatoryInfoAuthorityCountry, getCountryVal,"Trial Oversight Authority: Country - drop down field selected as:["+getCountryVal+"]");
    };

    this.selectAuthorityOrganization = function(getOrgVal){
        helper.selectValueFromList(this.regulatoryInfoAuthorityOrg, getOrgVal,"Trial Oversight Authority: Organization - drop down field selected as:["+getOrgVal+"]");
    };

    this.clickAuthorityAddButton = function(){
        helper.clickButton(this.regulatoryInfoAuthorityAdd,"Authority Add - button");
        helper.wait_for(25);
    };

    this.verifyAuthorityErrMsg = function(getExpErrMsg) {
        helper.getVerifyRequired(this.regulatoryInfoAuthorityErr,getExpErrMsg, "Error message verification")
    };


    //**********Org or Person Search Button*************
    this.clickSearchOrgButtonByIndex = function(index){
        helper.clickButtonNoHeaderIndex(this.regulatoryInfoInvestigatorSearchOrg,index, "Search Organization Lookup button by Index:["+index+"]");
    };

    this.clickSearchPersonsButton = function(){
        helper.clickButton(this.regulatoryInfoInvestigatorPersonSearch,"Search Persons Lookup - button");
    };

    this.clickSearchPersonsButtonByIndex = function(index){
        helper.clickButtonNoHeaderIndex(this.regulatoryInfoInvestigatorPersonSearch, index, "Search Persons Lookup - button by Index");
    };

    //**************Indicators*****************
    this.selectCentralContactRdo = function(button, getRdoValue, errorMessage)  {
            if (getRdoValue === 'No') {
                button.get(0).click();
                console.log(errorMessage + " was clicked");
                expect(button.get(0).isSelected()).to.eventually.equal(true);
            }else if (getRdoValue === 'Yes') {
                button.get(1).click();
                console.log(errorMessage + " was clicked");
                expect(button.get(1).isSelected()).to.eventually.equal(true);
            }else if (getRdoValue === 'NA') {
                button.get(2).click();
                console.log(errorMessage + " was clicked");
                expect(button.get(2).isSelected()).to.eventually.equal(true);
            }
    };

    //*********Save and Reset*************
    //Save : Button
    this.clickSave = function(){
        helper.clickButton(this.trialDocSave,"Save - button");
    };

    //Cancel : Button
    this.clickReset = function(){
        helper.clickButton(this.trialDocReset,"Reset - button");
    };


    //***********************************
    //Verification
    //***********************************

    this.verifyTextFieldValue = function(getFieldName, getFieldValueToVerify, getFieldDesc){
        helper.getVerifyValue(getFieldName, getFieldValueToVerify, getFieldDesc);
    };



    //Wait For Element : Wait
    this.waitForRegulatoryInfoElement = function (element, label) {
        browser.wait(function () {
            return element.isPresent().then(function (state) {
                if (state === true) {
                    return element.isDisplayed().then(function (state2) {
                        return state2 === true;
                    });
                } else {
                    return false;
                }
            });
        }, 10000, label + " did not appear");
        browser.sleep(250);
    };




};

module.exports = abstractionTrialDoc;
