/**
 * Created by singhs10 on 4/7/16.
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var should = chai.should();
//var assert = require('chai').assert();
var helperFunctions = require('../support/helper');
var fs = require('fs');
var testConfiguration = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testConfig/';

var mailVerificationfunction = function() {

    this.gmailEmailField = by.id('Email');
    this.gmailNextButtonafterEmail = by.id('next');
    this.gmailPasswordField = by.id('Passwd');
    this.gmailSignInButton = by.id('signIn');
    this.gmailSearchField = by.id('gbqfq');
    this.gmailSearchEmailButton = by.xpath('//*[@id="gbqfb"]');
    this.gmailclickfirstEmail = by.xpath('//div[5]/div/div/table/tbody/tr[1]');
    this.gmailEntireEmailText = by.xpath('//*[@id=":7z"]/div[1]/div[2]');
    this.gmailEmailBody = By.className("a3s");//by.xpath('//*[@id=":2"]/div/div[2]/div/table/tr/td[1]/div[2]/div[2]');
//a3s

    //*[@id=":2"]/div/div[2]/div/table/tr/td[1]/div[2]/div[2]/div/div[3]/div
    //*[@id=":2"]/div/div[2]/div/table/tr/td[1]/div[2]/div[2]
    //*[@id=":77"]
    //*[@id=":2"]/div/div[2]/div/table/tr/td[1]/div[2]/div[2]/div/div[3]/div
    ///html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/table/tr/td[1]/div[2]/div[2]/div/div[3]/div/div/div/div/div/div[1]/div[2]/div[7]/div/div[1]/div[2]/div[1]/div[1]
    ///html/body/div[7]/div[3]/div/div[2]/div[1]/div[2]/div/div/div/div[2]/div[1]/div[1]/div/div[2]/div/table/tr/td[1]/div[2]/div[2]/div/div[3]/div/div/div/div/div/div[1]/div[2]/div[7]/div/div[2]/div[2]
    this.gmailVerifySuccessLoginWithPrimaryTab = by.xpath('//*[@id=":2z"]/div[5]');
    var helper = new helperFunctions();


        this.gmailMailVerification = function (gmailURL, gmailEmailID, gmailEmailToBeSearched, textOfEmailToBeVerified, callback) {
            var configurationFile;
            console.log('file path'+testConfiguration);
            configurationFile = ''+testConfiguration+'/testSettings.json';
            var configuration = JSON.parse(
                fs.readFileSync(configurationFile)
            );
            console.log(configuration.trialSubmitterEmail);
            console.log(configuration.trialSubmitterEmailPwd);
            browser.driver.get(gmailURL);
            helper.setValueNonAngularPage(this.gmailEmailField,gmailEmailID, 'Email field on Sign In Page');
            helper.clickButtonNonAngularPage(this.gmailNextButtonafterEmail, 'Next button on Email Sign In Page');
            helper.setValueNonAngularPage(this.gmailPasswordField, configuration.trialSubmitterEmailPwd,'Password field ');
            helper.clickButtonNonAngularPage(this.gmailSignInButton, 'Sign In Button');
            browser.driver.isElementPresent(this.gmailVerifySuccessLoginWithPrimaryTab).then(function (state) {
                if (state === true) {
                    return  console.log('Gmail Login successful');}
                 else {
                    callback(new Error('Gmail Login unsuccessful'));
                }

            });
                helper.setValueNonAngularPage(this.gmailSearchField, gmailEmailToBeSearched, 'Search field');
                helper.clickButtonNonAngularPage(this.gmailSearchEmailButton, 'Search Email button');
                helper.clickButtonNonAngularPage(this.gmailclickfirstEmail, 'First Email');
                browser.driver.findElement(this.gmailEmailBody).getText().then(function (value) {
                    console.log('value of email body without send information:\n' + value + '\n');
                    expect(value).to.equal(textOfEmailToBeVerified);
            //
                });
            //});
        }

};
module.exports = mailVerificationfunction;