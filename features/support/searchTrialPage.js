/**
 * Created by singhs10 on 11/7/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var searchTrial = function(){

    this.searchTrialProtocolID = element(by.model('trialView.searchParams.protocol_id'));
    this.searchTrialOfficialTitle = element(by.model('trialView.searchParams.official_title'));
    this.searchTrialPhase = element(by.model('trialView.searchParams.phase'));
    this.searchTrialPurpose = element(by.model('trialView.searchParams.purpose'));
    this.searchTrialPilotTrial = element(by.model('trialView.searchParams.pilot'));
    this.searchTrialPrincipalInvestigator = element(by.model('trialView.searchParams.pi'));
    this.searchTrialOrganizationType = element(by.model('trialView.searchParams.org_type'));
    this.searchTrialOrganization = element(by.model('trialView.searchParams.org'));
    this.searchTrialStudySource = element(by.model('trialView.searchParams.study_source'));
    this.searchTrialSearchButton = element(by.id('submission_btn'));
    this.searchTrialClearButton = element(by.css('.glyphicon.glyphicon-remove'));
    this.searchTrialByMyTrials = element(by.linkText('My Trials'));
    this.searchTrialByAllTrials = element(by.linkText('All Trials'));
    this.searchTrialsBySavedDrafts = element(by.linkText('Saved Drafts'));
    this.searchTrialsActionButton = element(by.buttonText('Action'));
    this.searchTrialsCompleteButton = element(by.linkText('Complete'));


    var helper = new helperFunctions();

    this.setSearchTrialProtocolID = function(trialProtocolID)  {
        helper.setValue(this.searchTrialProtocolID,trialProtocolID,"Search Trial by Protocol ID field");
    };

    this.setSearchTrialOfficialTitle = function(trialOfficialTitle)  {
        helper.setValue(this.searchTrialOfficialTitle,trialOfficialTitle,"Search Trial by Official Title field");
    };

    this.selectSearchTrialPhase = function(trialPhase)  {
        helper.selectValueFromList(this.searchTrialPhase,trialPhase,"Search Trial by Phase field");
    };

    this.selectSearchTrialPurpose= function(trialPurpose)  {
        helper.selectValueFromList(this.searchTrialPurpose,trialPurpose,"Search Trial by Purpose field");
    };

    this.selectSearchTrialPilotTrial = function(trialPilotTrial)  {
        helper.selectValueFromList(this.searchTrialPilotTrial,trialPilotTrial,"Search Trial by Pilot trial field");
    };

    this.setSearchTrialPrincipalInvestigator = function(trialPrincipalInvestigator)  {
        helper.setValue(this.searchTrialPrincipalInvestigator,trialPrincipalInvestigator,"Search Trial by Principal Investigator field");
    };

    this.selectSearchTrialOrganizationType = function(trialOrganizationType)  {
        helper.selectValueFromList(this.searchTrialOrganizationType,trialOrganizationType,"Search Trial by Organization Type field");
    };

    this.setSearchTrialOrganization= function(trialOrganization)  {
        helper.setValue(this.searchTrialOrganization,trialOrganization,"Search Trial by Organization field");
    };

    this.selectSearchTrialStudySource = function(trialStudySource)  {
        helper.selectValueFromList(this.searchTrialStudySource,trialStudySource,"Search Trial by Study Source field");
    };

    this.clickSearchTrialSearchButton = function(){
        helper.clickButton(this.searchTrialSearchButton,"Search Trial Search button");
    };

    this.clickSearchTrialClearButton = function(){
        helper.clickButton(this.searchTrialClearButton,"Search Trial Clear button");
    };

    this.clickSearchTrialMyTrials = function(){
        helper.clickLink(this.searchTrialByMyTrials, "Search by My Trial option");
    };

    this.clickSearchTrialAllTrials = function(){
        helper.clickLink(this.searchTrialByAllTrials, "Search by All Trial option");
    };

    this.clickSearchTrialSavedDrafts = function(){
        helper.clickLink(this.searchTrialsBySavedDrafts, "Search by Saved Drafts option");
    };

    this.clickSearchTrialActionButton = function(){
        helper.clickButton(this.searchTrialsActionButton,"Search Trial Action button");
    };

    this.clickSearchTrialCompleteOption = function(){
        helper.clickLink(this.searchTrialsCompleteButton, "Search Trial Complete option on Action button");
    };
};

module.exports = searchTrial;
