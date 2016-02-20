/**
 * Author: Shamim Ahmed
 * Date: 02/08/2016
 * Page Object: Abstraction General Trial Details
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var abstractionTrialDetails = function(){

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

    /*
     * General Trial Details object(s)
     */

    //Title
    this.generalTrailAcronym = element(by.model('generalTrialDetailView.generalTrialDetailsObj.acronym'));
    this.generalTrailOfficialTitle = element(by.model('generalTrialDetailView.generalTrialDetailsObj.official_title'));
    this.generalTrailAcronymLbl = element(by.css('label[for="acronym"]'));
    this.generalTrailOfficialTitleLbl = element(by.css('label[for="official_title"]'));

    //Keywords
    this.generalTrailKeywords = element(by.model('generalTrialDetailView.generalTrialDetailsObj.keywords'));
    this.generalTrailKeywordsLbl = element(by.css('label[for="keywords"]'));

    //Trial Identifiers
    this.generalTrailIdentifier = element(by.model('generalTrialDetailView.otherIdentifier.protocol_id_origin_id'));
    this.generalTrailIdentifierTextBox = element(by.model('generalTrialDetailView.otherIdentifier.protocol_id'));
    this.generalTrailIdentifierAddButton = element(by.css('button[ng-click="generalTrialDetailView.addOtherIdentifier()"]'));
    this.generalTrailIdentifierTable = element();
    this.generalTrailIdentifierTableIdentifierType = element();
    this.generalTrailIdentifierTableValue = element();
    this.generalTrailIdentifierTableDeletion = element();

    this.generalTrailTable = element(by.css('.table.table-bordered.table-striped.table-hover'));
    this.generalTrailTableAll = element.all(by.css('.table.table-bordered.table-striped.table-hover tbody tr'));
    this.generalTrailTableTHead = element(by.css('.table.table-bordered.table-striped.table-hover thead'));
    this.generalTrailTableTHeadColA = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(01)'));
    this.generalTrailTableTHeadColB = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(02)'));
    this.generalTrailTableTHeadColC = element(by.css('.table.table-bordered.table-striped.table-hover thead tr th:nth-child(03)'));

    this.generalTrailTableTBody = element(by.css('.table.table-bordered.table-striped.table-hover tbody'));
    this.generalTrailTableTBodyRowAColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(01)'));
    this.generalTrailTableTBodyRowAColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(02) span span'));
    this.generalTrailTableTBodyRowAColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(03)'));

    this.generalTrailTableTBodyRowBColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(01)'));
    this.generalTrailTableTBodyRowBColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(02) span span'));
    this.generalTrailTableTBodyRowBColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(03)'));

    this.generalTrailTableTBodyRowCColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(01)'));
    this.generalTrailTableTBodyRowCColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(02) span span'));
    this.generalTrailTableTBodyRowCColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(03)'));

    this.generalTrailTableTBodyRowDColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(01)'));
    this.generalTrailTableTBodyRowDColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(02) span span'));
    this.generalTrailTableTBodyRowDColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(03)'));

    this.generalTrailTableTBodyRowEColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(01)'));
    this.generalTrailTableTBodyRowEColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(02) span span'));
    this.generalTrailTableTBodyRowEColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(03)'));

    this.generalTrailTableTBodyRowFColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(01)'));
    this.generalTrailTableTBodyRowFColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(02) span span'));
    this.generalTrailTableTBodyRowFColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(03)'));

    this.generalTrailTableTBodyRowGColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(01)'));
    this.generalTrailTableTBodyRowGColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(02) span span'));
    this.generalTrailTableTBodyRowGColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(03)'));

    this.generalTrailTableTBodyRowHColA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(01)'));
    this.generalTrailTableTBodyRowHColB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(02) span span'));
    this.generalTrailTableTBodyRowHColC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(03)'));

    this.generalTrailTableTBodyRowAColCDelete = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(03) label'));
    this.generalTrailTableTBodyRowBColCDelete = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(03) label'));
    this.generalTrailTableTBodyRowCColCDelete = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(03) label'));
    this.generalTrailTableTBodyRowDColCDelete = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(03) label'));
    this.generalTrailTableTBodyRowEColCDelete = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(03) label'));
    this.generalTrailTableTBodyRowFColCDelete = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(03) label'));
    this.generalTrailTableTBodyRowGColCDelete = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(03) label'));
    this.generalTrailTableTBodyRowHColCDelete = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(03) label'));



    //Lead Organization/Principal Investigator
    this.generalTrailLeadOrganization = element(by.model('generalTrialDetailView.leadOrg.name'));
    this.generalTrailPrincipalInvestigator = element(by.model('generalTrialDetailView.principalInvestigator.name'));
    this.generalTrailLeadOrganizationLbl = element(by.css('label[for="lead_org"]'));
    this.generalTrailPrincipalInvestigatorLbl = element(by.css('label[for="pi"]'));
    this.generalTrailSearchOrganization = element(by.id('org_search_modal'));
    this.generalTrailSearchPerson = element(by.id('person_search_modal'));

    //Sponsor
    this.generalTrailSponsor = element(by.model('generalTrialDetailView.sponsor.name'));
    this.generalTrailSponsorLbl = element(by.css('label[for="sponsor"]'));
    this.generalTrailSponsorSearchOrganization = element(by.id('org_search_modal'));

    //Central Contact
    this.generalTrailCentralContactRadio = element(by.model('generalTrialDetailView.centralContactType'));
    //*****PI*****
    this.generalTrailCentralContactName = element(by.model('generalTrialDetailView.generalTrialDetailsObj.central_contacts[0].fullname'));
    this.generalTrailCentralContactEmail = element(by.model('generalTrialDetailView.generalTrialDetailsObj.central_contacts[0].email'));
    this.generalTrailCentralContactPhone = element(by.model('generalTrialDetailView.generalTrialDetailsObj.central_contacts[0].phone'));
    this.generalTrailCentralContactPhoneExt = element(by.model('generalTrialDetailView.generalTrialDetailsObj.central_contacts[0].extension'));
    this.generalTrailCentralContactSearchPerson = element(by.id('person_search_modal'));

    //Save and Reset
    this.generalTrailSave = element(by.id('save_btn'));
    this.generalTrailReset = element(by.id('cancel_btn'));

    //page Header
    this.generalTrailHeader = element(by.css('h4.panel-title'));

     //In Line Editing
    this.inLineEditingLink = element(by.css('span[ng-click="edit()"]'));
    this.inLineEditingTextBox = element(by.css('#other_id_edit')); //by.css('.form-control.input-sm')
    this.inLineEditingCancelButton = element(by.id('cancel_edit_btn'));
    this.inLineEditingSaveButton = element(by.buttonText('Save'));
    //Table In Line Save and Cancel
    this.generalTrailTableInLineInputB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(02) input'));




    var saveA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(02) .btn.btn-success'));
    var cancelA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(02) .btn.btn-warning'));
    var saveB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(02) .btn.btn-success'));
    var cancelB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(02) .btn.btn-warning'));
    var saveC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(02) .btn.btn-success'));
    var cancelC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(02) .btn.btn-warning'));
    var saveD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(02) .btn.btn-success'));
    var cancelD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(02) .btn.btn-warning'));
    var saveE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(02) .btn.btn-success'));
    var cancelE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(02) .btn.btn-warning'));
    var saveF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(02) .btn.btn-success'));
    var cancelF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(02) .btn.btn-warning'));
    var saveG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(02) .btn.btn-success'));
    var cancelG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(02) .btn.btn-warning'));
    var saveH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(02) .btn.btn-success'));
    var cancelH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(02) .btn.btn-warning'));

    var deleteA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(03) label'));
    var deleteB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(03) label'));
    var deleteC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(03) label'));
    var deleteD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(03) label'));
    var deleteE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(03) label'));
    var deleteF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(03) label'));
    var deleteG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(03) label'));
    var deleteH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(03) label'));

    var identifierTypRwA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(01)'));
    var identifierTypRwB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(01)'));
    var identifierTypRwC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(01)'));
    var identifierTypRwD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(01)'));
    var identifierTypRwE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(01)'));
    var identifierTypRwF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(01)'));
    var identifierTypRwG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(01)'));
    var identifierTypRwH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(01)'));

    var textBoxEditLinkA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(02) span .editable-click.ng-binding'));
    var textBoxEditLinkB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(02) span .editable-click.ng-binding'));
    var textBoxEditLinkC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(02) span .editable-click.ng-binding'));
    var textBoxEditLinkD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(02) span .editable-click.ng-binding'));
    var textBoxEditLinkE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(02) span .editable-click.ng-binding'));
    var textBoxEditLinkF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(02) span .editable-click.ng-binding'));
    var textBoxEditLinkG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(02) span .editable-click.ng-binding'));
    var textBoxEditLinkH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(02) span .editable-click.ng-binding'));

    var textBoxInLineA = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(02) input'));
    var textBoxInLineB = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(02) input'));
    var textBoxInLineC = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(02) input'));
    var textBoxInLineD = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(02) input'));
    var textBoxInLineE = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(02) input'));
    var textBoxInLineF = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(02) input'));
    var textBoxInLineG = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(02) input'));
    var textBoxInLineH = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(02) input'));



    var helper = new helperFunctions();



    this.findTrailIdentifierAndClickEdit = function(getIdentifierName, getEditFalg, getEditedValue, getSaveOrCancelOrDelete, getVerify, getVerificationVal){
        this.waitForTrailDetailsElement(this.generalTrailTableTBodyRowAColA, "Trail Identifiers Table");
        this.generalTrailTableAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=0; i<(rows.length); i++){
                //Row 1
                if (i === 0){
                    console.log('Test 1');
                    identifierTypeNm = identifierTypRwA.getText('value');
                    identifierTypeNm.then(function(Test1){
                        if (Test1 === getIdentifierName){
                            if(getEditFalg === 'edit'){
                                textBoxEditLinkA.click();
                                helper.clickButton(textBoxInLineA,"Inline Editing - Text Box");
                                helper.setValue(textBoxInLineA, getEditedValue,"In Line Editing - Text Box field value entered:["+getEditedValue+"]");
                                helper.wait_for(1000);
                                if (getSaveOrCancelOrDelete === 'save'){
                                    helper.clickButton(saveA, "Save Button");
                                }else if(getSaveOrCancelOrDelete === 'cancel'){
                                    helper.clickButton(cancelA, "Cancel Button");
                                }else if(getSaveOrCancelOrDelete === 'delete'){
                                    helper.clickButton(deleteA, "Delete Button");
                                };
                            };
                            if (getVerify === 'verify'){
                                expect(Test1.toString()).to.eql(getIdentifierName.toString());
                                helper.verifyTableRowText(textBoxEditLinkA, getVerificationVal, "Verifying Row Text");
                            };
                        };
                    });
                };
                //Row 2
                if (i === 1){
                    console.log('Test 2');
                    identifierTypeNm = identifierTypRwB.getText('value');
                    identifierTypeNm.then(function(Test2){
                        if (Test2 === getIdentifierName){
                            if(getEditFalg === 'edit'){
                                console.log('-------Test 2');
                                textBoxEditLinkB.click();
                                helper.clickButton(textBoxInLineB,"Inline Editing - Text Box");
                                helper.setValue(textBoxInLineB, getEditedValue,"In Line Editing - Text Box field value entered:["+getEditedValue+"]");
                                helper.wait_for(1000);
                                if (getSaveOrCancelOrDelete === 'save'){
                                    helper.clickButton(saveB, "Save Button");
                                }else if(getSaveOrCancelOrDelete === 'cancel'){
                                    helper.clickButton(cancelB, "Cancel Button");
                                }else if(getSaveOrCancelOrDelete === 'delete'){
                                    helper.clickButton(deleteB, "Delete Button");
                                };
                            };
                            if (getVerify === 'verify'){
                                expect(Test2.toString()).to.eql(getIdentifierName.toString());
                                helper.verifyTableRowText(textBoxEditLinkB, getVerificationVal, "Verifying Row Text");
                            };
                        };
                    });
                };
                //Row 3
                if (i === 2){
                    console.log('Test 3');
                    identifierTypeNm = identifierTypRwC.getText('value');
                    identifierTypeNm.then(function(Test3){
                        if (Test3 === getIdentifierName){
                            if(getEditFalg === 'edit'){
                                console.log('-------Test 3');
                                textBoxEditLinkC.click();
                                helper.clickButton(textBoxInLineC,"Inline Editing - Text Box");
                                helper.setValue(textBoxInLineC, getEditedValue,"In Line Editing - Text Box field value entered:["+getEditedValue+"]");
                                helper.wait_for(1000);
                                if (getSaveOrCancelOrDelete === 'save'){
                                    helper.clickButton(saveC, "Save Button");
                                }else if(getSaveOrCancelOrDelete === 'cancel'){
                                    helper.clickButton(cancelC, "Cancel Button");
                                }else if(getSaveOrCancelOrDelete === 'delete'){
                                    helper.clickButton(deleteC, "Delete Button");
                                };
                            };
                            if (getVerify === 'verify'){
                                expect(Test3.toString()).to.eql(getIdentifierName.toString());
                                helper.verifyTableRowText(textBoxEditLinkC, getVerificationVal, "Verifying Row Text");
                            };
                        };
                    });
                };
                //Row 4
                if (i === 3){
                    console.log('Test 4');
                    identifierTypeNm = identifierTypRwD.getText('value');
                    identifierTypeNm.then(function(Test4){
                        if (Test4 === getIdentifierName){
                            if(getEditFalg === 'edit'){
                                console.log('-------Test 4');
                                textBoxEditLinkD.click();
                                helper.clickButton(textBoxInLineD,"Inline Editing - Text Box");
                                helper.setValue(textBoxInLineD, getEditedValue,"In Line Editing - Text Box field value entered:["+getEditedValue+"]");
                                helper.wait_for(1000);
                                if (getSaveOrCancelOrDelete === 'save'){
                                    helper.clickButton(saveD, "Save Button");
                                }else if(getSaveOrCancelOrDelete === 'cancel'){
                                    helper.clickButton(cancelD, "Cancel Button");
                                }else if(getSaveOrCancelOrDelete === 'delete'){
                                    helper.clickButton(deleteD, "Delete Button");
                                };
                            };
                            if (getVerify === 'verify'){
                                expect(Test4.toString()).to.eql(getIdentifierName.toString());
                                helper.verifyTableRowText(textBoxEditLinkD, getVerificationVal, "Verifying Row Text");
                            };
                        };
                    });
                };
                //Row 5
                if (i === 4){
                    console.log('Test 5');
                    identifierTypeNm = identifierTypRwE.getText('value');
                    identifierTypeNm.then(function(Test5){
                        if (Test5 === getIdentifierName){
                            if(getEditFalg === 'edit'){
                                console.log('-------Test 5');
                                textBoxEditLinkE.click();
                                helper.clickButton(textBoxInLineE,"Inline Editing - Text Box");
                                helper.setValue(textBoxInLineE, getEditedValue,"In Line Editing - Text Box field value entered:["+getEditedValue+"]");
                                helper.wait_for(1000);
                                if (getSaveOrCancelOrDelete === 'save'){
                                    helper.clickButton(saveE, "Save Button");
                                }else if(getSaveOrCancelOrDelete === 'cancel'){
                                    helper.clickButton(cancelE, "Cancel Button");
                                }else if(getSaveOrCancelOrDelete === 'delete'){
                                    helper.clickButton(deleteE, "Delete Button");
                                };
                            };
                            if (getVerify === 'verify'){
                                expect(Test5.toString()).to.eql(getIdentifierName.toString());
                                helper.verifyTableRowText(textBoxEditLinkE, getVerificationVal, "Verifying Row Text");
                            };
                        };
                    });
                };
                //Row 6
                if (i === 5){
                    console.log('Test 6');
                    identifierTypeNm = identifierTypRwF.getText('value');
                    identifierTypeNm.then(function(Test6){
                        if (Test6 === getIdentifierName){
                            if(getEditFalg === 'edit'){
                                console.log('-------Test 6');
                                textBoxEditLinkF.click();
                                helper.clickButton(textBoxInLineF,"Inline Editing - Text Box");
                                helper.setValue(textBoxInLineF, getEditedValue,"In Line Editing - Text Box field value entered:["+getEditedValue+"]");
                                helper.wait_for(1000);
                                if (getSaveOrCancelOrDelete === 'save'){
                                    helper.clickButton(saveF, "Save Button");
                                }else if(getSaveOrCancelOrDelete === 'cancel'){
                                    helper.clickButton(cancelF, "Cancel Button");
                                }else if(getSaveOrCancelOrDelete === 'delete'){
                                    helper.clickButton(deleteF, "Delete Button");
                                };
                            };
                            if (getVerify === 'verify'){
                                expect(Test6.toString()).to.eql(getIdentifierName.toString());
                                helper.verifyTableRowText(textBoxEditLinkF, getVerificationVal, "Verifying Row Text");
                            };
                        };
                    });
                };
                //Row 7
                if (i === 6){
                    console.log('Test 7');
                    identifierTypeNm = identifierTypRwG.getText('value');
                    identifierTypeNm.then(function(Test7){
                        if (Test7 === getIdentifierName){
                            if(getEditFalg === 'edit'){
                                console.log('-------Test 7');
                                textBoxEditLinkG.click();
                                helper.clickButton(textBoxInLineG,"Inline Editing - Text Box");
                                helper.setValue(textBoxInLineG, getEditedValue,"In Line Editing - Text Box field value entered:["+getEditedValue+"]");
                                helper.wait_for(1000);
                                if (getSaveOrCancelOrDelete === 'save'){
                                    helper.clickButton(saveG, "Save Button");
                                }else if(getSaveOrCancelOrDelete === 'cancel'){
                                    helper.clickButton(cancelG, "Cancel Button");
                                }else if(getSaveOrCancelOrDelete === 'delete'){
                                    helper.clickButton(deleteG, "Delete Button");
                                };
                            };
                            if (getVerify === 'verify'){
                                expect(Test7.toString()).to.eql(getIdentifierName.toString());
                                helper.verifyTableRowText(textBoxEditLinkG, getVerificationVal, "Verifying Row Text");
                            };
                        };
                    });
                };
                //Row 8
                if (i === 7){
                    console.log('Test 8');
                    identifierTypeNm = identifierTypRwH.getText('value');
                    identifierTypeNm.then(function(Test8){
                        if (Test8 === getIdentifierName){
                            if(getEditFalg === 'edit'){
                                console.log('-------Test 8');
                                textBoxEditLinkH.click();
                                helper.clickButton(textBoxInLineH,"Inline Editing - Text Box");
                                helper.setValue(textBoxInLineH, getEditedValue,"In Line Editing - Text Box field value entered:["+getEditedValue+"]");
                                helper.wait_for(1000);
                                if (getSaveOrCancelOrDelete === 'save'){
                                    helper.clickButton(saveH, "Save Button");
                                }else if(getSaveOrCancelOrDelete === 'cancel'){
                                    helper.clickButton(cancelH, "Cancel Button");
                                }else if(getSaveOrCancelOrDelete === 'delete'){
                                    helper.clickButton(deleteH, "Delete Button");
                                };
                            };
                            if (getVerify === 'verify'){
                                expect(Test8.toString()).to.eql(getIdentifierName.toString());
                                helper.verifyTableRowText(textBoxEditLinkH, getVerificationVal, "Verifying Row Text");
                            };
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

    //***********************************
    //General Trial page object(s)
    //***********************************

    //*****Title*****
    //Set Acronym : Title
    this.setAcronym = function(getAcronymVal){
        helper.setValue(this.generalTrailAcronym,getAcronymVal,"Acronym - Title - field");
    };

    //Set Official Title: Title
    this.setOfficialTitle = function(getOfficialTitleVal){
        helper.setValue(this.generalTrailOfficialTitle,getOfficialTitleVal,"Official Title - Title - field");
    };

    //*****Keywords*****
    this.setKeywords = function(getKeywordsVal){
        helper.setValue(this.generalTrailKeywords,getKeywordsVal,"Keywords - Title - field");
    };

    //******Trail Identifiers*******
    this.selectIdentifier = function(getIdentifierVal){
        helper.selectValueFromList(this.generalTrailIdentifier,getIdentifierVal,"Identifier - drop down field selected as:["+getIdentifierVal+"]");
    };

    this.setIdentifierTextBox = function(getIdentifierTextVal){
        helper.setValue(this.generalTrailIdentifierTextBox,getIdentifierTextVal,"Identifier - Text - field");
    };

    //Add : Button
    this.clickIdentifierAddButton = function(){
        helper.clickButton(this.generalTrailIdentifierAddButton,"Identifier Add - button");
    };

    this.verifyTrialIdentifiersTableHeader = function(){

    };


    //*********Save and Reset*************
    //Save : Button
    this.clickSave = function(){
        helper.clickButton(this.generalTrailSave,"Save - button");
    };

    //Cancel : Button
    this.clickReset = function(){
        helper.clickButton(this.generalTrailReset,"Reset - button");
    };








    //***********************************
    //In Line Editing
    //***********************************
    //In Editing : Link
    this.clickInLineEditingLink = function(){
        helper.clickButton(this.inLineEditingLink,"Inline Editing - Link");
    };

    //In Editing : Link
    this.clickInLineEditingTextBox = function(getObject){
        helper.clickButton(getObject,"Inline Editing - Text Box");
    };

    //In Line Editing Text : Text Box
    this.setInLineEditingText = function(getObject, getEditedValToBeSet)  {
        helper.setValue(getObject, getEditedValToBeSet,"In Line Editing - Text Box field value entered:["+getEditedValToBeSet+"]");
    };

    //In Line Editing Cancel : Button
    this.clickInLineEditingCancel = function(){
        helper.clickButton(this.inLineEditingCancelButton,"In Line Editing Cancel - button");
    };

    //In Line Editing Save : Button
    this.clickInLineEditingSave = function(){
        helper.clickButton(this.inLineEditingSaveButton,"In Line Editing Save - button");
    };








    //Wait For Element : Wait
    this.waitForTrailDetailsElement = function (element, label) {
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




    this.findTrailIdentifierAndClickTextBoxAndSave = function(getIdentifierName, getEditedValue, getSaveFalg){
        this.waitForTrailDetailsElement(this.generalTrailTableTBodyRowAColA, "Trail Identifiers Table");
        this.generalTrailTableAll.then(function(rows){
            console.log('total Row Count:['+(rows.length)+']');
            for (var i=0; i<(rows.length); i++){
                //Row 1
                if (i === 0){
                    console.log('Test 1');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test1){
                        if (Test1 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 1');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(1) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(100);
                            };
                        };
                    });
                };
                //Row 2
                if (i === 1){
                    console.log('Test 2');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test2){
                        if (Test2 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 2');
                                var textBoxInLine = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(2) td:nth-child(02) input'));
                                helper.clickButton(textBoxInLine,"Inline Editing - Text Box");
                                helper.setValue(textBoxInLine, getEditedValue,"In Line Editing - Text Box field value entered:["+getEditedValue+"]");
                                helper.wait_for(100);
                            };
                        };
                    });
                };
                //Row 3
                if (i === 2){
                    console.log('Test 3');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test3){
                        if (Test3 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 3');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(3) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(1000);
                            };

                        };
                    });
                };
                //Row 4
                if (i === 3){
                    console.log('Test 4');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test4){
                        if (Test4 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 4');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(4) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(1000);
                            };

                        };
                    });
                };
                //Row 5
                if (i === 4){
                    console.log('Test 5');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test5){
                        if (Test5 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 5');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(5) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(1000);
                            };

                        };
                    });
                };
                //Row 6
                if (i === 5){
                    console.log('Test 6');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test6){
                        if (Test6 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 6');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(6) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(1000);
                            };

                        };
                    });
                };
                //Row 7
                if (i === 6){
                    console.log('Test 7');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test7){
                        if (Test7 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 7');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(7) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(1000);
                            };

                        };
                    });
                };
                //Row 8
                if (i === 7){
                    console.log('Test 8');
                    identifierTypeNm = element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(01)')).getText('value');
                    identifierTypeNm.then(function(Test8){
                        if (Test8 === getIdentifierName){
                            if(getSaveFalg === 'save'){
                                console.log('-------Test 8');
                                element(by.css('.table.table-bordered.table-striped.table-hover tbody tr:nth-child(8) td:nth-child(02) span .editable-click.ng-binding')).click();
                                helper.wait_for(1000);
                            };

                        };
                    });
                };
                //
            };
        });
    };


};

module.exports = abstractionTrialDetails;
