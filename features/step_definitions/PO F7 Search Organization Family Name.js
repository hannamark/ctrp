/**
 * Created by singhs10 on 10/6/15.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var MenuItem = require('../support/PoCommonBar');
var familyPage = require('../support/AddFamilyPage');
var listFamilyPage = require('../support/ListOfFamiliesPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var moment = require('moment');


module.exports = function() {
    var menuItemList = new MenuItem();
    var searchFamily = new listFamilyPage();
    var addFamily = new familyPage();
    var selectItem =new selectList();
    var familyNameId = element(by.model('familyDetailView.curFamily.name'));



    this.Given(/^I select the option to search Organization Family$/, function (callback) {
        menuItemList.clickOrganizations();
        menuItemList.clickListFamily();
        browser.sleep(250).then(callback);
    });

    this.Then(/^I want to search with family name (.*)$/, function (familyName, callback) {
        searchFamily.setFamilyName(familyName);
        browser.sleep(250).then(callback);
    });

    this.Given(/^I click on Search button$/, function (callback) {
        searchFamily.clickSearchButton();
        browser.sleep(250).then(callback);
    });

    this.Then(/^In the search result for family name (.*) it shall return result (.*)$/, function (familyName, result, callback) {
        expect(menuItemList.inResults(familyName)).to.become(result);
        browser.sleep(250).then(callback);
    });

    this.Given(/^the result should be sorted by family name$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^I want to search with family type (.*)$/, function (familyType, callback) {
        selectItem.selectFamilyType(familyType);
        browser.sleep(250).then(callback);
    });

    this.Then(/^In the search result for family type (.*) it shall return result (.*)$/, function (familyType, result, callback) {
        expect(menuItemList.inResults(familyType)).to.become(result);
        browser.sleep(250).then(callback);
    });

    this.Then(/^I want to search with family status (.*)$/, function (familyStatus, callback) {
        selectItem.selectFamilyStatus(familyStatus);
        browser.sleep(250).then(callback);
    });

    this.Then(/^In the search result for family status (.*) it shall return result (.*)$/, function (familyStatus, result, callback) {
        expect(menuItemList.inResults(familyStatus)).to.become(result);
        browser.sleep(250).then(callback);
    });

    this.Then(/^I want to search with family name as "([^"]*)"$/, function (arg1, callback) {
        searchFamily.setFamilyName(arg1);
        browser.sleep(250).then(callback);
    });

    this.Then(/^the search results should display the following sorted by family name$/, function (table, callback) {
      //  expect(MenuItemList.inResultsHeader('Family Name')).to.become('true');
     //   expect(MenuItemList.inResultsHeader('Family Status')).to.become('true');
     //   expect(MenuItemList.inResultsHeader('Family Type')).to.become('true');
     //   expect(MenuItemList.inResultsHeader('OrganizationFamilyMembers')).to.become('true');
     //   expect(MenuItemList.inResultsHeader('OrganizationFamilyMemberRelationship')).to.become('true');
     //   browser.sleep(250).then(callback);
        callback.pending();
    });

    this.Given(/^I want to search with family type (.*)$/, function (familyType, callback) {
        selectItem.selectFamilyType(familyType);
        browser.sleep(250).then(callback);
    });

    this.Given(/^I want to search with family status (.*)$/, function (familyStatus, callback) {
        selectItem.selectFamilyStatus(familyStatus);
        browser.sleep(250).then(callback);
    });

    this.Then(/^In the search result for family name (.*) ,family type (.*) and family status (.*) it shall return result (.*)$/, function (familyName, familyType, familyStatus, result, callback) {
        if (familyName != '')
        {expect(menuItemList.inResults(familyName)).to.become(result);}
        if (familyStatus != '')
        {expect(menuItemList.inResults(familyStatus)).to.become(result);}
        if (familyType != '')
        {expect(menuItemList.inResults(familyType)).to.become(result);}
        browser.sleep(250).then(callback);
    });


}
