/**
 * Created by singhs10 on 10/8/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var menuItem = require('../support/PoCommonBar');
var familyPage = require('../support/AddFamilyPage');
var listFamilyPage = require('../support/ListOfFamiliesPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var moment = require('moment');
var loginPage = require('../support/LoginPage');
var addOrgPage = require('../support/AddOrganizationPage');
var searchOrgPage = require('../support/ListOfOrganizationsPage');


module.exports = function() {
    var menuItemList = new menuItem();
    var searchFamily = new listFamilyPage();
    var addFamily = new familyPage();
    var login = new loginPage();
    var addOrg = new addOrgPage();
    var searchOrg = new searchOrgPage();
    var selectItem =new selectList();
    var familyNameId = element(by.model('familyDetailView.curFamily.name'));

    this.Before (function (callback){
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        menuItemList.clickRole('CURATOR');
        addFamily.familyDefaultCreate('SSFamilyCuke', 'Active', 'NIH');
        browser.sleep(250).then(callback);
    });

    this.Given(/^I know which organization I wish to assign to an Organization Family$/, function (callback) {
        fam4.then(function(value2)
        {console.log('Added family Name - ' + value2);
            addOrg.orgDefaultCreate('SSOrgCuke','','','','','','','','','','','');
            org4.then(function(value4)
            {console.log('Added Organization Name - ' + value4);});});
        browser.sleep(250).then(callback);
    });

    this.Given(/^I am have selected the option to search Families$/, function (callback) {
        menuItemList.clickOrganizations();
        menuItemList.clickListFamily();
        browser.sleep(250).then(callback);
    });

    this.Given(/^a list of Family Names is displayed$/, function (callback) {
        fam4.then(function(value2)
        {console.log('search family - ' + value2);
            searchFamily.setFamilyName(value2);
            searchFamily.clickSearchButton();
            expect(menuItemList.inResults(value2)).to.become('true');
        });
        browser.sleep(250).then(callback);
    });

    this.Given(/^I select a Family to edit$/, function (callback) {
        fam4.then(function(value2)
        {element(by.linkText(value2)).click();
            addFamily.familyVerifyAddName(value2);
        });
        browser.sleep(250).then(callback);
    });

    this.When(/^I select the option to Add Family Membership$/, function (callback) {
        searchOrg.clickOrgSearchModel();
        browser.sleep(250).then(callback);
    });

    this.When(/^I Search Organizations and select an Organization$/, function (callback) {
        org4.then(function(value4){
            console.log('search Organization - ' + value4);
            searchOrg.setOrgName(value4);
            searchOrg.clickSearchButton();
            searchOrg.selectOrgModelItem();
            searchOrg.clickOrgModelConfirm();
        });
        browser.sleep(250).then(callback);
    });

    this.When(/^I select an effective date which is defaulted to the current date$/, function (callback) {
        searchOrg.verifyDefaultAffiliatedOrgEffectiveDate();
        browser.sleep(250).then(callback);
    });

    this.When(/^I select an expiration date which is defaulted to null$/, function (callback) {
        searchOrg.verifyDefaultAffiliatedOrgExpirationDate();
        browser.sleep(250).then(callback);
    });

    this.When(/^I select either Organization or Affiliate Family Relationship$/, function (callback) {
        selectItem.selectOrgFamilyRelationship('Affiliation');
        browser.sleep(250).then(callback);
    });

    this.Then(/^the Family is updated with the CTRP ID, Organization Name, Family Relationship, effective date, and expiration date$/, function (callback) {
        addFamily.clickSave();
        addFamily.familyVerifyMembershipSize('1');
        browser.sleep(250).then(callback);
    });

    this.Given(/^I know which Family I want to update$/, function (callback) {
        fam4.then(function(value2)
        {console.log('Added family Name - ' + value2);
            addOrg.orgDefaultCreate('SSOrgCuke','','','','','','','','','','','');
            org4.then(function(value4)
            {console.log('Added Organization Name - ' + value4);});
        });
        browser.sleep(250).then(callback);
    });

    this.Given(/^the Family Organizations are displayed$/, function (callback) {
        searchOrg.clickOrgSearchModel();
         org4.then(function(value4){
           console.log('search Organization - ' + value4);
        searchOrg.setOrgName(value4);
        searchOrg.clickSearchButton();
        searchOrg.selectOrgModelItem();
        searchOrg.clickOrgModelConfirm();
         });
        addFamily.clickSave();
        menuItemList.clickOrganizations();
        menuItemList.clickListFamily();
        fam4.then(function(value2)
        {console.log('search family - ' + value2);
            searchFamily.setFamilyName(value2);
            searchFamily.clickSearchButton();
            element(by.linkText(value2)).click();});
        browser.sleep(250).then(callback);
    });

    this.When(/^I select the option to remove an organization from a Family$/, function (callback) {
        searchOrg.clickOrgAffiliatedRemove();
        browser.sleep(2500).then(callback);
    });

    this.Then(/^the Family will be updated and the selected organization removed$/, function (callback) {
        addFamily.clickSave();
        addFamily.familyVerifyMembershipSize('0');
        browser.sleep(250).then(callback);
    });


}
