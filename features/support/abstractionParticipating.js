/**
 * Author: Shamim Ahmed
 * Date: 04/10/2016
 * Page Object: Participating Site
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;
var moment = require ('moment');

var helperFunctions = require('../support/helper');
//File System
var fs = require('fs');
var junit = require('cucumberjs-junitxml');
var testFileUpload = process.env.TEST_RESULTS_DIR || process.cwd() + '/tests/testSamples';

var abstractionParticipating = function(){


    var helper = new helperFunctions();
    /*
     * Participating Site object(s)
     */

    //Add Participating Site
    this.addParticipatingSiteBtn = element(by.id('add_participating_site'));

    //Add Organization
    this.searchOrgnaizationsBtn = element(by.id('org_search_modal'));
    this.orgnizationTxt = element(by.model('psView.currentParticipatingSite.organization.name')); //by.id('organization')
    this.cityTxt = element(by.model('psView.city'));
    this.stateTxt = element(by.model('psView.state_province'));
    this.countryTxt = element(by.model('psView.country'));
    this.zipPostalCodeTxt = element(by.model('psView.postal_code'));

    this.orgnizationLbl = element(by.css('label[for="organization"]'));
    this.cityLbl = element(by.css('label[for="city"]'));
    this.stateLbl = element(by.css('label[for="state_province"]'));
    this.countryLbl = element(by.css('.control-label.col-xs-12.col-sm-3'));
    this.zipPostalCodeLbl = element(by.css('label.control-label.col-xs-12.col-sm-3'));

    //Program Code



    //page Header
    this.trialDocHeader = element(by.css('h4.panel-title'));

    //Labels Text
    this.trialDocTitle = element(by.css('h4.ng-scope'));

    this.verifyErrorMsg = function (expErrorMsg) {
        helper.getVerifyRequired(this.trialDocErrorMsg, expErrorMsg, "Error Message");
    };

    this.verifyRequiredErrorMsg = function (expReqErrorMsg) {
        helper.getVerifyRequired(this.trialDocRequiredErrorMsg, expReqErrorMsg, "Required Error Message");
    };

    this.verifyDocErrorMsg = function (expErrorMsg) {
        helper.getVerifyRequired(this.trailDocDupErrorMsg, expErrorMsg, "Document Exists Error Message");
    };

    //Wait For Element : Wait
    this.waitForRegulatoryInfoElement = function (element, label) {
        browser.wait(function () {
            return element.isPresent().then(function (state) {
                if (state === true) {
                    return element.isDisplayed().then(function (state2) {
                        return state2 === true;
                    });
                } else {
                    return false;
                }
            });
        }, 10000, label + " did not appear");
        browser.sleep(250);
    };

    this.errorHandaler = function (expVal, actVal){
        try {
            if (expVal === actVal) {
                //do nothing
            } else {
                throw new Error('Expected assertion: (' + expVal + ') has no match with Actual value: (' + actVal + ')');
            }
        } catch (err) {
            callback(err.message);
        }
    };


};

module.exports = abstractionParticipating;
