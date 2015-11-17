/**
 * Created by singhs10 on 11/5/15.
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var trialCommonBar = function(){

    this.homeSearchTrial = element(by.css('a[href="/ctrp/ui#/main/trials"]'));
    this.homeRegisterTrial = element(by.css('a[href="/ctrp/ui#/main/new_trial/NAT"]'));
    this.mainTrialsLink = element(by.linkText('Trials')) ;
    this.searchTrialLink = element(by.linkText('Search Trials'));
    this.registerTrialLink = element(by.linkText('Register Trial'));
    this.registerNationalTrial = element(by.css('a[href="#/main/new_trial/NAT"]'));//by.linkText('National')
    this.registerExternallyPeerReviewedTrial = element(by.css('a[href="#/main/new_trial/EPR"]'));
    this.registerInstitutional = element(by.css('a[href="#/main/new_trial/INS"]'));
    this.pageHeaderText = element(by.css('div.row > h4'));

    var helper = new helperFunctions();
    var search_Trial_Header_Text = 'Search Trials * for wild card';
    var register_Trial_Header_Text = 'Register Trial';

    this.clickHomeSearchTrial = function(){
        helper.clickLink(this.homeSearchTrial, "Home Search Trial link");
        expect(this.pageHeaderText.getText()).to.eventually.equal(search_Trial_Header_Text);
    };


    this.clickHomeRegisterTrial = function(){
        helper.clickLink(this.homeRegisterTrial, "Home Register Trial link");
        expect(this.pageHeaderText.getText()).to.eventually.equal(register_Trial_Header_Text);
    };

    this.clickTrials = function(){
        helper.clickLink(this.mainTrialsLink, "Trial link");
    };


    this.clickListSearchTrialLink = function(){
        helper.clickLink(this.searchTrialLink, "Search Trial link");
        expect(this.pageHeaderText.getText()).to.eventually.equal(search_Trial_Header_Text);
    };

    this.clickRegisterTrialLink = function(){
        helper.clickLink(this.registerTrialLink, "Register Trial link");
    };

    this.clickRegisterNationalTrialLink = function(){
        browser.get('ui#/main/new_trial/NAT');
      //  http://ctrp-ci.nci.nih.gov/ctrp/ui#/main/new_trial/NAT
      //  element(by.linkText('Register Trial')).sendKeys(protractor.Key.RIGHT);
      ////  browser.actions().mouseMove(element(by.linkText('Search Trials')).find()).perform();
      //  browser.sleep(10000);
      //  //browser.driver.actions().
      //  element(by.css('a[href="#/main/new_trial/NAT"]')).click();//.then(function(elm){
      //    //  elm[0].click();
      // // });
     //   helper.clickLink(this.registerNationalTrial, "Register National Trial link");
        expect(this.pageHeaderText.getText()).to.eventually.equal(register_Trial_Header_Text);
    };

    this.clickRegisterExternallyPeerReviewedTrialLink = function(){
        browser.get('ui#/main/new_trial/EPR');
       // helper.clickLink(this.registerExternallyPeerReviewedTrial, "Register Externally Peer Reviewed Trial link");
        expect(this.pageHeaderText.getText()).to.eventually.equal(register_Trial_Header_Text);
    };

    this.clickRegisterInstitutionalTrialLink = function(){
        browser.get('ui#/main/new_trial/INS');
       // helper.clickLink(this.registerInstitutional, "Register Institutional Trial link");
        expect(this.pageHeaderText.getText()).to.eventually.equal(register_Trial_Header_Text);
    };

    this.verifyRegisterTrial = function(){
        expect(this.pageHeaderText.getText()).to.eventually.equal(register_Trial_Header_Text);
    };

};

module.exports = trialCommonBar;
