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
                console.log('text is' + text + 'Itemto be verified' + anyItemInTable);
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

    /** ******************************** ******************************** ******************************** ******************************** ********************************
     * Method: This will create Organization for Trial, it creates a new org then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createOrgforTrial = function(trialOrgName,trialType,indexOfOrgModel){
       addTrial.clickAddTrialOrgSearchModel(indexOfOrgModel);
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
                    }, 4000).then(function () {
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
                        addOrg.setAddAddress('9609 Medical Center Drive');
                        addOrg.setAddAddress2('9609 Medical Center Drive');
                        selectValue.selectCountry('Benin');
                        selectValue.selectState('Donga');
                        addOrg.setAddCity('searchCity');
                        addOrg.setAddPostalCode('46578');
                        addOrg.setAddEmail('searchOrg@email.com');
                        addOrg.setAddPhone('222-487-8956');
                        addOrg.setAddFax('222-487-4242');
                        addOrg.clickSave();
                        orgSourceId = addOrg.addOrgCTRPID.getText();
                        login.login('ctrptrialsubmitter', 'Welcome01');
                        login.accept();
                        browser.driver.wait(function () {
                            console.log('wait here');
                            return true;
                        }, 4000).then(function () {
                            trialMenuItem.clickHomeSearchTrial();
                            login.clickWriteMode('On');
                            self.selectTrials(trialType);//selectTrials(trialType);
                            addTrial.clickAddTrialOrgSearchModel(indexOfOrgModel);
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
     * Method: This will create Organization for Trial, it creates a new org then checks if it exist then use the same one
     ******************************** ******************************** ******************************** ******************************** ********************************/
    this.createPersonforTrial = function(trialPersonName, trialType,indexOfPersonModel){
        addTrial.clickAddTrialPersonSearchModel(indexOfPersonModel);
        searchPeople.setPersonFirstName(trialPersonName + moment().format('MMMDoYY h'));
        cukePerson = searchPeople.personFirstName.getAttribute('value');
        searchPeople.clickSearch();
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
                }, 4000).then(function () {
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
                   // orgSourceId = addOrg.addOrgCTRPID.getText();
                    login.login('ctrptrialsubmitter', 'Welcome01');
                    login.accept();
                    browser.driver.wait(function () {
                        console.log('wait here');
                        return true;
                    }, 4000).then(function () {
                        trialMenuItem.clickHomeSearchTrial();
                        login.clickWriteMode('On');
                        self.selectTrials(trialType);//selectTrials(trialType);
                        addTrial.clickAddTrialPersonSearchModel(indexOfPersonModel);
                        cukePerson.then(function (value) {
                            console.log('Add person Name' + value);
                            searchPeople.setPersonFirstName(value);
                        });
                        searchOrg.clickSearchButton();
                        searchOrg.selectOrgModelItem();
                        searchOrg.clickOrgModelConfirm();
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
};
module.exports = projectMethodsRegistry;