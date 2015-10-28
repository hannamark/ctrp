/**
 * Created by singhs10 on 7/30/15.
 */
var helper = require('../support/helper');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var LoginPage = function(){

    this.username = element(by.model('userView.userObj.user.username'));
    this.password = element(by.model('userView.userObj.user.password'));
    this.loginButton = element(by.css('button[ng-click="userView.authenticate()"]'));
    this.cancelButton = element(by.css('input[value="Reset"]'));
    this.logoutButton = element(by.css('a[ng-click="headerView.logOut()"]'));
    //this.acceptButton = element(by.css('.btn.btn-primary'));
    this.rejectButton = element(by.css('.btn.btn-warning'));
    this.acceptButton = element(by.buttonText('Accept'));//element(by.css('.container.ng-scope>button:nth-child(2)'));
    var loginPageVerifyText = element(by.css('.panel-title'));
    this.writeMode =  element(by.css('.md-thumb'));
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

    this.accept = function() {
        this.acceptButton.isDisplayed().then(function(retVal){
            if (retVal == true){
                element(by.buttonText('Accept')).click();// element(by.css('.container.ng-scope>button:nth-child(2)')).click();
            }
        });
    };

    this.logout = function(){
        login.wait(this.logoutButton,"logout Button");
        this.logoutButton.click();
       expect(browser.getCurrentUrl()).to.eventually.equal('http://ctrp-ci.nci.nih.gov/ctrp/ui#/main/sign_in');
    };

    this.clickWriteMode = function(){
        login.clickButton(this.writeMode,"Role");
    };
};
module.exports = LoginPage;
