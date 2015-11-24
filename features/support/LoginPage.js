/**
 * Created by singhs10 on 7/30/15.
 */
var helper = require('../support/helper');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var menuItemList = require('../support/PoCommonBar');

var LoginPage = function(){

    this.username = element(by.model('userView.userObj.user.username'));
    var menuItem = new menuItemList();
    this.password = element(by.model('userView.userObj.user.password'));
    this.loginButton = element(by.css('button[ng-click="userView.authenticate()"]'));
    this.cancelButton = element(by.css('input[value="Reset"]'));
    this.logoutButton = element(by.css('a[ng-click="headerView.logOut()"]'));
    this.rejectButton = element(by.buttonText('Reject'));
    this.acceptButton = element(by.buttonText('Accept'));
    this.loginUser = element(by.css('.ng-binding:nth-child(1)'));
    var loginPageVerifyText = element(by.css('.panel-title'));
    var writeMode =  element(by.css('.md-thumb'));
    var params = browser.params;
    var login = new helper();

    this.setUsername = function(){
        login.setValue(this.username,params.login.user,"Username field");
    };

    this.setPassword = function(){
        login.setValue(this.password,params.login.password,"Password field");
    };

    this.login_button = function(){
        login.wait(this.loginButton,"Login button");
        this.loginButton.click();
      //  expect(browser.getCurrentUrl()).to.eventually.equal('http://localhost/ctrp/ui#/main/organizations');
        expect(browser.getCurrentUrl()).to.eventually.equal('http://ctrp-ci.nci.nih.gov/ctrp/ui#/main/organizations');//.and.notify(next);
    };

    this.cancel = function(){
        login.wait(this.cancelButton,"Cancel button");
        this.cancelButton.click();
    };

    this.login = function (userName, password){
        this.logoutButton.isDisplayed().then(function(result) {
            if (result) {
                //Whatever if it is true (displayed)
                element(by.binding('headerView.username')).getText().then(function(value)   {
                    if (value === userName) {
                        console.log(userName + 'already logged in');
                    }
                    else {
                        element(by.css('a[ng-click="headerView.logOut()"]')).click();
                        element(by.model('userView.userObj.user.username')).sendKeys(userName);
                        element(by.model('userView.userObj.user.password')).sendKeys(password);
                        element(by.css('button[ng-click="userView.authenticate()"]')).click();
                    }
                });
             //   expect(login.header_Page.getText()).to.eventually.equal('Clinical Trials Reporting Program');
            } else {
                element(by.model('userView.userObj.user.username')).sendKeys(userName);
                element(by.model('userView.userObj.user.password')).sendKeys(password);
                element(by.css('button[ng-click="userView.authenticate()"]')).click();
            }
        });
    };

    this.login_orgi = function (userName, password){
        this.logoutButton.isDisplayed().then(function(result) {
            if (result) {
                //Whatever if it is true (displayed)
                element(by.css('a[ng-click="headerView.logOut()"]')).click();
                element(by.model('userView.userObj.user.username')).sendKeys(userName);
                element(by.model('userView.userObj.user.password')).sendKeys(password);
                element(by.css('button[ng-click="userView.authenticate()"]')).click();
                //   expect(login.header_Page.getText()).to.eventually.equal('Clinical Trials Reporting Program');
            } else {
                element(by.model('userView.userObj.user.username')).sendKeys(userName);
                element(by.model('userView.userObj.user.password')).sendKeys(password);
                element(by.css('button[ng-click="userView.authenticate()"]')).click();
            }
        });
    };

    this.accept = function(){
        this.acceptButton.isPresent().then(function(retVal){
            console.log('value of ret val : ' + retVal);
            if (retVal === true) {
                element(by.buttonText('Accept')).click();// element(by.css('.container.ng-scope>button:nth-child(2)')).click();
            }
        });
    };
    //{
    //    this.logoutButton.isPresent().then(function(result) {
    //        //Whatever if it is true (displayed)
    //        console.log('value of result : ' + result);
    //        if (!result) {
    //            element(by.buttonText('Accept')).isDisplayed().then(function(retVal){
    //                if (retVal === true) {
    //                    element(by.buttonText('Accept')).click();// element(by.css('.container.ng-scope>button:nth-child(2)')).click();
    //                }
    //            });
    //        }
    //    });
    //};


    this.accept_orgi = function() {
        this.acceptButton.isDisplayed().then(function(retVal){
            console.log('value of ret val : ' + retVal);
            if (retVal === true) {
                element(by.buttonText('Accept')).click();// element(by.css('.container.ng-scope>button:nth-child(2)')).click();
            }
        });
    };


    this.reject = function() {
        this.rejectButton.isDisplayed().then(function(retValRej){
            if (retValRej == true){
                element(by.buttonText('Reject')).click();
            }
        });
    };

    this.logout = function(){
        login.wait(this.logoutButton,"logout Button");
        this.logoutButton.click();
       expect(browser.getCurrentUrl()).to.eventually.equal('http://ctrp-ci.nci.nih.gov/ctrp/ui#/main/sign_in');
    };

    this.clickWriteMode = function(writeModeOnOffValue){
        element(by.model('headerView.isCurationEnabled')).getText().then (function(value) {
            console.log('value of write mode : ' + value);
            if (value === 'Write Mode: Off' && writeModeOnOffValue === 'On') {
                login.clickButton(writeMode,"Role");
            }
            else if (value === 'Write Mode: On' && writeModeOnOffValue === 'Off') {
                login.clickButton(writeMode,"Role");
            }
        });
    };

    this.clickWriteMode_orgi = function(){
        login.clickButton(this.writeMode,"Role");
    };
};
module.exports = LoginPage;
