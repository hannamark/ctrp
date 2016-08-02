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
    this.deleteSelectedAssociated = element(by.id('delete_btn'));
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
    this.lookupTrialBtn = element(by.id('lookup_trial'));

    this.requiredMsg = element.all(by.css('.help-block.ng-scope'));

    this.saveAssociatedBtn = element(by.id('associated_save'));
    this.resetAssociatedBtn = element(by.id('associated_reset'));
    this.backToAssociatedTrialsListBtn = element(by.id('associated_back'));

    this.associatedPageTitleList = element(by.id('pg_title'));
    this.associatedPageTitleDetails = element(by.id('outcome_measure_details'));

    this.clickAddAssociatedTrial = function(){
        helper.clickButton(self.addAssociatedTrialBtn, "Add Associated Trial - Button");
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

    this.deleteAllAssociatedTrialList = function(yesOrCancel){
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

    this.setTrialIdentifierTxt = function(trialIdentifier){
        helper.setValue(this.trialIdentifierTxt, trialIdentifier, 'Trial Identifier');
        helper.wait_for(100);
    };

    this.clickLookupTrialTrial = function(){
        helper.clickButton(this.lookupTrialBtn, "Add Look Up Trial - Button");
    };

    this.checkAssociatedTrialPageTitle = function (titleTXT, listOrDetails){
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

    this.findAssociatedTrialToVerifyEditCopyDelete = function(expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf){
        this.waitForAssociatedTrailDetailsElement(self.tableTBodyRowAColA, "List of Associated Trials Table");
        this.tableAssociatedAll.then(function(rows){
            console.log('List of Associated Trials Table Total Row Count:['+(rows.length)+']');
            rowsLengthVal = ''+(rows.length)+'';
            for (var i=1; i<(rows.length+1); i++){
                if (i === 1){
                    console.log('i:['+i+']');
                    fNm('1', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 2){
                    console.log('i:['+i+']');
                    fNm('2', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 3){
                    console.log('i:['+i+']');
                    fNm('3', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 4){
                    console.log('i:['+i+']');
                    fNm('4', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 5){
                    console.log('i:['+i+']');
                    fNm('5', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 6){
                    console.log('i:['+i+']');
                    fNm('6', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 7){
                    console.log('i:['+i+']');
                    fNm('7', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                } else if (i === 8){
                    console.log('i:['+i+']');
                    fNm('8', expTrialIdentifier, what, exIdentifierTypeVf, exTrialTypeVf, exOfficialTtleVf);
                }
            }
        });
        function fNm(iVal, exppectedTrialIdentifier, whatToDo, identifierTypVf, trialTypVf, officialTtleVf){
            var tableTrialIdentifier = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(01)'));
            getCurrentTrialIdentifier = tableTrialIdentifier.getText('value');
            getCurrentTrialIdentifier.then(function(typeVal){
                console.log("Trial Identifier Type:["+typeVal+"]");
                if(exppectedTrialIdentifier === typeVal){
                    if (whatToDo === 'verify'){
                        console.log("Verifying Outcome Measures Expected Type:["+exppectedTrialIdentifier+"]");
                        console.log("Verifying Outcome Measures Actual Type:["+typeVal+"]");
                        expect(exppectedTrialIdentifier.toString()).to.eql(typeVal.toString());
                        if (identifierTypVf !== ''){
                            var identifierTypeVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(02)'));
                            identifierTypValVf = identifierTypeVal.getText('value');
                            identifierTypValVf.then(function(idenTypValCr){
                                expect(identifierTypVf.toString()).to.eql(idenTypValCr.toString());
                            });
                        }
                        if (trialTypVf !== ''){
                            var trialTypeVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(03)'));
                            trialTypValVf = trialTypeVal.getText('value');
                            trialTypValVf.then(function(trialTypeValCr){
                                expect(trialTypVf.toString()).to.eql(trialTypeValCr.toString());
                            });
                        }
                        if (officialTtleVf !== ''){
                            var officialVal = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(04)'));
                            officialValVf = officialVal.getText('value');
                            officialValVf.then(function(officialValCr){
                                expect(officialTtleVf.toString()).to.eql(officialValCr.toString());
                            });
                        }
                    } else if(whatToDo === 'notexists'){
                        var foundRecord = 'Value : '+exppectedTrialIdentifier+' should not be exists';
                        var notExistsRecord = 'Value : '+exppectedTrialIdentifier+' exists';
                        expect(foundRecord.toString()).to.eql(notExistsRecord.toString());
                    } else if(whatToDo === 'delete'){
                        var deleteDataRw = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child('+iVal+') td:nth-child(05) input'));
                        helper.clickButton(deleteDataRw, "Delete - Button");
                    }
                }
                if (exppectedTrialIdentifier != typeVal && iVal === '8'){
                    if (whatToDo === 'verify'){
                        console.log("Verifying Trial Identifier Expected value:["+exppectedTrialIdentifier+"]");
                        console.log("Verifying Trial Identifier Actual value:["+typeVal+"]");
                        expect(exppectedTrialIdentifier.toString()).to.eql(typeVal.toString());
                    } else if(whatToDo === 'notexists'){
                        var notExistsRecordA = 'Value : '+exppectedTrialIdentifier+' does not exists';
                        var notExistsRecordB = 'Value : '+exppectedTrialIdentifier+' does not exists';
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

    this.verifyAssociatedTrialDetailsLables = function (){
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

    this.verifyAssociatedListTableTHead = function (){
        var thd = new Array("Trial Identifier", "Identifier Type", "Trial Type", "Official Title");
        helper.verifyTableRowText(self.tableTHeadColA, thd[0], 'Trial Identifier');
        helper.verifyTableRowText(self.tableTHeadColB, thd[1], 'Identifier Type');
        helper.verifyTableRowText(self.tableTHeadColC, thd[2], 'Trial Type');
        helper.verifyTableRowText(self.tableTHeadColD, thd[3], 'Official Title');
    };

    //Save and Reset

    this.clickSaveAssociated = function(){
        helper.clickButton(this.saveAssociatedBtn, "Save - Button");
        helper.wait_for(300);
    };

    this.clickResetAssociated = function(){
        helper.clickButton(self.resetAssociatedBtn, "Reset - Button");
    };

    this.clickBackToAssociatedTrialList = function(){
        helper.clickButton(this.backToAssociatedTrialsListBtn, "Back to Associated Trial List page");
    };
};

module.exports = scientificAssociatedTrials;
