/**
 * Created by singhs10 on 9/4/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
//var chaiParam = require('chai-param');
var should = chai.should();
// var   param = chaiParam.param;
var ListOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var addOrgPage = require('../support/AddOrganizationPage');
var LoginPage = require('../support/LoginPage.js');
var MenuItem = require('../support/PoCommonBar');
var familyPage = require('../support/AddFamilyPage');
var listFamilyPage = require('../support/ListOfFamiliesPage');
var helper = require('../support/helper');
var selectList = require('../support/CommonSelectList');
var personPage = require('../support/AddPersonPage');
var searchPersonPage = require('../support/ListOfPeoplePage');
var projectFunctionsPage = require('../support/projectMethods');
var projectFunctionRegistryPage = require('../support/projectMethodsRegistry');
var trialMenuItemList = require('../support/trialCommonBar');
var addTrialPage = require('../support/registerTrialPage');

module.exports = function() {
    var menuItemList = new MenuItem();
    var searchFamily = new listFamilyPage();
    var Search = new ListOfOrganizationPage();
    var addOrg = new addOrgPage();
    var login = new LoginPage();
    var addPerson = new personPage();
    var projectFunctions = new projectFunctionsPage();
    var searchPerson = new searchPersonPage();
    var projectFunctionsRegistry = new projectFunctionRegistryPage();
    var trialMenuItem = new trialMenuItemList();
    var addTrial = new addTrialPage();

    this.Given(/^I want to test the Login page$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        login.login('ctrptrialsubmitter', 'Welcome01');
        login.accept();
        trialMenuItem.clickHomeSearchTrial();
            login.clickWriteMode('On');
        projectFunctionsRegistry.selectTrials('National');
        addTrial.clickAddTrialAddProtocolButton();
     //   var ptor = protractor.getInstance();
        var alertDialog = browser.switchTo().alert();
        alertDialog.getText().then(function(value){
            console.log('value of alert dialog' + value);
        });
        browser.sleep(5000);
        alertDialog.accept();
      //  expect(alertDialog.getText()).toEqual("Hello");
        //menuItemList.clickOrganizations();
        //menuItemList.clickAddOrganizations();
        //browser.sleep(5000);
        //login.clickWriteMode('On');
        //menuItemList.clickOrganizations();
        //menuItemList.clickAddOrganizations();
        //addOrg.setAddOrgName('test');
   /*     browser.sleep(5000);
        login.clickWriteMode('Off');
        menuItemList.clickOrganizations();
        menuItemList.clickAddOrganizations();
        //addOrg.setAddOrgName('test');
        browser.sleep(5000);
        login.clickWriteMode('Off');
        menuItemList.clickOrganizations();
        menuItemList.clickAddFamily();
        browser.sleep(5000);
        login.clickWriteMode('On');
        menuItemList.clickOrganizations();
        menuItemList.clickAddOrganizations();
        addOrg.setAddOrgName('test');
        //browser.sleep(5000);
        //login.clickWriteMode('On');
        //menuItemList.clickOrganizations();
        //menuItemList.clickAddOrganizations();
        //addOrg.setAddOrgName('test'); */
            browser.sleep(5000).then(callback);
    });

    this.Given(/^Test with same login$/, function (callback) {
        //login.login('ctrpcurator', 'Welcome01');
        //login.accept();
        //menuItemList.clickHomeEnterOrganizations();
        //menuItemList.clickOrganizations();
        //menuItemList.clickListFamily();
        browser.sleep(5).then(callback);
    });

    this.Then(/^Test with different login$/, function (callback) {
        //login.login('ctrptrialsubmitter', 'Welcome01');
        //login.accept();
        //menuItemList.clickHomeEnterOrganizations();
        //trialMenuItem.clickHomeSearchTrial();
        //login.clickWriteMode('On');
        callback();
    });

    this.Given(/^I want to test the Login page second time$/, function (callback) {
        browser.get('ui/#/main/sign_in');
        login.login('ctrptrialsubmitter', 'Welcome01');
        login.accept();
        menuItemList.clickHomeEnterOrganizations();
      //  trialMenuItem.clickHomeSearchTrial();
        projectFunctionsRegistry.selectTrials('National');
        login.clickWriteMode('On');
        browser.sleep(210).then(callback);
     //   callback();
    });

    this.Given(/^Test with same login second time$/, function (callback) {
        element(by.model('trialDetailView.curTrial.official_title')).sendKeys('12345');
        //login.login('ctrpcurator', 'Welcome01');
        //login.accept();
        //menuItemList.clickHomeEnterOrganizations();
        //login.clickWriteMode('On');
        //menuItemList.clickOrganizations();
        //menuItemList.clickListFamily();
        browser.sleep(210).then(callback);
       // callback();
    });

    this.Then(/^Test with different login second time$/, function (callback) {
        element(by.model('trialDetailView.curTrial.official_title')).clear();
        element(by.model('trialDetailView.curTrial.official_title')).sendKeys('bhjnbjibn eruhf');
        expect(element(by.model('trialDetailView.curTrial.official_title')).getAttribute('value')).to.eventually.equal('xyx').and.notify(callback);
        //login.login('ctrptrialsubmitter', 'Welcome01');
        //login.accept();
        //menuItemList.clickHomeEnterOrganizations();
        //trialMenuItem.clickHomeSearchTrial();
        //login.clickWriteMode('On');
       // browser.sleep(50).then(callback);
       // callback();
    });

}

