/**
 * Author: Shamim Ahmed
 * Date: 01/09/2015
 * Page Object: Abstraction Trial Funding
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var abstractionTrialFunding = function(){

    //Admin Data
    //General Trial Details
    this.adminDataGeneralTrial = element(by.css('a[ui-sref="main.pa.trialOverview.generalTrialDetails"]'));
    //Regulatory Information - FDAAA
    this.adminDataRegulatoryInfoFDA = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryFda"]'));
    //Regulatory Information - Human Subject Safety
    //Regulatory Information - IND/EDE
    this.adminDataRegulatoryInfoIND = element(by.css('a[ui-sref="main.pa.trialOverview.regulatoryInd"]'));
    //Trial Status
    //Trial Funding
    this.adminDataTrialFunding = element(by.css('a[ui-sref="main.pa.trialOverview.funding"]'));
    //NCI Specific Information
    this.adminDataNciSpecific = element(by.css('a[ui-sref="main.pa.trialOverview.nciInfo"]'));

    //NCI Grant page object

    this.nciGrantQuelbl = element(by.css('.control-label.col-xs-12.col-sm-4')); //by.css('label.control-label.col-xs-12.col-sm-6')
    this.nciGrantQueRdo = element.all(by.model('trialDetailView.curTrial.grant_question')); //by.css('input[ng-model="trialDetailView.curTrial.ind_ide_question"]')

    //Funding Mechanism Fields
    this.nciGrantFundingMechanism = element(by.model('trialDetailView.funding_mechanism'));
    this.nciGrantInstitueCode = element(by.model('trialDetailView.institute_code'));
    this.nciGrantSerialNumber = element(by.model('$select.search'));
    this.nciGrantNCIDivisionProgCode = element(by.model('trialDetailView.nci'));
    this.nciGrantAddButton = element(by.css('button[ng-click="trialDetailView.addGrant()"]'));

    //Funding Mechanism Labels
    this.nciGrantLblFundingMechanism = element(by.css('.table.table-striped.table-condensed>thead>tr>th:nth-child(01)'));
    this.nciGrantLblInstitueCode = element(by.css('.table.table-striped.table-condensed>thead>tr>th:nth-child(02)'));
    this.nciGrantLblSerialNumber = element(by.css('.table.table-striped.table-condensed>thead>tr>th:nth-child(03)'));
    this.nciGrantLblNCIDivisionProgCode = element(by.css('.table.table-striped.table-condensed>thead>tr>th:nth-child(04)'));

    //Save and Reset Buttons
    this.nciGrantSave = element(by.buttonText('Save'));
    this.nciGrantReset = element(by.css('button[ng-click="trialDetailView.reload()"]'));

    var helper = new helperFunctions();

    //Admin Data
    //General Trial Details: Click Left Navigation Link
    this.clickAdminDataGeneralTrial = function(){
        helper.clickButton(this.adminDataGeneralTrial, "General Trial Details Admin Data Button");
    };

    //Regulatory Information - FDAAA: Click Left Navigation Link
    this.clickAdminDataRegulatoryInfoFDA = function(){
        helper.clickButton(this.adminDataRegulatoryInfoFDA, "Regulatory Information - FDAAA Admin Data Button");
    };

    //Regulatory Information - IND/EDE : Click Left Navigation Link
    this.clickAdminDataRegulatoryInfoIND = function(){
        helper.clickButton(this.adminDataRegulatoryInfoIND, "Regulatory Information - IND/EDE Admin Data Button");
    };

    //Trial Funding : Click Left Navigation Link
    this.clickAdminDataTrialFunding = function(){
        helper.clickButton(this.adminDataTrialFunding, "Trial Funding Admin Data Button");
    };

    //NCI Specific Information : Click Left Navigation Link
    this.clickAdminDataNCISpecificInformation = function(){
      helper.clickButton(this.adminDataNciSpecific, "NCI Specific Information Admin Data Button");
    };

    //NCI Grant page object

    //Is this trial funded by an NCI grant? : Radio Button
    this.selectNCIGrantQueRdo = function(nciGrantQueYesOrNo)  {
        helper.clickRadioButton(this.nciGrantQueRdo,nciGrantQueYesOrNo,"Is this trial funded by an NCI grant? - radio button field selected as:["+nciGrantQueYesOrNo+"]");
    };

    //Verify Is this trial funded by an NCI grant? value : Label
    this.verifyNCIGrantlblValue = function(getLblValue){
        helper.getVerifyLabel(this.nciGrantQuelbl,getLblValue,"Is this trial funded by an NCI grant? field");
    };

    //Verify NCI Grant options
    this.verifyNCIGrantYesOrNoOption = function(getNCIGrantYesOrNoOption, result)  {
        if (getNCIGrantYesOrNoOption === '0') {
            expect(this.nciGrantQueRdo.get(0).isSelected()).to.eventually.equal(result);
        }
        else if (getNCIGrantYesOrNoOption === '1') {
            expect(this.nciGrantQueRdo.get(1).isSelected()).to.eventually.equal(result);
        }
    };







    //IND/IDE Types : Drop down
    this.selectINDIDETypes = function(indIDETyp)  {
        helper.selectValueFromList(this.indIDEType,indIDETyp,"IND/IDE Types - drop down field selected as:["+indIDETyp+"]");
    };

    //IND/IDE Number : Text Box
    this.setINDIDENumbr = function(indIDENmbr)  {
        helper.setValue(this.indIDENumber,indIDENmbr,"IND/IDE Number - Text Box field value entered:["+indIDENmbr+"]");
    };

    //IND/IDE Grantor : Drop down
    this.selectINDIDEGrantor = function(indIDEGrntr)  {
        helper.selectValueFromList(this.indIDEGrantor,indIDEGrntr,"IND/IDE Grantor - drop down field selected as:["+indIDEGrntr+"]");
    };

    //IND/IDE Holder Type : Drop down
    this.selectINDIDEHolderType = function(indIDEHldrTyp)  {
        helper.selectValueFromList(this.indIDEHolderType,indIDEHldrTyp,"IND/IDE Grantor - drop down field selected as:["+indIDEHldrTyp+"]");
    };

    //IND/IDE Division Program Code : Drop down
    this.selectINDIDEDivisionProgramCode = function(indIDEDviProgCde)  {
        helper.selectValueFromList(this.indIDEDisvisionProgramCode,indIDEDviProgCde,"IND/IDE Types - drop down field selected as:["+indIDEDviProgCde+"]");
    };

    //Delete Row A: Button
    this.clickRowADelete = function(){
        helper.clickButton(this.indIDETblRowADel,"Row A Delete - button");
    };

    //Delete Row B: Button
    this.clickRowBDelete = function(){
        helper.clickButton(this.indIDETblRowBDel,"Row B Delete - button");
    };

    //Delete Row : Table row delete
    this.clickRowDelete = function(getInt){
        helper.clickButton(element(by.css('.table.table-bordered.table-striped.table-condensed>tbody>tr:nth-child('+getInt+')>td:nth-child(06)>label')), "Deleted Table Row");
    }


    //Add : Button
    this.clickAdd = function(){
        helper.clickButton(this.indIDEAddButton,"Add - button");
    };

    //Save : Button
    this.clickSave = function(){
        helper.clickButton(this.indIDESave,"Save - button");
    };

    //Reset : Button
    this.clickReset = function(){
        helper.clickButton(this.indIDEReset,"Reset - button");
    };





};

module.exports = abstractionTrialFunding;
