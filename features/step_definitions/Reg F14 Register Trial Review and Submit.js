/**
 * Created by singhs10 on 4/5/16.
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
var mailVerificationPage = require('../support/mailVerification');


module.exports = function() {
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();
    var projectFunctions = new projectFunctionsPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialDoc = new abstractionTrialRelatedDocument();
    var helper = new helperFunctions();
    var emailVerify = new mailVerificationPage();

    /**** Required field Validation message ****/
    var leadOrgTrialIdentifierRqdMsg = 'Lead Organization Trial Identifier is Required';
    var officialTitleRqdMsg ='Official Title is Required';
    var phaseRqdMsg = 'Phase is Required';
    var researchCatRqdMsg = 'Research Category is Required';
    var primaryPurposeRqdMsg = 'Primary Purpose is Required';
    var accDisTerminologyRqdMsg = 'Accrual Disease Terminology is Required';
    var leadOrgRqdMsg = 'Lead Organization is Required';
    var prinInvRqdMsg = 'Principal Investigator is Required';
    var sponsorRqdMsg = 'Sponsor is Required';
    var fundingSrcRqdMsg = 'Funding Source is Required';
    var grantRqdMsg = 'Grant is Required';
    var trialStatusRqdMsg = 'Trial Status is Required';
    var trialStartDateRqdMsg = 'Trial Start Date is Required';
    var trialStartDateTypeRqdMsg = 'Trial Start Date Type is Required';
    var trialPrimaryDateRqdMsg = 'Primary Completion Date is Required';
    var trialPrimaryDateTypeRqdMsg = 'Primary Completion Date Type is Required';
    var trialCompletionDateRqdMsg = 'Completion Date is Required';
    var trialCompletionDateTypeRqdMsg = 'Completion Date Type is Required';
    var INDIDERqdMsg = 'IND/IDE is Required';
    var protocolDocumentRqdMsg = 'Protocol Document is Required';
    var IRBDocumentRqdMsg = 'IRB Approval is Required';

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
    var secondaryPurposeOtherDescriptionRqdMsg = 'Other Secondary Purpose is Required';
    var grantFundingRqdMsg = 'Funding Mechanism, Institute Code, Serial Number and NCI Division/Program Code are Required';
    var INDIDEFieldsRqdMsg = 'IND/IDE Type, ND/IDE Number, IND/IDE Grantor and IND/IDE Holder Type are Required';
    var trialStatusStudyStopped = 'Status Date, Status and Why Study Stopped are Required';
    var informedConsentDoc = 'Informed Consent Document is Required for Interventional Trial';


    /**** Conditional field value ****/
    var secondaryPurpose = 'Other';
    var secondaryPurposeOtherDescription = 'Secondary Purpose other description';
    var responsiblePartyPI = 'Principal Investigator';
    var responsiblePartySI = 'Sponsor-Investigator';
    var trialStatusWD = 'Withdrawn';
    var informedConsentDocument = 'testSamplePDFFile.pdf';

    /**** Optional field value ****/
    var clinicalIdentifierType = 'ClinicalTrials.gov Identifier';
    var clinicalIdentifierID = 'NCT22446688';
    var obsoleteClinicalIdentifierType = 'Obsolete ClinicalTrials.gov Identifier';
    var obsoleteClinicalIdentifierID = 'NCT11335577';
    var otherIdentifierType = 'Other Identifier';
    var otherIdentifierID = 'SS1234';
    var programCode = 'SS cuke 777';
    var participatingSiteDocument = 'testSampleRichTextFile.rtf';
    var otherDocument = 'testSampleXlsmFile.xlsm';

    /**** Email Verification ****/
    var gmaillink = 'https://mail.google.com/mail/#inbox';
    var gmailID = 'ctrptrialsubmitter@gmail.com';
    var firstLastName = 'rita tam';



    this.Given(/^I have completed the registration sections$/, function (callback) {
        callback();
    });

    this.When(/^I have selected Review Trial$/, function (callback) {
        addTrial.clickAddTrialReviewButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the CTRP application will check that all required fields have been entered$/, function (table, callback) {

        /****** Create Lead Organization ********/
        projectFunctionsRegistry.createOrgforTrial(leadOrg, typeOfTrial, '0', 'ctrptrialsubmitter');

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
            projectFunctionsRegistry.createPersonforTrial(prinInv, typeOfTrial, '0', 'ctrptrialsubmitter');

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
                projectFunctionsRegistry.createOrgforTrial(sponsor, typeOfTrial, '1', 'ctrptrialsubmitter');

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
                    projectFunctionsRegistry.createOrgforTrial(fundingSrc, typeOfTrial, '2', 'ctrptrialsubmitter');

                    /** Stores the value of Funding Source Org **/
                    storeFundingSrcOrg = cukeOrganization.then(function (value) {
                        console.log('This is the Funding Source Organization that is added' + value);
                        return value;
                    });

                    /**** Trial Identifiers ****/
                    addTrial.setAddTrialLeadProtocolIdentifier(leadOrgTrialIdentifier + typeOfTrial  + ' ' + moment().format('MMMDoYY hmm') );
                    /** Stores the value of Lead Protocol Identifier **/
                    storeLeadProtocolId = addTrial.addTrialLeadProtocolIdentifier.getAttribute('value').then(function (value) {
                        console.log('This is the Lead Organization Trial Identifier that is added' + value);
                        return value;
                    });

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
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', clinicalIdentifierType)).click();
        addTrial.setAddTrialProtocolID(clinicalIdentifierID);
        addTrial.clickAddTrialAddProtocolButton();
        addTrial.addTrialProtocolIDOrigin.element(by.cssContainingText('option', obsoleteClinicalIdentifierType)).click();
        addTrial.setAddTrialProtocolID(obsoleteClinicalIdentifierID);
        addTrial.clickAddTrialAddProtocolButton();
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


    this.Given(/^the option to submit trial will be available$/, function (callback) {
        expect(addTrial.addTrialReviewButton.isPresent()).to.eventually.equal(false);
        expect(addTrial.addTrialSubmitButton.isPresent()).to.eventually.equal(true);
        addTrial.clickAddTrialReviewButton();
        browser.sleep(25).then(callback);
    });

    this.Given(/^the trial record will have the NCI Identifer with the format NCI\-YYYY\-NNNNN$/, function (callback) {
        /** Stores the value of NCI ID **/
        helper.wait(addTrial.viewTrialNCIID, 'NCI ID element on View Trial Page');
        addTrial.viewTrialNCIID.getText().then(function (value) {
            var valueToVerify = value.slice(0,9);
            console.log('NCI ID string after Slice:' + valueToVerify);
            expect(valueToVerify).to.equal('NCI-'+ moment().year()+'-');
        });
        storeNCIIdentifier = addTrial.viewTrialNCIID.getText().then(function (value) {
            console.log('This is the NCI Identifier' + value);
            return value;
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^the created by field will be displayed with the created date and time in format username \(dd\-mmm\-yyyy hh:mm\)$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

    this.Given(/^the updated by field will be displayed with the updated date and time in format username \(dd\-mmm\-yyyy hh:mm\)$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback();
    });

    this.Given(/^an email entitled "([^"]*)" will be sent to the trial submitter \(Email list in the shared drive under Functional\/Registration: CTRP System Generated Emails\)$/, function (arg1, string, callback) {
        console.log('value of arg:');
        console.log(arg1);
        console.log('value od String:');
        console.log(string);
        var mapObj = {
            "<<Trial Title>>": officialTitle,
            "<<ClinicalTrials.gov ID>>": clinicalIdentifierID,
            "<<Obsolete ClinicalTrials.gov ID>>" : obsoleteClinicalIdentifierID,
            "<<Other Identifier>>" : otherIdentifierID,
            "<<Submission Date Format DD-mmm-YYYY>>" : moment().format('DD-MMM-YYYY'),
            "<<Current date Format DD-mmm-YYYY>>" : moment().format('DD-MMM-YYYY'),
            "<<firstName lastname>>" : firstLastName
        };
        string = string.replace(/<<Trial Title>>|<<ClinicalTrials.gov ID>>|<<Obsolete ClinicalTrials.gov ID>>|<<Other Identifier>>|<<Submission Date Format DD-mmm-YYYY>>|<<Current date Format DD-mmm-YYYY>>|<<firstName lastname>>/gi, function(matched){
            return mapObj[matched];
        });
        storeLeadProtocolId.then(function(leadProtocolID) {
            string = string.replace("<<Lead Org Trial ID>>", leadProtocolID);

            storeLeadOrg.then(function (leadOrgName) {
                string = string.replace("<<Lead Organization Name>>", leadOrgName);

                storeNCIIdentifier.then(function (nciTrialID) {
                    string = string.replace("<<NCI Trial ID>>", nciTrialID);
                    string = string.replace("<<Trial ID>>", nciTrialID);
                    console.log('value of updated string:');
                    console.log(string);
                    browser.sleep(5000);
                    emailVerify.gmailMailVerification(gmaillink, gmailID, 'NCI CTRP: Trial RECORD CREATED for ' + nciTrialID + ',' + leadProtocolID, string, callback);
                });
            });
        });
        browser.sleep(25).then(callback);
    });


    this.Given(/^I have completed the registration sections but with errors$/, function (callback) {
        addTrial.setAddTrialLeadProtocolIdentifier(leadOrgTrialIdentifier + typeOfTrial  + ' ' + moment().format('MMMDoYY hmm') );
        browser.sleep(25).then(callback);
    });

    this.Then(/^the registration errors will be displayed$/, function (callback) {
        expect(projectFunctions.verifyWarningMessage(leadOrgTrialIdentifierRqdMsg)).to.become('false');
        expect(projectFunctions.verifyWarningMessage(officialTitleRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(phaseRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(researchCatRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(primaryPurposeRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(accDisTerminologyRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(leadOrgRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(prinInvRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(sponsorRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(fundingSrcRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(grantRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(trialStatusRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(trialStartDateRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(trialStartDateTypeRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(trialPrimaryDateRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(trialPrimaryDateTypeRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(trialCompletionDateRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(trialCompletionDateTypeRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(INDIDERqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(protocolDocumentRqdMsg)).to.become('true');
        expect(projectFunctions.verifyWarningMessage(IRBDocumentRqdMsg)).to.become('true').and.notify(callback);

    });

    this.Given(/^the option to Register Trial will be not available$/, function (callback) {
        expect(addTrial.addTrialReviewButton.isPresent()).to.eventually.equal(true);
        expect(addTrial.addTrialSubmitButton.isPresent()).to.eventually.equal(false).and.notify(callback);
    });



    this.When(/^I have entered the same Lead Organization Trial Identifier for a Lead Organization which exists in another Trial$/, function (callback) {
        var leadOrgIdentifier = 'SS LeadDup';
        var otherClinicalTrialID = 'nct12345678';
        var otherObsoleteClinicalTrialID = 'nct98765432';
        var otherIdentifier = 'abcd12356';
        var officialTitle = 'Trial created by Cuke test SS';
        var phase = 'I';
        var pilotOption = 'yes';
        var researchCategory = 'Interventional';
        var primaryPurpose = 'Treatment';
        var secondaryPurpose = '';
        var accrualDisease = 'SDC';
        var leadOrg = 'leadOrgSS';
        var principalInv = 'prinInvSS';
        var sponsorOrg = 'sponOrg';
        var dataTableOrg = 'dataTblOrg';
        var programCode = '';
        var grantOption = 'No';
        var grantFundingMechanism = '';
        var grantInstituteCode = '';
        var grantSerialNumber = '';
        var grantNCIDivisionCode = '';
        var trialStatus = 'In Review';
        var trialComment = '';
        var trialWhyStudyStopped = '';
        var INDIDEOption = 'no';
        var INDIDEType = 'IND';
        var INDIDENumber = '';
        var INDIDEGrantor = '';
        var INDIDEHolder = '';
        var INDIDEInstitution = '';
        var responsibleParty = '';
        var trialOversightCountry = '';
        var trialOversightOrg = '';
        var FDARegulatedIndicator = '';
        var section801Indicator = '';
        var dataMonitoringIndicator = '';
        var protocolDoc = 'testSampleDocFile.docx';
        var IRBDoc = 'testSampleXlsFile.xls';
        var participatingSiteDoc = '';
        var informedConsentDoc = 'testSampleDocFile.docx';
        var otherDoc = '';
        var submitTrial = 'SUBMITTRIAL';
        var userWhoWillCreateTrial = 'ctrptrialsubmitter';
        projectFunctionsRegistry.createTrial(userWhoWillCreateTrial, typeOfTrial, leadOrgIdentifier, otherClinicalTrialID, otherObsoleteClinicalTrialID, otherIdentifier, officialTitle, phase, pilotOption, researchCategory, primaryPurpose, secondaryPurpose,
            accrualDisease, leadOrg, principalInv, sponsorOrg, dataTableOrg, programCode, grantOption, grantFundingMechanism, grantInstituteCode, grantSerialNumber, grantNCIDivisionCode, trialStatus, trialComment, trialWhyStudyStopped,
            INDIDEOption, INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolder, INDIDEInstitution, responsibleParty, trialOversightCountry, trialOversightOrg, FDARegulatedIndicator, section801Indicator, dataMonitoringIndicator,
            protocolDoc, IRBDoc, participatingSiteDoc, informedConsentDoc, otherDoc, submitTrial);
        projectFunctionsRegistry.selectTrials(typeOfTrial);
        browser.driver.wait(function () {
            console.log('wait here');
            return true;
        }, 10).then(function () {
            storeLeadProtocolId.then(function (value) {
            console.log('This is the Lead Organization Trial Identifier that was added for Previous Trial' + value);
            addTrial.setAddTrialLeadProtocolIdentifier(value);
        });
           storeLeadOrg.then(function (value) {
                projectFunctionsRegistry.selectOrgforTrial(value, '0');
            });
        });
        browser.sleep(6000).then(callback);
    });

    this.Then(/^on review, the error message "([^"]*)" will be displayed$/, function (arg1, callback) {
        addTrial.clickAddTrialReviewButton();
        expect(projectFunctions.verifyWarningMessage(arg1)).to.become('true');
        browser.sleep(25).then(callback);
    });



};
