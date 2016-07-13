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

var scientificOutcomeMeasures = function(){

    var commonFunctions = new abstractionCommonMethods();
    var dateFunctions = new addTrialPage();
    var helper = new helperFunctions();
    var self = this;

    /***********************************
     * Outcome Measure object(s)
     ***********************************/

    this.addOutcomeMeasureBtn = element(by.id('add_outcome_measure'));

    /***********************************
     * Outcome Measure Details object(s)
     ***********************************/
    this.outcomeMeasureTypeLst = element(by.id('om_type'));
    this.outcomeMeasureTypeLbl = element(by.css('label[for="om_type"]'));
    this.titleTxt = element(by.id('title'));
    this.titleLbl = element.all(by.css('label[for="title"]'));
    this.timeFrameTxt = element(by.id('time_frame'));
    this.timeFrameLbl = element.all(by.css('label[for="title"]'));
    this.descriptionTxt = element(by.id('description'));
    this.descriptionLbl = element(by.css('label[for="description"]'));
    this.safetyIssueLst = element(by.id('safety_issue'));
    this.safetyIssueLbl = element(by.css('label[for="safety_issue"]'));

    this.characterLeftLbl = element.all(by.css('.help-block.ng-binding'));
    this.requiredMsg = element.all(by.css('.help-block.ng-scope'));

    this.saveOutBtn = element(by.id('submit_processing'));
    this.resetOutBtn = element();
    this.backToOutcomeMeasuresListBtn = element(by.id('oc_site_list'));

    this.selectOutcomeMeasureType = function(type)  {
        helper.selectValueFromList(this.outcomeMeasureTypeLst, type, "Outcome Measure Type - List field");
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

    this.selectSafetyIssue = function(options)  {
        helper.selectValueFromList(this.safetyIssueLst, options, "Safety Issue - List field");
    };

    this.verifyOutcomeMeasureLables = function (){
        var lbl = new Array("Outcome Measure Type:", "Title:", "Time Frame:", "Description:", "Safety Issue:");
        helper.getVerifyLabel(this.outcomeMeasureTypeLbl, lbl[0], "Outcome Measure Type");
        commonFunctions.verifyTxtByIndex(self.titleLbl, lbl[1], '0', 'Title');
        commonFunctions.verifyTxtByIndex(self.timeFrameLbl, lbl[2], '1', 'Time Frame');
        helper.getVerifyLabel(this.descriptionLbl, lbl[3], "Description");
        helper.getVerifyLabel(this.safetyIssueLbl, lbl[4], "Safety Issue");
    };

    this.verifyCharLeft = function(charLeft, index){
        this.waitForElement(self.characterLeftLbl.get(index), 'Waiting For Page title');
        self.characterLeftLbl.get(index).isDisplayed().then(function(result) {
            if (result) {
                expect(self.characterLeftLbl.get(index).getText()).to.eventually.equal(charLeft);
            }
        });
    };

    //Save and Reset

    this.clickSave = function(){
        helper.clickButton(this.saveOutBtn, "Save - Button");
        helper.wait_for(300);
    };

    this.clickReset = function(){
        helper.clickButton(self.resetOutBtn, "Reset - Button");
    };

    this.clickBackToOutcomeMeasuresList = function(){
        helper.clickButton(this.backToOutcomeMeasuresListBtn, "Back to Outcome Measures List page");
    };
};

module.exports = scientificOutcomeMeasures;
