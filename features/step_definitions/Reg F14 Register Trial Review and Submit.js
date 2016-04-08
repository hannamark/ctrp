/**
 * Created by singhs10 on 4/5/16.
 */

/**
 * Author: singhs10
 * Date: 12/08/2015
 * Feature: Reg F13 Register Trial Documents
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var projectFunctionsPage= require('../support/projectMethods');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var abstractionTrialRelatedDocument = require('../support/abstractionTrialDoc');
var helperFunctions = require('../support/helper');
var moment = require('moment');


module.exports = function() {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var helper = new helperFunctions();

    /**** Required field Validation message ****/
    var leadOrgTrialIdentifierRqdMsg = 'Lead Organization Trial Identifier is required';
    var officialTitleRqdMsg ='Official Title is required';
    var phaseRqdMsg = 'Phase is required';
    var researchCatRqdMsg = 'Research Category is required';
    var primaryPurposeRqdMsg = 'Primary Purpose is required';
    var accDisTerminologyRqdMsg = 'Accrual Disease Terminology is required';
    var leadOrgRqdMsg = 'Lead Organization is required';
    var prinInvRqdMsg = 'Principal Investigator is required';
    var sponsorRqdMsg = 'Sponsor is required';
    var fundingSrcRqdMsg = 'Funding Source is required';
    var grantRqdMsg = 'Grant is required';
    var trialStatusRqdMsg = 'Trial Status is required';
    var trialStartDateRqdMsg = 'Trial Start Date is required';
    var trialStartDateTypeRqdMsg = 'Trial Start Date Type is required';
    var trialPrimaryDateRqdMsg = 'Primary Completion Date is required';
    var trialPrimaryDateTypeRqdMsg = 'Primary Completion Date Type is required';
    var trialCompletionDateRqdMsg = 'Completion Date is required';
    var trialCompletionDateTypeRqdMsg = 'Completion Date Type is required';
    var INDIDERqdMsg = 'IND/IDE is required';
    var protocolDocumentRqdMsg = 'Protocol Document is required';
    var IRBDocumentRqdMsg = 'IRB Approval is required';

    /**** Required field values ****/
    var leadOrgTrialIdentifier = 'Shi Lead Organization ';
    var officialTitle ='Trial Created by Cuke Test script - SS.';
    var phase = 'I/II';
    var researchCatObs = 'Observational';
    var researchCatInt = 'Interventional';
    var primaryPurpose = 'Diagnostic';
    var accDisTerminology = 'ICD9';
    var leadOrg = 'shi Trial Lead Org';
    var prinInv = 'shi PI';
    var sponsor = 'shi Sponsor';
    var fundingSrc = 'shi Funding Source';
    var grantFundMcm = 'R01';
    var grantInstitute = 'CA';
    var grantSerialNumber = '129687';
    var grantDivision = 'OD';
    var trialStatusDate = 'Today';
    var trialStatus = 'In Review';
    var INDIDEType = 'IND';
    var INDIDENumber = '89745';
    var INDIDEGrantor = 'CDER';
    var INDIDEHolderType = 'NCI';
    var INDIDEDivision = 'OD';
    var protocolDocument = 'testSampleDocFile.docx';
    var IRBDocument = 'testSampleXlsFile.xls';

    /**** Conditional field value message ****/
    var secondaryPurposeOtherDescriptionRqdMsg = 'Other Secondary Purpose is required';
    var grantFundingRqdMsg = 'Funding Mechanism, Institute Code, Serial Number and NCI Division/Program Code are required';
    var INDIDEFieldsRqdMsg = 'IND/IDE Type, ND/IDE Number, IND/IDE Grantor and IND/IDE Holder Type are required';
    var trialStatusStudyStopped = 'Status Date, Status and Why Study Stopped are required';
    var informedConsentDoc = 'Informed Consent Document is required for Interventional Trial';


    /**** Conditional field value ****/
    var secondaryPurpose = 'Other';
    var secondaryPurposeOtherDescription = 'Secondary Purpose other description';
    var responsiblePartyPI = 'Principal Investigator';
    var responsiblePartySI = 'Sponsor-Investigator';
    var trialStatusWD = 'Withdrawn';
    var informedConsentDocument = 'testSamplePDFFile.pdf';

    /**** Optional field value ****/
    var otherIdentifierType = 'Other Identifier';
    var otherIdentifierID = 'SS1234';
    var programCode = 'SS cuke 777';
    var participatingSiteDocument = 'testSampleRichTextFile.rtf';
    var otherDocument = 'testSampleXlsmFile.xlsm';



    this.Given(/^I have completed the registration sections$/, function (callback) {
        callback();
    });

    this.When(/^I have selected Review Trial$/, function (callback) {
        addTrial.clickAddTrialReviewButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the CTRP application will check that all required fields have been entered$/, function (table, callback) {
        //expect(projectFunctions.verifyWarningMessage(leadOrgTrialIdentifierRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(officialTitleRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(phaseRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(researchCatRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(primaryPurposeRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(accDisTerminologyRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(leadOrgRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(prinInvRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(sponsorRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(fundingSrcRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(grantRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(trialStatusRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(trialStartDateRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(trialStartDateTypeRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(trialPrimaryDateRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(trialPrimaryDateTypeRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(trialCompletionDateRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(trialCompletionDateTypeRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(INDIDERqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(protocolDocumentRqdMsg)).to.become('true');
        //expect(projectFunctions.verifyWarningMessage(IRBDocumentRqdMsg)).to.become('true');

        /****** Create Lead Organization ********/
        projectFunctionsRegistry.createOrgforTrial(leadOrg, typeOfTrial, '0');

        /** Stores the value of Lead Org **/
        storeLeadOrg = cukeOrganization.then(function(value) {
            console.log('This is the Lead Organization that is added' + value);
            return value;
        });
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 10).then(function() {

            /****** Create Principal Investigator ********/
            projectFunctionsRegistry.createPersonforTrial(prinInv, typeOfTrial, '0');

            /** Stores the value of Lead Org **/
            storePI = cukePerson.then(function (value) {
                console.log('This is the Principal Investigator that is added' + value);
                return value;
            });
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 10).then(function () {

                /****** Create Sponsor Organization ********/
                projectFunctionsRegistry.createOrgforTrial(sponsor, typeOfTrial, '1');

                /** Stores the value of Sponsor Org **/
                storeSponsorOrg = cukeOrganization.then(function (value) {
                    console.log('This is the Sponsor Organization that is added' + value);
                    return value;
                });
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 10).then(function () {

                    /****** Create Funding Source Organization ********/
                    projectFunctionsRegistry.createOrgforTrial(fundingSrc, typeOfTrial, '2');

                    /** Stores the value of Funding Source Org **/
                    storeFundingSrcOrg = cukeOrganization.then(function (value) {
                        console.log('This is the Funding Source Organization that is added' + value);
                        return value;
                    });

                    /**** Trial Identifiers ****/
                    addTrial.setAddTrialLeadProtocolIdentifier(leadOrgTrialIdentifier + typeOfTrial  + ' ' + moment().format('MMMDoYY') );

                    /**** Trial Details ****/
                    addTrial.setAddTrialOfficialTitle(officialTitle);
                    addTrial.selectAddTrialPhase(phase);
                    addTrial.selectAddTrialResearchCategory(researchCatObs);
                    addTrial.selectAddTrialPrimaryPurpose(primaryPurpose);
                    addTrial.selectAddTrialAccrualDiseaseTerminology(accDisTerminology);

                    /**** Lead Organization/Principal Investigator ****/
                    /***** This will add the Lead Org  if Lead org is not there ******/
                    addTrial.addTrialLeadOrganization.getAttribute('value').then(function(value){
                        console.log('value of Lead Org"' + value + '"is this' );
                        if(value === '') {

                            storeLeadOrg.then(function (value) {
                                projectFunctionsRegistry.selectOrgforTrial(value, '0');
                            });
                        }
                    });

                    /***** This will add the Principal Investigator if PI is not there ******/
                    addTrial.addTrialPrincipalInvestigator.getAttribute('value').then(function(value) {
                        console.log('value of PI"' + value + '"is this' );
                        if (value.trim() === '') {
                            storePI.then(function (value) {
                                projectFunctionsRegistry.selectPerForTrial(value, '0');
                            });
                        }
                    });

                    /**** Sponsor ****/
                    /***** This will add the Sponsor Org if Sponsor Org is not there ******/
                    addTrial.addTrialSponsor.getAttribute('value').then(function(value) {
                        console.log('value of Sponsor Org"' + value + '"is this' );
                        if (value === '') {
                            storeSponsorOrg.then(function (value) {
                                projectFunctionsRegistry.selectOrgforTrial(value, '1');
                            });
                        }
                    });

                    /**** Data Table 4 Information ****/
                    /***** This will add the Funding Source Org if it is not there******/
                    addTrial.addTrialDataTable4FundingSourceValues.getAttribute('value').then(function(value) {
                        console.log('value of data table Org"' + value + '"is this' );
                        if (value === '') {

                            storeFundingSrcOrg.then(function (value) {
                                projectFunctionsRegistry.selectOrgforTrial(value, '2');
                            });
                        }
                    });

                    /**** NIH Grant Information (for NIH funded Trials) ****/
                    addTrial.selectAddTrialFundingMechanism(grantFundMcm);
                    addTrial.selectAddTrialInstituteCode(grantInstitute);
                    addTrial.setAddTrialSerialNumber(grantSerialNumber);
                    addTrial.addTrialSerialNumberSelect.click();
                    addTrial.selectAddTrialNCIDivisionProgramCode(grantDivision);
                    addTrial.clickAddTrialAddGrantInfoButton();

                    /**** Trial Status ****/
                    addTrial.clickAddTrialDateField(0);
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialStatus(trialStatus);
                    addTrial.clickAddTrialAddStatusButton();

                    /**** Trial Dates ****/
                    addTrial.clickAddTrialDateField(1);
                    addTrial.clickAddTrialDateFieldPreviousMonth('10');
                    addTrial.selectAddTrialStartDateOption('0');
                    addTrial.clickAddTrialDateField(2);
                    addTrial.clickAddTrialDateToday();
                    addTrial.selectAddTrialPrimaryCompletionDateOption('0');
                    addTrial.clickAddTrialDateField(3);
                    addTrial.clickAddTrialDateFieldNextMonth('10');
                    addTrial.selectAddTrialCompletionDateOption('1');

                    /**** FDA IND/IDE Information for applicable trials ****/
                    addTrial.selectAddTrialFDAIND_IDETypes(INDIDEType);
                    addTrial.setAddTrialFDAIND_IDENumber(INDIDENumber);
                    addTrial.selectAddTrialFDAIND_IDEGrantor(INDIDEGrantor);
                    addTrial.selectAddTrialFDAIND_IDEHolderType(INDIDEHolderType);
                    addTrial.selectAddTrialFDAProgramCode(INDIDEDivision);
                    addTrial.clickAddTrialAddIND_IDEButton();

                    /**** Trial Related Documents ****/
                    trialDoc.trialRelatedFileUpload('reg', '1', protocolDocument);
                    trialDoc.trialRelatedFileUpload('reg', '2', IRBDocument);
                    expect(addTrial.addTrialReviewButton.isPresent()).to.eventually.equal(false);
                    expect(addTrial.addTrialSubmitButton.isPresent()).to.eventually.equal(true);
                    browser.sleep(25).then(callback);
                });
            });
        });

    });

    this.Given(/^the CTRP application will check that all conditional fields have been entered$/, function (table, callback) {
        addTrial.selectAddTrialSecondaryPurpose(secondaryPurpose);
        addTrial.selectAddTrialResponsibleParty(responsiblePartyPI);
        addTrial.selectAddTrialResponsibleParty(responsiblePartySI);
        addTrial.clickAddTrialAddGrantInfoButton();
        addTrial.clickAddTrialAddIND_IDEButton();
        addTrial.selectAddTrialResearchCategory(researchCatInt);
        addTrial.selectAddTrialStatus(trialStatusWD);
        addTrial.clickAddTrialAddStatusButton();
        addTrial.clickAddTrialReviewButton();
        expect(projectFunctions.verifyWarningMessage(secondaryPurposeOtherDescriptionRqdMsg)).to.become('true');
        expect(projectFunctionsRegistry.verifyTrialValidationMessage(grantFundingRqdMsg)).to.become('true');
        expect(projectFunctionsRegistry.verifyTrialValidationMessage(INDIDEFieldsRqdMsg)).to.become('true');
        expect(projectFunctionsRegistry.verifyTrialValidationMessage(trialStatusStudyStopped)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(informedConsentDoc)).to.become('true');
        addTrial.setAddTrialSecondaryPurposeOtherDescription(secondaryPurposeOtherDescription);
        trialDoc.trialRelatedFileUpload('reg', '4', informedConsentDocument);
        expect(addTrial.addTrialReviewButton.isPresent()).to.eventually.equal(false);
        expect(addTrial.addTrialSubmitButton.isPresent()).to.eventually.equal(true);
        browser.sleep(25).then(callback);

    });

    this.Given(/^the CTRP application will check if any optional fields have been entered$/, function (table, callback) {
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', otherIdentifierType)).click();
        addTrial.setAddTrialProtocolID(otherIdentifierID);
        addTrial.clickAddTrialAddProtocolButton();
        addTrial.setAddTrialDataTable4ProgramCode(programCode);
        trialDoc.trialRelatedFileUpload('reg', '4', participatingSiteDocument);
        trialDoc.trialRelatedFileUpload('reg', '5', otherDocument);
        browser.sleep(25).then(callback);
    });

    this.Given(/^the CTRP application will check that all registration sections have been completed$/, function (callback) {
        callback();
    });

    this.Given(/^the option to Register Trial will be available$/, function (callback) {
        expect(addTrial.addTrialReviewButton.isPresent()).to.eventually.equal(false);
        expect(addTrial.addTrialSubmitButton.isPresent()).to.eventually.equal(true);
        browser.sleep(25).then(callback);
    });




};
