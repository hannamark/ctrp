/**
 * Created by singhs10 on 11/7/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');

var registerTrial = function(){

    /** Trial Identifiers **/
    this.addTrialIdentifiersSection = element(by.linkText('Trial Identifiers'));
    this.addTrialStudySource = element(by.model('trialDetailView.curTrial.study_source_id'));
    this.addTrialLeadProtocolIdentifier = element(by.model('trialDetailView.curTrial.lead_protocol_id'));
    this.addTrialProtocolIDOrigin = element(by.model('trialDetailView.protocol_id_origin_id'));
    this.addTrialProtocolIDOriginList = element.all(by.binding('origin.name'));
    this.addTrialProtocolID = element(by.model('trialDetailView.protocol_id'));
    this.addTrialAddProtocolButton = element(by.css('button[ng-click="trialDetailView.addOtherId()"]'));
    this.addTrialVerifyOtherTrialIdentifier = element.all(by.css('tr[ng-repeat="otherId in trialDetailView.addedOtherIds track by $index"]'));
    this.addTrialVerifyOtherTrialIdentifierTable =  element.all(by.binding('otherId.protocol_id'));

    /** Trial Details **/
    this.addTrialDetailsSection = element(by.linkText('Trial Details'));
    this.addTrialOfficialTitle = element(by.model('trialDetailView.curTrial.official_title'));
    this.addTrialPhase = element(by.model('trialDetailView.curTrial.phase_id'));
    this.addTrialPhaseList = element(by.model('trialDetailView.curTrial.phase_id')).all(by.css('option[label]'));
    this.addTrialPilotOption = element.all(by.model('trialDetailView.curTrial.pilot'));
    this.addTrialResearchCategory = element(by.model('trialDetailView.curTrial.research_category_id'));
    this.addTrialResearchCategoryList = element(by.model('trialDetailView.curTrial.research_category_id')).all(by.css('option[label]'));
    this.addTrialPrimaryPurpose = element(by.model('trialDetailView.curTrial.primary_purpose_id'));
    this.addTrialPrimaryPurposeList = element(by.model('trialDetailView.curTrial.primary_purpose_id')).all(by.css('option[label]'));
    this.addTrialSecondaryPurpose = element(by.model('trialDetailView.curTrial.secondary_purpose_id'));
    this.addTrialSecondaryPurposeList = element(by.model('trialDetailView.curTrial.secondary_purpose_id')).all(by.css('option[label]'));
    this.addTrialAccrualDiseaseTerminology = element(by.model('trialDetailView.curTrial.accrual_disease_term_id'));
    this.addTrialAccrualDiseaseTerminologyList = element(by.model('trialDetailView.curTrial.accrual_disease_term_id')).all(by.css('option[label]'));

    /** Lead Organization/Principal Investigator **/
    this.addTrialLeadOrganization = element();
    this.addTrialPrincipalInvestigator = element();

    /** Sponsor/Responsible Party **/
    this.addTrialSponsor = element();
    this.addTrialResponsibleParty = element(by.model('trialDetailView.curTrial.responsible_party_id'));

    /** Data Table 4 Information **/
    this.addTrialDataTable4FundingSource = element();
    this.addTrialDataTable4ProgramCode = element(by.model('trialDetailView.curTrial.program_code'));

    /** NIH Grant Information **/
    this.addTrialFundedByNCIOption = element(by.model('trialDetailView.curTrial.grant_question'));
    this.addTrialFundingMechanism = element(by.model('trialDetailView.funding_mechanism'));
    this.addTrialInstituteCode = element(by.model('trialDetailView.institute_code'));
    this.addTrialSerialNumber = element(by.model('trialDetailView.serial_number'));
    this.addTrialNCIDivisionProgramCode = element(by.model('trialDetailView.nci'));
    this.addTrialAddGrantInfoButton = element(by.css('button[ng-click="trialDetailView.addGrant()"]'));

    /** Trial Status **/
    this.addTrialStatusDate = element(by.model('trialDetailView.status_date'));
    this.addTrialStatus = element(by.model('trialDetailView.trial_status_id'));
    this.addTrialWhyStudyStopped = element(by.model('trialDetailView.why_stopped'));
    this.addTrialAddStatusButton = element(by.css('button[ng-click="trialDetailView.addStatus()"]'));

    /** Trial Dates **/
    this.addTrialStartDate = element(by.model('trialDetailView.curTrial.start_date'));
    this.addTrialStartDateOption = element(by.model('trialDetailView.curTrial.start_date_qual'));
    this.addTrialPrimaryCompletionDate = element(by.model('trialDetailView.curTrial.primary_comp_date'));
    this.addTrialPrimaryCompletionDateOption = element(by.model('trialDetailView.curTrial.primary_comp_date_qual'));
    this.addTrialCompletionDate = element(by.model('trialDetailView.curTrial.comp_date'));
    this.addTrialCompletionDateOption = element(by.model('trialDetailView.curTrial.comp_date_qual'));

    /** FDA IND/IDE Information **/
    this.addTrialFDAIND_IDETypes = element(by.model('trialDetailView.ind_ide_type'));
    this.addTrialFDAIND_IDENumber = element(by.model('trialDetailView.ind_ide_number'));
    this.addTrialFDAIND_IDEGrantor = element(by.model('trialDetailView.grantor'));
    this.addTrialFDAIND_IDEHolderType = element(by.model('trialDetailView.holder_type_id'));
    this.addTrialFDAProgramCode = element(by.model('trialDetailView.nih_nci'));
    this.addTrialAddIND_IDEButton = element(by.css('button[ng-click="trialDetailView.addIndIde()"]'));

    /** Regulatory Information **/
    this.addTrialOversightAuthorityCountry = element(by.model('trialDetailView.authority_country'));
    this.addTrialOversightAuthorityOrganization = element(by.model('trialDetailView.authority_org'));
    this.addTrialAddOversightAuthorityButton = element(by.css('button[ng-click="trialDetailView.addAuthority()"]'));
    this.addTrialFDARegulatedInterventionIndicator = element(by.model('trialDetailView.curTrial.intervention_indicator'));
    this.addTrialSection801Indicator = element(by.model('trialDetailView.curTrial.sec801_indicator'));
    this.addTrialDataMonitoringCommitteeAppointedIndicator = element(by.model('trialDetailView.curTrial.data_monitor_indicator'));


    /**buttons**/
    this.addTrialResetButton = element(by.css('button[ng-click="trialDetailView.reload()"]'));
    this.addTrialReviewButton = element(by.css('button[type="submit"]'));
    this.addTrialSaveDraftButton = element(by.css('button[ng-click="trialDetailView.saveDraft()"]'));

    var helper = new helperFunctions();

    /********** Trial Identifiers **********/

    this.getVerifyTrialIdentifiersSection = function()  {
        expect(this.addTrialIdentifiersSection.getText()).to.eventually.equal('Trial Identifiers');
    };

    this.getVerifyTrialStudySource = function(studySource)  {
        helper.getVerifyListValue(this.addTrialStudySource,studySource,"Get Trial Study Source field");
    };

    this.setAddTrialLeadProtocolIdentifier = function(trialLeadProtocolIdentifier)  {
        helper.setValue(this.addTrialLeadProtocolIdentifier,trialLeadProtocolIdentifier,"Add Trial by Lead Protocol Identifier field");
    };

    this.selectAddTrialProtocolIDOrigin = function(trialProtocolIDOrigin)  {
        helper.selectValueFromList(this.addTrialProtocolIDOrigin,trialProtocolIDOrigin,"Add Trial by Protocol ID Origin field");
    };

    this.setAddTrialProtocolID = function(trialProtocolID)  {
        helper.setValue(this.addTrialProtocolID,trialProtocolID,"Add Trial by Protocol ID field");
    };

    this.clickAddTrialAddProtocolButton = function(){
        helper.clickButton(this.addTrialAddProtocolButton,"Add Trial Protocol ID Add button");
    };

    this.getVerifyAddTrialLeadProtocolIdentifier = function(trialLeadProtocolIdentifier){
        helper.getVerifyValue(this.addTrialLeadProtocolIdentifier,trialLeadProtocolIdentifier,"Add Trial by Lead Protocol Identifier field");
    };

    /********** Trial Details **********/

    this.getVerifyTrialDetailsSection = function()  {
        expect(this.addTrialDetailsSection.getText()).to.eventually.equal('Trial Details');
    };

    this.setAddTrialOfficialTitle= function(trialOfficialTitle)  {
        helper.setValue(this.addTrialOfficialTitle,trialOfficialTitle,"Add Trial by Official Title field");
    };

    this.selectAddTrialPhase = function(trialPhase)  {
        helper.selectValueFromList(this.addTrialPhase,trialPhase,"Add Trial by Phase ID field");
    };

    this.selectAddTrialPilotOption = function(trialPilotOption)  {
        helper.clickRadioButton(this.addTrialPilotOption,trialPilotOption,"Add Trial by Pilot Option field");
    };

    this.selectAddTrialResearchCategory = function(trialResearchCategory)  {
        helper.selectValueFromList(this.addTrialResearchCategory,trialResearchCategory,"Add Trial by Research Category field");
    };

    this.selectAddTrialPrimaryPurpose = function(trialPrimaryPurpose)  {
        helper.selectValueFromList(this.addTrialPrimaryPurpose,trialPrimaryPurpose,"Add Trial by Primary Purpose field");
    };

    this.selectAddTrialSecondaryPurpose = function(trialSecondaryPurpose)  {
        helper.selectValueFromList(this.addTrialSecondaryPurpose,trialSecondaryPurpose,"Add Trial by Secondary Purpose field");
    };

    this.selectAddTrialAccrualDiseaseTerminology = function(trialAccrualDiseaseTerminology)  {
        helper.selectValueFromList(this.addTrialAccrualDiseaseTerminology,trialAccrualDiseaseTerminology,"Add Trial by Accrual Disease Terminology field");
    };


    this.getVerifyAddTrialOfficialTitle= function(trialOfficialTitle)  {
        helper.getVerifyValue(this.addTrialOfficialTitle,trialOfficialTitle,"Add Trial by Official Title field");
    };

    this.getVerifyAddTrialPhase = function(trialPhase)  {
        helper.getVerifyListValue(this.addTrialPhase,trialPhase,"Add Trial by Phase ID field");
    };

    this.getVerifyAddTrialPilotOption = function(trialPilotOption)  {
        if (trialPilotOption === '0') {
            expect(this.addTrialPilotOption.get(0).isSelected()).to.eventually.equal(true);
        }
        else if (trialPilotOption === '1') {
            expect(this.addTrialPilotOption.get(1).isSelected()).to.eventually.equal(true);
        }
    };

    this.getVerifyAddTrialResearchCategory = function(trialResearchCategory)  {
        helper.getVerifyListValue(this.addTrialResearchCategory,trialResearchCategory,"Add Trial by Research Category field");
    };

    this.getVerifyAddTrialPrimaryPurpose = function(trialPrimaryPurpose)  {
        helper.getVerifyListValue(this.addTrialPrimaryPurpose,trialPrimaryPurpose,"Add Trial by Primary Purpose field");
    };

    this.getVerifyAddTrialSecondaryPurpose = function(trialSecondaryPurpose)  {
        helper.getVerifyListValue(this.addTrialSecondaryPurpose,trialSecondaryPurpose,"Add Trial by Secondary Purpose field");
    };

    this.getVerifyAddTrialAccrualDiseaseTerminology = function(trialAccrualDiseaseTerminology)  {
        helper.getVerifyListValue(this.addTrialAccrualDiseaseTerminology,trialAccrualDiseaseTerminology,"Add Trial by Accrual Disease Terminology field");
    };


    /********** Sponsor/Responsible Party **********/

    this.selectAddTrialResponsibleParty = function(trialResponsibleParty)  {
        helper.selectValueFromList(this.addTrialResponsibleParty,trialResponsibleParty,"Add Trial by Reponsible Party field");
    };

    /**********  Data Table 4 Information **********/

    this.setAddTrialDataTable4ProgramCode = function(trialDataTable4ProgramCode)  {
        helper.setValue(this.addTrialDataTable4ProgramCode ,trialDataTable4ProgramCode,"Add Trial by Data Table4 Program code field");
    };

    /**********  NIH Grant Information **********/

    this.selectAddTrialFundedByNCIOption = function(trialFundedByNCIOption)  {
        helper.clickRadioButton(this.addTrialFundedByNCIOption,trialFundedByNCIOption,"Add Trial funded by NCI option field");
    };

    this.selectAddTrialFundingMechanism = function(trialFundingMechanism)  {
        helper.selectValueFromList(this.addTrialFundingMechanism,trialFundingMechanism,"Add Trial by Funding Mechanism field");
    };

    this.selectAddTrialInstituteCode = function(trialInstituteCode)  {
        helper.selectValueFromList(this.addTrialInstituteCode,trialInstituteCode,"Add Trial by Institute Code field");
    };

    this.setAddTrialSerialNumber = function(trialSerialNumber)  {
        helper.setValue(this.addTrialSerialNumber ,trialSerialNumber,"Add Trial by Serial Number field");
    };

    this.selectAddTrialNCIDivisionProgramCode = function(trialNCIDivisionProgramCode)  {
        helper.selectValueFromList(this.addTrialNCIDivisionProgramCode,trialNCIDivisionProgramCode,"Add Trial by NCI Division Program code field");
    };

    this.clickAddTrialAddGrantInfoButton = function(){
        helper.clickButton(this.addTrialAddGrantInfoButton,"Add Trial Grant Information Add button");
    };

    /**********  Trial Status **********/

    this.setAddTrialStatusDate = function(trialStatusDate)  {
        helper.setValue(this.addTrialStatusDate ,trialStatusDate,"Add Trial by Status Date field");
    };

    this.selectAddTrialStatus = function(trialStatus)  {
        helper.selectValueFromList(this.addTrialStatus,trialStatus,"Add Trial by trial Status field");
    };

    this.setAddTrialWhyStudyStopped = function(trialWhyStudyStopped)  {
        helper.setValue(this.addTrialWhyStudyStopped ,trialWhyStudyStopped,"Add Trial by Why Study Stopped field");
    };

    this.clickAddTrialAddStatusButton = function(){
        helper.clickButton(this.addTrialAddStatusButton,"Add Trial Status Add button");
    };

    /********** Trial Dates **********/

    this.setAddTrialStartDate = function(trialStartDate)  {
        helper.setValue(this.addTrialStartDate ,trialStartDate,"Add Trial by Trial Start Date field");
    };

    this.selectAddTrialStartDateOption = function(trialStartDateOption)  {
        helper.clickRadioButton(this.addTrialStartDateOption,trialStartDateOption,"Add Trial by Start Date option field");
    };

    this.setAddTrialPrimaryCompletionDate= function(trialPrimaryCompletionDate)  {
        helper.setValue(this.addTrialPrimaryCompletionDate ,trialPrimaryCompletionDate,"Add Trial by Primary Completion Date field");
    };

    this.selectAddTrialPrimaryCompletionDateOption = function(trialPrimaryCompletionDateOption)  {
        helper.clickRadioButton(this.addTrialPrimaryCompletionDateOption,trialPrimaryCompletionDateOption,"Add Trial by Primary Completion Date option field");
    };

    this.setAddTrialCompletionDate = function(trialCompletionDate)  {
        helper.setValue(this.addTrialCompletionDate ,trialCompletionDate,"Add Trial by Completion Date field");
    };

    this.selectAddTrialCompletionDateOption = function(trialCompletionDateOption)  {
        helper.clickRadioButton(this.addTrialCompletionDateOption,trialCompletionDateOption,"Add Trial by Completion Date Option field");
    };

    /********** FDA IND/IDE Information **********/

    this.selectAddTrialFDAIND_IDETypes = function(trialFDAIND_IDETypes)  {
        helper.selectValueFromList(this.addTrialFDAIND_IDETypes,trialFDAIND_IDETypes,"Add Trial by IND/IDE Types field");
    };

    this.setAddTrialFDAIND_IDENumber = function(trialFDAIND_IDENumber)  {
        helper.setValue(this.addTrialFDAIND_IDENumber ,trialFDAIND_IDENumber,"Add Trial by IND/IDE Number field");
    };

    this.selectAddTrialFDAIND_IDEGrantor = function(trialFDAIND_IDEGrantor)  {
        helper.selectValueFromList(this.addTrialFDAIND_IDEGrantor,trialFDAIND_IDEGrantor,"Add Trial by IND/IDE Grantor field");
    };

    this.selectAddTrialFDAIND_IDEHolderType = function(trialFDAIND_IDEHolderType)  {
        helper.selectValueFromList(this.addTrialFDAIND_IDEHolderType,trialFDAIND_IDEHolderType,"Add Trial by IND/IDE Holder Type field");
    };

    this.selectAddTrialFDAProgramCode = function(trialFDAProgramCode)  {
        helper.selectValueFromList(this.addTrialFDAProgramCode,trialFDAProgramCode,"Add Trial by FDA IND/IDE Program Code field");
    };

    this.clickAddTrialAddIND_IDEButton = function(){
        helper.clickButton(this.addTrialAddIND_IDEButton,"Add Trial FDA IND/IDE Add button");
    };

    /********** Regulatory Information **********/

    this.selectAddTrialOversightAuthorityCountry = function(trialOversightAuthorityCountry)  {
        helper.selectValueFromList(this.addTrialOversightAuthorityCountry,trialOversightAuthorityCountry,"Add Trial by Trial Oversight Authority Country field");
    };

    this.selectAddTrialOversightAuthorityOrganization = function(trialOversightAuthorityOrganization)  {
        helper.selectValueFromList(this.addTrialOversightAuthorityOrganization,trialOversightAuthorityOrganization,"Add Trial by Trial Oversight Authority Organization field");
    };

    this.clickAddTrialAddOversightAuthorityButton = function(){
        helper.clickButton(this.addTrialAddOversightAuthorityButton,"Add Trial Oversight Authority Add button");
    };

    this.selectAddTrialFDARegulatedInterventionIndicator = function(trialFDARegulatedInterventionIndicator)  {
        helper.clickRadioButton(this.addTrialFDARegulatedInterventionIndicator,trialFDARegulatedInterventionIndicator,"Add Trial by Trial FDA Regulated Intervention Indicator Option field");
    };

    this.selectAddTrialSection801Indicator = function(trialSection801Indicator)  {
        helper.clickRadioButton(this.addTrialSection801Indicator,trialSection801Indicator,"Add Trial by Trial Section 801 Indicator Option field");
    };

    this.selectAddTrialDataMonitoringCommitteeAppointedIndicator= function(trialDataMonitoringCommitteeAppointedIndicator)  {
        helper.clickRadioButton(this.addTrialDataMonitoringCommitteeAppointedIndicator,trialDataMonitoringCommitteeAppointedIndicator,"Add Trial by Trial Data Monitoring Committee Appointed Indicator Option field");
    };

    /*************** Buttons ****************/

    this.clickAddTrialResetButton = function(){
        helper.clickButton(this.addTrialResetButton,"Add Trial Reset button");
    };

    this.clickAddTrialReviewButton = function(){
        helper.clickButton(this.addTrialReviewButton,"Add Trial Review button");
    };

    this.clickAddTrialSaveDraftButton = function(){
        helper.clickButton(this.addTrialSaveDraftButton,"Add Trial Save Draft button");
    };

};

module.exports = registerTrial;