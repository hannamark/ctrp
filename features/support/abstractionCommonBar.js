/**
 * Author: Shamim Ahmed
 * Date: 12/09/2015
 * Page Object: Abstraction Menu items
 */


var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = require('chai').expect;

var helperFunctions = require('../support/helper');


var abstractionCommonBar = function(){
    /*******
     * Page Object: Abstraction Dashboards
     *
     *
     *******/
    var homeAbstractionDashboards = element(by.css('a[href="#/main/pa_trials"]'));
    this.homeMenu = element(by.linkText('Home'));
    this.dashboardMenu = element(by.linkText('Dashboards'));
    this.dashboardAbstractionMenu = element(by.linkText('Abstraction'));
    this.dashboardResultReportingMenu = element(by.linkText('Results Reporting'));
    this.dashboardCTGovMenu = element(by.linkText('CT.Gov Import'));
    this.organizationAndFamiliesMenu = element(by.linkText('Organizations & Families'));
    this.personsMenu = element(by.linkText('Persons'));
    this.trialsMenu = element(by.linkText('Trials'));
    this.userManagementMenu = element(by.linkText('User Management'));

    var pageHeaderText = element(by.css('div.row > h4'));

    var helper = new helperFunctions();
    var search_Trial_Header_Text = 'Search Trials * for wild card';
    var register_Trial_Header_Text = 'Register Trial';

    this.clickHomeAbstractionDashboards = function(){
        homeAbstractionDashboards.isPresent().then(function(retVal){
            console.log('Home page Abstraction Dashboards link value is: ' + retVal);
            if (retVal === true) {
                helper.clickLink(homeAbstractionDashboards, "Home Search Trial link");
                expect(pageHeaderText.getText()).to.eventually.equal(search_Trial_Header_Text);
            }
        });
    };

    this.clickHomeMenu = function(){
        this.homeMenu.isPresent().then(function(retValHome){
            console.log('Link Exists: ' + retValHome);
            if (retValHome === true) {
                helper.clickLink(this.homeMenu, "Home Menu link");
            }
        });
    };

    this.clickDashboardMenu = function(){
        this.dashboardMenu.isPresent().then(function(retValDash){
            console.log('Link Exists: ' + retValDash);
            if (retValDash === true) {
                helper.clickLink(this.dashboardMenu, "Home Search Trial link");
                expect(pageHeaderText.getText()).to.eventually.equal(search_Trial_Header_Text);
            }
        });
    };



};

module.exports = abstractionCommonBar;
