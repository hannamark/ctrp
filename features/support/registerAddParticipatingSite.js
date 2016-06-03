/**
 * Created by singhs10 on 5/2/16.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');

var importTrialPage = function() {

    this.addPSNCIID = element(by.binding('psDetailView.curTrial.nci_id'));
    this.addPSLeadOrgId = element(by.binding('psDetailView.curTrial.lead_protocol_id'));
    this.addPSOfficialTitle = element(by.binding('psDetailView.curTrial.official_title'));
    this.addPSOrgName = element(by.model('psDetailView.curPs.organization_id'));
    this.addPSLocalId = element(by.model('psDetailView.curPs.protocol_id'));
    this.addPSPrincipalInvestigator = element(by.css('input[name="pi_name1"]'));
    this.addPSSiteProgramCode = element(by.model('psDetailView.curPs.program_code'));
    this.addPSTrialStatus = element(by.model('psDetailView.sr_status_id'));
    this.addPSTrialComment = element(by.model('psDetailView.status_comment'));
    this.addPSTrialStatusAddButton = element(by.css('button[ng-click="psDetailView.addStatus()"]'));
    this.addPSResetButton = element(by.css('button[ng-click="psDetailView.reload()"]'));
    this.addPSSaveButton = element(by.id('submit_btn'));

    var helper = new helperFunctions();

    this.getPSNCIID = function(NCIID)  {
        helper.getVerifyLabel(this.addPSNCIID,NCIID,"View Participating Site by NCI ID field");
    };

    this.getPSLeadOrgId= function(PSLeadOrgId)  {
        helper.getVerifyLabel(this.addPSLeadOrgId,PSLeadOrgId,"View Participating Site by LeadOrgId field");
    };

    this.getPSOfficialTitle = function(PSOfficialTitle)  {
        helper.getVerifyLabel(this.addPSOfficialTitle,PSOfficialTitle,"View Participating Site by Official Title field");
    };

    this.selectPSOrgName = function(PSOrgName){
        helper.selectValueFromList(this.addPSOrgName,PSOrgName,"Add Participating Site by Organization field");
    };

    this.setAddPSLocalId = function(PSLocalId)  {
        helper.setValue(this.addPSLocalId,PSLocalId,"Add Participating Site by Lead Trial Identifier field");
    };

    this.getVerifyPSPrincipalInvestigator = function(principalInvestigator){
        helper.getVerifyValue(this.addPSPrincipalInvestigator,principalInvestigator,"Add Participating Site by Principal Investigator field");
    };

    this.setAddPSSiteProgramCode = function(PSSiteProgramCode)  {
        helper.setValue(this.addPSSiteProgramCode,PSSiteProgramCode,"Add Participating Site by Site Principal Investigator field");
    };

    this.selectAddPSTrialStatus = function(PSTrialStatus)  {
        var  selectTrialStatus =  element(by.xpath('//*[@id="sr_status"]/option[.="' + PSTrialStatus + '"]'));
        var  selectTrialStatusDefault =  element(by.xpath('//*[@id="sr_status"]/option[.="-Select a Trial Status-"]'));
        if(PSTrialStatus === '') {
            helper.selectValue(selectTrialStatusDefault,'-Select a Trial Status-',"Add Participating Site by trial Status field");
        } else{
            helper.selectValue(selectTrialStatus,PSTrialStatus,"Add Participating Site by trial Status field");
        }
    };

    this.setAddPSTrialComment = function(PSTrialComment)  {
        helper.setValue(this.addPSTrialComment,PSTrialComment,"Add Participating Site by Trial Comment field");
    };

    this.clickAddPSAddStatusButton = function(){
        helper.clickButton(this.addPSTrialStatusAddButton,"Add Participating Site Trial Status Add button");
    };

    this.clickAddPSSaveButton = function(){
        helper.clickButton(this.addPSSaveButton,"Add Participating Site Save button");
    };

    this.clickAddPSResetButton = function(){
        helper.clickButton(this.addPSResetButton,"Add Participating Site Reset button");
    };
};

module.exports = importTrialPage;