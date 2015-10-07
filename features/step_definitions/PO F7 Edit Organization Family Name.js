/**
 * Created by singhs10 on 10/5/15.
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
    var familyName = 'fam PR cukeEdit';

    this.Given(/^I select the option to edit Organization Family$/, function (callback) {
       callback();
    });

    this.Given(/^I have selected family name to edit$/, function (callback) {
        menuItemList.clickOrganizations();
        menuItemList.clickAddFamily();
        addFamily.setAddFamilyName(familyName + moment().format('MMMDoYY hmmss'));
        fam4 = familyNameId.getAttribute('value');
        selectItem.selectFamilyType('NIH');
        selectItem.selectFamilyStatus('Active');
        addFamily.clickSave();
        menuItemList.clickOrganizations();
        menuItemList.clickListFamily();
       browser.sleep(250).then(callback);
    });

    this.Given(/^I have changed the family name$/, function (callback) {
        fam4.then(function(value2) {
            console.log('search family - ' + value2);
            searchFamily.setFamilyName(value2);
            searchFamily.clickSearchButton();
            expect(menuItemList.inResults(value2)).to.become('true');
            element(by.linkText(value2)).click();
            addFamily.familyVerifyEditHeader();
        });
        addFamily.setAddFamilyName(familyName + moment().format('MMMDoYY hmmss'));
        fam5 = familyNameId.getAttribute('value');
        browser.sleep(250).then(callback);
    });

    this.Given(/^I have changed the family type (.*)$/, function (familyType, callback) {
        selectItem.selectFamilyType(familyType);
        browser.sleep(250).then(callback);
    });

    this.Given(/^I have changed the family status (.*)$/, function (familyStatus, callback) {
        selectItem.selectFamilyStatus(familyStatus);
        browser.sleep(250).then(callback);
    });

    this.Given(/^I save the Family information$/, function (callback) {
        addFamily.clickSave();
        browser.sleep(250).then(callback);
    });

    this.Then(/^the family name with family type (.*) and family status (.*) will be updated and return result (.*)$/, function (familyType, familyStatus, result, callback) {
        menuItemList.clickOrganizations();
        menuItemList.clickListFamily();
        fam5.then(function(value2) {
            console.log('search family - ' + value2);
            searchFamily.setFamilyName(value2);
            searchFamily.clickSearchButton();
            expect(menuItemList.inResults(value2)).to.become(result);
            element(by.linkText(value2)).click();
            addFamily.familyVerifyEditHeader();
            addFamily.familyVerifyAddName(value2);
            addFamily.familyVerifyAddStatus(familyStatus);
            addFamily.familyVerifyAddType(familyType);
        });
        browser.sleep(250).then(callback);
    });

    this.Given(/^I have selected family name "([^"]*)" to edit$/, function (arg1, callback) {
        menuItemList.clickOrganizations();
        menuItemList.clickListFamily();
        searchFamily.setFamilyName(arg1);
        searchFamily.clickSearchButton();
        expect(menuItemList.inResults(arg1)).to.become('true');
        element(by.linkText(arg1)).click();
        browser.sleep(250).then(callback);
    });


    this.Given(/^I have changed the family name (.*) to edit$/, function (familyName, callback) {
        addFamily.setAddFamilyName(familyName);
        browser.sleep(250).then(callback);
    });

    this.Then(/^the system will notify any error with (.*)$/, function (response, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


}
