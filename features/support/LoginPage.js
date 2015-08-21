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
    var params = browser.params;
    var login = new helper();

    this.setUsername = function(){
        login.setValue(this.username,params.login.user,"Username field");
    };

    this.setPassword = function(){
        login.setValue(this.password,params.login.password,"Password field");
    };

    this.login = function(){
        login.wait(this.loginButton,"Login button");
        this.loginButton.click();
      //  expect(browser.getCurrentUrl()).to.eventually.equal('http://localhost/ctrp/angular#/main/organizations');
        expect(browser.getCurrentUrl()).to.eventually.equal('http://ctrp-ci.nci.nih.gov/ctrp/angular#/main/organizations');//.and.notify(next);
    };

    this.cancel = function(){
        login.wait(this.cancelButton,"Cancel button");
        this.cancelButton.click();
    };

};
module.exports = LoginPage;
