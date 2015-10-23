/**
 * Created by singhs10 on 7/16/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var loginPage = require('../support/LoginPage');
var listOfOrganizationPage = require('../support/ListOfOrganizationsPage');
var menuItemList = require('../support/PoCommonBar');
var addOrganizationPage = require('../support/AddOrganizationPage');
var mainSelectItemPage = require('../support/CommonSelectList.js');
var projectFunctionsPage= require('../support/projectMethods');


module.exports = function() {
    var login = new loginPage();
    var menuItem = new menuItemList();
    var searchOrg = new listOfOrganizationPage();
    var addOrg = new addOrganizationPage();
    var selectItem =new mainSelectItemPage();
    var projectFunctions = new projectFunctionsPage();
    var CTEPID = 'ACRN';

    this.Given(/^I know the name of the organization I wish to search for$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        browser.driver.wait(function() {
            console.log('wait here');
            return true;
        }, 4000).then(function() {
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrg1', 'alias', 'add1', 'add2', 'United States', 'Florida', 'avenue', '24567', 's@s.com', '222-4444-555', '444-6666-555');
            storeOrg1 = cukeOrganization.then(function(value) {
                console.log('This is the first org that is added' + value);
                return value;
            });
            menuItem.clickOrganizations();
            menuItem.clickListOrganizations();
            menuItem.clickOrganizations();
            menuItem.clickAddOrganizations();
            projectFunctions.createOrganization('singhOrg2', 'alias2', 'add1', 'add2', 'United States', 'Florida', 'avenue', '24567', 's@s.com', '222-4444-555', '444-6666-555');
            browser.driver.wait(function() {
                console.log('wait here');
                return true;
            }, 4000).then(function() {
                cukeOrganization.then(function(value) {
                    console.log('This is the second Org:' + value);
                    menuItem.clickOrganizations();
                    menuItem.clickListOrganizations();
                    searchOrg.setOrgName(value);
                    searchOrg.clickSearchButton();
                    expect(projectFunctions.inSearchResults(value)).to.become('true');
                    element(by.linkText(value)).click();
                    storeOrg1.then(function(value) {
                        console.log('This is the first1 org that will be added in Alias' + value);
                        addOrg.setAddAlias(value);
                        addOrg.clickSaveAlias();
                        addOrg.clickSave();
                    });
                });
            });
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am logged in to CTRP$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpadmin', 'Welcome01');
        login.clickWriteMode();
        browser.sleep(25).then(callback);
    });

    this.Given(/^I have selected the option to search for an organization$/, function (callback) {
        menuItem.clickOrganizations();
        menuItem.clickListOrganizations();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial name of the organization I wish to search for$/, function (callback) {
        storeOrg1.then(function (value) {
            console.log('This is the first Org for search:' + value);
            searchOrg.setOrgName(value);
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I indicate to include aliases$/, function (callback) {
        searchOrg.checkAlias(false);
        browser.sleep(25).then(callback);
    });

    this.When(/^I submit my search request$/, function (callback) {
        searchOrg.clickSearchButton();
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the name or the alias$/, function (callback) {
        storeOrg1.then(function (value) {
            console.log('This is the first Org:' + value);
            expect(projectFunctions.inSearchResults(value)).to.become('true');
        });
        cukeOrganization.then(function (value) {
            console.log('This is the second Org which contains the alias:' + value);
            expect(projectFunctions.inSearchResults(value)).to.become('true');
        });
        browser.sleep(25).then(callback);
    });

    this.When(/^I indicate to not search Aliases$/, function (callback) {
        searchOrg.checkAlias(true);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the name$/, function (callback) {
        storeOrg1.then(function (value) {
            console.log('This is the first Org:' + value);
            expect(projectFunctions.inSearchResults(value)).to.become('true');
        });
        cukeOrganization.then(function (value) {
            console.log('This is the second Org that has the first Org Alias:' + value);
            expect(projectFunctions.inSearchResults(value)).to.become('false');
        });
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the CTEP ID of the organization I wish to search for$/, function (callback) {
       callback();
    });

    this.When(/^I provide the CTEP ID of the organization I wish to search for$/, function (callback) {
        searchOrg.setSourceId(CTEPID);
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the CTEP ID$/, function (callback) {
        expect(projectFunctions.inSearchResults(CTEPID)).to.become('true');
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the PO Organization ID of the organization I wish to search for$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        browser.driver.wait(function()  {
            console.log('wait here');
            return true;
        }, 4000).then(function() {
            login.clickWriteMode();
            projectFunctions.createOrganization('shiOrgPOID', 'alias', 'add1', 'add2', 'United States', 'Florida', 'avenue', '24567', 's@s.com', '222-4444-555', '444-6666-555');
            browser.driver.wait(function() {
                console.log('wait here');
                return true;
            }, 4000).then(function() {
                cukeOrganization.then(function(value) {
                    console.log('This is the second Org:' + value);
                    menuItem.clickOrganizations();
                    menuItem.clickListOrganizations();
                    searchOrg.setOrgName(value);
                    searchOrg.clickSearchButton();
                    expect(projectFunctions.inSearchResults(value)).to.become('true');
                    element(by.linkText(value)).click();
                });
            });/*    browser.driver.wait(function() {
                console.log('wait here');
                return true;
            }, 4000).then(function() {
                cukeOrganization.then(function (value) {
                    menuItem.clickOrganizations();
                    menuItem.clickListOrganizations();
                searchOrg.setOrgName(value);
                searchOrg.clickSearch();
                expect(projectFunctions.inSearchResults(value)).to.become('true');
                element(by.linkText(value)).click();
            });
            });*/
        });
       // ctrpID = addOrg.addOrgCTRPID.getText();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the PO Organization ID of the organization I wish to search for$/, function (callback) {
        //ctrpID.then(function(value) {
        //   console.log('This is the CTRP ID of added Org' + value);
        //    searchOrg.setSourceId(value);
        //});
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain the PO Organization ID$/, function (callback) {
        //ctrpID.then(function(value) {
        //    console.log('This is the CTRP ID of added Org' + value);
        //    expect(projectFunctions.inSearchResults(value)).to.become('true');
        //});
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the Family name to which the organization I wish to search for belongs to$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial Family name of the organization I wish to search for$/, function (callback) {
        Search.setFamilyName('Masonic Cancer Center');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that are members of the Family Name$/, function (callback) {
        expect(Search.inResults('Masonic Cancer Center')).to.become(true).and.notify(callback);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the city I wish to search for$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial city of the organization I wish to search for$/, function (callback) {
        Search.setCity('Wilmington');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations whose address contains the city$/, function (callback) {
        expect(Search.inResults('Wilmington')).to.become(true);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the state I wish to search for$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the state from a list of states displayed by CTRP$/, function (callback) {
        Search.selectCountry('United States');
        Search.selectState('North Carolina');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations whose address contains the state$/, function (callback) {
        expect(Search.inResults('North Carolina')).to.become(true);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the country I wish to search for$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.When(/^I select the country from a list of countries displayed by CTRP$/, function (callback) {
        Search.selectCountry('Switzerland');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations whose address contains the country$/, function (callback) {
        expect(Search.inResults('Switzerland')).to.become(true).and.notify(callback);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the zip code I wish to search for$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial zip code of the organization I wish to search for$/, function (callback) {
        Search.setPostalCode('27157');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations whose address contains the zip code$/, function (callback) {
        expect(Search.inResults('27157')).to.become(true).and.notify(callback);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the organization phone number I wish to search for$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the full or partial phone number of the organization I wish to search for$/, function (callback) {
        Search.setPhone('336-716-0891');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations with matching phone numbers$/, function (callback) {
        expect(Search.inResults('336-716-0891')).to.become(true);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the organization_trial_relationship I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I select the organization_trial_relationship of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that have the organization_trial_relationship$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know multiple parameters of the organization I wish to search for$/, function (callback) {
        browser.sleep(25).then(callback);
    });

    this.Given(/^I am on the search organizations screen$/, function (callback) {
        MenuItemList.clickOrganizations();
        MenuItemList.clickListOrganizations();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the parameters of the organization I wish to search for$/, function (callback) {
        Search.setOrgName('university*');
        Search.setSourceId('MN022');
        Search.selectCountry('United States');
        Search.selectState('Minnesota');
        browser.sleep(25).then(callback);
    });

    this.Then(/^the system should display all organizations that contain all of the entered parameters$/, function (callback) {
        expect(Search.inResults('University of Minnesota Medical Center-Fairview')).to.become(true);
        expect(Search.inResults('MN022')).to.become(true);
        // expect(Search.inResults('United States')).to.become(true);
        expect(Search.inResults('Minnesota')).to.become(true);
        expect(Search.inResults('MN021')).to.become(false);
        browser.sleep(25).then(callback);
    });

    this.Given(/^I know the name of the curator date I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I am logged in to CTRP PO application$/, function (callback) {
        browser.get('ui#/main/sign_in');
        login.login('ctrpcurator', 'Welcome01');
        MenuItemList.clickWriteMode();
        browser.sleep(25).then(callback);
    });

    this.When(/^I provide the curator date of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that contain the curator date$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I know the name of the curator name I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the curator name of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that contain the curator name$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


    this.Given(/^I know the status of the organization I wish to search for$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Given(/^I am on a search organizations screen$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I provide the status of the organization I wish to search for$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the system should display all organizations that have a matching organization status$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });


}