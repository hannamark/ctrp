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
var LoginPage = require('../support/LoginPage.js');

module.exports = function() {
    var Search = new ListOfOrganizationPage();
    var Login = new LoginPage();
/*
    this.Given(/^I want to test the Login page$/, function (callback) {
        browser.get('angular#/main/sign_in').then(function(){callback();});
      //  setTimeout(callback,1000);
    });

    this.When(/^I enter username (.*)$/, function (username, callback) {
        element(by.model('userView.userObj.user.username')).sendKeys(username).then(function(){callback();});
    //    callback();
      //  setTimeout(callback,1000);
    });

    this.Given(/^I enter password (.*)$/, function (password, callback) {
        element(by.model('userView.userObj.user.password')).sendKeys(password).then(function(){callback();});
    //    callback();
      //  setTimeout(callback,1000);
    });

    this.Then(/^i did a submit$/, function (callback) {
        element(by.css('.glyphicon.glyphicon-log-in')).click().then(function(){callback();});
        //   callback();
      //  setTimeout(callback,1000);
    });

    this.Given(/^I should see welcome (.*)$/, function (username, callback) {
        expect(element(by.binding('headerView.username')).getText()).to.eventually.equal(username).then(function(){callback();});
        //  callback();
      //  setTimeout(callback,1000);
    });

    this.Given(/^the URL should be "([^"]*)"$/, function (arg1, callback) {
        expect(browser.getCurrentUrl()).to.eventually.equal(arg1).then(function(){callback();});
      //  callback();
       // setTimeout(callback,1000);
    });

    this.When(/^I select the option to search Organization Family$/, function (callback) {
        element(by.linkText('Organizations & Families')).click();
        element(by.css('a[href="#/main/families"]')).click();
        setTimeout(callback,1000);
    });

    this.Given(/^I select the (.*) in search Organization family$/, function (searchFamilyCriteria, callback) {
        if (searchFamilyCriteria = 'Family Name'){element(by.model('familyView.searchParams.name')).click();}
        if (searchFamilyCriteria = 'Family Status'){element(by.model('familyView.searchParams.family_status')).click();}
        if (searchFamilyCriteria = 'Family ID'){element(by.model('familyView.searchParams.po_id')).click();}
        if (searchFamilyCriteria = 'Family Type'){element(by.model('familyView.searchParams.family_type')).click();}
        setTimeout(callback,1000);
    });

    this.Given(/^I enter (.*) for the family search criteria$/, function (searchFamilyValue, callback) {
        if (searchFamilyCriteria = 'Family Name'){element(by.model('familyView.searchParams.name')).click();}
        if (searchFamilyCriteria = 'Family Status'){element(by.model('familyView.searchParams.family_status')).click();}
        if (searchFamilyCriteria = 'Family ID'){element(by.model('familyView.searchParams.po_id')).click();}
        if (searchFamilyCriteria = 'Family Type'){element(by.model('familyView.searchParams.family_type')).click();}
        callback.pending();
    });

    this.Then(/^I click on "([^"]*)" button$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^a list of Family Organization Information that matches the (.*) will be displayed in the search result$/, function (searchFamilyValue, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.When(/^I searched with family name "([^"]*)"$/, function (arg1, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^In the search results it shall display these Family fields$/, function (table, callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });*/

    this.Given(/^I am logged in to CTRP PO applicationss$/, function (callback) {
        browser.get('ui#/main/sign_in');
        Login.login('ctrpadmin', 'Welcome01');
        /*
        element(by.css('a[ng-click="headerView.logOut()"]')).isDisplayed().then(function(result) {
            if (result) {
                //Whatever if it is true (displayed)
                element(by.css('a[ng-click="headerView.logOut()"]')).click();
                element(by.model('userView.userObj.user.username')).sendKeys('ctrpadmin');
                element(by.model('userView.userObj.user.password')).sendKeys('Welcome01');
                element(by.css('.glyphicon.glyphicon-log-in')).click();
            } else {
                element(by.model('userView.userObj.user.username')).sendKeys('ctrpadmin');
                element(by.model('userView.userObj.user.password')).sendKeys('Welcome01');
                element(by.css('.glyphicon.glyphicon-log-in')).click();
            }
        });*/
       // element(by.model('userView.userObj.user.username')).sendKeys('ctrpadmin');
       // element(by.model('userView.userObj.user.password')).sendKeys('Welcome01');
      //  element(by.css('.glyphicon.glyphicon-log-in')).click();
        setTimeout(callback,8000);
    });

    this.Given(/^I select the option to search Organization Family$/, function (callback) {
        element(by.linkText('Organizations & Families')).click();
        element(by.css('a[href="#/main/families"]')).click();
        setTimeout(callback,2000);
    });

    this.Then(/^I want to search with family name (.*)$/, function (familyName, callback) {
        element(by.model('familyView.searchParams.name')).sendKeys(familyName);
        setTimeout(callback,2000);
    });

    this.Given(/^I click on Search button$/, function (callback) {
        element(by.css('.glyphicon.glyphicon-search')).click();
        setTimeout(callback,2000);
    });


    this.Then(/^In the search result for family name (.*) it shall return result (.*)$/, function (familyName, result, callback) {
        expect(Search.inResults(familyName)).to.become(result).then(function(){callback();});
        //  setTimeout(callback,4000);
    });

    this.Then(/^I want to search with family type (.*)$/, function (familyType, callback) {
        element(by.model('familyView.searchParams.family_type')).sendKeys(familyType);
        setTimeout(callback,4000);
    });

    this.Then(/^In the search result for family type (.*) it shall return result (.*)$/, function (familyType, result, callback) {
        expect(Search.inResults(familyType)).to.become(result).then(function(){callback();});
      //  setTimeout(callback,4000);
    });

    this.Then(/^In the search result for family name (.*) ,family type (.*) and family status (.*) it shall return result (.*)$/, function (familyName, familyType, familyStatus, result, callback) {
      callback.pending();//  expect(Search.inResults('Active' , 'NCTN')).to.become(result).then(function(){callback();});
    });




    this.Then(/^I want to search with family status (.*)$/, function (familyStatus, callback) {
        element(by.model('familyView.searchParams.family_status')).sendKeys(familyStatus);
        setTimeout(callback,4000);
    });


        this.Then(/^In the search result for family status (.*) it shall return result (.*)$/, function (familyStatus, result, callback) {
            expect(Search.inResults(familyStatus)).to.become(result).then(function(){callback();});
            //  setTimeout(callback,4000);
        });

/*
    this.Given(/^I want to search with family type (.*)$/, function (familyType, callback) {
        // Write code here that turns the phrase above into concrete actions
        setTimeout(callback,4000);
    });

    this.Given(/^I want to search with family status (.*)$/, function (familyStatus, callback) {
        // Write code here that turns the phrase above into concrete actions
        setTimeout(callback,4000);
    });
*/

    this.Given(/^logout$/, function (callback) {
        element(by.css('a[ng-click="headerView.logOut()"]')).click();
        setTimeout(callback,4000);
    });

}

