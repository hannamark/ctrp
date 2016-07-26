/**
 * Author: Shamim Ahmed
 * Date: 07/12/2016
 * Page Object: Scientific Outcome Measures
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require ('moment');
var should = chai.should();
var helperFunctions = require('../support/helper');
var addTrialPage = require('../support/registerTrialPage');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testFileUpload = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testSamples';

var scientificAssociatedTrials = function(){

    var commonFunctions = new abstractionCommonMethods();
    var dateFunctions = new addTrialPage();
    var helper = new helperFunctions();
    var self = this;

    /***********************************
     * List of Outcome Measure object(s)
     ***********************************/

    this.addAssociatedTrialBtn = element(by.id('add_associated'));
    this.deleteSelectedAssociated = element(by.id('delete'));
    this.deleteConfirmAssociated = element(by.id('confirmed_btn'));
    this.deleteCancelAssociated = element(by.id('cancel_confirm_btn'));

    this.tableAssociatedAll = element.all(by.css('.table.table-bordered.table-striped.table-hover tbody tr'));
    this.tableTHeadAssociated = element(by.css('.table.table-bordered.table-striped.table-hover thead'));
    this.tableTHeadColA = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(01)'));
    this.tableTHeadColB = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(02)'));
    this.tableTHeadColC = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(03)'));
    this.tableTHeadColD = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(04)'));

    this.tableSelectAll = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(05) input'));

    this.tableTBodyRowAColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(01)'));
    var rowsLengthVal = '';

    /***********************************
     * Outcome Measure Details object(s)
     ***********************************/
    this.identifierTypeLst = element(by.id('identifier_type'));
    this.trialIdentifierTxt = element(by.id('trial_identifier'));
    this.lookupTrialBtn = element();

    this.requiredMsg = element.all(by.css('.help-block.ng-scope'));

    this.saveAssociatedBtn = element(by.id('submit_processing'));
    this.resetAssociatedBtn = element(by.id('out_cm_reset'));
    this.backToAssociatedTrialsListBtn = element(by.id('oc_site_list'));

    this.associatedPageTitleList = element(by.id('pg_title'));
    this.associatedPageTitleDetails = element(by.id('outcome_measure_details'));

    this.clickAddAssociatedTrial = function(){
        helper.clickButton(this.addAssociatedTrialBtn, "Add Associated Trial - Button");
    };

    this.selectAllAssociatedTrial = function (){
        helper.clickButton(this.tableSelectAll, "Selecte All - Button");
    };

    this.clickDeleteSelectedAssocaited = function(yesCancel){
        helper.clickButton(this.deleteSelectedAssociated, "Delete Selected List of Associated Trial - Button");
        this.waitForAssociatedTrailDetailsElement(self.deleteConfirmAssociated, "Waiting for Delete Yes button to be present");
        if (yesCancel === 'yes'){
            helper.clickButton(this.deleteConfirmAssociated, "Delete Confirm - Button");
        } else if (yesCancel === 'cancel'){
            helper.clickButton(this.deleteCancelAssociated, "Delete Cancel - Button");
        }
    };

    this.deleteAllOutcomeList = function(yesOrCancel){
        self.tableTHeadAssociated.isDisplayed().then(function(result) {
            if (result === true) {
                self.selectAllAssociatedTrial();
                self.clickDeleteSelectedAssocaited(yesOrCancel);
            }
        });
    };

    this.verifyDeleteAllAssociatedTrialList = function(){
        self.tableTHeadAssociated.isDisplayed().then(function(result) {
            if (result === false) {
                var notExistsTableA = 'Table Status : '+result+'';
                var notExistsTableB = 'Table Status : '+result+'';
                expect(notExistsTableA.toString()).to.eql(notExistsTableB.toString());
            } else if (result === true){
                var notExistsTableC = 'Table Status : '+result+'';
                var notExistsTableD = 'Table Status : '+result+' but Status should be false';
                expect(notExistsTableC.toString()).to.eql(notExistsTableD.toString());
            }
        });
    };

    this.selectIdentifierType = function(type)  {
        helper.selectValueFromList(this.identifierTypeLst, type, "Identifier Type - List field");
    };

    this.setTitleTxt = function(getTitleTxt){
        helper.setValue(this.titleTxt, getTitleTxt, 'Title');
        helper.wait_for(100);
    };

    this.setTimeFrameTxt = function(getTiemFrameTxt){
        helper.setValue(this.timeFrameTxt, getTiemFrameTxt, 'Time Frame');
        helper.wait_for(100);
    };

    this.setDescriptionTxt = function(getDescTxt){
        helper.setValue(this.descriptionTxt, getDescTxt, 'Description');
        helper.wait_for(100);
    };

    this.checkOutcomePageTitle = function (titleTXT, listOrDetails){
        if (listOrDetails === 'list'){
            this.waitForElement(self.associatedPageTitleList, 'Waiting For Page title');
            self.associatedPageTitleList.isDisplayed().then(function(result) {
                if (result) {
                    expect(self.associatedPageTitleList.getText()).to.eventually.equal(titleTXT);
                }
            });
        } else if (listOrDetails === 'details'){
            this.waitForElement(self.associatedPageTitleDetails, 'Waiting For Page title');
            self.associatedPageTitleDetails.isDisplayed().then(function(result) {
                if (result) {
                    expect(self.associatedPageTitleDetails.getText()).to.eventually.equal(titleTXT);
                }
            });
        }
    };

    this.findOutcomeToVerifyEditCopyDelete = function(expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf){
        this.waitForAssociatedTrailDetailsElement(self.tableTBodyRowAColA, "Outcome Measures Table");
        this.tableAssociatedAll.then(function(rows){
            console.log('Indetifier Type Total Row Count:['+(rows.length)+']');
            rowsLengthVal = ''+(rows.length)+'';
            for (var i=1; i<(rows.length+1); i++){
                if (i === 1){
                    console.log('i:['+i+']');
                    fNm('1', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 2){
                    console.log('i:['+i+']');
                    fNm('2', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 3){
                    console.log('i:['+i+']');
                    fNm('3', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 4){
                    console.log('i:['+i+']');
                    fNm('4', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 5){
                    console.log('i:['+i+']');
                    fNm('5', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 6){
                    console.log('i:['+i+']');
                    fNm('6', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 7){
                    console.log('i:['+i+']');
                    fNm('7', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                } else if (i === 8){
                    console.log('i:['+i+']');
                    fNm('8', expOutcomeType, what, exTitleVf, exTimeVf, exDescVf, exSafetyVf);
                }
            }
        });
        function fNm(iVal, expectedOutcomeType, whatToDo, titleVf, timeVf, descVf, safetyVf){
            var tableOutcomeMeasureType = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(02)'));
            getCurrentOutcomeType = tableOutcomeMeasureType.getText('value');
            getCurrentOutcomeType.then(function(typeVal){
                console.log("Outcome Measures Type:["+typeVal+"]");
                if(expectedOutcomeType === typeVal){
                    if (whatToDo === 'verify'){
                        console.log("Verifying Outcome Measures Expected Type:["+expectedOutcomeType+"]");
                        console.log("Verifying Outcome Measures Actual Type:["+typeVal+"]");
                        expect(expectedOutcomeType.toString()).to.eql(typeVal.toString());
                        if (titleVf !== ''){
                            var titleVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(03)'));
                            titleValVf = titleVal.getText('value');
                            titleValVf.then(function(titleValCr){
                                expect(titleVf.toString()).to.eql(titleValCr.toString());
                            });
                        }
                        if (timeVf !== ''){
                            var timeVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(04)'));
                            timeValVf = timeVal.getText('value');
                            timeValVf.then(function(timeValCr){
                                expect(timeVf.toString()).to.eql(timeValCr.toString());
                            });
                        }
                        if (descVf !== ''){
                            var descVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(05)'));
                            descValVf = descVal.getText('value');
                            descValVf.then(function(descValCr){
                                expect(descVf.toString()).to.eql(descValCr.toString());
                            });
                        }
                        if (safetyVf !== ''){
                            var safetyVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(06)'));
                            safetyValVf = safetyVal.getText('value');
                            safetyValVf.then(function(safetyValCr){
                                expect(safetyVf.toString()).to.eql(safetyValCr.toString());
                            });
                        }
                    }  else if(whatToDo === 'notexists'){
                        var foundRecord = 'Value : '+expectedOutcomeType+' should not be exists';
                        var notExistsRecord = 'Value : '+expectedOutcomeType+' exists';
                        expect(foundRecord.toString()).to.eql(notExistsRecord.toString());
                    } else if(whatToDo === 'edit'){
                        var editDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(07) button'));
                        helper.clickButton(editDataRw, "Edit - Button");
                    } else if(whatToDo === 'copy'){
                        var cpyDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(08) button'));
                        helper.clickButton(cpyDataRw, "Edit - Button");
                    } else if(whatToDo === 'delete'){
                        var deleteDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(09) input'));
                        helper.clickButton(deleteDataRw, "Delete - Button");
                    }
                }
                if (expectedOutcomeType != typeVal && iVal === '8'){
                    if (whatToDo === 'verify'){
                        console.log("Verifying Outcome Measures Expected Type:["+expectedOutcomeType+"]");
                        console.log("Verifying Outcome Measures Actual Type:["+typeVal+"]");
                        expect(expectedOutcomeType.toString()).to.eql(typeVal.toString());
                    } else if(whatToDo === 'notexists'){
                        var notExistsRecordA = 'Value : '+expectedOutcomeType+' does not exists';
                        var notExistsRecordB = 'Value : '+expectedOutcomeType+' does not exists';
                        expect(notExistsRecordA.toString()).to.eql(notExistsRecordB.toString());
                    }
                }
            });
        }
    };

    this.reorderRowByDragAndDrop = function(){
        browser.actions()
            .mouseDown(element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(02) td:nth-child(02)')))
            .mouseMove(element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(01) td:nth-child(02)')))
            .mouseUp()
            .perform();
    };

    this.verifyDragAndDrop = function(iVal, expectedOutcomeType, titleVf, timeVf, descVf, safetyVf) {
        var outcomeMeasureType = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(02)'));
        getCurrentOutcomeType = outcomeMeasureType.getText('value');
        getCurrentOutcomeType.then(function (typeVal) {
            console.log("Outcome Measures Type:[" + typeVal + "]");
            expect(expectedOutcomeType.toString()).to.eql(typeVal.toString());
        });
        var titleVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(03)'));
        titleValVf = titleVal.getText('value');
        titleValVf.then(function (titleValCr) {
            console.log("Title:[" + titleValCr + "]");
            expect(titleVf.toString()).to.eql(titleValCr.toString());
        });
        var timeVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(04)'));
        timeValVf = timeVal.getText('value');
        timeValVf.then(function (timeValCr) {
            console.log("Time Frame:[" + timeValCr + "]");
            expect(timeVf.toString()).to.eql(timeValCr.toString());
        });
        var descVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(05)'));
        descValVf = descVal.getText('value');
        descValVf.then(function (descValCr) {
            console.log("Description:[" + descValCr + "]");
            expect(descVf.toString()).to.eql(descValCr.toString());
        });
        var safetyVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(06)'));
        safetyValVf = safetyVal.getText('value');
        safetyValVf.then(function (safetyValCr) {
            console.log("Safety Issue:[" + safetyValCr + "]");
            expect(safetyVf.toString()).to.eql(safetyValCr.toString());
        });
    };

    //Wait For Element : Wait
    this.waitForAssociatedTrailDetailsElement = function (element, label) {
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

    this.verifyOutcomeMeasureLables = function (){
        var lbl = new Array("Identifier Type:", "Trial Identifier:", "Research Category:", "Official Title:");
        helper.getVerifyLabel(this.outcomeMeasureTypeLbl, lbl[0], "Identifier Type");
        commonFunctions.verifyTxtByIndex(self.titleLbl, lbl[1], '0', 'Trial Identifier');
        commonFunctions.verifyTxtByIndex(self.timeFrameLbl, lbl[2], '1', 'Research Category');
        helper.getVerifyLabel(this.descriptionLbl, lbl[3], "Official Title");
    };

    this.verifyCharLeft = function(charLeft, index){
        this.waitForElement(self.characterLeftLbl.get(index), 'Waiting For Page title');
        self.characterLeftLbl.get(index).isDisplayed().then(function(result) {
            if (result) {
                expect(self.characterLeftLbl.get(index).getText()).to.eventually.equal(charLeft);
            }
        });
    };

    this.waitForElement = function (element, label) {
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

    this.verifyOutcomeMeasureTHead = function (){
        var thd = new Array("Index", "Outcome Measure Type", "Title", "Time Frame", "Description", 'Safety Issue', 'Edit', 'Copy');
        helper.verifyTableRowText(self.tableTHeadColA, thd[0], 'Index');
        helper.verifyTableRowText(self.tableTHeadColB, thd[1], 'Outcome Measure Type');
        helper.verifyTableRowText(self.tableTHeadColC, thd[2], 'Title');
        helper.verifyTableRowText(self.tableTHeadColD, thd[3], 'Time Frame');
        helper.verifyTableRowText(self.tableTHeadColE, thd[4], 'Description');
        helper.verifyTableRowText(self.tableTHeadColF, thd[5], "Safety Issue");
        helper.verifyTableRowText(self.tableTHeadColG, thd[6], "Edit");
        helper.verifyTableRowText(self.tableTHeadColH, thd[7], "Copy");
    };

    //Save and Reset

    this.clickSaveOutcome = function(){
        helper.clickButton(this.saveOutBtn, "Save - Button");
        helper.wait_for(300);
    };

    this.clickResetOutcome = function(){
        helper.clickButton(self.resetOutBtn, "Reset - Button");
    };

    this.clickBackToOutcomeMeasuresList = function(){
        helper.clickButton(this.backToOutcomeMeasuresListBtn, "Back to Outcome Measures List page");
    };
};

module.exports = scientificAssociatedTrials;
