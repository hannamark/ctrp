/**
 * Created by singhs10 on 11/17/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var helperFunctions = require('../support/helper');
var addTrialPage = require('../support/registerTrialPage');
var searchTrialPage = require('../support/searchTrialPage');
var trialMenuItemList = require('../support/trialCommonBar');
var menuItemList = require('../support/PoCommonBar');
var addOrgPage = require('../support/AddOrganizationPage');
var searchOrgPage = require('../support/ListOfOrganizationsPage');
var searchPeoplePage = require('../support/ListOfPeoplePage');
var addPeoplePage = require('../support/AddPersonPage');
//var searchFamilyPage = require('../support/ListOfFamiliesPage');
var addFamilyPage = require('../support/AddFamilyPage');
var selectValuePage = require('../support/CommonSelectList');
var loginPage = require('../support/LoginPage');
var moment = require('moment');
//var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var abstractionCommonMethods = require('../support/abstractionCommonMethods');


var projectMethodsRegistry = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var selectValue = new selectValuePage();
    var addOrg = new addOrgPage();
    var searchOrg = new searchOrgPage();
    var searchPeople = new searchPeoplePage();
    var addPeople = new addPeoplePage();
    //var searchFamily = new searchFamilyPage();
    var addFamily = new addFamilyPage();
    var helper = new helperFunctions();
    var addTrial = new addTrialPage();
    var searchTrial = new searchTrialPage();
    var trialMenuItem = new trialMenuItemList();
//    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var commonFunctions = new abstractionCommonMethods();
    var self = this;

    this.selectTrials = function(trialType) {
        if (trialType === 'National') {
            trialMenuItem.clickRegisterNationalTrialLink();
        }
        else if (trialType === 'Externally Peer-Reviewed') {
            trialMenuItem.clickRegisterExternallyPeerReviewedTrialLink();
        }
        else if (trialType === 'Institutional')   {
            trialMenuItem.clickRegisterInstitutionalTrialLink();
        }
    };

    /*****************************************************************
     * Method: Verify Trial Other Identifiers value
     * @param protocolIDOrigin
     * @param protocolID
     *****************************************************************/
    this.verifyAddTrialOtherTrialIdentifier = function (protocolIDOrigin, protocolID) {
        return addTrial.addTrialVerifyOtherTrialIdentifier.getText().filter(function (row) {
            // Get the second column's text.
            return row.$$('td').get(0).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === protocolIDOrigin;
            });
        }).then(function (rows) {
            console.log('value of row' + rows);
           expect(rows[0].element(by.css('.col-md-6.protocol-id')).getText()).to.eventually.equal(protocolID);
        },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };

    /*****************************************************************
     * Method: Verify Trial Other Identifiers value
     * @param anyItemInTable
     *****************************************************************/
    this.verifyAddTrialOtherTrialIdentifierTable = function (anyItemInTable) {
        return addTrial.addTrialVerifyOtherTrialIdentifierTable.filter(function(name) {
            return name.getText().then(function(text) {
                console.log('text is' + text + 'Item to be verified' + anyItemInTable);
                return text === anyItemInTable ;
            });
        }).then(function(filteredElements) {
            console.log('filtered elements' + filteredElements);
            // Only the elements that passed the filter will be here. This is an array.
            if(filteredElements.length > 0) {
                return 'true';}
            else {return 'false';}
        });
    };

    /*****************************************************************
     * Method: Verify Trial Oversight Authority Country Organization
     * @param country
     * @param organization
     *****************************************************************/
    this.verifyAddTrialOversightCountryOrganization = function (country, organization) {
        return addTrial.addTrialVerifyOversightCountryOrganization.getText().filter(function (row) {
            // Get the first column's text.
            return row.$$('td').get(0).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === country;
            });
        }).then(function (rows) {
                console.log('value of row' + rows);
                expect(rows[0].element(by.binding('authority.organization')).getText()).to.eventually.equal(organization);
            },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };

    /*****************************************************************
     * Method: Verify Trial Grant information value
     * @param fundingMechanism
     * @param instituteCode
     * @param serialNumber
     * @param programCode
     *****************************************************************/
    this.verifyAddTrialGrantInformation = function (fundingMechanism, instituteCode, serialNumber, programCode) {
        return addTrial.addTrialVerifyGrantTable.getText().filter(function (row) {
            // Get the first column's text.
            return row.$$('td').get(0).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name');
                console.log(rowName);
                console.log('print funding name');
                console.log(fundingMechanism);
                return rowName === fundingMechanism;
            });
        }).then(function (rows) {
                console.log('value of row' + rows);
                expect(rows[0].element(by.binding('grant.institute_code')).getText()).to.eventually.equal(instituteCode);
                expect(rows[0].element(by.binding('grant.serial_number')).getText()).to.eventually.equal(serialNumber);
                expect(rows[0].element(by.binding('grant.nci')).getText()).to.eventually.equal(programCode);
            },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };


    /*****************************************************************
     * Method: Verify Trial FDA IND/IDE information value
     * @param INDIDEType
     * @param INDIDENumber
     * @param INDIDEGrantor
     * @param INDIDEHolderType
     * @param INDIDEProgramCode
     *****************************************************************/
    this.verifyAddTrialFDA_IND_IDEInformation = function (INDIDEType, INDIDENumber, INDIDEGrantor, INDIDEHolderType, INDIDEProgramCode) {
        return addTrial.addTrialVerifyIND_IDETable.getText().filter(function (row) {
            // Get the first column's text.
            return row.$$('td').get(0).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name');
                console.log(rowName);
                console.log('print IND IDE name');
                console.log(INDIDEType);
                return rowName === INDIDEType;
            });
        }).then(function (rows) {
                console.log('value of row' + rows);
                expect(rows[0].element(by.binding('indIde.ind_ide_number')).getText()).to.eventually.equal(INDIDENumber);
                expect(rows[0].element(by.binding('indIde.grantor')).getText()).to.eventually.equal(INDIDEGrantor);
                expect(rows[0].element(by.binding('indIde.holder_type_name')).getText()).to.eventually.equal(INDIDEHolderType);
                expect(rows[0].element(by.binding('indIde.nih_nci')).getText()).to.eventually.equal(INDIDEProgramCode);
            },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };


    /*****************************************************************
     * Method: Verify Trial Status information value
     * @param status
     * @param statusDate
     * @param comment
     * @param whyStudyStopped
     * @param errorsWarnings
     *****************************************************************/
        this.verifyAddTrialStatusInformation = function (status, statusDate, comment, whyStudyStopped, errorsWarnings) {
        return addTrial.addTrialAddStatusTable.getText().filter(function (row) {
            // Get the second column's text.
            return row.$$('td').get(1).getText().then(function (rowName) {
                // Filter rows matching the name you are looking for.
                //console.log('print row name');
                //console.log(rowName);
                //console.log('print Status');
                //console.log(status);
                return rowName === status;
            });
        }).then(function (rows) {
                //console.log('value of row' + rows);
                expect(rows[0].element(by.binding('status.status_date')).getText()).to.eventually.equal(statusDate);
                expect(rows[0].element(by.binding('status.comment')).getText()).to.eventually.equal(comment);
                expect(rows[0].element(by.binding('status.why_stopped')).getText()).to.eventually.equal(whyStudyStopped);
                expect(rows[0].element(by.css('.col-md-4.status-error')).getText()).to.eventually.equal(errorsWarnings);
            },
            function (err) {
                console.log('There was an error! ' + err);
            }
        );
    };


    /*****************************************************************
     * Method: Verify Trial Status for duplicate status
     * @param status
     * @param statusDate
     * @param comment
     * @param whyStudyStopped
     * @param errorsWarnings
     *****************************************************************/
    this.verifyAddTrialDuplicateStatusInformation = function (status, statusDate, comment, whyStudyStopped, errorsWarnings) {
        expect(element.all(by.binding('status.status_date')).get(0).getText()).to.eventually.equal(statusDate);
        expect(element.all(by.binding('status.trial_status_name')).get(0).getText()).to.eventually.equal(status);
        expect(element.all(by.binding('status.comment')).get(0).getText()).to.eventually.equal(comment);
        expect(element.all(by.binding('status.why_stopped')).get(0).getText()).to.eventually.equal(whyStudyStopped);
        expect(element.all(by.css('.col-md-4.status-error')).get(0).getText()).to.eventually.equal('');
        expect(element.all(by.binding('status.status_date')).get(1).getText()).to.eventually.equal(statusDate);
        expect(element.all(by.binding('status.trial_status_name')).get(1).getText()).to.eventually.equal(status);
        expect(element.all(by.binding('status.comment')).get(1).getText()).to.eventually.equal(comment);
        expect(element.all(by.binding('status.why_stopped')).get(1).getText()).to.eventually.equal(whyStudyStopped);
        expect(element.all(by.css('.col-md-4.status-error')).get(1).getText()).to.eventually.equal(errorsWarnings);
    };


    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create Organization for Trial, it creates a new org then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createOrgforTrial = function(trialOrgName,trialType,indexOfOrgModel){
       addTrial.clickAddTrialOrgSearchModel(indexOfOrgModel);
        searchOrg.clickExactSearch('true');
            searchOrg.setOrgName(trialOrgName + moment().format('MMMDoYY h'));
            cukeOrganization = searchOrg.orgName.getAttribute('value');
            searchOrg.clickSearchButton();
            return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function(state) {
                if(state === true) {
                    console.log('Organization exists');
                    searchOrg.selectOrgModelItem();
                    searchOrg.clickOrgModelConfirm();
                }
                else {
                    searchOrg.clickOrgModelClose();
                    login.login('ctrpcurator', 'Welcome01');
                    login.accept();
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 40).then(function () {
                        menuItem.clickHomeEnterOrganizations();
                        login.clickWriteMode('On');
                        menuItem.clickOrganizations();
                        menuItem.clickAddOrganizations();
                        cukeOrganization.then(function (value) {
                            console.log('Add org Name' + value);
                            addOrg.setAddOrgName(value);
                        });
                        addOrg.setAddAlias('shAlias');
                        addOrg.clickSaveAlias();
                        addOrg.setAddAddress('9609 MedicalTrial Center Drive');
                        addOrg.setAddAddress2('9609 MedicalTrial Center Drive');
                        selectValue.selectCountry('Poland');
                        selectValue.selectState('Lubuskie');
                        addOrg.setAddCity('searchTrialCity');
                        addOrg.setAddPostalCode('55578');
                        addOrg.setAddEmail('searchTrialOrg@email.com');
                        addOrg.setAddPhone('545-487-8956');
                        addOrg.setAddFax('898-487-4242');
                        addOrg.clickSave();
                        orgSourceId = addOrg.addOrgCTRPID.getText();
                        login.login('ctrptrialsubmitter', 'Welcome01');
                        login.accept();
                        browser.driver.wait(function () {
                            console.log('wait here');
                            return true;
                        }, 40).then(function () {
                            trialMenuItem.clickHomeSearchTrial();
                            login.clickWriteMode('On');
                            self.selectTrials(trialType);//selectTrials(trialType);
                            /* Since adding Org when Responsible Party is set to 'Principal Investigator' is hidden so adding a step to select the Responsible party first*/
                            if (indexOfOrgModel === '3') {
                                addTrial.selectAddTrialResponsibleParty('Principal Investigator');
                                addTrial.clickAddTrialOrgSearchModel(indexOfOrgModel);
                            }
                            else {
                                addTrial.clickAddTrialOrgSearchModel(indexOfOrgModel);
                            }
                            searchOrg.clickExactSearch('true');
                            cukeOrganization.then(function (value) {
                                console.log('Add org Name' + value);
                                searchOrg.setOrgName(value);
                            });
                            searchOrg.clickSearchButton();
                            searchOrg.selectOrgModelItem();
                            searchOrg.clickOrgModelConfirm();
                        });
                    });
                }
            });
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create Person for Trial, it creates a new person then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createPersonforTrial = function(trialPersonName, trialType,indexOfPersonModel){
        addTrial.clickAddTrialPersonSearchModel(indexOfPersonModel);
        searchOrg.clickExactSearch('true');
        searchPeople.setPersonFirstName(trialPersonName + moment().format('MMMDoYY h'));
        cukePerson = searchPeople.personFirstName.getAttribute('value');
        searchPeople.setPersonOrgAffiliation('trialPerAffOrg' + moment().format('MMMDoYY h'));
        cukeOrganization = searchPeople.personOrgAffiliation.getAttribute('value');
        searchPeople.clickSearch();
        /** This will check if Person exists or not **/
        return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function(state) {
            if(state === true) {
                console.log('Person exists');
                searchOrg.selectOrgModelItem();
                searchOrg.clickOrgModelConfirm();
            }
            else {
                searchOrg.clickOrgModelClose();
                login.login('ctrpcurator', 'Welcome01');
                login.accept();
                browser.driver.wait(function () {
                    console.log('wait here');
                    return true;
                }, 40).then(function () {
                    menuItem.clickHomeEnterOrganizations();
                    login.clickWriteMode('On');
                    menuItem.clickPeople();
                    menuItem.clickAddPerson();
                    addPeople.setAddPersonPrefix('prefix');
                    cukePerson.then(function (value) {
                        console.log('Add person Name' + value);
                        addPeople.setAddPersonFirstName(value);
                    });
                    addPeople.setAddPersonSecondName('mName');
                    addPeople.setAddPersonLastName('lName');
                    addPeople.setAddPersonSuffix('suffix');
                    addPeople.setAddPersonEmail('email@eml.com');
                    addPeople.setAddPersonPhone('222-444-5555');
                    addPeople.clickSave();
                    searchOrg.clickOrgSearchModel();
                    cukeOrganization.then(function (value) {
                        console.log('Add org Name' + value);
                        searchOrg.setOrgName(value);
                    });
                 //   searchOrg.setOrgName('trialPerAffOrg' + moment().format('MMMDoYY h'));
                 //   cukeOrganization = searchOrg.orgName.getAttribute('value');
                    searchOrg.clickSearchButton();
                    return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function(state) {
                        if (state === true) {
                            console.log('Organization exists');
                            searchOrg.selectOrgModelItem();
                            searchOrg.clickOrgModelConfirm();
                        }
                        else {
                            searchOrg.clickOrgModelClose();
                            menuItem.clickOrganizations();
                            menuItem.clickAddOrganizations();
                            cukeOrganization.then(function (value) {
                                console.log('Add org Name' + value);
                                addOrg.setAddOrgName(value);
                            });
                            addOrg.setAddAlias('shAlias');
                            addOrg.clickSaveAlias();
                            addOrg.setAddAddress('9609 Aff PerOrg MedicalTrial Center Drive');
                            addOrg.setAddAddress2('9609 Aff PerOrg II MedicalTrial Center Drive');
                            selectValue.selectCountry('Togo');
                            selectValue.selectState('Centre');
                            addOrg.setAddCity('searchTrialCity');
                            addOrg.setAddPostalCode('55578');
                            addOrg.setAddEmail('searchTrialOrg@email.com');
                            addOrg.setAddPhone('545-487-8956');
                            addOrg.setAddFax('898-487-4242');
                            addOrg.clickSave();
                            menuItem.clickPeople();
                            menuItem.clickListPeople();
                            searchPeople.setPersonFirstName(cukePerson);
                            searchPeople.clickSearch();
                            element(by.linkText(cukePerson)).click();
                            searchOrg.clickOrgSearchModel();
                            searchOrg.setOrgName(cukeOrganization);
                            searchOrg.clickSearchButton();
                            searchOrg.selectOrgModelItem();
                            searchOrg.clickOrgModelConfirm();
                        }
                        addPeople.clickSave();
                        login.login('ctrptrialsubmitter', 'Welcome01');
                        login.accept();
                        browser.driver.wait(function () {
                            console.log('wait here');
                            return true;
                        }, 40).then(function () {
                            trialMenuItem.clickHomeSearchTrial();
                            login.clickWriteMode('On');
                            self.selectTrials(trialType);//selectTrials(trialType);
                            /* Since adding Person when Responsible Party is set to 'Sponsor-Investigator' is hidden so adding a step to select the Responsible party first*/
                            if (indexOfPersonModel === '1') {
                                addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
                                addTrial.clickAddTrialPersonSearchModel(indexOfPersonModel);
                            }
                            else {
                                addTrial.clickAddTrialPersonSearchModel(indexOfPersonModel);
                            }
                            searchOrg.clickExactSearch('true');
                            cukePerson.then(function (value) {
                                console.log('Add person Name' + value);
                                searchPeople.setPersonFirstName(value);
                            });
                            searchOrg.clickSearchButton();
                            searchOrg.selectOrgModelItem();
                            searchOrg.clickOrgModelConfirm();
                        });
                    });
                });
            }
        });
    };

    /*****************************************************************
     * Method: Verify the warning message
     * @param warningText
     *****************************************************************/
    this.verifyTrialValidationMessage = function(warningText) {
        return addTrial.addTrialValidationMessage.filter(function(name) {
            return name.getText().then(function(text) {
                //  console.log('value of text : ' + text + 'and value of searched string' + warningText + '.');
                return text === warningText ;
            });
        }).then(function(filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
            // console.log(filteredElements);
            if(filteredElements.length > 0) {
                return 'true';}
            else {return 'false';}
        });
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will add already existing\created Organization for Trial
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.selectOrgforTrial = function(trialOrgName,indexOfOrgModel) {
        /* Since adding Org when Responsible Party is set to 'Principal Investigator' is hidden so adding a step to select the Responsible party first*/
        if (indexOfOrgModel === '3') {
            addTrial.selectAddTrialResponsibleParty('Principal Investigator');
            addTrial.clickAddTrialOrgSearchModel(indexOfOrgModel);
        }
        else {
            addTrial.clickAddTrialOrgSearchModel(indexOfOrgModel);
        }
        searchOrg.clickExactSearch('true');
        searchOrg.setOrgName(trialOrgName);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will add already existing\created Person for Trial
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.selectPerForTrial = function(trialPerName,indexOfPerModel) {
        /* Since adding Person when Responsible Party is set to 'Sponsor-Investigator' is hidden so adding a step to select the Responsible party first*/
        if (indexOfPerModel === '1') {
            addTrial.selectAddTrialResponsibleParty('Sponsor-Investigator');
            addTrial.clickAddTrialPersonSearchModel(indexOfPerModel);
        }
        else {
            addTrial.clickAddTrialPersonSearchModel(indexOfPerModel);
        }
        searchOrg.clickExactSearch('true');
        searchPeople.setPersonFirstName(trialPerName);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
    };


    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create a New Trial
     * @param: trialType
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createTrial = function(trialType, leadOrgIdentifier) {
        self.createOrgforTrialfromPO('leadOrg');
        /**** Stores the value of Lead Org ****/
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 40).then(function() {
            storeLeadOrg = cukeOrganization.then(function (value) {
                console.log('This is the Lead Organization that is added' + value);
                return value;
            });
        });
        self.createPersonforTrialfromPO('prinInv');
        /**** Stores the value of Principal Investigator ****/
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 40).then(function() {
            storePrinInv = per4.then(function (value) {
                console.log('This is the Principal Investigator that is added' + value);
                return value;
            });
        });
        self.createOrgforTrialfromPO('sponsorOrg');
        /**** Stores the value of Sponsor Org ****/
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 40).then(function() {
            storeSponOrg = cukeOrganization.then(function (value) {
                console.log('This is the Sponsor Organization that is added' + value);
                return value;
            });
        });
        self.createOrgforTrialfromPO('dataTbl4Org');
        /**** Stores the value of Lead Org ****/
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 40).then(function() {
            storeDateTblOrg = cukeOrganization.then(function (value) {
                console.log('This is the Data Table 4 Organization that is added' + value);
                return value;
            });
            browser.get('ui/#/main/sign_in');
            commonFunctions.onPrepareLoginTest('ctrptrialsubmitter');
            self.selectTrials(trialType);
            login.clickWriteMode('On');
            addTrial.setAddTrialLeadProtocolIdentifier(leadOrgIdentifier + moment().format('MMMDoYY h'));
            addTrial.setAddTrialOfficialTitle('Trial Shi created by Cuke Test script');
            addTrial.selectAddTrialPhase('IV');
            addTrial.selectAddTrialPilotOption('1');
            addTrial.selectAddTrialResearchCategory('Observational');
            addTrial.selectAddTrialPrimaryPurpose('Treatment');
            addTrial.selectAddTrialAccrualDiseaseTerminology('SDC');
            /***** This will add the Lead Org ******/
            browser.driver.wait(function () {
                console.log('wait here');
                return true;
            }, 40).then(function () {
                storeLeadOrg.then(function (value) {
                    self.selectOrgforTrial(value, '0');
                });
                /***** This will add the Principal Investigator ******/
                storePrinInv.then(function (value) {
                    self.selectPerForTrial(value, '0');
                });
                /***** This will add the Sponsor Org ******/
                storeSponOrg.then(function (value) {
                    self.selectOrgforTrial(value, '1');
                });
                /***** This will add the Data Table 4 Org ******/
                storeDateTblOrg.then(function (value) {
                    self.selectOrgforTrial(value, '2');
                });
            });
            addTrial.selectAddTrialFundedByNCIOption('0');
            addTrial.selectAddTrialFundingMechanism('F32');
            addTrial.selectAddTrialInstituteCode('CA');
            addTrial.setAddTrialSerialNumber('153978');
            addTrial.addTrialSerialNumberSelect.click();
            addTrial.selectAddTrialNCIDivisionProgramCode('CCR');
            addTrial.clickAddTrialAddGrantInfoButton();
            //    addTrial.selectAddTrialStatus
            //    addTrial.clickAddTrialAddStatusButton
            //    addTrial.selectAddTrialStartDateOption
            //    addTrial.selectAddTrialPrimaryCompletionDateOption
            //    addTrial.selectAddTrialCompletionDateOption
            //    addTrial.selectAddTrialFDAIND_IDEOption
            //addTrial.selectAddTrialFDAIND_IDETypes
            //addTrial.setAddTrialFDAIND_IDENumber
            //addTrial.selectAddTrialFDAIND_IDEGrantor
            //addTrial.selectAddTrialFDAIND_IDEHolderType
            //    addTrial.clickAddTrialAddIND_IDEButton
            addTrial.clickAddTrialReviewButton();
        });


    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create Trial Organization in PO, it creates a new org then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createOrgforTrialfromPO = function(orgName){
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        // login.accept();
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 40).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            menuItem.clickOrganizations();
            menuItem.clickListOrganizations();
            searchOrg.setOrgName(orgName + moment().format('MMMDoYY h'));
            cukeOrganization = searchOrg.orgName.getAttribute('value');
            searchOrg.clickSearchButton();
            return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function(state) {
                if(state === true) {
                    console.log('Organization exists');
                    cukeOrganization.then(function(value){
                        element(by.linkText(value)).click();
                        orgSourceId = addOrg.addOrgCTRPID.getText();
                    });
                }
                else {
                    browser.driver.wait(function() {
                        console.log('wait here');
                        return true;
                    }, 40).then(function() {
                        menuItem.clickOrganizations();
                        menuItem.clickAddOrganizations();
                        cukeOrganization.then(function(value){
                            console.log('Add org Name' + value);
                            addOrg.setAddOrgName(value);
                        });
                        addOrg.setAddAlias('shEditAlias');
                        addOrg.clickSaveAlias();
                        addOrg.setAddAddress('9609 Medical Trial Center Drive');
                        addOrg.setAddAddress2('9609 Medical Trial2 Center Drive');
                        selectValue.selectCountry('Jordan');
                        selectValue.selectState('Irbid');
                        addOrg.setAddCity('editTrialCity');
                        addOrg.setAddPostalCode('42666');
                        addOrg.setAddEmail('editTrialOrg@email.com');
                        addOrg.setAddPhone('589-8888-956');
                        addOrg.setAddFax('898-9420-442');
                        addOrg.clickSave();
                        orgSourceId = addOrg.addOrgCTRPID.getText();
                    });
                }
            });
        });
    };

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create Person for Trial, it creates a new person then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createPersonforTrialfromPO = function(perName){
        browser.get('ui/#/main/sign_in');
        commonFunctions.onPrepareLoginTest('ctrpcurator');
        // login.accept();
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 40).then(function() {
            menuItem.clickHomeEnterOrganizations();
            login.clickWriteMode('On');
            menuItem.clickPeople();
            menuItem.clickListPeople();
            searchPeople.setPersonFirstName(perName + moment().format('MMMDoYY h'));
            per4 = searchPeople.personFirstName.getAttribute('value');
            searchPeople.clickSearch();
            return element(by.css('div.ui-grid-cell-contents')).isPresent().then(function(state) {
                if(state === true) {
                    console.log('Person exists');
                    per4.then(function(value){
                        element(by.linkText(value)).click();
                        perSourceId = addPeople.addPersonSourceId.getText();
                    });
                }
                else {
                    browser.driver.wait(function() {
                        console.log('wait here');
                        return true;
                    }, 40).then(function() {
                        menuItem.clickPeople();
                        menuItem.clickAddPerson();
                        addPeople.setAddPersonPrefix('prefix');
                        per4.then(function (value1) {
                            console.log('Add first Name' + value1);
                            addPeople.setAddPersonFirstName(value1);
                        });
                        addPeople.setAddPersonSecondName('Rauniyar');
                        addPeople.setAddPersonLastName('SinghTrial');
                        addPeople.setAddPersonSuffix('suffix');
                        addPeople.setAddPersonEmail('shiPercukeTrial@pr.com');
                        addPeople.setAddPersonPhone('420-8754-906');
                        addPeople.clickSave();
                        perSourceId = addPeople.addPersonSourceId.getText();
                    });
                }
            });
        });
    };
};
module.exports = projectMethodsRegistry;