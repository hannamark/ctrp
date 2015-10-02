/**
 * Created by singhs10 on 10/1/15.
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

    this.Given(/^I select the option to add Organization Family$/, function (callback) {
        menuItemList.clickOrganizations();
        menuItemList.clickAddFamily();
        browser.sleep(250).then(callback);
    });

    this.Given(/^I have entered a new family name (.*)$/, function (familyName, callback) {
        addFamily.setAddFamilyName(familyName + moment().format('MMMDoYY hmmss'));
        fam4 = familyNameId.getAttribute('value');
        browser.sleep(250).then(callback);
    });

    this.Given(/^I have entered a family type (.*)$/, function (familyType, callback) {
       selectItem.selectFamilyType(familyType);
        browser.sleep(250).then(callback);
    });

    this.Given(/^I have entered a family status (.*)$/, function (familyStatus, callback) {
        selectItem.selectFamilyStatus(familyStatus);
        browser.sleep(250).then(callback);
    });

    this.Given(/^I save the family information$/, function (callback) {
        addFamily.clickSave();
        browser.sleep(250).then(callback);
    });

    this.Then(/^a new family name (.*) with family type (.*) and family status (.*) will be created and return result (.*)$/, function (familyName, familyType, familyStatus, result, callback) {
        menuItemList.clickOrganizations();
        menuItemList.clickListFamily();
        fam4.then(function(value2)
        {console.log('search family - ' + value2);
            searchFamily.setFamilyName(value2);
            searchFamily.clickSearchButton();
            expect(menuItemList.inResults(value2)).to.become(result);
            element(by.linkText(value2)).click();
            addFamily.familyVerifyAddName(value2);
        //    addFamily.familyVerifyAddStatus(familyStatus);
        //    addFamily.familyVerifyAddType(familyType);
        });
        browser.sleep(250).then(callback);
    });

    this.Then(/^an error (.*) will be displayed$/, function (response, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


}