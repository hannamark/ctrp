/**
 * Created by singhs10 on 7/30/15.
 */

var LoginPage = function(){

    this.username = element(by.model('userView.userObj.user.username'));
    this.password = element(by.model('userView.userObj.user.password'));
    this.loginButton = element(by.css('button[ng-click="userView.authenticate()"]'));
    this.cancelButton = element(by.css('input[value="Reset"]'));
    var params = browser.params;

    this.setUsername = function(){
        this.username.clear();
        this.username.sendKeys(params.login.user);
    };

    this.setPassword = function(){
        this.password.clear();
        this.password.sendKeys(params.login.password);
    };

    this.login = function(){
        this.loginButton.click();
    };

    this.cancel = function(){
        this.cancelButton.click();
    };

};
module.exports = LoginPage;
