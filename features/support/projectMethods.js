/**
 * Author: Shamim Ahmed
 * Author: Shilpi Singh
 * Date: 10/14/2015
 * Desc: Project related methods
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var helperFunctions = require('../support/helper');
var menuItemList = require('../support/PoCommonBar');
var addOrgPage = require('../support/AddOrganizationPage');
var searchOrgPage = require('../support/ListOfOrganizationsPage');
var searchPeoplePage = require('../support/ListOfPeoplePage');
var addPeoplePage = require('../support/AddPersonPage');
var searchFamilyPage = require('../support/ListOfFamiliesPage');
var addFamilyPage = require('../support/AddFamilyPage');
var selectValuePage = require('../support/CommonSelectList');
var loginPage = require('../support/LoginPage');
var moment = require('moment');


var projectMethods = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var selectValue = new selectValuePage();
    var addOrg = new addOrgPage();
    var searchOrg = new searchOrgPage();
    var searchPeople = new searchPeoplePage();
    var addPeople = new addPeoplePage();
    var searchFamily = new searchFamilyPage();
    var addFamily = new addFamilyPage();
    var helper = new helperFunctions();

    /**********************************
     * Method: Create Organization
     * @param orgName
     * @param alias
     * @param address1
     * @param address2
     * @param country
     * @param state
     * @param city
     * @param postalCode
     * @param email
     * @param phone
     * @param fax
     ***********************************/
    this.createOrganization = function(orgName, alias ,address1, address2, country, state, city, postalCode, email, phone, fax){
        menuItem.clickOrganizations();
        menuItem.clickAddOrganizations();
        addOrg.setAddOrgName(orgName + moment().format('MMMDoYY hmmss'));
        cukeOrganization = addOrg.addOrgName.getAttribute('value');
        if(alias !== ''){addOrg.setAddAlias(alias);addOrg.clickSaveAlias();}
        addOrg.setAddAddress(address1);
        addOrg.setAddAddress2(address2);
        selectValue.selectCountry(country);
        selectValue.selectState(state);
        addOrg.setAddCity(city);
        addOrg.setAddPostalCode(postalCode);
        addOrg.setAddEmail(email);
        addOrg.setAddPhone(phone);
        addOrg.setAddFax(fax);
        addOrg.clickSave();
    };

    /**********************************
     * Method: Create Person
     * @param prefix
     * @param fName
     * @param mName
     * @param lName
     * @param suffix
     * @param email
     * @param phone
     ***********************************/
    this.createPerson = function(prefix, fName, mName, lName, suffix, email, phone){
        menuItem.clickPeople();
        menuItem.clickAddPerson();
        addPeople.setAddPersonPrefix(prefix);
        addPeople.setAddPersonFirstName(fName + moment().format('MMMDoYY hmmss'));
        cukePerson = addPeople.addPersonFirstName.getAttribute('value');
        addPeople.setAddPersonSecondName(mName);
        addPeople.setAddPersonLastName(lName);
        addPeople.setAddPersonSuffix(suffix);
        addPeople.setAddPersonEmail(email);
        addPeople.setAddPersonPhone(phone);
        addPeople.clickSave();
    };

    /**********************************
     * Method: Create Person with Affiliated Organization
     * @param prefix
     * @param fName
     * @param mName
     * @param lName
     * @param suffix
     * @param email
     * @param phone
     * @param affOrgName
     * @param affOrgEffectiveDate
     * @param affOrgExpirationDate
     ***********************************/
    this.createPersonWithAffiliatedOrg = function(prefix, fName, mName, lName, suffix, email, phone, affOrgName, affOrgEffectiveDate, affOrgExpirationDate){
        this.createOrganization(affOrgName,'cukeAlias','Shady Grove', 'Rockville','United States','Maryland','Rockville','20675','singh@cuke.com','222-4444-555','888-9999-666');
        this.createPerson(prefix,fName,mName,lName,suffix,email,phone);
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
        searchOrg.setAffiliatedOrgEffectiveDate(affOrgEffectiveDate);
        searchOrg.setAffiliatedOrgExpirationDate(affOrgExpirationDate);
        addPeople.clickSave();
    };

    /**********************************
     * Method: Create Family
     * @param familyName
     * @param familyStatus
     * @param familyType
     ***********************************/
    this.createFamily = function(familyName, familyStatus, familyType){
        menuItem.clickOrganizations();
        menuItem.clickAddFamily();
        addFamily.setAddFamilyName(familyName + moment().format('MMMDoYY hmmss'));
        cukeFamily = addFamily.addFamilyName.getAttribute('value');
        selectValue.selectFamilyStatus(familyStatus);
        selectValue.selectFamilyType(familyType);
        addFamily.clickSave();
    };

    /**********************************
     * Method: Create Family
     * @param familyName
     * @param familyStatus
     * @param familyType
     * @param orgMember
     * @param orgRelationship
     * @param orgEffectiveDate
     * @param orgExpirationDate
     ***********************************/
    this.createFamilyWithMembers = function(familyName, familyStatus, familyType, orgMember, orgRelationship, orgEffectiveDate, orgExpirationDate){
        this.createOrganization(orgMember,'cukeAlias','Shady Grove', 'Rockville','United States','Maryland','Rockville','20675','singh@cuke.com','222-4444-555','888-9999-666');
        this.createFamily(familyName,familyStatus,familyType);
        menuItem.clickOrganizations();
        menuItem.clickListFamily();
        searchFamily.setFamilyName(cukeFamily);
        searchFamily.clickSearchButton();
        element(by.linkText(cukeFamily)).click();
        searchOrg.clickOrgSearchModel();
        searchOrg.setOrgName(cukeOrganization);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
        selectValue.selectOrgFamilyRelationship(orgRelationship)
        searchOrg.setAffiliatedOrgEffectiveDate(orgEffectiveDate);
        searchOrg.setAffiliatedOrgExpirationDate(orgExpirationDate);
        addFamily.clickSave();
    }

    /**********************************
     * Method: Verify the item in Search Results
     * @param searchString
     ***********************************/
    this.inSearchResults = function(searchString) {
        return menuItem.searchResult.filter(function(name) {
            return name.getText().then(function(text) {
                return text === searchString ;
            });
        }).then(function(filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
            if(filteredElements.length > 0) {
                return 'true';}
            else {return 'false';}
        });
    };

    /*****************************************************************
     * Method: Verify the person Created Name Date in Edit Person page
     * @param dateTimeSaved
     *****************************************************************/
    this.personVerifyCreatedNameDate = function(dateTimeSaved) {
        var userLoggedIn = menuItem.loginName.getText();
        userLoggedIn.then(function (value2) {
            var userCreatedDate = value2 + ' (' + dateTimeSaved + ')';
            console.log('user-date created value is: ' + userCreatedDate);
            (addPeople.personCreatedBy.getText()).should.eventually.equal(userCreatedDate);
        });
    };

    /*****************************************************************
     * Method: Verify the person Last Updated Name Date in Edit Person page
     * @param dateTimeEdited
     *****************************************************************/
    this.personVerifyLastUpdatedNameDate = function(dateTimeEdited) {
        var userLoggedIn = menuItem.loginName.getText();
        userLoggedIn.then(function (value2) {
            var userUpdatedDate = value2 + ' (' + dateTimeEdited + ')';
            console.log('user-date last updated value is: ' + userUpdatedDate);
            (addPeople.personLastUpdatedBy.getText()).should.eventually.equal(userUpdatedDate);
        });
    };

    /*****************************************************************
     * Method: Add the Affiliated Organization Effective Date
     * @param affiliatedOrg
     * @param effectiveDate
     *****************************************************************/
    this.setOrgAffiliatedEffectiveDate = function(affiliatedOrg, effectiveDate) {
        return searchOrg.orgPersonAffiliatedTable.getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(2).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === affiliatedOrg;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            rows[0].element(by.model('org.effective_date')).clear();
            rows[0].element(by.model('org.effective_date')).sendKeys(effectiveDate);
        });
    };


    /*****************************************************************
     * Method: Add the Affiliated Organization Expiration Date
     * @param affiliatedOrg
     * @param expirationDate
     *****************************************************************/
    this.setOrgAffiliatedExpirationDate = function(affiliatedOrg, expirationDate) {
        return searchOrg.orgPersonAffiliatedTable.getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(2).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === affiliatedOrg;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            rows[0].element(by.model('org.expiration_date')).clear();
            rows[0].element(by.model('org.expiration_date')).sendKeys(expirationDate);
        });
    };

    /*****************************************************************
     * Method: Verify the affiliated Organization
     * @param affiliatedOrg
     *****************************************************************/
    this.verifyOrgAffiliated = function(affiliatedOrg) {
        return searchOrg.orgPersonAffiliatedTable.filter(function(name) {
            return name.getText().then(function(text) {
                return text === affiliatedOrg ;
            });
        }).then(function(filteredElements) {
            // Only the elements that passed the filter will be here. This is an array.
            if(filteredElements.length > 0) {
                return 'true';}
            else {return 'false';}
        });
    };


    /*****************************************************************
     * Method: Verify the affiliated Organization Effective Date
     * @param affiliatedOrg
     * @param effectiveDate
     *****************************************************************/
    this.verifyOrgAffiliatedEffectiveDate = function(affiliatedOrg, effectiveDate) {
        return searchOrg.orgPersonAffiliatedTable.getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(2).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === affiliatedOrg;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            // rows[0].element(by.model('org.effective_date')).getAttribute('value');
            expect(rows[0].element(by.model('org.effective_date')).getAttribute('value')).to.eventually.equal(effectiveDate);
        });
    };


    /*****************************************************************
     * Method: Verify the affiliated Organization Expiration Date
     * @param affiliatedOrg
     * @param expirationDate
     *****************************************************************/
    this.verifyOrgAffiliatedExpirationDate = function(affiliatedOrg, expirationDate) {
        return searchOrg.orgPersonAffiliatedTable.getText().filter(function(row) {
            // Get the second column's text.
            return row.$$('td').get(2).getText().then(function(rowName) {
                // Filter rows matching the name you are looking for.
                console.log('print row name' + rowName);
                return rowName === affiliatedOrg;
            });
        }).then(function(rows) {
            // This is an array. Find the button in the row and click on it.
            console.log('value of row' + rows);
            expect(rows[0].element(by.model('org.expiration_date')).getAttribute('value')).to.eventually.equal(expirationDate);
        });
    };


    /********************************
     * Method: Convert Object value to a String
     * @param obj
     * @returns {string}
     ********************************/
    function objToStringAll (obj) {
        var str = '';
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += p + '::' + obj[p] + '\n';
            }
        }
        return str;
    };

    /*********************************
     * Method: Convert Object value to a String
     * @param obj
     * @returns {string}
     *********************************/
    function objToString (obj) {
        var j=''+obj+'';
        JSON.stringify(j);
        return j;
    };

};
module.exports = projectMethods;
